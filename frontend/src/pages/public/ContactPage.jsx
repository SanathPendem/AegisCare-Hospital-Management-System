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
    <div className="public-page bg-slate-50 font-sans text-slate-800 antialiased">
      <TopContactBar />
      <MainHeader />
      <PrimaryNav />

      <main className="main-content">
        {/* Page Hero */}
        <section className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white min-h-[450px] flex items-center py-24 px-6">
          <div className="section-container">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-950/60 px-4 py-2 rounded-full border border-rose-800/50">
              24/7 Patient Helpdesk
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-6 tracking-tight">
              Contact AegisCare Hospitals
            </h1>
            <p className="mt-6 text-slate-200 max-w-3xl text-lg sm:text-xl leading-relaxed">
              Reach out to our emergency triage, OPD appointment desk, international patient division, or customer care representatives.
            </p>
          </div>
        </section>

        {/* Form & Main Info Section */}
        <section className="section bg-white">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Col 1 & 2: Contact Form */}
              <div className="lg:col-span-2 bg-slate-50 rounded-3xl p-10 border border-slate-200 shadow-sm">
                <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Send Us a Message</h2>

                {submitted ? (
                  <div className="p-12 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                    <h4 className="text-2xl font-extrabold text-emerald-900">Message Delivered Successfully</h4>
                    <p className="text-base text-emerald-700">Our patient relationship executive will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="form-group mb-0">
                        <label className="form-label block text-xs font-extrabold text-slate-700 uppercase mb-2 tracking-wider">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Jane Doe"
                          style={{ minHeight: '48px' }}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-600 outline-none transition bg-white shadow-xs"
                        />
                      </div>
                      <div className="form-group mb-0">
                        <label className="form-label block text-xs font-extrabold text-slate-700 uppercase mb-2 tracking-wider">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 040 4488 5000"
                          style={{ minHeight: '48px' }}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-600 outline-none transition bg-white shadow-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="form-group mb-0">
                        <label className="form-label block text-xs font-extrabold text-slate-700 uppercase mb-2 tracking-wider">Email Address</label>
                        <input
                          type="email"
                          placeholder="jane@example.com"
                          style={{ minHeight: '48px' }}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-600 outline-none transition bg-white shadow-xs"
                        />
                      </div>
                      <div className="form-group mb-0">
                        <label className="form-label block text-xs font-extrabold text-slate-700 uppercase mb-2 tracking-wider">Subject</label>
                        <input
                          type="text"
                          placeholder="Appointment / Billing / General"
                          style={{ minHeight: '48px' }}
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-600 outline-none transition bg-white shadow-xs"
                        />
                      </div>
                    </div>

                    <div className="form-group mb-0">
                      <label className="form-label block text-xs font-extrabold text-slate-700 uppercase mb-2 tracking-wider">Your Message *</label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Provide details about your query..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-4 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-600 outline-none resize-none transition bg-white shadow-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      style={{ minHeight: '48px', color: '#ffffff' }}
                      className="px-8 py-3.5 bg-sky-700 hover:bg-sky-800 text-white font-extrabold rounded-xl shadow-lg transition flex items-center justify-center text-sm"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Inquiry
                    </button>
                  </form>
                )}
              </div>

              {/* Col 3: Details */}
              <div className="space-y-8">
                <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 text-rose-950 shadow-sm">
                  <div className="flex items-center space-x-3 text-rose-600 mb-3">
                    <ShieldAlert className="w-7 h-7" />
                    <h3 className="font-extrabold text-xl">24/7 Emergency Line</h3>
                  </div>
                  <p className="text-3xl font-black text-rose-700">+91 040 4488 5000</p>
                  <p className="text-xs text-rose-800 mt-2 font-medium">For critical trauma, chest pain, stroke, or emergency ambulance dispatch.</p>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-600">
                  <h3 className="font-extrabold text-slate-900 text-xl border-b border-slate-100 pb-4">Hospital Contact Info</h3>
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-sky-600 mr-4 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 text-base">AegisCare Main Campus</strong>
                      <p className="mt-1 leading-relaxed">Plot 42, Healthcare City Blvd, Cyber Hills, Hyderabad - 500081</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-sky-600 mr-4 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 text-base">Helpline Phone</strong>
                      <p className="mt-1">+91 040 4488 5000 / +91 40 2345 6789</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-sky-600 mr-4 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 text-base">Email Address</strong>
                      <p className="mt-1">contact@aegiscare.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-sky-600 mr-4 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 text-base">OPD & Visiting Hours</strong>
                      <p className="mt-1">OPD: Mon - Sat (08:00 AM - 08:00 PM)</p>
                      <p className="mt-0.5">IPD Visiting: 04:00 PM - 07:00 PM Daily</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hospital Campus Locations */}
        <section className="section bg-slate-50">
          <div className="section-container">
            <div className="section-header text-center mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/80 px-3.5 py-1.5 rounded-full">
                Our Facilities
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 tracking-tight">
                AegisCare Hospital Campuses
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
                Visit any of our tertiary care facilities and specialty outpatient centers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  city: 'Hyderabad Main Campus',
                  address: 'Plot 42, Healthcare City Blvd, Cyber Hills, Hyderabad - 500081',
                  beds: '750 Beds',
                  phone: '+91 040 4488 5000'
                },
                {
                  city: 'HITEC City OPD Center',
                  address: 'Tower B, Tech Park Square, HITEC City, Hyderabad - 500084',
                  beds: 'Outpatient & Daycare',
                  phone: '+91 040 4488 5050'
                },
                {
                  city: 'Gachibowli Children Clinic',
                  address: 'Financial District, Near ORR Exit 1, Gachibowli, Hyderabad - 500032',
                  beds: 'Pediatric Specialty',
                  phone: '+91 040 4488 5100'
                }
              ].map((loc, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <span className="text-xs font-extrabold uppercase text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                    {loc.beds}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-2">{loc.city}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{loc.address}</p>
                  <p className="text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-100">{loc.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Hotline CTA */}
        <section className="section bg-gradient-to-r from-rose-900 to-sky-900 text-white">
          <div className="section-container flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-300 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                Critical Care Unit
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-5 tracking-tight text-white">
                Medical Emergency? Call Immediately.
              </h2>
              <p className="mt-4 text-slate-200 text-base sm:text-lg leading-relaxed">
                Our cardiac ambulances with mobile ICU monitoring equipment are stationed across key city locations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
              <a
                href="tel:+9104044885000"
                style={{ minHeight: '48px', color: '#ffffff' }}
                className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg transition text-center flex items-center justify-center"
              >
                Call Emergency Line: +91 040 4488 5000
              </a>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
      <QuickEnquiryModal />
    </div>
  );
}
