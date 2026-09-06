import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../services/dashboardService';
import StatCard from '../../components/StatCard';
import { Calendar, Users, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReceptionistDashboard = () => {
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

  if (loading) return <div style={{ color: '#94a3b8' }}>Loading Reception Dashboard...</div>;

  const metrics = data?.metrics || {};

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Reception Desk</h1>
          <p className="page-subtitle">Patient registration desk, check-ins, and doctor schedule booking</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Today's Appointments"
          value={metrics.today_appointments_count || 0}
          icon={Calendar}
          color="#3b82f6"
        />
        <StatCard
          title="Pending Appointments"
          value={metrics.pending_appointments || 0}
          icon={Clock}
          color="#f59e0b"
        />
        <StatCard
          title="Registered Patients"
          value={metrics.total_registered_patients || 0}
          icon={Users}
          color="#10b981"
        />
        <StatCard
          title="Available Doctors"
          value={metrics.available_doctors || 0}
          icon={CheckCircle2}
          color="#06b6d4"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Patient Registration Desk</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Register new walk-in patients or search existing patient profiles.
          </p>
          <Link to="/receptionist/patients" className="btn btn-primary">
            Register & Search Patients
          </Link>
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Appointment Desk</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Schedule patient appointments with available doctors and manage slots.
          </p>
          <Link to="/receptionist/appointments" className="btn btn-secondary">
            Manage Appointments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
