import React from 'react';
import { Phone, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopContactBar = () => {
  return (
    <div style={{
      background: 'linear-gradient(90deg, #0f4c81 0%, #092e54 100%)',
      color: '#ffffff',
      fontSize: '0.875rem',
      fontWeight: 600,
      padding: '0.75rem 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={16} color="#38bdf8" /> Emergency Care: <strong style={{ color: '#38bdf8' }}>24/7 Available</strong>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Phone size={16} color="#38bdf8" /> Helpline: <strong>+91 040 4488 5000</strong>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/book-appointment" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', fontWeight: 700 }}>
            <Calendar size={15} color="#fb7185" />
            <span>Online Appointment Desk</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopContactBar;
