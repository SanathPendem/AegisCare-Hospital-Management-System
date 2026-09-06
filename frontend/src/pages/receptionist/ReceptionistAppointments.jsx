import React, { useEffect, useState } from 'react';
import { appointmentService } from '../../services/appointmentService';
import { patientService } from '../../services/patientService';
import { doctorService } from '../../services/doctorService';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import { Plus, Calendar, Clock, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

const ReceptionistAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    appointment_date: new Date().toISOString().split('T')[0],
    time_slot: '10:00',
    reason: ''
  });

  useEffect(() => {
    fetchAppointments();
    fetchDropdowns();
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

  const fetchDropdowns = async () => {
    try {
      const pRes = await patientService.getAll();
      const dRes = await doctorService.getAll();
      const pList = pRes.results || pRes;
      const dList = dRes.results || dRes;
      setPatients(pList);
      setDoctors(dList);
      if (pList.length > 0) setFormData(prev => ({ ...prev, patient: pList[0].id }));
      if (dList.length > 0) setFormData(prev => ({ ...prev, doctor: dList[0].id }));
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

  const handleConfirm = async (id) => {
    try {
      await appointmentService.confirm(id);
      fetchAppointments();
    } catch (err) {
      alert('Failed to confirm appointment');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Appointment Desk</h1>
          <p className="page-subtitle">Schedule appointments for patients and check-in status</p>
        </div>
        <button onClick={() => { setErrorMsg(''); setIsModalOpen(true); }} className="btn btn-primary">
          <Plus size={18} />
          <span>Book Appointment</span>
        </button>
      </div>

      <div className="glass-card">
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading schedule...</div>
        ) : appointments.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No appointments scheduled.</p>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td style={{ fontWeight: 600 }}>{appt.patient_detail?.user?.full_name || 'Patient'}</td>
                    <td>Dr. {appt.doctor_detail?.user?.full_name || 'Doctor'}</td>
                    <td>{appt.appointment_date}</td>
                    <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} color="#3b82f6" /> {appt.time_slot}</span></td>
                    <td>{appt.reason || '-'}</td>
                    <td><Badge status={appt.status} /></td>
                    <td>
                      {appt.status === 'PENDING' && (
                        <button onClick={() => handleConfirm(appt.id)} className="btn btn-emerald" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                          <CheckCircle2 size={14} /> Confirm
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Book Doctor Appointment">
        {errorMsg && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={18} color="#ef4444" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleBook}>
          <div className="form-group">
            <label className="form-label">Select Patient</label>
            <select className="form-select" required value={formData.patient} onChange={(e) => setFormData({ ...formData, patient: e.target.value })}>
              {patients.map((pat) => (
                <option key={pat.id} value={pat.id}>{pat.user?.full_name} ({pat.user?.email})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Select Doctor</label>
            <select className="form-select" required value={formData.doctor} onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>Dr. {doc.user?.full_name} ({doc.specialization})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Appointment Date</label>
              <input type="date" required className="form-input" min={new Date().toISOString().split('T')[0]} value={formData.appointment_date} onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Time Slot</label>
              <select className="form-select" value={formData.time_slot} onChange={(e) => setFormData({ ...formData, time_slot: e.target.value })}>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Reason for Visit</label>
            <textarea className="form-textarea" rows={2} value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            Book & Schedule Appointment
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ReceptionistAppointments;
