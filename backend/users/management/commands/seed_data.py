from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
import random

from patients.models import Patient
from doctors.models import Doctor
from appointments.models import Appointment
from medical_records.models import MedicalRecord
from medicines.models import Medicine
from prescriptions.models import Prescription, PrescriptionItem
from billing.models import Bill, BillItem

User = get_user_model()


class Command(BaseCommand):
    help = "Seeds initial database with realistic hospital data for demoing and testing."

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Seeding database..."))

        # 1. Create Users & Profiles
        admin_user, _ = User.objects.get_or_create(
            email='admin@hospital.com',
            defaults={
                'first_name': 'System',
                'last_name': 'Admin',
                'role': User.Role.ADMIN,
                'is_staff': True,
                'is_superuser': True,
                'phone': '+15550001111'
            }
        )
        admin_user.set_password('admin1234')
        admin_user.save()

        doc_user, _ = User.objects.get_or_create(
            email='doctor@hospital.com',
            defaults={
                'first_name': 'Sarah',
                'last_name': 'Jenkins',
                'role': User.Role.DOCTOR,
                'phone': '+15550002222'
            }
        )
        doc_user.set_password('doctor1234')
        doc_user.save()

        doctor, _ = Doctor.objects.get_or_create(
            user=doc_user,
            defaults={
                'specialization': 'Cardiology',
                'qualification': 'MD, FACC',
                'department': 'Cardiovascular',
                'license_number': 'DOC-CARDIO-889',
                'experience_years': 12,
                'consultation_fee': 120.00,
                'bio': 'Board-certified cardiologist specializing in preventive heart health.',
                'is_available': True
            }
        )

        doc2_user, _ = User.objects.get_or_create(
            email='doctor2@hospital.com',
            defaults={
                'first_name': 'Marcus',
                'last_name': 'Vance',
                'role': User.Role.DOCTOR,
                'phone': '+15550002223'
            }
        )
        doc2_user.set_password('doctor1234')
        doc2_user.save()

        doctor2, _ = Doctor.objects.get_or_create(
            user=doc2_user,
            defaults={
                'specialization': 'Pediatrics',
                'qualification': 'MBBS, DCH',
                'department': 'Pediatrics',
                'license_number': 'DOC-PEDI-902',
                'experience_years': 8,
                'consultation_fee': 90.00,
                'bio': 'Pediatric care expert focused on child nutrition and preventive wellness.',
                'is_available': True
            }
        )

        pat_user, _ = User.objects.get_or_create(
            email='patient@hospital.com',
            defaults={
                'first_name': 'John',
                'last_name': 'Doe',
                'role': User.Role.PATIENT,
                'phone': '+15550003333'
            }
        )
        pat_user.set_password('patient1234')
        pat_user.save()

        patient, _ = Patient.objects.get_or_create(
            user=pat_user,
            defaults={
                'date_of_birth': '1990-05-15',
                'gender': Patient.Gender.MALE,
                'blood_group': Patient.BloodGroup.O_POSITIVE,
                'emergency_contact_name': 'Jane Doe',
                'emergency_contact_phone': '+15550003334',
                'address': '123 Health Ave, Metro City',
                'medical_history': 'Mild hypertension, no known drug allergies.'
            }
        )

        receptionist_user, _ = User.objects.get_or_create(
            email='receptionist@hospital.com',
            defaults={
                'first_name': 'Emily',
                'last_name': 'Clark',
                'role': User.Role.RECEPTIONIST,
                'phone': '+15550004444'
            }
        )
        receptionist_user.set_password('receptionist1234')
        receptionist_user.save()

        pharmacist_user, _ = User.objects.get_or_create(
            email='pharmacist@hospital.com',
            defaults={
                'first_name': 'Robert',
                'last_name': 'Ford',
                'role': User.Role.PHARMACIST,
                'phone': '+15550005555'
            }
        )
        pharmacist_user.set_password('pharmacist1234')
        pharmacist_user.save()

        # 2. Seed Medicines Inventory
        med1, _ = Medicine.objects.get_or_create(
            code='MED-AMOX-500',
            defaults={
                'name': 'Amoxicillin 500mg',
                'category': 'Antibiotic',
                'dosage_form': 'Capsule',
                'unit_price': 15.50,
                'stock_quantity': 150,
                'reorder_level': 20,
                'manufacturer': 'PharmaCare Ltd',
                'batch_number': 'BCH-2026-A1',
                'expiry_date': timezone.now().date() + timedelta(days=365)
            }
        )

        med2, _ = Medicine.objects.get_or_create(
            code='MED-PARA-650',
            defaults={
                'name': 'Paracetamol 650mg',
                'category': 'Analgesic',
                'dosage_form': 'Tablet',
                'unit_price': 5.00,
                'stock_quantity': 8, # Low stock demo!
                'reorder_level': 25,
                'manufacturer': 'Global Meds',
                'batch_number': 'BCH-2026-P2',
                'expiry_date': timezone.now().date() + timedelta(days=180)
            }
        )

        med3, _ = Medicine.objects.get_or_create(
            code='MED-ATOR-20',
            defaults={
                'name': 'Atorvastatin 20mg',
                'category': 'Cardiovascular',
                'dosage_form': 'Tablet',
                'unit_price': 28.00,
                'stock_quantity': 80,
                'reorder_level': 15,
                'manufacturer': 'HeartCare Inc',
                'batch_number': 'BCH-2026-C3',
                'expiry_date': timezone.now().date() + timedelta(days=500)
            }
        )

        # 3. Seed Appointments
        today = timezone.now().date()
        appt1, _ = Appointment.objects.get_or_create(
            patient=patient,
            doctor=doctor,
            appointment_date=today,
            time_slot='10:00',
            defaults={
                'reason': 'Routine cardiac consultation & ECG check',
                'status': Appointment.Status.CONFIRMED
            }
        )

        appt2, _ = Appointment.objects.get_or_create(
            patient=patient,
            doctor=doctor2,
            appointment_date=today + timedelta(days=3),
            time_slot='14:30',
            defaults={
                'reason': 'Pediatric follow-up',
                'status': Appointment.Status.PENDING
            }
        )

        # 4. Seed Medical Record
        rec1, _ = MedicalRecord.objects.get_or_create(
            patient=patient,
            doctor=doctor,
            appointment=appt1,
            defaults={
                'symptoms': 'Occasional chest tightness after mild exertion.',
                'diagnosis': 'Stage 1 Essential Hypertension.',
                'treatment_plan': 'Prescribed Atorvastatin 20mg daily and recommended low-sodium diet.'
            }
        )

        # 5. Seed Prescription
        presc1, _ = Prescription.objects.get_or_create(
            patient=patient,
            doctor=doctor,
            medical_record=rec1,
            defaults={
                'status': Prescription.Status.PENDING,
                'notes': 'Take medicines after meals.'
            }
        )

        PrescriptionItem.objects.get_or_create(
            prescription=presc1,
            medicine=med3,
            defaults={
                'dosage': '20mg',
                'frequency': '0-0-1',
                'duration_days': 30,
                'quantity': 30,
                'instructions': 'Take at night before bed'
            }
        )

        # 6. Seed Bill
        bill1, _ = Bill.objects.get_or_create(
            patient=patient,
            appointment=appt1,
            prescription=presc1,
            defaults={
                'total_amount': 148.00,
                'discount': 10.00,
                'tax': 5.00,
                'final_amount': 143.00,
                'status': Bill.Status.PENDING,
                'due_date': today + timedelta(days=7)
            }
        )

        BillItem.objects.get_or_create(
            bill=bill1,
            description='Cardiology Consultation Fee',
            defaults={'unit_price': 120.00, 'quantity': 1, 'total_price': 120.00}
        )
        BillItem.objects.get_or_create(
            bill=bill1,
            description='Atorvastatin 20mg (30 tabs)',
            defaults={'unit_price': 28.00, 'quantity': 1, 'total_price': 28.00}
        )

        # 7. Seed Wards & Beds
        from beds.models import Ward, Bed, BedAdmission
        ward_icu, _ = Ward.objects.get_or_create(name='Intensive Care Unit (ICU)', defaults={'floor': '3rd Floor', 'daily_rate': 450.00})
        ward_gen, _ = Ward.objects.get_or_create(name='General Medical Ward', defaults={'floor': '2nd Floor', 'daily_rate': 120.00})

        bed1, _ = Bed.objects.get_or_create(ward=ward_icu, bed_number='ICU-101', defaults={'status': Bed.Status.OCCUPIED})
        bed2, _ = Bed.objects.get_or_create(ward=ward_icu, bed_number='ICU-102', defaults={'status': Bed.Status.AVAILABLE})
        bed3, _ = Bed.objects.get_or_create(ward=ward_gen, bed_number='GW-201', defaults={'status': Bed.Status.AVAILABLE})

        BedAdmission.objects.get_or_create(
            patient=patient,
            bed=bed1,
            defaults={'reason': 'Severe hypertension observation', 'status': BedAdmission.Status.ADMITTED}
        )

        # 8. Seed Lab Test Catalog & Orders
        from lab_tests.models import LabTestCatalog, LabTestOrder
        lab1, _ = LabTestCatalog.objects.get_or_create(
            test_code='LAB-CBC-01',
            defaults={'test_name': 'Complete Blood Count (CBC)', 'category': 'Hematology', 'price': 45.00, 'reference_range': 'Hb: 13.5-17.5 g/dL, WBC: 4,500-11,000/mcL'}
        )
        lab2, _ = LabTestCatalog.objects.get_or_create(
            test_code='LAB-LIP-02',
            defaults={'test_name': 'Lipid Profile', 'category': 'Biochemistry', 'price': 65.00, 'reference_range': 'Total Cholesterol < 200 mg/dL'}
        )

        LabTestOrder.objects.get_or_create(
            patient=patient,
            doctor=doctor,
            test=lab2,
            defaults={'status': LabTestOrder.Status.COMPLETED, 'result_notes': 'Total Cholesterol: 210 mg/dL (Slightly Elevated)'}
        )

        self.stdout.write(self.style.SUCCESS("Successfully seeded database!"))
        self.stdout.write(self.style.SUCCESS("Demo credentials:"))
        self.stdout.write("  Admin:        admin@hospital.com        / admin1234")
        self.stdout.write("  Doctor:       doctor@hospital.com       / doctor1234")
        self.stdout.write("  Patient:      patient@hospital.com      / patient1234")
        self.stdout.write("  Receptionist: receptionist@hospital.com / receptionist1234")
        self.stdout.write("  Pharmacist:   pharmacist@hospital.com   / pharmacist1234")
