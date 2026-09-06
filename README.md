# AegisCare - Production-Grade Full-Stack Hospital Management System

[![Django](https://img.shields.io/badge/Django-5.1-092E20?style=for-the-badge&logo=django)](https://djangoproject.com)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql)](https://postgresql.org)
[![Celery](https://img.shields.io/badge/Celery-5.3-37814A?style=for-the-badge&logo=celery)](https://docs.celeryq.dev)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)](https://docker.com)

AegisCare is a comprehensive, production-grade Hospital Management System designed to demonstrate clean full-stack software architecture, role-based access control (RBAC), double-booking validation, medicine stock auto-deduction, financial billing, background async processing, interactive analytics, and Docker containerization.

---

## 🏛 System Architecture

```
                               ┌──────────────────────────────────────────────┐
                               │           React + Vite Frontend              │
                               │  (Axios, React Router, Recharts, Lucide)     │
                               └──────────────────────┬───────────────────────┘
                                                      │ REST APIs (JWT Auth)
                                                      ▼
                               ┌──────────────────────────────────────────────┐
                               │          Django REST Framework               │
                               │  (Custom User, RBAC, Services, Validation)   │
                               └──────────────┬───────────────┬───────────────┘
                                              │               │
                              SQL Queries     │               │ Async Tasks
                                              ▼               ▼
                                 ┌─────────────────┐     ┌───────────────┐
                                 │   PostgreSQL    │     │ Redis Broker  │
                                 └─────────────────┘     └───────┬───────┘
                                                                 │
                                                                 ▼
                                                         ┌───────────────┐
                                                         │ Celery Worker │
                                                         └───────────────┘
```

---

## 🔑 Key Features & Role Capabilities

### 1. 👤 Patient Portal (`/patient/*`)
- **Dashboard**: Overview of upcoming appointments, active prescriptions, unpaid bills, and medical history count.
- **Appointments**: Schedule appointments with specialist doctors. Features double-booking conflict detection at both API serializer and database levels.
- **Medical Records**: View clinical diagnoses, symptoms, and treatment plans recorded by attending doctors.
- **Prescriptions**: View digital prescriptions, dosage frequencies, and dispensing status.
- **Bills & Payments**: View detailed invoices and process simulated online payments with instant receipt confirmation.
- **Personal Profile**: Update emergency contacts, blood group, and pre-existing medical history.

### 2. 🩺 Doctor Portal (`/doctor/*`)
- **Schedule Management**: View today's consultation queue, confirm or cancel appointments.
- **Patient Directory**: Search registered patients, medical history, and emergency contacts.
- **Clinical Medical Records**: Create new consultation entries with symptoms, diagnosis, and treatment recommendations.
- **Digital Prescriptions**: Issue prescriptions with multiple medicine items, dosages, frequencies, and special instructions.

### 3. 📋 Receptionist Portal (`/receptionist/*`)
- **Patient Registration**: Register walk-in patients and manage profiles.
- **Appointment Scheduling**: Schedule, confirm, and assign appointments for patients across doctors.

### 4. 💊 Pharmacist Console (`/pharmacist/*`)
- **Prescription Queue**: Review pending prescriptions issued by doctors.
- **Dispensing with Stock Auto-Deduction**: Marking a prescription as `DISPENSED` automatically deducts medicine stock quantities atomically.
- **Inventory Catalog**: Track stock levels, batch numbers, unit prices, low-stock thresholds, and drug expiries.

### 5. ⚡ Administrator Portal (`/admin/*`)
- **User Management**: RBAC control over system users (Admin, Doctor, Patient, Receptionist, Pharmacist).
- **Physician Profiles**: Add and manage doctor specializations, qualifications, and consultation fees.
- **Analytics & Financial Reports**: Interactive Recharts graphs showing monthly revenue trends, appointment status distributions, and stock alerts.

---

## 🛠 Technology Stack

- **Backend**: Python 3.11+, Django 5.1, Django REST Framework, SimpleJWT, Celery, Redis, `pytest-django`, `drf-spectacular`
- **Frontend**: React 18, Vite 6, React Router v6, Axios, Recharts, Lucide Icons, Custom Glassmorphism CSS Design System
- **Database**: PostgreSQL / SQLite fallback
- **Containerization**: Docker, Docker Compose

---

## ⚡ Quickstart Guide

### Option 1: Using Docker Compose (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/sanat/hospital-management-system.git
   cd hospital-management-system
   ```

2. Start the entire container stack:
   ```bash
   docker-compose up --build
   ```

3. Access the applications:
   - **Frontend App**: [http://localhost:5173](http://localhost:5173)
   - **Django REST API**: [http://localhost:8000/api/v1/](http://localhost:8000/api/v1/)
   - **Swagger OpenAPI Docs**: [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)

---

### Option 2: Local Manual Setup

#### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
# source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Pre-seeded Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin@hospital.com` | `admin1234` |
| **Doctor** | `doctor@hospital.com` | `doctor1234` |
| **Patient** | `patient@hospital.com` | `patient1234` |
| **Receptionist** | `receptionist@hospital.com` | `receptionist1234` |
| **Pharmacist** | `pharmacist@hospital.com` | `pharmacist1234` |

---

## 🧪 Testing & Verification

Run the full automated test suite using `pytest`:

```bash
cd backend
.\venv\Scripts\pytest
```

Includes test coverage for:
- User registration, JWT login & refresh
- Protected endpoint RBAC permissions
- Appointment double-booking prevention constraint validation
- Prescription dispensing stock deduction transactions
- Billing generation & payment processing flow

---

## 📄 License
This project is open-source under the MIT License.
