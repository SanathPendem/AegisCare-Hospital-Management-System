from rest_framework import viewsets, permissions
from .models import MedicalRecord
from .serializers import MedicalRecordSerializer
from doctors.models import Doctor
from users.permissions import IsAdmin, IsDoctor, IsDoctorOrAdmin, IsStaffUser


class MedicalRecordViewSet(viewsets.ModelViewSet):
    serializer_class = MedicalRecordSerializer
    filterset_fields = ['patient', 'doctor', 'visit_date']
    search_fields = ['patient__user__first_name', 'patient__user__last_name', 'diagnosis', 'symptoms']
    ordering_fields = ['visit_date', 'created_at']

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return MedicalRecord.objects.none()

        qs = MedicalRecord.objects.select_related('patient__user', 'doctor__user', 'appointment').all()

        if user.role == 'PATIENT':
            return qs.filter(patient__user=user)
        elif user.role == 'DOCTOR':
            return qs.filter(doctor__user=user)
        return qs

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsDoctorOrAdmin]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        user = self.request.user
        if user.role == 'DOCTOR':
            doctor, _ = Doctor.objects.get_or_create(user=user)
            serializer.save(doctor=doctor)
        else:
            serializer.save()
