import React, { useEffect, useState } from 'react';
import { appointmentService } from '../../services/appointmentService';
import Badge from '../../components/Badge';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
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

  const handleConfirm = async (id) => {
    try {
      await appointmentService.confirm(id);
      fetchAppointments();
    } catch (err) {
      alert('Failed to confirm appointment');
    }
  };

  const handleCancel = async (id) => {
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
          <h1 className="page-title">Doctor Appointment Queue</h1>
          <p className="page-subtitle">Confirm, manage, or review patient consultation appointments</p>
        </div>
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
                  <th>Patient Name</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td style={{ fontWeight: 600 }}>{appt.patient_detail?.user?.full_name || 'Patient'}</td>
                    <td>{appt.appointment_date}</td>
                    <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} color="#3b82f6" /> {appt.time_slot}</span></td>
                    <td>{appt.reason || '-'}</td>
                    <td><Badge status={appt.status} /></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {appt.status === 'PENDING' && (
                          <button onClick={() => handleConfirm(appt.id)} className="btn btn-emerald" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                            <CheckCircle2 size={14} /> Confirm
                          </button>
                        )}
                        {['PENDING', 'CONFIRMED'].includes(appt.status) && (
                          <button onClick={() => handleCancel(appt.id)} className="btn btn-danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                            <XCircle size={14} /> Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
