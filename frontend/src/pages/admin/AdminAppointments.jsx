import React, { useEffect, useState } from 'react';
import { appointmentService } from '../../services/appointmentService';
import Badge from '../../components/Badge';
import { Calendar, Clock, Search } from 'lucide-react';

const AdminAppointments = () => {
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

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Master Appointment Schedule</h1>
          <p className="page-subtitle">View all hospital appointment bookings across doctors</p>
        </div>
      </div>

      <div className="glass-card">
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading schedule...</div>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Appointment #</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td style={{ fontWeight: 700, color: '#3b82f6' }}>#{appt.id}</td>
                    <td style={{ fontWeight: 600 }}>{appt.patient_detail?.user?.full_name || 'Patient'}</td>
                    <td>Dr. {appt.doctor_detail?.user?.full_name || 'Doctor'}</td>
                    <td>{appt.appointment_date}</td>
                    <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} color="#3b82f6" /> {appt.time_slot}</span></td>
                    <td><Badge status={appt.status} /></td>
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

export default AdminAppointments;
