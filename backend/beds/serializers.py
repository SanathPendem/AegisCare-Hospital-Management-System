from rest_framework import serializers
from .models import Ward, Bed, BedAdmission
from patients.serializers import PatientSerializer


class WardSerializer(serializers.ModelSerializer):
    total_beds = serializers.IntegerField(source='beds.count', read_only=True)
    available_beds = serializers.SerializerMethodField()

    class Meta:
        model = Ward
        fields = ('id', 'name', 'floor', 'daily_rate', 'total_beds', 'available_beds', 'created_at')

    def get_available_beds(self, obj):
        return obj.beds.filter(status=Bed.Status.AVAILABLE).count()


class BedSerializer(serializers.ModelSerializer):
    ward_name = serializers.ReadOnlyField(source='ward.name')

    class Meta:
        model = Bed
        fields = ('id', 'ward', 'ward_name', 'bed_number', 'status')


class BedAdmissionSerializer(serializers.ModelSerializer):
    patient_detail = PatientSerializer(source='patient', read_only=True)
    bed_detail = BedSerializer(source='bed', read_only=True)

    class Meta:
        model = BedAdmission
        fields = (
            'id', 'patient', 'bed', 'patient_detail', 'bed_detail',
            'admitted_at', 'discharged_at', 'reason', 'status'
        )
        read_only_fields = ('id', 'admitted_at', 'discharged_at')
