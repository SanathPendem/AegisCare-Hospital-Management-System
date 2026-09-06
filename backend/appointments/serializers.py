from rest_framework import serializers
from .models import Appointment
from patients.models import Patient
from doctors.models import Doctor
from patients.serializers import PatientSerializer
from doctors.serializers import DoctorSerializer


class AppointmentSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all(), required=False, allow_null=True, default=None)
    patient_detail = PatientSerializer(source='patient', read_only=True)
    doctor_detail = DoctorSerializer(source='doctor', read_only=True)

    class Meta:
        model = Appointment
        fields = (
            'id', 'patient', 'doctor', 'patient_detail', 'doctor_detail',
            'appointment_date', 'time_slot', 'reason', 'status',
            'notes', 'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'created_at', 'updated_at')
        extra_kwargs = {
            'patient': {'required': False, 'allow_null': True}
        }

    def validate(self, attrs):
        doctor = attrs.get('doctor', getattr(self.instance, 'doctor', None))
        patient = attrs.get('patient', getattr(self.instance, 'patient', None))
        request = self.context.get('request')
        if not patient and request and hasattr(request.user, 'patient_profile'):
            patient = request.user.patient_profile

        appointment_date = attrs.get('appointment_date', getattr(self.instance, 'appointment_date', None))
        time_slot = attrs.get('time_slot', getattr(self.instance, 'time_slot', None))
        status = attrs.get('status', getattr(self.instance, 'status', Appointment.Status.PENDING))

        # Check double booking if status is active (PENDING or CONFIRMED)
        if status in [Appointment.Status.PENDING, Appointment.Status.CONFIRMED]:
            # Doctor availability conflict check
            doctor_conflicts = Appointment.objects.filter(
                doctor=doctor,
                appointment_date=appointment_date,
                time_slot=time_slot,
                status__in=[Appointment.Status.PENDING, Appointment.Status.CONFIRMED]
            )
            if self.instance:
                doctor_conflicts = doctor_conflicts.exclude(pk=self.instance.pk)
            if doctor_conflicts.exists():
                raise serializers.ValidationError(
                    {"time_slot": "This doctor is already booked for the selected date and time slot."}
                )

            # Patient conflict check
            if patient:
                patient_conflicts = Appointment.objects.filter(
                    patient=patient,
                    appointment_date=appointment_date,
                    time_slot=time_slot,
                    status__in=[Appointment.Status.PENDING, Appointment.Status.CONFIRMED]
                )
                if self.instance:
                    patient_conflicts = patient_conflicts.exclude(pk=self.instance.pk)
                if patient_conflicts.exists():
                    raise serializers.ValidationError(
                        {"time_slot": "You already have another active appointment at this date and time slot."}
                    )

        return attrs
