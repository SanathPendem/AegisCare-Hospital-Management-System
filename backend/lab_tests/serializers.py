from rest_framework import serializers
from .models import LabTestCatalog, LabTestOrder
from patients.serializers import PatientSerializer
from doctors.serializers import DoctorSerializer


class LabTestCatalogSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabTestCatalog
        fields = ('id', 'test_name', 'test_code', 'category', 'price', 'reference_range')


class LabTestOrderSerializer(serializers.ModelSerializer):
    patient_detail = PatientSerializer(source='patient', read_only=True)
    doctor_detail = DoctorSerializer(source='doctor', read_only=True)
    test_detail = LabTestCatalogSerializer(source='test', read_only=True)

    class Meta:
        model = LabTestOrder
        fields = (
            'id', 'patient', 'doctor', 'test', 'patient_detail',
            'doctor_detail', 'test_detail', 'status', 'result_notes',
            'attachment', 'ordered_at', 'completed_at'
        )
        read_only_fields = ('id', 'ordered_at', 'completed_at')
