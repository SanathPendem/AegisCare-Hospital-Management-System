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

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def print_invoice(self, request, pk=None):
        from django.http import HttpResponse
        bill = self.get_object()
        items_html = "".join([
            f"<tr><td>{item.description}</td><td>{item.quantity}</td><td>${item.unit_price}</td><td>${item.total_price}</td></tr>"
            for item in bill.items.all()
        ])

        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice {bill.invoice_number} - AegisCare Hospital</title>
            <style>
                body {{ font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #1e293b; background: #fff; }}
                .header {{ display: flex; justify-content: space-between; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }}
                .title {{ font-size: 24px; font-weight: bold; color: #2563eb; }}
                .invoice-details {{ margin: 30px 0; display: flex; justify-content: space-between; }}
                table {{ width: 100%; border-collapse: collapse; margin-top: 20px; }}
                th, td {{ padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: left; }}
                th {{ background: #f8fafc; color: #64748b; font-size: 12px; text-transform: uppercase; }}
                .total-box {{ margin-top: 30px; text-align: right; font-size: 18px; font-weight: bold; color: #059669; }}
                @media print {{ .no-print {{ display: none; }} }}
            </style>
        </head>
        <body>
            <button class="no-print" onclick="window.print()" style="padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 20px;">Print Invoice</button>
            <div class="header">
                <div>
                    <div class="title">AegisCare Medical Center</div>
                    <p style="color: #64748b; font-size: 14px;">123 Healthcare Boulevard, Metro City</p>
                </div>
                <div style="text-align: right;">
                    <h2 style="margin: 0; color: #0f172a;">INVOICE</h2>
                    <p style="color: #2563eb; font-weight: bold;">#{bill.invoice_number}</p>
                </div>
            </div>
            <div class="invoice-details">
                <div>
                    <strong>Billed To:</strong><br/>
                    {bill.patient.user.full_name}<br/>
                    Email: {bill.patient.user.email}<br/>
                    Phone: {bill.patient.user.phone or 'N/A'}
                </div>
                <div style="text-align: right;">
                    <strong>Invoice Date:</strong> {bill.created_at.strftime('%B %d, %Y')}<br/>
                    <strong>Payment Status:</strong> <span style="color: {'#059669' if bill.status == 'PAID' else '#d97706'}; font-weight: bold;">{bill.status}</span><br/>
                    <strong>Payment Method:</strong> {bill.payment_method or 'N/A'}
                </div>
            </div>
            <table>
                <thead>
                    <tr><th>Item Description</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr>
                </thead>
                <tbody>
                    {items_html}
                </tbody>
            </table>
            <div class="total-box">
                <p style="font-size: 14px; color: #64748b; font-weight: normal;">Subtotal: ${bill.total_amount} | Discount: -${bill.discount} | Tax: +${bill.tax}</p>
                Total Paid: ${bill.final_amount}
            </div>
        </body>
        </html>
        """
        return HttpResponse(html_content, content_type='text/html')
