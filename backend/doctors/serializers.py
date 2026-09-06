from rest_framework import serializers
from .models import Doctor
from users.serializers import UserSerializer, UserRegisterSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Doctor
        fields = (
            'id', 'user', 'specialization', 'qualification',
            'department', 'license_number', 'experience_years',
            'consultation_fee', 'bio', 'is_available',
            'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'created_at', 'updated_at')


class DoctorCreateSerializer(serializers.ModelSerializer):
    user_data = UserRegisterSerializer(write_only=True)

    class Meta:
        model = Doctor
        fields = (
            'id', 'user_data', 'specialization', 'qualification',
            'department', 'license_number', 'experience_years',
            'consultation_fee', 'bio', 'is_available'
        )

    def create(self, validated_data):
        user_data = validated_data.pop('user_data')
        user_data['role'] = User.Role.DOCTOR
        register_serializer = UserRegisterSerializer(data=user_data)
        register_serializer.is_valid(raise_exception=True)
        user = register_serializer.save()

        doctor = Doctor.objects.create(user=user, **validated_data)
        return doctor
