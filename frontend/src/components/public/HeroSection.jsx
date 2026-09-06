import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, ShieldCheck, Award, HeartPulse } from 'lucide-react';

const HeroSection = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #092e54 0%, #0f4c81 50%, #1e3a8a 100%)',
      color: '#ffffff',
      padding: '4.5rem 0 5rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Element */}
      <div style={{
        position: 'absolute',
        right: '-100px',
        top: '-100px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '780px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(10px)',
            padding: '0.4rem 1rem',
            borderRadius: '30px',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <HeartPulse size={18} color="#e11d48" />
            <span>NABH Accredited Multi-Specialty Hospital</span>
          </div>

          <h1 style={{
            fontSize: '3.2rem',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            Advanced Healthcare.<br />
            <span style={{ color: '#38bdf8' }}>Compassionate Care.</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: '#e2e8f0',
            marginBottom: '2.5rem',
            maxWidth: '660px'
          }}>
            Modern medical care powered by experienced board-certified specialists, state-of-the-art diagnostic technology, and patient-first service available 24 hours a day.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/book-appointment" className="btn btn-crimson" style={{ padding: '0.9rem 2rem', fontSize: '0.95rem', borderRadius: '8px' }}>
              <Calendar size={18} />
              <span>BOOK AN APPOINTMENT</span>
            </Link>

            <Link to="/doctors" className="btn btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '0.95rem', borderRadius: '8px', background: 'rgba(255,255,255,0.15)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}>
              <Search size={18} />
              <span>FIND A DOCTOR</span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={26} color="#38bdf8" />
              <div>
                <strong style={{ display: 'block', fontSize: '1rem' }}>24/7 Emergency</strong>
                <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Trauma & Critical Care</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Award size={26} color="#38bdf8" />
              <div>
                <strong style={{ display: 'block', fontSize: '1rem' }}>50+ Specialists</strong>
                <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Across 15 Departments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
