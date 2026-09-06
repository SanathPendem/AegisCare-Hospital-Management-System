from rest_framework import serializers
from .models import Prescription, PrescriptionItem
from medicines.models import Medicine
from medicines.serializers import MedicineSerializer
from patients.serializers import PatientSerializer
from doctors.serializers import DoctorSerializer
from doctors.models import Doctor


class PrescriptionItemSerializer(serializers.ModelSerializer):
    medicine_detail = MedicineSerializer(source='medicine', read_only=True)

    class Meta:
        model = PrescriptionItem
        fields = (
            'id', 'medicine', 'medicine_detail', 'dosage',
            'frequency', 'duration_days', 'quantity', 'instructions'
        )


class PrescriptionSerializer(serializers.ModelSerializer):
    patient_detail = PatientSerializer(source='patient', read_only=True)
    doctor_detail = DoctorSerializer(source='doctor', read_only=True)
    items = PrescriptionItemSerializer(many=True)

    class Meta:
        model = Prescription
        fields = (
            'id', 'patient', 'doctor', 'medical_record',
            'patient_detail', 'doctor_detail', 'issued_date',
            'status', 'notes', 'items', 'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'issued_date', 'created_at', 'updated_at')

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        request = self.context.get('request')

        # Auto assign doctor if created by doctor
        if request and request.user.role == 'DOCTOR' and 'doctor' not in validated_data:
            doctor, _ = Doctor.objects.get_or_create(user=request.user)
            validated_data['doctor'] = doctor

        prescription = Prescription.objects.create(**validated_data)

        for item_data in items_data:
            PrescriptionItem.objects.create(prescription=prescription, **item_data)

        return prescription

    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if items_data is not None:
            instance.items.all().delete()
            for item_data in items_data:
                PrescriptionItem.objects.create(prescription=instance, **item_data)

        return instance
