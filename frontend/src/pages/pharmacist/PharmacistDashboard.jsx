import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../services/dashboardService';
import StatCard from '../../components/StatCard';
import { Pill, Package, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PharmacistDashboard = () => {
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

  if (loading) return <div style={{ color: '#94a3b8' }}>Loading Pharmacist Dashboard...</div>;

  const metrics = data?.metrics || {};

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Pharmacy Dashboard</h1>
          <p className="page-subtitle">Prescription queue, inventory alerts, and stock management</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Pending Prescriptions"
          value={metrics.pending_prescriptions || 0}
          icon={Pill}
          color="#f59e0b"
          subtitle="Awaiting dispensing"
        />
        <StatCard
          title="Dispensed Today"
          value={metrics.dispensed_today || 0}
          icon={CheckCircle2}
          color="#10b981"
        />
        <StatCard
          title="Total Medicines"
          value={metrics.total_medicines || 0}
          icon={Package}
          color="#3b82f6"
        />
        <StatCard
          title="Low Stock Items"
          value={metrics.low_stock_medicines || 0}
          icon={AlertTriangle}
          color="#ef4444"
          subtitle="Reorder threshold reached"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Prescription Dispensing Queue</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Review doctor prescriptions and fulfill patient medications.
          </p>
          <Link to="/pharmacist/prescriptions" className="btn btn-primary">
            Open Dispensing Console
          </Link>
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Medicine Stock Inventory</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Manage medicine batches, pricing, reorder levels, and expiry tracking.
          </p>
          <Link to="/pharmacist/inventory" className="btn btn-secondary">
            Manage Inventory Catalog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PharmacistDashboard;
