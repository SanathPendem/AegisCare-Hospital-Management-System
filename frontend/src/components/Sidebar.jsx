import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
  CreditCard,
  User,
  Users,
  Stethoscope,
  Package,
  BarChart3,
  Bed,
  FlaskConical
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role;

  const roleNavItems = {
    PATIENT: [
      { to: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/patient/appointments', label: 'Appointments', icon: Calendar },
      { to: '/patient/medical-records', label: 'Medical Records', icon: FileText },
      { to: '/patient/prescriptions', label: 'Prescriptions', icon: Pill },
      { to: '/patient/bills', label: 'Bills & Payments', icon: CreditCard },
      { to: '/patient/profile', label: 'My Profile', icon: User },
    ],
    DOCTOR: [
      { to: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/doctor/appointments', label: 'Appointments', icon: Calendar },
      { to: '/doctor/patients', label: 'Patient Directory', icon: Users },
      { to: '/doctor/medical-records', label: 'Medical Records', icon: FileText },
      { to: '/doctor/prescriptions', label: 'Prescriptions', icon: Pill },
      { to: '/doctor/lab-tests', label: 'Lab & Diagnostics', icon: FlaskConical },
    ],
    RECEPTIONIST: [
      { to: '/receptionist/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/receptionist/patients', label: 'Patients', icon: Users },
      { to: '/receptionist/appointments', label: 'Appointments', icon: Calendar },
    ],
    PHARMACIST: [
      { to: '/pharmacist/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/pharmacist/prescriptions', label: 'Dispense Prescriptions', icon: Pill },
      { to: '/pharmacist/inventory', label: 'Medicine Inventory', icon: Package },
    ],
    ADMIN: [
      { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/admin/users', label: 'User Management', icon: Users },
      { to: '/admin/doctors', label: 'Doctors', icon: Stethoscope },
      { to: '/admin/patients', label: 'Patients', icon: User },
      { to: '/admin/appointments', label: 'Appointments', icon: Calendar },
      { to: '/admin/beds', label: 'Wards & Bed Occupancy', icon: Bed },
      { to: '/admin/medicines', label: 'Medicine Inventory', icon: Package },
      { to: '/admin/reports', label: 'Analytics & Reports', icon: BarChart3 },
    ]
  };

  const navItems = roleNavItems[role] || [];

  return (
    <aside style={{
      width: '260px',
      background: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.35rem'
    }}>
      <div style={{ padding: '0 0.75rem 0.75rem 0.75rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Main Menu
      </div>

      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              fontWeight: isActive ? 800 : 600,
              fontSize: '0.9rem',
              transition: 'all 0.15s ease-in-out',
              color: isActive ? '#0f4c81' : '#475569',
              background: isActive ? '#eff6ff' : 'transparent',
              borderLeft: isActive ? '3px solid #e11d48' : '3px solid transparent'
            })}
          >
            <Icon size={18} color={undefined} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </aside>
  );
};

export default Sidebar;
