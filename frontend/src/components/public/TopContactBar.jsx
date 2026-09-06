import React from 'react';
import { Phone, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopContactBar = () => {
  return (
    <div style={{
      background: 'linear-gradient(90deg, #0f4c81 0%, #092e54 100%)',
      color: '#ffffff',
      fontSize: '0.8rem',
      fontWeight: 600,
      padding: '0.45rem 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={14} color="#38bdf8" /> Emergency Care: <strong>24/7 Available</strong>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Phone size={14} color="#38bdf8" /> Helpline: <strong>+91 040 4488 5000</strong>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Link to="/book-appointment" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#f8fafc' }}>
            <Calendar size={13} color="#e11d48" /> Press Here to Book an Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopContactBar;
