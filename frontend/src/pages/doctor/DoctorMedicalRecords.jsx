import React, { useEffect, useState } from 'react';
import { medicalRecordService } from '../../services/medicalRecordService';
import { patientService } from '../../services/patientService';
import Modal from '../../components/Modal';
import { Plus, FileText, Stethoscope } from 'lucide-react';

const DoctorMedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    patient: '',
    symptoms: '',
    diagnosis: '',
    treatment_plan: ''
  });

  useEffect(() => {
    fetchRecords();
    fetchPatients();
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

  const fetchPatients = async () => {
    try {
      const res = await patientService.getAll();
      const list = res.results || res;
      setPatients(list);
      if (list.length > 0) {
        setFormData(prev => ({ ...prev, patient: list[0].id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await medicalRecordService.create(formData);
      setIsModalOpen(false);
      fetchRecords();
    } catch (err) {
      alert('Failed to save medical record.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Clinical Medical Records</h1>
          <p className="page-subtitle">Document patient consultation diagnoses and treatment plans</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <Plus size={18} />
          <span>New Medical Record</span>
        </button>
      </div>

      <div className="glass-card">
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading clinical records...</div>
        ) : records.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No medical records entries on file.</p>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Visit Date</th>
                  <th>Symptoms</th>
                  <th>Diagnosis</th>
                  <th>Treatment Plan</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec) => (
                  <tr key={rec.id}>
                    <td style={{ fontWeight: 600 }}>{rec.patient_detail?.user?.full_name || 'Patient'}</td>
                    <td>{rec.visit_date}</td>
                    <td>{rec.symptoms}</td>
                    <td style={{ color: '#3b82f6', fontWeight: 600 }}>{rec.diagnosis}</td>
                    <td style={{ color: '#10b981' }}>{rec.treatment_plan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Patient Medical Record">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Select Patient</label>
            <select
              className="form-select"
              required
              value={formData.patient}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
            >
              {patients.map((pat) => (
                <option key={pat.id} value={pat.id}>
                  {pat.user?.full_name} ({pat.user?.email})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Presented Symptoms</label>
            <textarea
              className="form-textarea"
              rows={2}
              required
              placeholder="e.g. Fever, persistent cough for 3 days..."
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Clinical Diagnosis</label>
            <textarea
              className="form-textarea"
              rows={2}
              required
              placeholder="e.g. Acute Bronchitis"
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Treatment Plan & Recommendations</label>
            <textarea
              className="form-textarea"
              rows={3}
              required
              placeholder="Prescription details, follow up instructions..."
              value={formData.treatment_plan}
              onChange={(e) => setFormData({ ...formData, treatment_plan: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            Save Medical Record
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default DoctorMedicalRecords;
