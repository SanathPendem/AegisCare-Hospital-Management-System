import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import { Bed, Plus, CheckCircle2, UserCheck, UserMinus } from 'lucide-react';

const AdminBeds = () => {
  const [wards, setWards] = useState([]);
  const [beds, setBeds] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const wRes = await api.get('/beds/wards/');
      const bRes = await api.get('/beds/beds/');
      const aRes = await api.get('/beds/admissions/');
      setWards(wRes.data.results || wRes.data);
      setBeds(bRes.data.results || bRes.data);
      setAdmissions(aRes.data.results || aRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDischarge = async (id) => {
    try {
      await api.post(`/beds/admissions/${id}/discharge/`);
      alert('Patient discharged! Bed status reset to AVAILABLE.');
      fetchData();
    } catch (err) {
      alert('Discharge failed.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Inpatient Ward & Bed Management</h1>
          <p className="page-subtitle">Track hospital bed occupancy, ICU allocations, daily rates, and patient admissions</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {wards.map((w) => (
          <div key={w.id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{w.name}</h3>
              <span style={{ fontSize: '0.8rem', color: '#059669', background: '#d1fae5', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: 700 }}>
                ${w.daily_rate}/day
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem' }}>Location: {w.floor}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600 }}>
              <span>Total Capacity: {w.total_beds} beds</span>
              <span style={{ color: '#2563eb' }}>Available: {w.available_beds} beds</span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card">
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>Active Patient Inpatient Admissions</h3>
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading bed occupancy...</div>
        ) : admissions.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No patients currently admitted.</p>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Ward & Bed #</th>
                  <th>Admitted Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {admissions.map((adm) => (
                  <tr key={adm.id}>
                    <td style={{ fontWeight: 600 }}>{adm.patient_detail?.user?.full_name || 'Patient'}</td>
                    <td style={{ fontWeight: 700, color: '#0284c7' }}>
                      {adm.bed_detail?.ward_name} ({adm.bed_detail?.bed_number})
                    </td>
                    <td>{new Date(adm.admitted_at).toLocaleDateString()}</td>
                    <td>{adm.reason || '-'}</td>
                    <td><Badge status={adm.status === 'ADMITTED' ? 'PENDING' : 'CONFIRMED'} /></td>
                    <td>
                      {adm.status === 'ADMITTED' ? (
                        <button onClick={() => handleDischarge(adm.id)} className="btn btn-emerald" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                          <UserMinus size={14} /> Discharge Patient
                        </button>
                      ) : (
                        <span style={{ color: '#059669', fontSize: '0.85rem' }}>Discharged</span>
                      )}
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

export default AdminBeds;
