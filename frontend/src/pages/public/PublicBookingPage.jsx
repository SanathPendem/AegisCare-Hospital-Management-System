import React from 'react';
import TopContactBar from '../../components/public/TopContactBar';
import MainHeader from '../../components/public/MainHeader';
import PrimaryNav from '../../components/public/PrimaryNav';
import PublicFooter from '../../components/public/PublicFooter';
import QuickEnquiryModal from '../../components/public/QuickEnquiryModal';
import QuickBookingBar from '../../components/public/QuickBookingBar';
import { Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PublicBookingPage() {
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
              Instant Online OPD Booking
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-6 tracking-tight">
              Book an OPD Appointment with Senior Specialists
            </h1>
            <p className="mt-6 text-slate-200 max-w-3xl text-lg sm:text-xl leading-relaxed">
              Guaranteed minimal waiting time, instant SMS confirmation, and express registration at all AegisCare hospital campuses.
            </p>
          </div>
        </section>

        {/* Quick Booking Bar Component Section */}
        <section className="py-12 bg-white">
          <div className="section-container">
            <QuickBookingBar />
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="section bg-slate-50">
          <div className="section-container">
            <div className="section-header text-center mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/80 px-3.5 py-1.5 rounded-full">
                Why Book Online
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 tracking-tight">
                Seamless Outpatient Experience
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
                Enjoy priority processing and transparent appointment scheduling.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition">
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xl">Instant Confirmation</h4>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed font-medium">
                      Receive an immediate appointment reference ID & SMS update with doctor cabin details.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition">
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xl">Zero Upfront Payment</h4>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed font-medium">
                      Pay consultation fees at the hospital reception counter or digitally after your consultation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition">
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xl">Express Priority Lane</h4>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed font-medium">
                      Skip general registration queues with our dedicated online-booking express check-in kiosk.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Patient Checklist & Guidelines */}
        <section className="section bg-white">
          <div className="section-container">
            <div className="section-header text-center mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100">
                Patient Checklist
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 tracking-tight">
                What to Bring to Your OPD Consultation
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
                Help our doctors provide the best care by bringing necessary medical documents.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[
                {
                  title: 'Government ID Proof',
                  desc: 'Aadhaar, Passport, or Driving License for patient registration and verification.'
                },
                {
                  title: 'Past Medical Records',
                  desc: 'Previous prescriptions, discharge summaries, and diagnostic lab reports.'
                },
                {
                  title: 'Current Medications',
                  desc: 'List or physical boxes of all active medications and supplements you are taking.'
                },
                {
                  title: 'Health Insurance Card',
                  desc: 'TPA e-card or corporate health card for cashless OPD claims if eligible.'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">{item.desc}</p>
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
                24/7 Patient Helpdesk
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-5 tracking-tight text-white">
                Need Telephonic Assistance with Booking?
              </h2>
              <p className="mt-4 text-slate-200 text-base sm:text-lg leading-relaxed">
                Our patient relationship representatives are available 24/7 to guide you to the right department and doctor.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
              <a
                href="tel:+9104044885000"
                style={{ minHeight: '48px', color: '#ffffff' }}
                className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg transition text-center flex items-center justify-center"
              >
                Call +91 040 4488 5000
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
