import React, { useState, useEffect } from 'react';
import { doctorService } from '../../services/doctorService';
import { appointmentService } from '../../services/appointmentService';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

const QuickBookingBar = () => {
  const [doctors, setDoctors] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    location: 'Metro City Center',
    department: 'Cardiology',
    doctor: '',
    appointment_date: new Date().toISOString().split('T')[0],
    time_slot: '10:00',
    email: '',
    phone: '',
    reason: 'Quick Website Booking'
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await doctorService.getAll();
      const docs = res.results || res;
      setDoctors(docs);
      if (docs.length > 0) {
        setFormData(prev => ({ ...prev, doctor: docs[0].id }));
      }
    } catch (err) {
      console.error('Error loading doctors:', err);
    } finally {
      setLoadingDocs(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const payload = {
        doctor: formData.doctor,
        appointment_date: formData.appointment_date,
        time_slot: formData.time_slot,
        reason: `${formData.reason} (Location: ${formData.location}, Phone: ${formData.phone}, Email: ${formData.email})`
      };

      await appointmentService.create(payload);
      setSuccessMsg('Appointment booked successfully! Our reception team will call to confirm.');
      setFormData(prev => ({ ...prev, email: '', phone: '' }));
    } catch (err) {
      const msg = err.response?.data?.time_slot?.[0] || err.response?.data?.non_field_errors?.[0] || 'Appointment booking failed. Please try another time slot.';
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(90deg, #0f4c81 0%, #0284c7 100%)',
      padding: '1.75rem 0',
      boxShadow: '0 8px 30px rgba(15, 76, 129, 0.25)',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container">
        <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
          BOOK AN APPOINTMENT
        </h3>

        {successMsg && (
          <div style={{ background: '#d1fae5', color: '#047857', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} /> {successMsg}
          </div>
        )}

        {errorMsg && (
          <div style={{ background: '#ffe4e6', color: '#be123c', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={18} /> {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          alignItems: 'center'
        }}>
          {/* Location */}
          <select
            className="form-select"
            style={{ height: '48px', padding: '0 1rem', fontSize: '0.9rem', borderRadius: '10px' }}
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          >
            <option value="Metro City Center">Metro Hospital Campus</option>
            <option value="Jubilee Specialty Clinic">Specialty Care Unit</option>
            <option value="West End Medical Pavilion">West Pavilion</option>
          </select>

          {/* Department */}
          <select
            className="form-select"
            style={{ height: '48px', padding: '0 1rem', fontSize: '0.9rem', borderRadius: '10px' }}
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          >
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="General Medicine">General Medicine</option>
          </select>

          {/* Doctor */}
          <select
            className="form-select"
            style={{ height: '48px', padding: '0 1rem', fontSize: '0.9rem', borderRadius: '10px' }}
            required
            value={formData.doctor}
            onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
          >
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                Dr. {doc.user?.full_name} ({doc.specialization})
              </option>
            ))}
          </select>

          {/* Date */}
          <input
            type="date"
            required
            className="form-input"
            style={{ height: '48px', padding: '0 1rem', fontSize: '0.9rem', borderRadius: '10px' }}
            min={new Date().toISOString().split('T')[0]}
            value={formData.appointment_date}
            onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
          />

          {/* Email */}
          <input
            type="email"
            required
            className="form-input"
            style={{ height: '48px', padding: '0 1rem', fontSize: '0.9rem', borderRadius: '10px' }}
            placeholder="Email ID"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          {/* Phone */}
          <input
            type="tel"
            required
            className="form-input"
            style={{ height: '48px', padding: '0 1rem', fontSize: '0.9rem', borderRadius: '10px' }}
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-crimson"
            disabled={submitting}
            style={{ height: '48px', padding: '0 1.5rem', whiteSpace: 'nowrap', width: '100%', justifyContent: 'center', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 800 }}
          >
            {submitting ? 'BOOKING...' : 'BOOK NOW'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuickBookingBar;
