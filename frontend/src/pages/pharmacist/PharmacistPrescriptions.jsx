import React, { useEffect, useState } from 'react';
import { prescriptionService } from '../../services/prescriptionService';
import Badge from '../../components/Badge';
import { Pill, CheckCircle2, AlertTriangle } from 'lucide-react';

const PharmacistPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const res = await prescriptionService.getAll();
      setPrescriptions(res.results || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDispense = async (id) => {
    try {
      await prescriptionService.dispense(id);
      alert('Prescription successfully dispensed! Medicine stock deducted.');
      fetchPrescriptions();
    } catch (err) {
      const msg = err.response?.data?.detail || 'Dispensing failed due to stock error.';
      alert(msg);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Prescription Dispensing Console</h1>
          <p className="page-subtitle">Verify prescriptions and dispense medicines with automatic stock deduction</p>
        </div>
      </div>

      <div className="glass-card">
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading prescriptions...</div>
        ) : prescriptions.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No prescriptions in queue.</p>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Prescription #</th>
                  <th>Patient Name</th>
                  <th>Doctor</th>
                  <th>Issued Date</th>
                  <th>Status</th>
                  <th>Items & Quantities</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((presc) => (
                  <tr key={presc.id}>
                    <td style={{ fontWeight: 700, color: '#3b82f6' }}>#{presc.id}</td>
                    <td style={{ fontWeight: 600 }}>{presc.patient_detail?.user?.full_name || 'Patient'}</td>
                    <td>Dr. {presc.doctor_detail?.user?.full_name || 'Doctor'}</td>
                    <td>{presc.issued_date}</td>
                    <td><Badge status={presc.status} /></td>
                    <td style={{ fontSize: '0.85rem' }}>
                      {(presc.items || []).map(i => `${i.medicine_detail?.name || 'Med'} (${i.quantity} pcs)`).join(', ')}
                    </td>
                    <td>
                      {presc.status === 'PENDING' ? (
                        <button
                          onClick={() => handleDispense(presc.id)}
                          className="btn btn-emerald"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                        >
                          <Pill size={14} /> Dispense & Deduct Stock
                        </button>
                      ) : (
                        <span style={{ color: '#6ee7b7', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <CheckCircle2 size={16} /> Dispensed
                        </span>
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

export default PharmacistPrescriptions;
