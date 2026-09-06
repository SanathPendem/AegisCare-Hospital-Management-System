import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Calendar, Menu, X, Home, Stethoscope, Building2, FlaskConical, Phone, FileText, ShieldCheck } from 'lucide-react';

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
    <nav style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 90, boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '72px' }}>
        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center" style={{ gap: '32px' }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: isActive ? '#0f4c81' : '#475569',
                paddingBottom: '4px',
                borderBottom: isActive ? '3px solid #0f4c81' : '3px solid transparent',
                transition: 'all 0.2s ease',
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

        {/* Highlighted CTAs Desktop */}
        <div className="hidden lg:flex items-center" style={{ gap: '16px' }}>
          <Link to="/login" className="aegis-btn aegis-btn-primary" style={{ height: '44px', padding: '0 1.25rem', fontSize: '0.875rem', fontWeight: 800, borderRadius: '10px' }}>
            <ShieldCheck size={16} />
            <span>Portal Login</span>
          </Link>
          <Link to="/book-appointment" className="aegis-btn aegis-btn-crimson" style={{ height: '44px', padding: '0 1.25rem', fontSize: '0.875rem', fontWeight: 800, borderRadius: '10px' }}>
            <Calendar size={16} />
            <span>Book Appointment</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <span className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">Navigation Menu</span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-sky-800 hover:bg-slate-100 rounded-lg transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition ${
                      isActive ? 'bg-sky-50 text-sky-800' : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon size={18} className="text-sky-600" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-12 bg-sky-700 hover:bg-sky-800 text-white rounded-xl font-extrabold text-sm flex items-center justify-center space-x-2 shadow-sm"
            >
              <ShieldCheck size={18} />
              <span>Hospital Management Portal</span>
            </Link>
            <Link
              to="/book-appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-12 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-extrabold text-sm flex items-center justify-center space-x-2 shadow-sm"
            >
              <Calendar size={18} />
              <span>Book an Appointment</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PrimaryNav;
