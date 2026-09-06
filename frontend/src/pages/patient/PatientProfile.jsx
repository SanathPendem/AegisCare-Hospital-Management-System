import React, { useEffect, useState } from 'react';
import { patientService } from '../../services/patientService';
import { User, Save, CheckCircle2 } from 'lucide-react';

const PatientProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await patientService.getMyProfile();
      setProfile(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSavedSuccess(false);
    try {
      await patientService.updateMyProfile(profile);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert('Failed to update profile.');
    }
  };

  if (loading) return <div style={{ color: '#94a3b8' }}>Loading profile...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Personal Profile</h1>
          <p className="page-subtitle">Manage emergency contacts, blood group, and medical history</p>
        </div>
      </div>

      <div className="glass-card" style={{ maxWidth: '700px' }}>
        {savedSuccess && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#6ee7b7', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} /> Profile changes saved successfully!
          </div>
        )}

        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-input"
                value={profile?.date_of_birth || ''}
                onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={profile?.gender || 'OTHER'}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Blood Group</label>
            <select
              className="form-select"
              value={profile?.blood_group || 'UNKNOWN'}
              onChange={(e) => setProfile({ ...profile, blood_group: e.target.value })}
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="UNKNOWN">Unknown</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Emergency Contact Person</label>
              <input
                type="text"
                className="form-input"
                placeholder="Relative or spouse name"
                value={profile?.emergency_contact_name || ''}
                onChange={(e) => setProfile({ ...profile, emergency_contact_name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Emergency Contact Phone</label>
              <input
                type="text"
                className="form-input"
                placeholder="+1 555 000 0000"
                value={profile?.emergency_contact_phone || ''}
                onChange={(e) => setProfile({ ...profile, emergency_contact_phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Residential Address</label>
            <textarea
              className="form-textarea"
              rows={2}
              value={profile?.address || ''}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Pre-existing Medical History & Allergies</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="List allergies, chronic conditions, or past surgeries..."
              value={profile?.medical_history || ''}
              onChange={(e) => setProfile({ ...profile, medical_history: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <Save size={18} /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientProfile;
