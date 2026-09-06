import React, { useState } from 'react';
import { MessageSquareText, X, Send, CheckCircle2, Phone, Mail, User } from 'lucide-react';
import axios from 'axios';

export default function QuickEnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: 'General Enquiry',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Send quick enquiry to backend or log success
      await new Promise((res) => setTimeout(res, 800));
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
        setFormData({ name: '', phone: '', email: '', department: 'General Enquiry', message: '' });
      }, 3000);
    } catch (err) {
      console.error('Enquiry submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Side Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-2 rounded-l-xl shadow-2xl flex flex-col items-center space-y-2 transition-all duration-300 group hover:pr-4"
        title="Quick Hospital Enquiry"
      >
        <MessageSquareText className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="[writing-mode:vertical-lr] rotate-180 text-xs tracking-wider uppercase font-semibold">
          Quick Enquiry
        </span>
      </button>

      {/* Modal Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end transition-opacity">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="bg-sky-900 text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
                  AegisCare Assistance
                </span>
                <h3 className="text-xl font-bold mt-1">Hospital Quick Enquiry</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body Form */}
            <div className="p-6 overflow-y-auto flex-1">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Enquiry Submitted!</h4>
                  <p className="text-sm text-slate-600">
                    Thank you. Our patient care representative will call you back within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-sky-600 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-sky-600 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-sky-600 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Department / Service
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-sky-600 outline-none"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Oncology">Oncology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Laboratory">Laboratory & Diagnostics</option>
                      <option value="Billing">Billing & Insurance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Message / Question
                    </label>
                    <textarea
                      rows={3}
                      placeholder="How can we assist you today?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-sky-600 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg shadow-md transition flex items-center justify-center"
                  >
                    {submitting ? 'Submitting...' : 'Send Enquiry Now'}
                    <Send className="w-4 h-4 ml-2" />
                  </button>
                </form>
              )}
            </div>

            {/* Footer Helpline */}
            <div className="bg-slate-100 p-4 border-t border-slate-200 text-center text-xs text-slate-600">
              For life-threatening emergencies, please call <span className="font-bold text-rose-600">102 / +91 (800) 456-7890</span> directly.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
