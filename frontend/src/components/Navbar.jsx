import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Activity, LogOut, PhoneCall, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NotificationDropdown from './common/NotificationDropdown';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const roleBadgeColors = {
    ADMIN: { bg: '#f3e8ff', color: '#7c3aed', label: 'System Admin' },
    DOCTOR: { bg: '#e0f2fe', color: '#0369a1', label: 'Consultant Doctor' },
    PATIENT: { bg: '#d1fae5', color: '#047857', label: 'Patient Portal' },
    RECEPTIONIST: { bg: '#fef3c7', color: '#b45309', label: 'Front Desk' },
    PHARMACIST: { bg: '#fae8ff', color: '#86198f', label: 'Pharmacist' },
  };

  const badgeStyle = roleBadgeColors[user?.role] || { bg: '#e2e8f0', color: '#334155', label: user?.role };

  return (
    <header style={{
      height: '76px',
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 3.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(15, 76, 129, 0.06)'
    }}>
      {/* AegisCare Brand Logo */}
      <div 
        onClick={() => navigate('/')} 
        style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
      >
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #0f4c81 0%, #0284c7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(15, 76, 129, 0.3)'
        }}>
          <Activity size={24} color="#ffffff" />
        </div>
        <div>
          <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f4c81', letterSpacing: '-0.02em', display: 'block', lineHeight: 1.1 }}>
            AEGISCARE
          </span>
          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#e11d48', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            HEALTHCARE SYSTEM
          </span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="hidden md:flex items-center relative flex-1 max-w-3xl mx-8">
        <Search size={18} className="text-slate-400 absolute" style={{ left: '1.25rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder="Search patients, doctors, medical records, or beds..."
          style={{ paddingLeft: '3.5rem', height: '48px' }}
          className="w-full pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-sky-600 focus:border-sky-600 outline-none transition shadow-2xs"
        />
      </div>

      {/* Right User & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Notification Bell */}
        <NotificationDropdown />

        {/* Helpline Pill */}
        <div className="hidden lg:flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full text-xs">
          <PhoneCall size={14} className="text-rose-600" />
          <span className="font-extrabold text-rose-900">+91 040 4488 5000</span>
        </div>

        {/* User Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f8fafc', padding: '0.4rem 0.85rem', borderRadius: '30px', border: '1px solid #e2e8f0' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: '#0f4c81',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}>
            {user?.first_name?.[0] || 'U'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>{user?.full_name || user?.email}</span>
            <span style={{ fontSize: '0.68rem', color: badgeStyle.color, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{badgeStyle.label}</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="btn btn-secondary"
          style={{ padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 700 }}
          title="Sign Out"
        >
          <LogOut size={16} color="#e11d48" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
