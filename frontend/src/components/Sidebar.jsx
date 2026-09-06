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
  ShieldAlert
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
      { to: '/admin/medicines', label: 'Medicine Inventory', icon: Package },
      { to: '/admin/reports', label: 'Analytics & Reports', icon: BarChart3 },
    ]
  };

  const navItems = roleNavItems[role] || [];

  return (
    <aside style={{
      width: '260px',
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(16px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <div style={{ padding: '0 0.75rem 1rem 0.75rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
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
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              color: isActive ? '#ffffff' : '#94a3b8',
              background: isActive ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)' : 'transparent',
              border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent'
            })}
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </aside>
  );
};

export default Sidebar;
