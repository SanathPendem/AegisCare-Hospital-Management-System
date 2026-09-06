from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Doctor
from .serializers import DoctorSerializer, DoctorCreateSerializer
from users.permissions import IsAdmin, IsDoctor


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.select_related('user').all()
    serializer_class = DoctorSerializer
    filterset_fields = ['specialization', 'department', 'is_available']
    search_fields = ['user__first_name', 'user__last_name', 'user__email', 'specialization', 'department', 'license_number']
    ordering_fields = ['experience_years', 'consultation_fee', 'user__last_name', 'created_at']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny] # Publicly viewable for booking
        elif self.action == 'create':
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAdmin | IsDoctor]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == 'create':
            return DoctorCreateSerializer
        return DoctorSerializer

    @action(detail=False, methods=['get', 'patch', 'put'], permission_classes=[IsDoctor])
    def me(self, request):
        doctor, created = Doctor.objects.get_or_create(
            user=request.user,
            defaults={'specialization': 'General', 'qualification': 'MBBS', 'department': 'General', 'license_number': f'DOC-{request.user.id}'}
        )
        if request.method in ['PATCH', 'PUT']:
            serializer = DoctorSerializer(doctor, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        serializer = DoctorSerializer(doctor)
        return Response(serializer.data)
