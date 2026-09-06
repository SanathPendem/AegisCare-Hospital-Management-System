import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Calendar, Menu, X, Home, Stethoscope, Building2, FlaskConical, Globe, Phone, FileText } from 'lucide-react';

const PrimaryNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/about', label: 'About Us', icon: Building2 },
    { to: '/departments', label: 'Departments', icon: Building2 },
    { to: '/doctors', label: 'Doctors / Specialists', icon: Stethoscope },
    { to: '/procedures', label: 'Procedures', icon: FileText },
    { to: '/laboratory', label: 'Lab Services', icon: FlaskConical },
    { to: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <nav style={{ background: '#ffffff', borderBottom: '2px solid #e2e8f0', sticky: 'top', top: 0, zIndex: 90, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                padding: '0.6rem 1rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: isActive ? '#0f4c81' : '#334155',
                borderBottom: isActive ? '3px solid #0f4c81' : '3px solid transparent',
                transition: 'all 0.15s ease',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              })}
            >
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Highlighted Crimson CTA & Portal Login */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/login" className="btn btn-secondary" style={{ padding: '0.55rem 1rem', fontSize: '0.8rem', borderRadius: '6px' }}>
            Portal Sign In
          </Link>
          <Link to="/book-appointment" className="btn btn-crimson" style={{ padding: '0.65rem 1.25rem', borderRadius: '6px', fontSize: '0.85rem' }}>
            <Calendar size={16} />
            <span>BOOK AN APPOINTMENT</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PrimaryNav;
