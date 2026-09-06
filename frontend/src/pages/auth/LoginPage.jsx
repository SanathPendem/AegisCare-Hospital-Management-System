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
      padding: '2rem',
      backgroundColor: '#f8fafc'
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px -4px rgba(15, 23, 42, 0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #0f4c81 0%, #0284c7 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(15, 76, 129, 0.3)',
            marginBottom: '0.85rem'
          }}>
            <Activity size={32} color="#fff" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f4c81', letterSpacing: '-0.02em' }}>
            AEGISCARE <span style={{ color: '#e11d48' }}>PORTAL</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem', fontWeight: 600 }}>
            Medical Management System Access
          </p>
        </div>

        {localError && (
          <div style={{
            background: '#fff1f2',
            border: '1px solid #fecdd3',
            color: '#be123c',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
            fontWeight: 700
          }}>
            {localError}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700, color: '#1e293b' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#0f4c81' }} />
              <input
                type="email"
                required
                className="form-input"
                style={{ width: '100%', paddingLeft: '2.5rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                placeholder="name@hospital.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700, color: '#1e293b' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Key size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#0f4c81' }} />
              <input
                type="password"
                required
                className="form-input"
                style={{ width: '100%', paddingLeft: '2.5rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
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
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '1rem', background: '#0f4c81', borderRadius: '8px', fontWeight: 800 }}
          >
            <LogIn size={18} />
            <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
          </button>
        </form>

        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
          <p style={{ fontSize: '0.75rem', color: '#0f4c81', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', textAlign: 'center' }}>
            Quick Demo Role Login Credentials:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button type="button" onClick={() => setDemoUser('admin@hospital.com', 'admin1234')} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.45rem', fontWeight: 700, borderColor: '#0f4c81', color: '#0f4c81' }}>
              Admin Demo
            </button>
            <button type="button" onClick={() => setDemoUser('doctor@hospital.com', 'doctor1234')} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.45rem', fontWeight: 700, borderColor: '#0f4c81', color: '#0f4c81' }}>
              Doctor Demo
            </button>
            <button type="button" onClick={() => setDemoUser('patient@hospital.com', 'patient1234')} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.45rem', fontWeight: 700, borderColor: '#0f4c81', color: '#0f4c81' }}>
              Patient Demo
            </button>
            <button type="button" onClick={() => setDemoUser('pharmacist@hospital.com', 'pharmacist1234')} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.45rem', fontWeight: 700, borderColor: '#0f4c81', color: '#0f4c81' }}>
              Pharmacist Demo
            </button>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
          Don't have an account? <Link to="/register" style={{ color: '#e11d48', fontWeight: 800 }}>Create Patient Account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
