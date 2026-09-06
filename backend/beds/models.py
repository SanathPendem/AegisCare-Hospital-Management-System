from django.db import models
from patients.models import Patient


class Ward(models.Model):
    name = models.CharField(max_length=100, unique=True)
    floor = models.CharField(max_length=50)
    daily_rate = models.DecimalField(max_digits=10, decimal_places=2, default=150.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} (Floor {self.floor}) - ${self.daily_rate}/day"


class Bed(models.Model):
    class Status(models.TextChoices):
        AVAILABLE = 'AVAILABLE', 'Available'
        OCCUPIED = 'OCCUPIED', 'Occupied'
        MAINTENANCE = 'MAINTENANCE', 'Maintenance'

    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, related_name='beds')
    bed_number = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.AVAILABLE, db_index=True)

    def __str__(self):
        return f"Bed {self.bed_number} ({self.ward.name}) - {self.status}"


class BedAdmission(models.Model):
    class Status(models.TextChoices):
        ADMITTED = 'ADMITTED', 'Admitted'
        DISCHARGED = 'DISCHARGED', 'Discharged'

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='admissions')
    bed = models.ForeignKey(Bed, on_delete=models.CASCADE, related_name='admissions')
    admitted_at = models.DateTimeField(auto_now_add=True)
    discharged_at = models.DateTimeField(blank=True, null=True)
    reason = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ADMITTED, db_index=True)

    def __str__(self):
        return f"Admission: {self.patient.user.full_name} in {self.bed.bed_number}"
