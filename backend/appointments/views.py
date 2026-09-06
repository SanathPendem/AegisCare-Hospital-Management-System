from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Appointment
from .serializers import AppointmentSerializer
from patients.models import Patient
from doctors.models import Doctor
from users.permissions import IsAdmin, IsDoctor, IsPatient, IsReceptionist, IsStaffUser


class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    filterset_fields = ['doctor', 'patient', 'appointment_date', 'status']
    search_fields = ['patient__user__first_name', 'patient__user__last_name', 'doctor__user__first_name', 'doctor__user__last_name', 'reason']
    ordering_fields = ['appointment_date', 'time_slot', 'created_at']

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Appointment.objects.none()

        qs = Appointment.objects.select_related('patient__user', 'doctor__user').all()

        if user.role == 'PATIENT':
            return qs.filter(patient__user=user)
        elif user.role == 'DOCTOR':
            return qs.filter(doctor__user=user)
        elif user.role in ['ADMIN', 'RECEPTIONIST']:
            return qs
        return qs

    def perform_create(self, serializer):
        user = self.request.user
        if user.role == 'PATIENT':
            patient, _ = Patient.objects.get_or_create(user=user)
            serializer.save(patient=patient)
        else:
            serializer.save()

    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAuthenticated])
    def cancel(self, request, pk=None):
        appointment = self.get_object()
        appointment.status = Appointment.Status.CANCELLED
        appointment.save()
        return Response({"detail": "Appointment successfully cancelled.", "status": appointment.status})

    @action(detail=True, methods=['patch'], permission_classes=[IsStaffUser])
    def confirm(self, request, pk=None):
        appointment = self.get_object()
        appointment.status = Appointment.Status.CONFIRMED
        appointment.save()
        return Response({"detail": "Appointment confirmed.", "status": appointment.status})
