import React from 'react';
import TopContactBar from '../../components/public/TopContactBar';
import MainHeader from '../../components/public/MainHeader';
import PrimaryNav from '../../components/public/PrimaryNav';
import PublicFooter from '../../components/public/PublicFooter';
import QuickEnquiryModal from '../../components/public/QuickEnquiryModal';
import { Award, ShieldCheck, HeartPulse, Users, Building, Target, Eye } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      <TopContactBar />
      <MainHeader />
      <PrimaryNav />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/50">
            About AegisCare
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mt-4">
            Pioneering Healthcare Excellence Since 2004
          </h1>
          <p className="mt-4 text-lg text-sky-100 max-w-3xl leading-relaxed">
            AegisCare is a 500-bed multi-specialty quaternary care hospital dedicated to serving patients with cutting-edge medical technology and empathetic clinical care.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To provide accessible, high-quality, patient-centric healthcare powered by clinical research, ethical medicine, and state-of-the-art diagnostic technology.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To be globally recognized as a premier destination for complex organ transplants, robotic surgical interventions, and preventive healthcare innovation.
            </p>
          </div>
        </div>

        {/* Clinical Infrastructure */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
            State-of-the-Art Infrastructure & Facilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <Building className="w-8 h-8 text-sky-600 mb-2" />
              <h4 className="font-bold text-slate-900 text-base">500+ Inpatient Beds</h4>
              <p className="text-xs text-slate-600 mt-1">Includes Deluxe Suites, General Wards, and Isolation Rooms.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <HeartPulse className="w-8 h-8 text-rose-600 mb-2" />
              <h4 className="font-bold text-slate-900 text-base">90 ICU Beds</h4>
              <p className="text-xs text-slate-600 mt-1">Dedicated Cardiac, Neuro, Neonatal (NICU) and Surgical ICUs.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <ShieldCheck className="w-8 h-8 text-emerald-600 mb-2" />
              <h4 className="font-bold text-slate-900 text-base">14 Operation Theaters</h4>
              <p className="text-xs text-slate-600 mt-1">Modular OTs equipped with DaVinci Robotic Surgical Systems.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <Award className="w-8 h-8 text-amber-600 mb-2" />
              <h4 className="font-bold text-slate-900 text-base">NABH & JCI Certified</h4>
              <p className="text-xs text-slate-600 mt-1">Rigorous adherence to international patient safety standards.</p>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
      <QuickEnquiryModal />
    </div>
  );
}
