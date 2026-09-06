from rest_framework import viewsets, permissions, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Patient
from .serializers import PatientSerializer, PatientCreateSerializer
from users.permissions import IsAdmin, IsStaffUser, IsPatient, IsReceptionistOrAdmin


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.select_related('user').all()
    serializer_class = PatientSerializer
    filterset_fields = ['gender', 'blood_group']
    search_fields = ['user__email', 'user__first_name', 'user__last_name', 'user__phone']
    ordering_fields = ['created_at', 'user__last_name']

    def get_permissions(self):
        if self.action in ['create']:
            permission_classes = [permissions.AllowAny] # Allow self registration or admin/receptionist creation
        elif self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [IsStaffUser]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == 'create':
            return PatientCreateSerializer
        return PatientSerializer

    @action(detail=False, methods=['get', 'patch', 'put'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        patient, created = Patient.objects.get_or_create(user=request.user)
        if request.method in ['PATCH', 'PUT']:
            serializer = PatientSerializer(patient, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        serializer = PatientSerializer(patient)
        return Response(serializer.data)
