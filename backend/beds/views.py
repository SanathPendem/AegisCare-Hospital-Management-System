from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Ward, Bed, BedAdmission
from .serializers import WardSerializer, BedSerializer, BedAdmissionSerializer
from users.permissions import IsStaffUser


class WardViewSet(viewsets.ModelViewSet):
    queryset = Ward.objects.prefetch_related('beds').all()
    serializer_class = WardSerializer
    permission_classes = [permissions.IsAuthenticated]


class BedViewSet(viewsets.ModelViewSet):
    queryset = Bed.objects.select_related('ward').all()
    serializer_class = BedSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['ward', 'status']


class BedAdmissionViewSet(viewsets.ModelViewSet):
    serializer_class = BedAdmissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['patient', 'bed', 'status']

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return BedAdmission.objects.none()
        if user.role == 'PATIENT':
            return BedAdmission.objects.filter(patient__user=user)
        return BedAdmission.objects.select_related('patient__user', 'bed__ward').all()

    def perform_create(self, serializer):
        admission = serializer.save()
        bed = admission.bed
        bed.status = Bed.Status.OCCUPIED
        bed.save()

    @action(detail=True, methods=['post'], permission_classes=[IsStaffUser])
    def discharge(self, request, pk=None):
        admission = self.get_object()
        if admission.status == BedAdmission.Status.DISCHARGED:
            return Response({"detail": "Patient has already been discharged."}, status=status.HTTP_400_BAD_REQUEST)

        admission.status = BedAdmission.Status.DISCHARGED
        admission.discharged_at = timezone.now()
        admission.save()

        bed = admission.bed
        bed.status = Bed.Status.AVAILABLE
        bed.save()

        return Response(self.get_serializer(admission).data)
