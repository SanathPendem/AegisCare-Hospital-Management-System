from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    """Allows access only to Admin users."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.role == 'ADMIN' or request.user.is_superuser)
        )


class IsDoctor(permissions.BasePermission):
    """Allows access only to Doctor users."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == 'DOCTOR'
        )


class IsPatient(permissions.BasePermission):
    """Allows access only to Patient users."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == 'PATIENT'
        )


class IsReceptionist(permissions.BasePermission):
    """Allows access only to Receptionist users."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == 'RECEPTIONIST'
        )


class IsPharmacist(permissions.BasePermission):
    """Allows access only to Pharmacist users."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == 'PHARMACIST'
        )


class IsDoctorOrAdmin(permissions.BasePermission):
    """Allows access to Doctors and Admins."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role in ['DOCTOR', 'ADMIN']
        )


class IsReceptionistOrAdmin(permissions.BasePermission):
    """Allows access to Receptionists and Admins."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role in ['RECEPTIONIST', 'ADMIN']
        )


class IsStaffUser(permissions.BasePermission):
    """Allows access to non-patient staff (Admin, Doctor, Receptionist, Pharmacist)."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role in ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PHARMACIST']
        )
