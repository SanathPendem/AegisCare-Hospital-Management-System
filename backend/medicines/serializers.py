from rest_framework import serializers
from .models import Medicine


class MedicineSerializer(serializers.ModelSerializer):
    is_low_stock = serializers.ReadOnlyField()
    is_expired = serializers.ReadOnlyField()

    class Meta:
        model = Medicine
        fields = (
            'id', 'name', 'code', 'category', 'dosage_form',
            'unit_price', 'stock_quantity', 'reorder_level',
            'manufacturer', 'batch_number', 'expiry_date',
            'is_low_stock', 'is_expired', 'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'created_at', 'updated_at')
