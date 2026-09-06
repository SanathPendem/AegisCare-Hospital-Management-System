import React, { useState } from 'react';
import { Activity, PhoneCall, ChevronDown, CheckCircle2 } from 'lucide-react';
import Modal from '../Modal';

const MainHeader = () => {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', department: 'General' });

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsCallbackOpen(false);
      setFormData({ name: '', phone: '', department: 'General' });
    }, 2000);
  };

  return (
    <div style={{ background: '#ffffff', padding: '1.25rem 0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Brand Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0f4c81 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(15, 76, 129, 0.3)'
          }}>
            <Activity size={28} color="#ffffff" />
          </div>
          <div>
            <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f4c81', letterSpacing: '-0.02em', display: 'block', lineHeight: 1.1 }}>
              AEGISCARE
            </span>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              HEALTHCARE SYSTEM
            </span>
          </div>
        </a>

        {/* Contact & Request Callback */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PhoneCall size={20} color="#0f4c81" />
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Need Help?</p>
              <p style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>+91 040 4488 5000</p>
            </div>
          </div>

          <button
            onClick={() => setIsCallbackOpen(true)}
            className="btn btn-secondary"
            style={{ padding: '0.75rem 1.25rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, borderColor: '#0f4c81', color: '#0f4c81' }}
          >
            <span>Request a Callback</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Callback Modal */}
      <Modal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} title="Request a Medical Callback">
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <CheckCircle2 size={42} color="#059669" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Request Received!</h3>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Our healthcare representative will call you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleCallbackSubmit}>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input type="text" required className="form-input" placeholder="Full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="text" required className="form-input" placeholder="+91 XXX XXX XXXX" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Department of Interest</label>
              <select className="form-select" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })}>
                <option value="General">General Medicine</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              Submit Callback Request
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default MainHeader;
