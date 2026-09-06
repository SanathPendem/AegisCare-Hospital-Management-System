import React, { useEffect, useState } from 'react';
import { medicalRecordService } from '../../services/medicalRecordService';
import { FileText, Calendar, Stethoscope } from 'lucide-react';

const PatientMedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await medicalRecordService.getAll();
      setRecords(res.results || res);
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
          <h1 className="page-title">Medical Records History</h1>
          <p className="page-subtitle">Your clinical consultation notes, diagnoses, and treatment plans</p>
        </div>
      </div>

      {loading ? (
        <div style={{ color: '#94a3b8' }}>Loading records...</div>
      ) : records.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
          No medical records found on file.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {records.map((rec) => (
            <div key={rec.id} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Stethoscope size={18} color="#3b82f6" />
                  <span style={{ fontWeight: 700, fontSize: '1rem' }}>
                    {rec.doctor_detail ? `Dr. ${rec.doctor_detail.user.full_name}` : 'Doctor'}
                  </span>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>({rec.doctor_detail?.specialization})</span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Calendar size={14} /> {rec.visit_date}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Symptoms</h4>
                  <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>{rec.symptoms}</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.8rem', color: '#3b82f6', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Diagnosis</h4>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc' }}>{rec.diagnosis}</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.8rem', color: '#10b981', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Treatment Plan</h4>
                  <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>{rec.treatment_plan}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientMedicalRecords;
