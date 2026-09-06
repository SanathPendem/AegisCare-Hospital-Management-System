from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.utils import timezone
from django.db.models import Sum, Count, F
from django.contrib.auth import get_user_model

from patients.models import Patient
from doctors.models import Doctor
from appointments.models import Appointment
from medical_records.models import MedicalRecord
from prescriptions.models import Prescription
from medicines.models import Medicine
from billing.models import Bill

User = get_user_model()


class DashboardSummaryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role
        today = timezone.now().date()

        if role == 'ADMIN':
            total_patients = Patient.objects.count()
            total_doctors = Doctor.objects.count()
            total_appointments = Appointment.objects.count()
            total_revenue = Bill.objects.filter(status=Bill.Status.PAID).aggregate(Sum('final_amount'))['final_amount__sum'] or 0
            low_stock_count = Medicine.objects.filter(stock_quantity__lte=F('reorder_level')).count()

            recent_appointments = Appointment.objects.select_related('patient__user', 'doctor__user').order_by('-created_at')[:5]

            return Response({
                "role": role,
                "metrics": {
                    "total_patients": total_patients,
                    "total_doctors": total_doctors,
                    "total_appointments": total_appointments,
                    "total_revenue": float(total_revenue),
                    "low_stock_count": low_stock_count,
                },
                "recent_appointments": [
                    {
                        "id": appt.id,
                        "patient_name": appt.patient.user.full_name,
                        "doctor_name": f"Dr. {appt.doctor.user.full_name}",
                        "date": appt.appointment_date,
                        "time": appt.time_slot,
                        "status": appt.status
                    } for appt in recent_appointments
                ]
            })

        elif role == 'DOCTOR':
            doctor = getattr(user, 'doctor_profile', None)
            if not doctor:
                return Response({"role": role, "metrics": {}, "today_appointments": []})

            today_appointments = Appointment.objects.filter(doctor=doctor, appointment_date=today)
            upcoming_appointments = Appointment.objects.filter(doctor=doctor, appointment_date__gte=today, status__in=['PENDING', 'CONFIRMED']).count()
            total_patients = Appointment.objects.filter(doctor=doctor).values('patient').distinct().count()
            records_created = MedicalRecord.objects.filter(doctor=doctor).count()

            return Response({
                "role": role,
                "metrics": {
                    "today_appointments_count": today_appointments.count(),
                    "upcoming_appointments_count": upcoming_appointments,
                    "total_patients_treated": total_patients,
                    "records_created": records_created
                },
                "today_appointments": [
                    {
                        "id": appt.id,
                        "patient_name": appt.patient.user.full_name,
                        "time": appt.time_slot,
                        "reason": appt.reason,
                        "status": appt.status
                    } for appt in today_appointments[:10]
                ]
            })

        elif role == 'PATIENT':
            patient = getattr(user, 'patient_profile', None)
            if not patient:
                return Response({"role": role, "metrics": {}, "upcoming_appointments": []})

            upcoming = Appointment.objects.filter(patient=patient, appointment_date__gte=today, status__in=['PENDING', 'CONFIRMED']).order_by('appointment_date')
            active_prescriptions = Prescription.objects.filter(patient=patient, status='PENDING').count()
            unpaid_bills = Bill.objects.filter(patient=patient, status__in=['PENDING', 'PARTIALLY_PAID']).count()
            total_records = MedicalRecord.objects.filter(patient=patient).count()

            return Response({
                "role": role,
                "metrics": {
                    "upcoming_appointments_count": upcoming.count(),
                    "active_prescriptions_count": active_prescriptions,
                    "unpaid_bills_count": unpaid_bills,
                    "total_medical_records": total_records
                },
                "upcoming_appointments": [
                    {
                        "id": appt.id,
                        "doctor_name": f"Dr. {appt.doctor.user.full_name}",
                        "specialization": appt.doctor.specialization,
                        "date": appt.appointment_date,
                        "time": appt.time_slot,
                        "status": appt.status
                    } for appt in upcoming[:5]
                ]
            })

        elif role == 'PHARMACIST':
            pending_prescriptions = Prescription.objects.filter(status='PENDING').count()
            dispensed_today = Prescription.objects.filter(status='DISPENSED', updated_at__date=today).count()
            total_medicines = Medicine.objects.count()
            low_stock = Medicine.objects.filter(stock_quantity__lte=F('reorder_level')).count()

            return Response({
                "role": role,
                "metrics": {
                    "pending_prescriptions": pending_prescriptions,
                    "dispensed_today": dispensed_today,
                    "total_medicines": total_medicines,
                    "low_stock_medicines": low_stock
                }
            })

        elif role == 'RECEPTIONIST':
            today_appointments = Appointment.objects.filter(appointment_date=today).count()
            pending_appointments = Appointment.objects.filter(status='PENDING').count()
            total_patients = Patient.objects.count()
            available_doctors = Doctor.objects.filter(is_available=True).count()

            return Response({
                "role": role,
                "metrics": {
                    "today_appointments_count": today_appointments,
                    "pending_appointments": pending_appointments,
                    "total_registered_patients": total_patients,
                    "available_doctors": available_doctors
                }
            })

        return Response({"role": role, "metrics": {}})
