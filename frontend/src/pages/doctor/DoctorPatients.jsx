import React, { useEffect, useState } from 'react';
import { patientService } from '../../services/patientService';
import { Users, Search, Heart, User } from 'lucide-react';

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, [search]);

  const fetchPatients = async () => {
    try {
      const res = await patientService.getAll({ search });
      setPatients(res.results || res);
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
          <h1 className="page-title">Patient Directory</h1>
          <p className="page-subtitle">Search registered patients, view medical history and blood group details</p>
        </div>
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem', width: '100%' }}
            placeholder="Search patient name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-card">
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading directory...</div>
        ) : patients.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No patients found.</p>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Blood Group</th>
                  <th>Emergency Contact</th>
                  <th>Medical History</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((pat) => (
                  <tr key={pat.id}>
                    <td style={{ fontWeight: 600 }}>{pat.user?.full_name || 'Patient'}</td>
                    <td style={{ color: '#94a3b8' }}>{pat.user?.email}</td>
                    <td>{pat.gender}</td>
                    <td><span className="badge badge-completed">{pat.blood_group}</span></td>
                    <td>{pat.emergency_contact_phone || '-'}</td>
                    <td style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{pat.medical_history || 'No record'}</td>
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

export default DoctorPatients;
