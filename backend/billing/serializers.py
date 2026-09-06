from rest_framework import serializers
from .models import Bill, BillItem
from patients.serializers import PatientSerializer
from appointments.serializers import AppointmentSerializer


class BillItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillItem
        fields = ('id', 'description', 'quantity', 'unit_price', 'total_price')
        read_only_fields = ('id', 'total_price')


class BillSerializer(serializers.ModelSerializer):
    patient_detail = PatientSerializer(source='patient', read_only=True)
    appointment_detail = AppointmentSerializer(source='appointment', read_only=True)
    items = BillItemSerializer(many=True)

    class Meta:
        model = Bill
        fields = (
            'id', 'patient', 'appointment', 'prescription',
            'patient_detail', 'appointment_detail', 'invoice_number',
            'total_amount', 'discount', 'tax', 'final_amount',
            'status', 'payment_method', 'due_date', 'paid_at',
            'items', 'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'invoice_number', 'paid_at', 'created_at', 'updated_at')

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        discount = validated_data.get('discount', 0)
        tax = validated_data.get('tax', 0)

        bill = Bill.objects.create(**validated_data)

        subtotal = 0
        for item_data in items_data:
            unit_price = item_data['unit_price']
            quantity = item_data.get('quantity', 1)
            item_total = unit_price * quantity
            subtotal += item_total
            BillItem.objects.create(bill=bill, total_price=item_total, **item_data)

        bill.total_amount = subtotal
        bill.final_amount = subtotal - discount + tax
        bill.save()

        return bill
