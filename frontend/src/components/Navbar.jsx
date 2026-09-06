import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Activity, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  const roleBadgeColors = {
    ADMIN: { bg: '#f3e8ff', color: '#7c3aed' },
    DOCTOR: { bg: '#dbeafe', color: '#1d4ed8' },
    PATIENT: { bg: '#d1fae5', color: '#047857' },
    RECEPTIONIST: { bg: '#e0f2fe', color: '#0369a1' },
    PHARMACIST: { bg: '#fef3c7', color: '#b45309' },
  };

  const badgeStyle = roleBadgeColors[user?.role] || { bg: '#e2e8f0', color: '#334155' };

  return (
    <header style={{
      height: '70px',
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
        }}>
          <Activity size={22} color="#ffffff" />
        </div>
        <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a' }}>
          AegisCare<span style={{ color: '#0284c7' }}>.</span>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f8fafc', padding: '0.4rem 0.85rem', borderRadius: '30px', border: '1px solid #e2e8f0' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: badgeStyle.bg,
            color: badgeStyle.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '0.85rem'
          }}>
            {user?.first_name?.[0] || 'U'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{user?.full_name || user?.email}</span>
            <span style={{ fontSize: '0.7rem', color: badgeStyle.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{user?.role}</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="btn btn-secondary"
          style={{ padding: '0.5rem 0.85rem', borderRadius: '8px' }}
          title="Sign Out"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
