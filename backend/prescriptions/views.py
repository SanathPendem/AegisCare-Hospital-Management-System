from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from .models import Prescription, PrescriptionItem
from .serializers import PrescriptionSerializer
from doctors.models import Doctor
from users.permissions import IsAdmin, IsDoctor, IsPharmacist, IsDoctorOrAdmin, IsStaffUser


class PrescriptionViewSet(viewsets.ModelViewSet):
    serializer_class = PrescriptionSerializer
    filterset_fields = ['patient', 'doctor', 'status', 'issued_date']
    search_fields = ['patient__user__first_name', 'patient__user__last_name', 'doctor__user__first_name', 'doctor__user__last_name', 'notes']
    ordering_fields = ['issued_date', 'created_at']

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Prescription.objects.none()

        qs = Prescription.objects.select_related('patient__user', 'doctor__user').prefetch_related('items__medicine').all()

        if user.role == 'PATIENT':
            return qs.filter(patient__user=user)
        elif user.role == 'DOCTOR':
            return qs.filter(doctor__user=user)
        return qs

    def get_permissions(self):
        if self.action in ['create']:
            permission_classes = [IsDoctorOrAdmin]
        elif self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [IsDoctorOrAdmin]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=['post'], permission_classes=[IsAdmin | IsPharmacist])
    def dispense(self, request, pk=None):
        prescription = self.get_object()
        if prescription.status == Prescription.Status.DISPENSED:
            return Response({"detail": "Prescription has already been dispensed."}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            for item in prescription.items.select_related('medicine').all():
                if item.medicine.stock_quantity < item.quantity:
                    return Response(
                        {"detail": f"Insufficient stock for {item.medicine.name}. Requested: {item.quantity}, Available: {item.medicine.stock_quantity}"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            for item in prescription.items.all():
                item.medicine.stock_quantity -= item.quantity
                item.medicine.save()

            prescription.status = Prescription.Status.DISPENSED
            prescription.save()

        return Response(self.get_serializer(prescription).data)
