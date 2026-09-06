import pytest
from django.urls import reverse
from rest_framework import status
from datetime import date
from appointments.models import Appointment


@pytest.mark.django_db
def test_create_appointment_and_prevent_double_booking(api_client, patient_user, doctor_user):
    p_user, patient = patient_user
    d_user, doctor = doctor_user

    api_client.force_authenticate(user=p_user)
    url = reverse('appointments-list')

    payload = {
        "doctor": doctor.id,
        "appointment_date": str(date.today()),
        "time_slot": "11:00",
        "reason": "General Checkup"
    }

    # 1. First appointment booking should succeed
    response1 = api_client.post(url, payload, format='json')
    assert response1.status_code == status.HTTP_201_CREATED
    assert response1.data['status'] == "PENDING"

    # 2. Second appointment booking for same doctor, date & time_slot should fail with double-booking validation error
    response2 = api_client.post(url, payload, format='json')
    assert response2.status_code == status.HTTP_400_BAD_REQUEST
    assert "non_field_errors" in response2.data or "time_slot" in response2.data
