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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      <TopContactBar />
      <MainHeader />
      <PrimaryNav />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/50">
            NABL Accredited Diagnostics
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-3">
            Advanced Pathology & Diagnostic Radiology
          </h1>
          <p className="mt-3 text-slate-200 max-w-2xl text-base">
            High-precision automated pathology, 3T Digital MRI, 128-slice CT scans, and 24/7 lab result reporting online.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        {/* Lab Packages */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900">Preventive Health Checkup Packages</h2>
            <p className="text-slate-600 mt-2 text-sm">NABL & CAP certified diagnostic accuracy with home sample collection available.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {labPackages.map((pkg, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition">
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Home Sample Available
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-3">{pkg.name}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{pkg.tests}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400">Offer Price</span>
                      <p className="text-2xl font-black text-slate-900">{pkg.price}</p>
                    </div>
                    <span className="text-xs text-slate-500 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-sky-600" />
                      {pkg.reportTime}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate('/book-appointment')}
                    className="w-full mt-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg text-xs font-bold transition shadow-sm"
                  >
                    Book Diagnostic Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Lab Access */}
        <div className="bg-gradient-to-r from-sky-900 to-slate-900 rounded-2xl text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
              Digital Patient Portal
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-2">Already took a test? Download your reports online.</h3>
            <p className="text-slate-300 text-sm mt-2 max-w-xl">
              Sign in to your AegisCare patient account to access past blood reports, X-rays, and doctor notes anytime.
            </p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="shrink-0 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-sm shadow-xl transition flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Access Lab Reports
          </button>
        </div>
      </main>

      <PublicFooter />
      <QuickEnquiryModal />
    </div>
  );
}
