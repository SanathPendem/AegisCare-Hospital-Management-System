import pytest
from django.urls import reverse
from rest_framework import status
from datetime import date, timedelta
from medicines.models import Medicine
from prescriptions.models import Prescription, PrescriptionItem
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
def test_prescription_dispense_deducts_stock(api_client, patient_user, doctor_user):
    p_user, patient = patient_user
    d_user, doctor = doctor_user

    pharmacist = User.objects.create_user(
        email='pharm_test@hospital.com',
        password='password123',
        role=User.Role.PHARMACIST
    )

    medicine = Medicine.objects.create(
        name="Ibuprofen 400mg",
        code="MED-IBU-400",
        category="Analgesic",
        dosage_form="Tablet",
        unit_price=10.00,
        stock_quantity=50,
        reorder_level=10,
        expiry_date=date.today() + timedelta(days=100)
    )

    prescription = Prescription.objects.create(
        patient=patient,
        doctor=doctor,
        notes="Take with food"
    )

    item = PrescriptionItem.objects.create(
        prescription=prescription,
        medicine=medicine,
        dosage="400mg",
        frequency="1-0-1",
        quantity=15
    )

    # Authenticate as Pharmacist and dispense
    api_client.force_authenticate(user=pharmacist)
    dispense_url = reverse('prescriptions-dispense', kwargs={'pk': prescription.id})
    response = api_client.post(dispense_url)

    assert response.status_code == status.HTTP_200_OK
    assert response.data['status'] == "DISPENSED"

    # Verify inventory stock was reduced by item quantity (50 - 15 = 35)
    medicine.refresh_from_db()
    assert medicine.stock_quantity == 35
