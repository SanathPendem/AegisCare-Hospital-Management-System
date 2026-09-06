import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientAppointments from './pages/patient/PatientAppointments';
import PatientMedicalRecords from './pages/patient/PatientMedicalRecords';
import PatientPrescriptions from './pages/patient/PatientPrescriptions';
import PatientBills from './pages/patient/PatientBills';
import PatientProfile from './pages/patient/PatientProfile';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorPatients from './pages/doctor/DoctorPatients';
import DoctorMedicalRecords from './pages/doctor/DoctorMedicalRecords';
import DoctorPrescriptions from './pages/doctor/DoctorPrescriptions';

// Receptionist Pages
import ReceptionistDashboard from './pages/receptionist/ReceptionistDashboard';
import ReceptionistPatients from './pages/receptionist/ReceptionistPatients';
import ReceptionistAppointments from './pages/receptionist/ReceptionistAppointments';

// Pharmacist Pages
import PharmacistDashboard from './pages/pharmacist/PharmacistDashboard';
import PharmacistPrescriptions from './pages/pharmacist/PharmacistPrescriptions';
import PharmacistInventory from './pages/pharmacist/PharmacistInventory';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminDoctors from './pages/admin/AdminDoctors';
import AdminPatients from './pages/admin/AdminPatients';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminMedicines from './pages/admin/AdminMedicines';
import AdminReports from './pages/admin/AdminReports';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes Inside Dashboard Layout */}
          <Route element={<DashboardLayout />}>
            {/* Patient Routes */}
            <Route element={<ProtectedRoute allowedRoles={['PATIENT']} />}>
              <Route path="/patient/dashboard" element={<PatientDashboard />} />
              <Route path="/patient/appointments" element={<PatientAppointments />} />
              <Route path="/patient/medical-records" element={<PatientMedicalRecords />} />
              <Route path="/patient/prescriptions" element={<PatientPrescriptions />} />
              <Route path="/patient/bills" element={<PatientBills />} />
              <Route path="/patient/profile" element={<PatientProfile />} />
            </Route>

            {/* Doctor Routes */}
            <Route element={<ProtectedRoute allowedRoles={['DOCTOR']} />}>
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor/appointments" element={<DoctorAppointments />} />
              <Route path="/doctor/patients" element={<DoctorPatients />} />
              <Route path="/doctor/medical-records" element={<DoctorMedicalRecords />} />
              <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
            </Route>

            {/* Receptionist Routes */}
            <Route element={<ProtectedRoute allowedRoles={['RECEPTIONIST']} />}>
              <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
              <Route path="/receptionist/patients" element={<ReceptionistPatients />} />
              <Route path="/receptionist/appointments" element={<ReceptionistAppointments />} />
            </Route>

            {/* Pharmacist Routes */}
            <Route element={<ProtectedRoute allowedRoles={['PHARMACIST']} />}>
              <Route path="/pharmacist/dashboard" element={<PharmacistDashboard />} />
              <Route path="/pharmacist/prescriptions" element={<PharmacistPrescriptions />} />
              <Route path="/pharmacist/inventory" element={<PharmacistInventory />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/doctors" element={<AdminDoctors />} />
              <Route path="/admin/patients" element={<AdminPatients />} />
              <Route path="/admin/appointments" element={<AdminAppointments />} />
              <Route path="/admin/medicines" element={<AdminMedicines />} />
              <Route path="/admin/reports" element={<AdminReports />} />
            </Route>
          </Route>

          {/* Root Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
