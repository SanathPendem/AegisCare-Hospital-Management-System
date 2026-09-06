from celery import shared_task
from django.contrib.auth import get_user_model
from .models import Notification

User = get_user_model()


@shared_task
def send_appointment_confirmation_task(appointment_id):
    from appointments.models import Appointment
    try:
        appointment = Appointment.objects.select_related('patient__user', 'doctor__user').get(pk=appointment_id)
        # Create notification record
        Notification.objects.create(
            recipient=appointment.patient.user,
            title="Appointment Confirmed",
            message=f"Your appointment with Dr. {appointment.doctor.user.full_name} on {appointment.appointment_date} at {appointment.time_slot} has been confirmed.",
            type=Notification.NotificationType.APPOINTMENT
        )
        print(f"[Celery Task] Appointment notification sent for appointment #{appointment_id}")
        return True
    except Exception as e:
        print(f"[Celery Task Error] {e}")
        return False


@shared_task
def send_prescription_ready_task(prescription_id):
    from prescriptions.models import Prescription
    try:
        prescription = Prescription.objects.select_related('patient__user').get(pk=prescription_id)
        Notification.objects.create(
            recipient=prescription.patient.user,
            title="Prescription Dispensed",
            message=f"Your prescription #{prescription.id} has been dispensed by the pharmacy.",
            type=Notification.NotificationType.PRESCRIPTION
        )
        print(f"[Celery Task] Prescription notification sent for prescription #{prescription_id}")
        return True
    except Exception as e:
        print(f"[Celery Task Error] {e}")
        return False


@shared_task
def send_payment_confirmation_task(bill_id):
    from billing.models import Bill
    try:
        bill = Bill.objects.select_related('patient__user').get(pk=bill_id)
        Notification.objects.create(
            recipient=bill.patient.user,
            title="Payment Received",
            message=f"Payment of ${bill.final_amount} for Invoice #{bill.invoice_number} has been received.",
            type=Notification.NotificationType.BILLING
        )
        print(f"[Celery Task] Payment notification sent for invoice #{bill.invoice_number}")
        return True
    except Exception as e:
        print(f"[Celery Task Error] {e}")
        return False
