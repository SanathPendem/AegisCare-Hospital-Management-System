import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Activity, LogIn, Key, Mail } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalError('');
    try {
      const user = await login({ email, password });
      const roleRoutes = {
        ADMIN: '/admin/dashboard',
        DOCTOR: '/doctor/dashboard',
        PATIENT: '/patient/dashboard',
        RECEPTIONIST: '/receptionist/dashboard',
        PHARMACIST: '/pharmacist/dashboard',
      };
      navigate(roleRoutes[user.role] || '/patient/dashboard');
    } catch (err) {
      setLocalError(err.message || 'Invalid credentials');
    }
  };

  const setDemoUser = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem',
      backgroundColor: '#f8fafc'
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '480px', padding: '3rem 2.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #0f4c81 0%, #0284c7 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 28px rgba(15, 76, 129, 0.3)',
            marginBottom: '1rem'
          }}>
            <Activity size={36} color="#fff" />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f4c81', letterSpacing: '-0.02em' }}>
            AEGISCARE <span style={{ color: '#e11d48' }}>PORTAL</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9375rem', marginTop: '0.375rem', fontWeight: 600 }}>
            Medical Management System Access
          </p>
        </div>

        {localError && (
          <div style={{
            background: '#fff1f2',
            border: '1px solid #fecdd3',
            color: '#be123c',
            padding: '1rem 1.25rem',
            borderRadius: '12px',
            fontSize: '0.875rem',
            marginBottom: '1.75rem',
            fontWeight: 700
          }}>
            {localError}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#0f4c81' }} />
              <input
                type="email"
                required
                className="form-input"
                style={{ width: '100%', height: '52px', paddingLeft: '2.75rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9375rem' }}
                placeholder="name@hospital.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Key size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#0f4c81' }} />
              <input
                type="password"
                required
                className="form-input"
                style={{ width: '100%', height: '52px', paddingLeft: '2.75rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9375rem' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', height: '52px', justifyContent: 'center', marginTop: '0.5rem', background: '#0f4c81', borderRadius: '12px', fontWeight: 800, fontSize: '0.9375rem' }}
          >
            <LogIn size={20} />
            <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
          </button>
        </form>

        <div style={{ marginTop: '2.5rem', paddingTop: '1.75rem', borderTop: '1px solid #f1f5f9' }}>
          <p style={{ fontSize: '0.75rem', color: '#0f4c81', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', textAlign: 'center' }}>
            Quick Demo Role Login Credentials:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <button type="button" onClick={() => setDemoUser('admin@hospital.com', 'admin1234')} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.6rem', fontWeight: 700, borderColor: '#0f4c81', color: '#0f4c81', borderRadius: '10px' }}>
              Admin Demo
            </button>
            <button type="button" onClick={() => setDemoUser('doctor@hospital.com', 'doctor1234')} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.6rem', fontWeight: 700, borderColor: '#0f4c81', color: '#0f4c81', borderRadius: '10px' }}>
              Doctor Demo
            </button>
            <button type="button" onClick={() => setDemoUser('patient@hospital.com', 'patient1234')} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.6rem', fontWeight: 700, borderColor: '#0f4c81', color: '#0f4c81', borderRadius: '10px' }}>
              Patient Demo
            </button>
            <button type="button" onClick={() => setDemoUser('pharmacist@hospital.com', 'pharmacist1234')} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.6rem', fontWeight: 700, borderColor: '#0f4c81', color: '#0f4c81', borderRadius: '10px' }}>
              Pharmacist Demo
            </button>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9375rem', color: '#64748b' }}>
          Don't have an account? <Link to="/register" style={{ color: '#e11d48', fontWeight: 800 }}>Create Patient Account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
