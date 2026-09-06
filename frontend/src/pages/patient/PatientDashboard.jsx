import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../services/dashboardService';
import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import { Calendar, Pill, CreditCard, FileText, Clock, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await dashboardService.getSummary();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ color: '#94a3b8' }}>Loading Dashboard...</div>;

  const metrics = data?.metrics || {};
  const appointments = data?.upcoming_appointments || [];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Patient Portal</h1>
          <p className="page-subtitle">Welcome to your health overview and upcoming appointments</p>
        </div>
        <Link to="/patient/appointments" className="btn btn-primary">
          <Plus size={18} />
          <span>Book Appointment</span>
        </Link>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Upcoming Appointments"
          value={metrics.upcoming_appointments_count || 0}
          icon={Calendar}
          color="#3b82f6"
        />
        <StatCard
          title="Pending Prescriptions"
          value={metrics.active_prescriptions_count || 0}
          icon={Pill}
          color="#10b981"
        />
        <StatCard
          title="Unpaid Bills"
          value={metrics.unpaid_bills_count || 0}
          icon={CreditCard}
          color="#f59e0b"
        />
        <StatCard
          title="Medical Records"
          value={metrics.total_medical_records || 0}
          icon={FileText}
          color="#8b5cf6"
        />
      </div>

      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Upcoming Scheduled Appointments</h3>
          <Link to="/patient/appointments" style={{ fontSize: '0.85rem', color: '#3b82f6', fontWeight: 600 }}>View All</Link>
        </div>

        {appointments.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>
            No upcoming appointments. Click "Book Appointment" to schedule one.
          </p>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Specialization</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td style={{ fontWeight: 600 }}>{appt.doctor_name}</td>
                    <td style={{ color: '#94a3b8' }}>{appt.specialization}</td>
                    <td>{appt.date}</td>
                    <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} color="#3b82f6" /> {appt.time}</span></td>
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

export default PatientDashboard;
