import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from patients.models import Patient
from doctors.models import Doctor

User = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def admin_user(db):
    user = User.objects.create_user(
        email='admin_test@hospital.com',
        password='password123',
        first_name='Admin',
        last_name='User',
        role=User.Role.ADMIN,
        is_staff=True,
        is_superuser=True
    )
    return user


@pytest.fixture
def doctor_user(db):
    user = User.objects.create_user(
        email='doctor_test@hospital.com',
        password='password123',
        first_name='Doctor',
        last_name='Who',
        role=User.Role.DOCTOR
    )
    doctor = Doctor.objects.create(
        user=user,
        specialization='General',
        qualification='MBBS',
        department='General',
        license_number='DOC-TEST-100'
    )
    return user, doctor


@pytest.fixture
def patient_user(db):
    user = User.objects.create_user(
        email='patient_test@hospital.com',
        password='password123',
        first_name='Patient',
        last_name='Zero',
        role=User.Role.PATIENT
    )
    patient = Patient.objects.create(
        user=user,
        gender=Patient.Gender.MALE,
        blood_group=Patient.BloodGroup.O_POSITIVE
    )
    return user, patient
