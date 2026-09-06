import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../services/dashboardService';
import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import { Calendar, Users, FileText, Clock, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
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

  if (loading) return <div style={{ color: '#94a3b8' }}>Loading Doctor Dashboard...</div>;

  const metrics = data?.metrics || {};
  const todayAppts = data?.today_appointments || [];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Doctor Portal</h1>
          <p className="page-subtitle">Schedule overview, patient consultations, and clinical entries</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Today's Consultations"
          value={metrics.today_appointments_count || 0}
          icon={Clock}
          color="#3b82f6"
        />
        <StatCard
          title="Upcoming Appointments"
          value={metrics.upcoming_appointments_count || 0}
          icon={Calendar}
          color="#06b6d4"
        />
        <StatCard
          title="Patients Treated"
          value={metrics.total_patients_treated || 0}
          icon={Users}
          color="#10b981"
        />
        <StatCard
          title="Medical Records Created"
          value={metrics.records_created || 0}
          icon={FileText}
          color="#8b5cf6"
        />
      </div>

      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Today's Scheduled Appointments</h3>
          <Link to="/doctor/appointments" style={{ fontSize: '0.85rem', color: '#3b82f6', fontWeight: 600 }}>Manage Schedule</Link>
        </div>

        {todayAppts.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No appointments scheduled for today.</p>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {todayAppts.map((appt) => (
                  <tr key={appt.id}>
                    <td style={{ fontWeight: 600 }}>{appt.patient_name}</td>
                    <td>{appt.time}</td>
                    <td>{appt.reason || 'General'}</td>
                    <td><Badge status={appt.status} /></td>
                    <td>
                      <Link to="/doctor/medical-records" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                        <Stethoscope size={14} /> Consult
                      </Link>
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

export default DoctorDashboard;
