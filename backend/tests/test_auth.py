import pytest
from django.urls import reverse
from rest_framework import status


@pytest.mark.django_db
def test_user_registration(api_client):
    url = reverse('auth-register')
    payload = {
        "email": "newuser@hospital.com",
        "password": "securepassword123",
        "password_confirm": "securepassword123",
        "first_name": "New",
        "last_name": "User",
        "role": "PATIENT",
        "phone": "+19998887777"
    }
    response = api_client.post(url, payload, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['email'] == "newuser@hospital.com"


@pytest.mark.django_db
def test_user_login_returns_jwt(api_client, patient_user):
    user, _ = patient_user
    url = reverse('token-obtain-pair')
    payload = {
        "email": user.email,
        "password": "password123"
    }
    response = api_client.post(url, payload, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert 'access' in response.data
    assert 'refresh' in response.data
    assert response.data['user']['email'] == user.email
    assert response.data['user']['role'] == "PATIENT"


@pytest.mark.django_db
def test_protected_profile_endpoint(api_client, patient_user):
    user, _ = patient_user
    url = reverse('auth-me')

    # Unauthenticated request
    unauth_resp = api_client.get(url)
    assert unauth_resp.status_code == status.HTTP_401_UNAUTHORIZED

    # Authenticated request
    api_client.force_authenticate(user=user)
    auth_resp = api_client.get(url)
    assert auth_resp.status_code == status.HTTP_200_OK
    assert auth_resp.data['email'] == user.email
