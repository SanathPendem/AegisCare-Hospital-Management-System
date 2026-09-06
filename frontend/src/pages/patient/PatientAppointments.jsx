import React, { useEffect, useState } from 'react';
import { appointmentService } from '../../services/appointmentService';
import { doctorService } from '../../services/doctorService';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import { Plus, Calendar, Clock, XCircle, AlertTriangle } from 'lucide-react';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    doctor: '',
    appointment_date: new Date().toISOString().split('T')[0],
    time_slot: '10:00',
    reason: ''
  });

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await appointmentService.getAll();
      setAppointments(res.results || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await doctorService.getAll();
      const docs = res.results || res;
      setDoctors(docs);
      if (docs.length > 0) {
        setFormData(prev => ({ ...prev, doctor: docs[0].id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await appointmentService.create(formData);
      setIsModalOpen(false);
      fetchAppointments();
    } catch (err) {
      const msg = err.response?.data?.time_slot?.[0] || err.response?.data?.non_field_errors?.[0] || 'Failed to book appointment.';
      setErrorMsg(msg);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      await appointmentService.cancel(id);
      fetchAppointments();
    } catch (err) {
      alert('Failed to cancel appointment');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">My Appointments</h1>
          <p className="page-subtitle">Schedule, view, or manage your doctor consultations</p>
        </div>
        <button onClick={() => { setErrorMsg(''); setIsModalOpen(true); }} className="btn btn-primary">
          <Plus size={18} />
          <span>Book New Appointment</span>
        </button>
      </div>

      <div className="glass-card">
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading appointments...</div>
        ) : appointments.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No appointments booked yet.</p>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td style={{ fontWeight: 600 }}>{appt.doctor_detail ? `Dr. ${appt.doctor_detail.user.full_name}` : `Doctor #${appt.doctor}`}</td>
                    <td>{appt.doctor_detail?.department || '-'}</td>
                    <td>{appt.appointment_date}</td>
                    <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} color="#3b82f6" /> {appt.time_slot}</span></td>
                    <td>{appt.reason || '-'}</td>
                    <td><Badge status={appt.status} /></td>
                    <td>
                      {['PENDING', 'CONFIRMED'].includes(appt.status) && (
                        <button
                          onClick={() => handleCancel(appt.id)}
                          className="btn btn-danger"
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                        >
                          <XCircle size={14} /> Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Book Appointment Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Book Doctor Appointment">
        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertTriangle size={18} color="#ef4444" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleBook}>
          <div className="form-group">
            <label className="form-label">Select Specialist Doctor</label>
            <select
              className="form-select"
              required
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
            >
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  Dr. {doc.user.full_name} ({doc.specialization} - ${doc.consultation_fee})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Appointment Date</label>
              <input
                type="date"
                required
                className="form-input"
                min={new Date().toISOString().split('T')[0]}
                value={formData.appointment_date}
                onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time Slot</label>
              <select
                className="form-select"
                value={formData.time_slot}
                onChange={(e) => setFormData({ ...formData, time_slot: e.target.value })}
              >
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Reason for Visit</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Describe your symptoms or consultation reason..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            Confirm & Schedule Appointment
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default PatientAppointments;
