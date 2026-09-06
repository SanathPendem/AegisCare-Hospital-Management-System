import React, { useState } from 'react';
import { X, User, Phone, Mail, Droplets, MapPin, Calendar, FileText, Pill, CreditCard, ShieldCheck } from 'lucide-react';

export default function PatientDrawer({ patient, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !patient) return null;

  const fullName = patient.user?.full_name || `${patient.user?.first_name || ''} ${patient.user?.last_name || ''}` || 'Patient EMR Profile';

  return (
    <div className="aegis-drawer-overlay" onClick={onClose}>
      <div className="aegis-drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-slate-900 text-white p-8 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-sky-700 text-white font-black text-xl flex items-center justify-center border-2 border-white/20 shadow-md">
              {(fullName[0] || 'P').toUpperCase()}
            </div>
            <div>
              <h3 className="font-extrabold text-xl leading-tight text-white">{fullName}</h3>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-xs text-sky-400 font-mono">#PAT-{patient.id || '1024'}</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] text-emerald-400 font-bold uppercase">Active EMR</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2.5 rounded-xl hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-8 text-xs font-bold text-slate-600 gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-5 border-b-2 font-bold transition ${activeTab === 'overview' ? 'border-sky-700 text-sky-800 bg-white' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('records')}
            className={`py-4 px-5 border-b-2 font-bold transition ${activeTab === 'records' ? 'border-sky-700 text-sky-800 bg-white' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
          >
            Medical Records
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`py-4 px-5 border-b-2 font-bold transition ${activeTab === 'appointments' ? 'border-sky-700 text-sky-800 bg-white' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`py-4 px-5 border-b-2 font-bold transition ${activeTab === 'prescriptions' ? 'border-sky-700 text-sky-800 bg-white' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
          >
            Prescriptions
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-8 overflow-y-auto flex-1 space-y-8">
          {activeTab === 'overview' && (
            <>
              {/* Demographics Grid */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-5">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-2">
                  <User size={14} className="text-sky-700" />
                  Demographics & Contact
                </h4>
                <div className="grid grid-cols-2 gap-6 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold mb-1">Email Address</span>
                    <span className="font-bold text-sky-800 truncate block">{patient.user?.email || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold mb-1">Phone Number</span>
                    <span className="font-bold text-slate-800 block">{patient.user?.phone || '+91 98765 43210'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold mb-1">Gender</span>
                    <span className="font-bold text-slate-800 block">{patient.gender || 'MALE'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold mb-1">Blood Group</span>
                    <span className="font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200 inline-block">{patient.blood_group || 'O+'}</span>
                  </div>
                </div>
              </div>

              {/* Emergency Contact & Address */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-sm">Emergency Info & Address</h4>
                <div className="p-5 bg-white rounded-2xl border border-slate-200 text-xs space-y-4 shadow-sm">
                  <div className="flex items-center text-slate-700">
                    <ShieldCheck size={16} className="text-emerald-600 mr-3 shrink-0" />
                    <span>Emergency Contact: <strong className="ml-1 text-slate-900">{patient.emergency_contact_phone || '+91 98765 12345'}</strong></span>
                  </div>
                  <div className="flex items-start text-slate-700">
                    <MapPin size={16} className="text-sky-600 mr-3 shrink-0 mt-0.5" />
                    <span>{patient.address || 'Cyber Hills, Gachibowli, Hyderabad'}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'records' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">Clinical EMR Records</h4>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-3">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>General Cardiology OPD</span>
                  <span className="text-slate-400 font-mono">2026-09-01</span>
                </div>
                <p className="text-slate-600">Diagnosis: Primary Hypertension. Normal ECG report attached.</p>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">Appointment History</h4>
              <div className="p-5 bg-white rounded-2xl border border-slate-200 text-xs flex items-center justify-between shadow-sm">
                <div>
                  <strong className="text-slate-900 block text-sm">Dr. Sarah Jenkins</strong>
                  <span className="text-slate-500">Cardiology • Scheduled for Sep 10, 2026</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-3 py-1 rounded-full text-[11px]">
                  CONFIRMED
                </span>
              </div>
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">Active Prescriptions</h4>
              <div className="p-5 bg-white rounded-2xl border border-slate-200 text-xs space-y-2 shadow-sm">
                <strong className="text-slate-900 block text-sm">Amlodipine 5mg (Oral Tablet)</strong>
                <p className="text-slate-500">Dosage: 1 Tablet daily after breakfast for 30 days.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="aegis-btn aegis-btn-secondary"
          >
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
}
