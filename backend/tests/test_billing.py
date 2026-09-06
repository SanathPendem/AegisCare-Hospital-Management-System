import pytest
from django.urls import reverse
from rest_framework import status
from billing.models import Bill, BillItem


@pytest.mark.django_db
def test_bill_creation_and_payment_flow(api_client, patient_user):
    p_user, patient = patient_user

    bill = Bill.objects.create(
        patient=patient,
        total_amount=100.00,
        discount=10.00,
        tax=5.00,
        final_amount=95.00
    )

    BillItem.objects.create(
        bill=bill,
        description="General Consultation",
        quantity=1,
        unit_price=100.00
    )

    api_client.force_authenticate(user=p_user)
    pay_url = reverse('billing-pay', kwargs={'pk': bill.id})

    payload = {"payment_method": "CREDIT_CARD"}
    response = api_client.post(pay_url, payload, format='json')

    assert response.status_code == status.HTTP_200_OK
    assert response.data['invoice_number'] == bill.invoice_number
    assert response.data['paid_amount'] == '95.00'

    bill.refresh_from_db()
    assert bill.status == "PAID"
    assert bill.paid_at is not None
