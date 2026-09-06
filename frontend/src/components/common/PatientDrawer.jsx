import React, { useState } from 'react';
import { X, User, Phone, Mail, Droplets, MapPin, Calendar, FileText, Pill, CreditCard, Shield } from 'lucide-react';

export default function PatientDrawer({ patient, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !patient) return null;

  const fullName = patient.user?.full_name || `${patient.user?.first_name || ''} ${patient.user?.last_name || ''}` || 'Patient Profile';

  return (
    <div className="drawer-overlay">
      <div className="drawer-content">
        {/* Header */}
        <div className="bg-sky-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-sky-700 text-white font-bold text-lg flex items-center justify-center border-2 border-white/30">
              {fullName[0]}
            </div>
            <div>
              <h3 className="font-extrabold text-lg">{fullName}</h3>
              <p className="text-xs text-sky-200">Patient ID: #PAT-{patient.id || '101'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 transition ${activeTab === 'overview' ? 'border-sky-700 text-sky-800 bg-white' : 'border-transparent hover:text-slate-900'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('records')}
            className={`py-3 px-4 border-b-2 transition ${activeTab === 'records' ? 'border-sky-700 text-sky-800 bg-white' : 'border-transparent hover:text-slate-900'}`}
          >
            Medical Records
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`py-3 px-4 border-b-2 transition ${activeTab === 'appointments' ? 'border-sky-700 text-sky-800 bg-white' : 'border-transparent hover:text-slate-900'}`}
          >
            Appointments
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Personal Info Grid */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3 text-xs">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Demographics</h4>
                <div className="grid grid-cols-2 gap-3 text-slate-700">
                  <div className="flex items-center">
                    <Mail size={14} className="text-sky-600 mr-2 shrink-0" />
                    <span className="truncate">{patient.user?.email || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={14} className="text-sky-600 mr-2 shrink-0" />
                    <span>{patient.user?.phone || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={14} className="text-sky-600 mr-2 shrink-0" />
                    <span>Gender: {patient.gender || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <Droplets size={14} className="text-rose-600 mr-2 shrink-0" />
                    <span className="font-bold text-rose-700">Blood: {patient.blood_group || 'O+'}</span>
                  </div>
                </div>
              </div>

              {/* Emergency Contact & Address */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Emergency Info & Address</h4>
                <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
                  <p className="flex items-center text-slate-700">
                    <Shield size={14} className="text-emerald-600 mr-2" />
                    Emergency Contact: <strong className="ml-1 text-slate-900">{patient.emergency_contact_phone || '+91 98765 43210'}</strong>
                  </p>
                  <p className="flex items-start text-slate-700">
                    <MapPin size={14} className="text-sky-600 mr-2 shrink-0 mt-0.5" />
                    <span>{patient.address || 'Cyber Hills, Hyderabad'}</span>
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'records' && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Clinical Notes & Diagnostics</h4>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>General OPD Consultation</span>
                  <span className="text-slate-400">2026-09-01</span>
                </div>
                <p className="text-slate-600">Diagnosis: Routine Hypertension Screening. Prescribed Amlodipine 5mg.</p>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Appointment History</h4>
              <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <strong className="text-slate-900">Dr. Sarah Jenkins (Cardiology)</strong>
                  <p className="text-slate-500">Scheduled: 2026-09-10 (10:30 AM)</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                  CONFIRMED
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
          >
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
}
