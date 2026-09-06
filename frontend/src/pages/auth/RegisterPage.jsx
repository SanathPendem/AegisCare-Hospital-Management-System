import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Activity, UserPlus, Mail, Key, User, Phone } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    phone: '',
    role: 'PATIENT',
  });
  const [localError, setLocalError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (formData.password !== formData.password_confirm) {
      setLocalError('Passwords do not match.');
      return;
    }

    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setLocalError(err.message || 'Registration failed.');
    }
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
      <div className="glass-card" style={{ width: '100%', maxWidth: '520px', padding: '3rem 2.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 28px rgba(16, 185, 129, 0.3)',
            marginBottom: '1rem'
          }}>
            <Activity size={36} color="#fff" />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>Patient Registration</h2>
          <p style={{ color: '#64748b', fontSize: '0.9375rem', marginTop: '0.375rem', fontWeight: 600 }}>
            Create your patient portal account
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

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>First Name</label>
              <input
                type="text"
                name="first_name"
                required
                className="form-input"
                style={{ width: '100%', height: '52px', paddingLeft: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9375rem' }}
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Last Name</label>
              <input
                type="text"
                name="last_name"
                required
                className="form-input"
                style={{ width: '100%', height: '52px', paddingLeft: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9375rem' }}
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="form-input"
              style={{ width: '100%', height: '52px', paddingLeft: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9375rem' }}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Phone Number</label>
            <input
              type="text"
              name="phone"
              className="form-input"
              style={{ width: '100%', height: '52px', paddingLeft: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9375rem' }}
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Password</label>
            <input
              type="password"
              name="password"
              required
              className="form-input"
              style={{ width: '100%', height: '52px', paddingLeft: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9375rem' }}
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Confirm Password</label>
            <input
              type="password"
              name="password_confirm"
              required
              className="form-input"
              style={{ width: '100%', height: '52px', paddingLeft: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9375rem' }}
              value={formData.password_confirm}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="aegis-btn aegis-btn-primary"
            disabled={loading}
            style={{ width: '100%', height: '52px', justifyContent: 'center', marginTop: '0.75rem', borderRadius: '12px', fontWeight: 800, fontSize: '0.9375rem' }}
          >
            <UserPlus size={20} />
            <span>{loading ? 'Creating Account...' : 'Register Account'}</span>
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9375rem', color: '#64748b' }}>
          Already have an account? <Link to="/login" style={{ color: '#0f4c81', fontWeight: 800 }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
