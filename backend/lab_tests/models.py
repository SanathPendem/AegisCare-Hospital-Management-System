from django.db import models
from patients.models import Patient
from doctors.models import Doctor


class LabTestCatalog(models.Model):
    test_name = models.CharField(max_length=200)
    test_code = models.CharField(max_length=50, unique=True)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=50.00)
    reference_range = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.test_name} ({self.test_code}) - ${self.price}"


class LabTestOrder(models.Model):
    class Status(models.TextChoices):
        ORDERED = 'ORDERED', 'Ordered'
        SAMPLE_COLLECTED = 'SAMPLE_COLLECTED', 'Sample Collected'
        COMPLETED = 'COMPLETED', 'Completed'
        CANCELLED = 'CANCELLED', 'Cancelled'

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='lab_orders')
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, blank=True, null=True, related_name='lab_orders')
    test = models.ForeignKey(LabTestCatalog, on_delete=models.PROTECT, related_name='orders')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ORDERED, db_index=True)
    result_notes = models.TextField(blank=True, null=True)
    attachment = models.FileField(upload_to='lab_reports/', blank=True, null=True)
    ordered_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['-ordered_at']

    def __str__(self):
        return f"Lab Order #{self.id}: {self.test.test_name} for {self.patient.user.full_name}"
