from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import F
from .models import Medicine
from .serializers import MedicineSerializer
from users.permissions import IsAdmin, IsPharmacist


class MedicineViewSet(viewsets.ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
    filterset_fields = ['category', 'dosage_form']
    search_fields = ['name', 'code', 'category', 'manufacturer', 'batch_number']
    ordering_fields = ['name', 'stock_quantity', 'expiry_date', 'unit_price']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdmin | IsPharmacist]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'])
    def low_stock(self, request):
        low_stock_qs = Medicine.objects.filter(stock_quantity__lte=F('reorder_level'))
        page = self.paginate_queryset(low_stock_qs)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(low_stock_qs, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def expired(self, request):
        expired_qs = Medicine.objects.filter(expiry_date__lte=timezone.now().date())
        page = self.paginate_queryset(expired_qs)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(expired_qs, many=True)
        return Response(serializer.data)
