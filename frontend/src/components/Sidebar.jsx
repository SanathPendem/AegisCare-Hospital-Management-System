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
  FlaskConical,
  LifeBuoy
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role;

  const roleNavGroups = {
    ADMIN: [
      {
        title: 'MAIN',
        items: [
          { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/admin/users', label: 'User Management', icon: Users },
          { to: '/admin/doctors', label: 'Doctors Directory', icon: Stethoscope },
          { to: '/admin/patients', label: 'Patients Directory', icon: User },
        ]
      },
      {
        title: 'OPERATIONS',
        items: [
          { to: '/admin/appointments', label: 'Appointments', icon: Calendar },
          { to: '/admin/beds', label: 'Wards & Beds', icon: Bed },
          { to: '/admin/medicines', label: 'Pharmacy Inventory', icon: Package },
        ]
      },
      {
        title: 'REPORTING',
        items: [
          { to: '/admin/reports', label: 'Analytics & Reports', icon: BarChart3 },
        ]
      }
    ],
    DOCTOR: [
      {
        title: 'CLINICAL CARE',
        items: [
          { to: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/doctor/appointments', label: 'Appointments', icon: Calendar },
          { to: '/doctor/patients', label: 'Patient Directory', icon: Users },
        ]
      },
      {
        title: 'MEDICAL RECORDS',
        items: [
          { to: '/doctor/medical-records', label: 'Medical Records', icon: FileText },
          { to: '/doctor/prescriptions', label: 'E-Prescriptions', icon: Pill },
          { to: '/doctor/lab-tests', label: 'Lab & Diagnostics', icon: FlaskConical },
        ]
      }
    ],
    PATIENT: [
      {
        title: 'PATIENT PORTAL',
        items: [
          { to: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/patient/appointments', label: 'Appointments', icon: Calendar },
          { to: '/patient/medical-records', label: 'Medical Records', icon: FileText },
          { to: '/patient/prescriptions', label: 'Prescriptions', icon: Pill },
          { to: '/patient/bills', label: 'Bills & Invoices', icon: CreditCard },
          { to: '/patient/profile', label: 'My Profile', icon: User },
        ]
      }
    ],
    RECEPTIONIST: [
      {
        title: 'FRONT DESK',
        items: [
          { to: '/receptionist/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/receptionist/patients', label: 'Register Patients', icon: Users },
          { to: '/receptionist/appointments', label: 'Book Appointments', icon: Calendar },
        ]
      }
    ],
    PHARMACIST: [
      {
        title: 'PHARMACY DISPENSARY',
        items: [
          { to: '/pharmacist/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/pharmacist/prescriptions', label: 'Dispense Queue', icon: Pill },
          { to: '/pharmacist/inventory', label: 'Stock Inventory', icon: Package },
        ]
      }
    ]
  };

  const groups = roleNavGroups[role] || [];

  return (
    <aside style={{
      width: '260px',
      background: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 'calc(100vh - 72px)'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {groups.map((group, gIdx) => (
          <div key={gIdx}>
            <div style={{ padding: '0 0.75rem 0.5rem 0.75rem', color: '#94a3b8', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {group.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '10px',
                      fontWeight: isActive ? 800 : 600,
                      fontSize: '0.85rem',
                      transition: 'all 0.15s ease-in-out',
                      color: isActive ? '#0f4c81' : '#475569',
                      background: isActive ? '#eff6ff' : 'transparent',
                      borderLeft: isActive ? '3px solid #e11d48' : '3px solid transparent'
                    })}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Support Card */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mt-6 text-xs text-slate-600">
        <div className="flex items-center space-x-2 font-bold text-slate-900 mb-1">
          <LifeBuoy size={16} className="text-sky-700" />
          <span>Need Help?</span>
        </div>
        <p className="text-[11px] text-slate-500 mb-2">Contact AegisCare IT Helpdesk for portal assistance.</p>
        <a href="mailto:support@aegiscare.com" className="text-sky-700 font-bold hover:underline">
          Contact Support →
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
