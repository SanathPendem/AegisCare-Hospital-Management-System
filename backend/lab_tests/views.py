from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import LabTestCatalog, LabTestOrder
from .serializers import LabTestCatalogSerializer, LabTestOrderSerializer
from users.permissions import IsStaffUser


class LabTestCatalogViewSet(viewsets.ModelViewSet):
    queryset = LabTestCatalog.objects.all()
    serializer_class = LabTestCatalogSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['category']
    search_fields = ['test_name', 'test_code', 'category']


class LabTestOrderViewSet(viewsets.ModelViewSet):
    serializer_class = LabTestOrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['patient', 'doctor', 'status']

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return LabTestOrder.objects.none()
        if user.role == 'PATIENT':
            return LabTestOrder.objects.filter(patient__user=user)
        return LabTestOrder.objects.select_related('patient__user', 'doctor__user', 'test').all()

    @action(detail=True, methods=['post'], permission_classes=[IsStaffUser])
    def complete(self, request, pk=None):
        order = self.get_object()
        result_notes = request.data.get('result_notes', '')
        attachment = request.FILES.get('attachment')

        order.result_notes = result_notes
        if attachment:
            order.attachment = attachment
        order.status = LabTestOrder.Status.COMPLETED
        order.completed_at = timezone.now()
        order.save()

        return Response(self.get_serializer(order).data)
