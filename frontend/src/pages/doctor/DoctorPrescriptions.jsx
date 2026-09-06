import React, { useEffect, useState } from 'react';
import { prescriptionService } from '../../services/prescriptionService';
import { patientService } from '../../services/patientService';
import { medicineService } from '../../services/medicineService';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import { Plus, Pill, Trash2 } from 'lucide-react';

const DoctorPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    patient: '',
    notes: '',
    items: []
  });

  const [currentItem, setCurrentItem] = useState({
    medicine: '',
    dosage: '500mg',
    frequency: '1-0-1',
    duration_days: 7,
    quantity: 10,
    instructions: 'Take after meals'
  });

  useEffect(() => {
    fetchPrescriptions();
    fetchInitialData();
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

  const fetchInitialData = async () => {
    try {
      const pRes = await patientService.getAll();
      const mRes = await medicineService.getAll();
      const pList = pRes.results || pRes;
      const mList = mRes.results || mRes;

      setPatients(pList);
      setMedicines(mList);

      if (pList.length > 0) setFormData(prev => ({ ...prev, patient: pList[0].id }));
      if (mList.length > 0) setCurrentItem(prev => ({ ...prev, medicine: mList[0].id }));
    } catch (err) {
      console.error(err);
    }
  };

  const addItemToPrescription = () => {
    if (!currentItem.medicine) return;
    const medObj = medicines.find(m => m.id == currentItem.medicine);
    setFormData({
      ...formData,
      items: [...formData.items, { ...currentItem, medicine_name: medObj?.name || 'Medicine' }]
    });
  };

  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (formData.items.length === 0) {
      alert('Please add at least one medicine item to the prescription.');
      return;
    }
    try {
      const payload = {
        patient: formData.patient,
        notes: formData.notes,
        items: formData.items.map(({ medicine_name, ...rest }) => rest)
      };
      await prescriptionService.create(payload);
      setIsModalOpen(false);
      setFormData({ patient: patients[0]?.id || '', notes: '', items: [] });
      fetchPrescriptions();
    } catch (err) {
      alert('Failed to issue prescription.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Doctor Prescriptions</h1>
          <p className="page-subtitle">Issue digital prescriptions with detailed medicine dosage & instructions</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <Plus size={18} />
          <span>New Prescription</span>
        </button>
      </div>

      <div className="glass-card">
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading prescriptions...</div>
        ) : prescriptions.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No prescriptions issued.</p>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Prescription #</th>
                  <th>Patient Name</th>
                  <th>Issued Date</th>
                  <th>Status</th>
                  <th>Medicines</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((presc) => (
                  <tr key={presc.id}>
                    <td style={{ fontWeight: 700, color: '#3b82f6' }}>#{presc.id}</td>
                    <td style={{ fontWeight: 600 }}>{presc.patient_detail?.user?.full_name || 'Patient'}</td>
                    <td>{presc.issued_date}</td>
                    <td><Badge status={presc.status} /></td>
                    <td style={{ fontSize: '0.85rem' }}>
                      {(presc.items || []).map(i => i.medicine_detail?.name).join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Issue New Prescription">
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

          <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#3b82f6', marginBottom: '0.75rem' }}>Add Medicine Item</h4>
            
            <div className="form-group">
              <label className="form-label">Medicine</label>
              <select
                className="form-select"
                value={currentItem.medicine}
                onChange={(e) => setCurrentItem({ ...currentItem, medicine: e.target.value })}
              >
                {medicines.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} (Stock: {m.stock_quantity})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
              <div className="form-group">
                <label className="form-label">Dosage</label>
                <input type="text" className="form-input" value={currentItem.dosage} onChange={(e) => setCurrentItem({ ...currentItem, dosage: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Frequency</label>
                <input type="text" className="form-input" value={currentItem.frequency} onChange={(e) => setCurrentItem({ ...currentItem, frequency: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input type="number" className="form-input" value={currentItem.quantity} onChange={(e) => setCurrentItem({ ...currentItem, quantity: parseInt(e.target.value) })} />
              </div>
            </div>

            <button type="button" onClick={addItemToPrescription} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              + Add Item to Prescription
            </button>
          </div>

          {formData.items.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label">Prescription Items List:</label>
              {formData.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.06)', padding: '0.5rem 0.75rem', borderRadius: '6px', marginTop: '0.3rem', fontSize: '0.85rem' }}>
                  <span><strong>{item.medicine_name}</strong> - {item.dosage} ({item.frequency}) x {item.quantity} pcs</span>
                  <button type="button" onClick={() => removeItem(idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Doctor's Special Notes</label>
            <textarea
              className="form-textarea"
              rows={2}
              placeholder="e.g. Take after food, avoid alcohol..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            Submit Prescription
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default DoctorPrescriptions;
