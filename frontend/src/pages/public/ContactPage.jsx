import React, { useState } from 'react';
import TopContactBar from '../../components/public/TopContactBar';
import MainHeader from '../../components/public/MainHeader';
import PrimaryNav from '../../components/public/PrimaryNav';
import PublicFooter from '../../components/public/PublicFooter';
import QuickEnquiryModal from '../../components/public/QuickEnquiryModal';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      <TopContactBar />
      <MainHeader />
      <PrimaryNav />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/50">
            24/7 Patient Helpdesk
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-3">
            Contact AegisCare Hospitals
          </h1>
          <p className="mt-3 text-slate-200 max-w-2xl text-base">
            Reach out to our emergency triage, OPD desk, international patient division, or customer care representatives.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Col 1 & 2: Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Send Us a Message</h2>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-bold text-emerald-900">Message Delivered Successfully</h4>
                <p className="text-sm text-emerald-700">Our patient relationship executive will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Subject</label>
                    <input
                      type="text"
                      placeholder="Appointment / Billing / General"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about your query..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-lg shadow-md transition flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Col 3: Details */}
          <div className="space-y-6">
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-rose-950">
              <div className="flex items-center space-x-2 text-rose-600 mb-2">
                <ShieldAlert className="w-6 h-6" />
                <h3 className="font-bold text-lg">24/7 Emergency Line</h3>
              </div>
              <p className="text-2xl font-black text-rose-700">+91 (800) 456-7890</p>
              <p className="text-xs text-rose-800 mt-1">For critical trauma, chest pain, stroke, or ambulance dispatch.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 text-sm text-slate-600">
              <h3 className="font-bold text-slate-900 text-base">Hospital Contact Info</h3>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-sky-600 mr-3 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">AegisCare Main Campus</strong>
                  <p>Plot 42, Healthcare City Blvd, Cyber Hills, Hyderabad - 500081</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-sky-600 mr-3 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Helpline Phone</strong>
                  <p>+91 (800) 456-7890 / +91 40 2345 6789</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 text-sky-600 mr-3 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Email Address</strong>
                  <p>contact@aegiscare.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-5 h-5 text-sky-600 mr-3 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">OPD & Visiting Hours</strong>
                  <p>OPD: Mon - Sat (08:00 AM - 08:00 PM)</p>
                  <p>IPD Visiting: 04:00 PM - 07:00 PM Daily</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
      <QuickEnquiryModal />
    </div>
  );
}
