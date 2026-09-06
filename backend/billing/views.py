from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Bill
from .serializers import BillSerializer
from users.permissions import IsAdmin, IsStaffUser, IsPatient, IsReceptionistOrAdmin


class BillViewSet(viewsets.ModelViewSet):
    serializer_class = BillSerializer
    filterset_fields = ['patient', 'status', 'payment_method']
    search_fields = ['invoice_number', 'patient__user__first_name', 'patient__user__last_name']
    ordering_fields = ['created_at', 'final_amount', 'due_date']

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Bill.objects.none()

        qs = Bill.objects.select_related('patient__user', 'appointment').prefetch_related('items').all()

        if user.role == 'PATIENT':
            return qs.filter(patient__user=user)
        return qs

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsReceptionistOrAdmin]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def pay(self, request, pk=None):
        bill = self.get_object()
        if bill.status == Bill.Status.PAID:
            return Response({"detail": "This bill has already been fully paid."}, status=status.HTTP_400_BAD_REQUEST)

        payment_method = request.data.get('payment_method', Bill.PaymentMethod.ONLINE)
        bill.payment_method = payment_method
        bill.status = Bill.Status.PAID
        bill.paid_at = timezone.now()
        bill.save()

        return Response({
            "detail": "Payment processed successfully.",
            "invoice_number": bill.invoice_number,
            "paid_amount": str(bill.final_amount),
            "payment_method": bill.payment_method,
            "paid_at": bill.paid_at,
            "bill": BillSerializer(bill).data
        })
