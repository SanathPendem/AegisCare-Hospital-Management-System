import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopContactBar from '../../components/public/TopContactBar';
import MainHeader from '../../components/public/MainHeader';
import PrimaryNav from '../../components/public/PrimaryNav';
import PublicFooter from '../../components/public/PublicFooter';
import QuickEnquiryModal from '../../components/public/QuickEnquiryModal';
import { Microscope, Activity, ShieldCheck, Download, FileText, CheckCircle2, Clock } from 'lucide-react';

const labPackages = [
  {
    name: 'Executive Full Body Health Check',
    tests: '85 Parameters (CBC, Lipid, LFT, KFT, Thyroid, HbA1c, Vitamin D/B12)',
    price: '₹2,999',
    reportTime: 'Same Day (Within 8 hrs)'
  },
  {
    name: 'Comprehensive Cardiac Health Screening',
    tests: 'Echo, TMT, Lipid Profile, Troponin I, Hs-CRP, ECG, HbA1c',
    price: '₹3,499',
    reportTime: 'Within 6 hrs'
  },
  {
    name: 'Diabetic & Metabolic Care Profile',
    tests: 'Fasting Glucose, PP Glucose, HbA1c, Microalbumin, Kidney Panel',
    price: '₹1,499',
    reportTime: 'Within 4 hrs'
  },
  {
    name: 'Advanced Oncology Marker Panel',
    tests: 'CEA, CA-125, PSA, AFP, Full Pathology Workup',
    price: '₹4,999',
    reportTime: 'Within 24 hrs'
  }
];

export default function LaboratoryPage() {
  const navigate = useNavigate();

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
              NABL Accredited Diagnostics
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-6 tracking-tight">
              Advanced Pathology & Diagnostic Radiology
            </h1>
            <p className="mt-6 text-slate-200 max-w-3xl text-lg sm:text-xl leading-relaxed">
              High-precision automated pathology, 3T Digital MRI, 128-slice CT scans, and 24/7 lab result reporting online with home sample collection.
            </p>
          </div>
        </section>

        {/* Diagnostic Capabilities Intro */}
        <section className="section bg-white">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1.5 rounded-md border border-sky-100">
                  Precision Diagnostics
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 tracking-tight">
                  Zero-Error Automated Testing Laboratories
                </h2>
                <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed">
                  Our central pathology lab is equipped with fully automated Roche and Beckman Coulter robotic testing lines. Every specimen undergoes dual barcode verification to guarantee absolute accuracy.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    'NABL & CAP certified international laboratory standards',
                    'Home blood sample collection by certified phlebotomists',
                    'Digital PDF lab report delivery via WhatsApp & Email within hours',
                    'Specialized Molecular Biology & Gene Sequencing unit'
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-sky-600 mt-1 shrink-0" />
                      <span className="text-slate-700 text-base font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-sky-50 p-8 rounded-2xl border border-sky-100 text-center">
                  <Microscope className="w-10 h-10 text-sky-700 mx-auto" />
                  <p className="text-3xl font-black text-slate-900 mt-4">1.2M+</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Tests Performed Yearly</p>
                </div>
                <div className="bg-rose-50 p-8 rounded-2xl border border-rose-100 text-center">
                  <Activity className="w-10 h-10 text-rose-600 mx-auto" />
                  <p className="text-3xl font-black text-slate-900 mt-4">99.9%</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Diagnostic Accuracy</p>
                </div>
                <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 text-center col-span-2">
                  <ShieldCheck className="w-10 h-10 text-emerald-600 mx-auto" />
                  <p className="text-xl font-bold text-slate-900 mt-3">24/7 STAT Emergency Lab</p>
                  <p className="text-xs font-medium text-slate-600 mt-1">Critical cardiac markers and blood bank cross-matching delivered under 30 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lab Packages */}
        <section className="section bg-slate-50">
          <div className="section-container">
            <div className="section-header text-center mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/80 px-3.5 py-1.5 rounded-full">
                Preventive Health
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 tracking-tight">
                Health Checkup Packages
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
                Comprehensive health screening packages designed for all age groups with complimentary physician consultation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {labPackages.map((pkg, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      Home Sample Available
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-4">{pkg.name}</h3>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed font-medium">{pkg.tests}</p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 font-semibold">Offer Price</span>
                        <p className="text-3xl font-black text-slate-900 mt-0.5">{pkg.price}</p>
                      </div>
                      <span className="text-xs text-slate-500 flex items-center font-medium">
                        <Clock className="w-4 h-4 mr-1 text-sky-600" />
                        {pkg.reportTime}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate('/book-appointment')}
                      style={{ minHeight: '48px' }}
                      className="w-full mt-6 py-3 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-sm font-extrabold transition shadow-md"
                    >
                      Book Diagnostic Test
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Digital Lab Report Download Banner */}
        <section className="section bg-white">
          <div className="section-container">
            <div className="bg-gradient-to-r from-sky-900 to-slate-900 rounded-3xl text-white p-10 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border border-slate-800">
              <div className="max-w-2xl">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-widest bg-rose-950/60 px-4 py-1.5 rounded-full border border-rose-800/50">
                  Digital Patient Portal
                </span>
                <h3 className="text-2xl sm:text-4xl font-black mt-4 tracking-tight">Already took a test? Download your reports online.</h3>
                <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
                  Sign in to your AegisCare patient account to access past blood reports, radiology scans, and doctor notes anytime.
                </p>
              </div>
              <button
                onClick={() => navigate('/login')}
                style={{ minHeight: '48px', color: '#ffffff' }}
                className="shrink-0 px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-extrabold text-sm shadow-xl transition flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Access Lab Reports
              </button>
            </div>
          </div>
        </section>

        {/* Appointment CTA Banner */}
        <section className="section bg-gradient-to-r from-rose-900 to-sky-900 text-white">
          <div className="section-container flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-300 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                Home Sample Collection
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-5 tracking-tight text-white">
                Book a Home Blood Sample Collection
              </h2>
              <p className="mt-4 text-slate-200 text-base sm:text-lg leading-relaxed">
                Our trained phlebotomists will visit your residence at your preferred time slot with sterile sample collection equipment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => navigate('/book-appointment')}
                style={{ minHeight: '48px', color: '#ffffff' }}
                className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg transition text-center"
              >
                Schedule Home Collection
              </button>
              <a
                href="tel:+9104044885000"
                style={{ minHeight: '48px', color: '#ffffff' }}
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/30 transition text-center flex items-center justify-center"
              >
                Call Lab Desk
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
