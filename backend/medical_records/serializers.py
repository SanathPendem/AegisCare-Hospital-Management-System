from rest_framework import serializers
from .models import MedicalRecord
from patients.serializers import PatientSerializer
from doctors.serializers import DoctorSerializer


class MedicalRecordSerializer(serializers.ModelSerializer):
    patient_detail = PatientSerializer(source='patient', read_only=True)
    doctor_detail = DoctorSerializer(source='doctor', read_only=True)

    class Meta:
        model = MedicalRecord
        fields = (
            'id', 'patient', 'doctor', 'appointment', 'patient_detail',
            'doctor_detail', 'visit_date', 'symptoms', 'diagnosis',
            'treatment_plan', 'attachment', 'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'visit_date', 'created_at', 'updated_at')
