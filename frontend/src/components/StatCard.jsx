import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = '#3b82f6', subtitle }) => {
  return (
    <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</p>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.25rem', color: '#f8fafc' }}>{value}</h3>
        {subtitle && <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>{subtitle}</p>}
      </div>

      {Icon && (
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '14px',
          background: `${color}18`,
          border: `1px solid ${color}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color
        }}>
          <Icon size={24} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
