from django.db import models
from patients.models import Patient
from doctors.models import Doctor
from medical_records.models import MedicalRecord


class Prescription(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        DISPENSED = 'DISPENSED', 'Dispensed'
        CANCELLED = 'CANCELLED', 'Cancelled'

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='prescriptions')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='prescriptions')
    medical_record = models.ForeignKey(MedicalRecord, on_delete=models.SET_NULL, blank=True, null=True, related_name='prescriptions')
    issued_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING, db_index=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-issued_date', '-created_at']

    def __str__(self):
        return f"Prescription #{self.id} for {self.patient.user.full_name} by Dr. {self.doctor.user.full_name}"


class PrescriptionItem(models.Model):
    prescription = models.ForeignKey(Prescription, on_delete=models.CASCADE, related_name='items')
    medicine = models.ForeignKey('medicines.Medicine', on_delete=models.PROTECT, related_name='prescription_items')
    dosage = models.CharField(max_length=50) # e.g. "500mg"
    frequency = models.CharField(max_length=100) # e.g. "1-0-1"
    duration_days = models.PositiveIntegerField(default=7)
    quantity = models.PositiveIntegerField(default=1)
    instructions = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.medicine.name} - {self.dosage} ({self.quantity} pcs)"
