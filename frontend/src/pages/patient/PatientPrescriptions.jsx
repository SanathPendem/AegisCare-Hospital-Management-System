import React, { useEffect, useState } from 'react';
import { prescriptionService } from '../../services/prescriptionService';
import Badge from '../../components/Badge';
import { Pill, Calendar, User } from 'lucide-react';

const PatientPrescriptions = () => {
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

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">My Prescriptions</h1>
          <p className="page-subtitle">Prescribed medications, dosage instructions, and dispensing status</p>
        </div>
      </div>

      {loading ? (
        <div style={{ color: '#94a3b8' }}>Loading prescriptions...</div>
      ) : prescriptions.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
          No prescriptions found on file.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {prescriptions.map((presc) => (
            <div key={presc.id} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                    Prescription #{presc.id}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                    Issued by Dr. {presc.doctor_detail?.user?.full_name || 'Doctor'} on {presc.issued_date}
                  </p>
                </div>
                <Badge status={presc.status} />
              </div>

              {presc.notes && (
                <p style={{ fontSize: '0.85rem', color: '#f59e0b', marginBottom: '1rem', fontStyle: 'italic' }}>
                  Doctor's Note: {presc.notes}
                </p>
              )}

              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Dosage</th>
                      <th>Frequency</th>
                      <th>Duration</th>
                      <th>Quantity</th>
                      <th>Instructions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(presc.items || []).map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: 600, color: '#3b82f6' }}>{item.medicine_detail?.name || 'Medicine'}</td>
                        <td>{item.dosage}</td>
                        <td>{item.frequency}</td>
                        <td>{item.duration_days} Days</td>
                        <td>{item.quantity} pcs</td>
                        <td>{item.instructions || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientPrescriptions;
