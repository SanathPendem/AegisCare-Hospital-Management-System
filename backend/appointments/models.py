from django.db import models
from patients.models import Patient
from doctors.models import Doctor


class Appointment(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        CONFIRMED = 'CONFIRMED', 'Confirmed'
        CANCELLED = 'CANCELLED', 'Cancelled'
        COMPLETED = 'COMPLETED', 'Completed'
        NO_SHOW = 'NO_SHOW', 'No Show'

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments', null=True, blank=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='appointments')
    appointment_date = models.DateField(db_index=True)
    time_slot = models.CharField(max_length=20, help_text="e.g. 09:00, 10:00", db_index=True)
    reason = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING, db_index=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-appointment_date', 'time_slot']
        constraints = [
            models.UniqueConstraint(
                fields=['doctor', 'appointment_date', 'time_slot'],
                condition=models.Q(status__in=['PENDING', 'CONFIRMED']),
                name='unique_doctor_active_slot'
            ),
            models.UniqueConstraint(
                fields=['patient', 'appointment_date', 'time_slot'],
                condition=models.Q(status__in=['PENDING', 'CONFIRMED']),
                name='unique_patient_active_slot'
            )
        ]

    def __str__(self):
        return f"Appointment #{self.id}: {self.patient.user.full_name} with Dr. {self.doctor.user.full_name} on {self.appointment_date} at {self.time_slot}"
