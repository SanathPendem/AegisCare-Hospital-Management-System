import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../services/dashboardService';
import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import { Users, Stethoscope, Calendar, DollarSign, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
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

  if (loading) return <div style={{ color: '#94a3b8' }}>Loading Admin Dashboard...</div>;

  const metrics = data?.metrics || {};
  const recentAppts = data?.recent_appointments || [];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Hospital Administration</h1>
          <p className="page-subtitle">System-wide metrics, user role permissions, financial revenue, and inventory alerts</p>
        </div>
        <Link to="/admin/reports" className="btn btn-primary">
          <span>View Analytics & Reports</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Registered Patients"
          value={metrics.total_patients || 0}
          icon={Users}
          color="#3b82f6"
        />
        <StatCard
          title="Active Doctors"
          value={metrics.total_doctors || 0}
          icon={Stethoscope}
          color="#06b6d4"
        />
        <StatCard
          title="Total Appointments"
          value={metrics.total_appointments || 0}
          icon={Calendar}
          color="#8b5cf6"
        />
        <StatCard
          title="Total Revenue (Paid)"
          value={`$${metrics.total_revenue || 0}`}
          icon={DollarSign}
          color="#10b981"
        />
        <StatCard
          title="Low Stock Items"
          value={metrics.low_stock_count || 0}
          icon={AlertTriangle}
          color="#f59e0b"
        />
      </div>

      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Recent System Activity Log</h3>
          <Link to="/admin/appointments" style={{ fontSize: '0.85rem', color: '#3b82f6', fontWeight: 600 }}>All Appointments</Link>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Appointment #</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAppts.map((appt) => (
                <tr key={appt.id}>
                  <td style={{ fontWeight: 700, color: '#06b6d4' }}>#{appt.id}</td>
                  <td style={{ fontWeight: 600 }}>{appt.patient_name}</td>
                  <td>{appt.doctor_name}</td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td><Badge status={appt.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
