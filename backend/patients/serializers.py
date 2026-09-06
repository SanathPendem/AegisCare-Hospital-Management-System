from rest_framework import serializers
from .models import Patient
from users.serializers import UserSerializer, UserRegisterSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Patient
        fields = (
            'id', 'user', 'user_id', 'date_of_birth', 'gender',
            'blood_group', 'emergency_contact_name', 'emergency_contact_phone',
            'address', 'medical_history', 'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'created_at', 'updated_at')


class PatientCreateSerializer(serializers.ModelSerializer):
    user_data = UserRegisterSerializer(write_only=True)

    class Meta:
        model = Patient
        fields = (
            'id', 'user_data', 'date_of_birth', 'gender',
            'blood_group', 'emergency_contact_name', 'emergency_contact_phone',
            'address', 'medical_history'
        )

    def create(self, validated_data):
        user_data = validated_data.pop('user_data')
        email = user_data.pop('email')
        password = user_data.pop('password')
        user_data['role'] = User.Role.PATIENT
        user = User.objects.create_user(email=email, password=password, **user_data)

        patient = Patient.objects.create(user=user, **validated_data)
        return patient
