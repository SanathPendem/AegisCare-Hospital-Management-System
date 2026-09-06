import React from 'react';
import { Link } from 'react-router-dom';
import TopContactBar from '../../components/public/TopContactBar';
import MainHeader from '../../components/public/MainHeader';
import PrimaryNav from '../../components/public/PrimaryNav';
import PublicFooter from '../../components/public/PublicFooter';
import QuickEnquiryModal from '../../components/public/QuickEnquiryModal';
import { Award, ShieldCheck, HeartPulse, Users, Building, Target, Eye, Calendar, ArrowRight, PhoneCall, Cpu, CheckCircle2, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      {/* 1. Header & Navigation */}
      <TopContactBar />
      <MainHeader />
      <PrimaryNav />

      {/* 2. Large About Hero (min-height: 480px-550px, 2-column layout) */}
      <section className="bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 text-white min-h-[480px] lg:min-h-[520px] flex items-center py-20 relative overflow-hidden border-b border-sky-900/40">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        
        <div className="section-container px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Headline & Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-rose-950/70 border border-rose-800/60 px-4 py-1.5 rounded-full">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-rose-300">
                  ABOUT AEGISCARE
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
                Pioneering Healthcare <br />
                <span className="text-sky-400">Excellence Since 2004</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal max-w-xl">
                AegisCare is a 500-bed multi-specialty quaternary care hospital committed to clinical research, advanced robotic surgery, and compassionate patient-centered healthcare.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/book-appointment"
                  className="px-8 h-13 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl shadow-lg hover:shadow-rose-600/30 transition flex items-center justify-center text-sm"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a Consultation
                </Link>
                <Link
                  to="/doctors"
                  className="px-8 h-13 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition flex items-center justify-center text-sm"
                >
                  Meet Our Doctors
                </Link>
              </div>
            </div>

            {/* Right: Hospital Visual Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15">
                <img
                  src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=900"
                  alt="AegisCare Medical Facility"
                  className="w-full h-[400px] lg:h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">JCI & NABH Accredited</span>
                    <p className="text-lg font-black text-white mt-0.5">Top-Ranked Quaternary Hospital</p>
                  </div>
                  <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision Section */}
      <section className="section bg-white border-b border-slate-200">
        <div className="section-container">
          <div className="section-header">
            <span className="text-xs font-extrabold tracking-widest text-sky-700 uppercase bg-sky-50 px-4 py-1.5 rounded-full border border-sky-100 shadow-xs">
              OUR FOUNDATIONAL PILLARS
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Guided by Integrity, Driven by Clinical Precision
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-10 min-h-[280px] flex flex-col justify-between hover:shadow-xl transition duration-300 group">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-sky-700 text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors">Our Mission</h3>
                <p className="mt-4 text-slate-600 text-base leading-relaxed">
                  To provide accessible, high-quality, patient-centric healthcare powered by clinical research, ethical medicine, and state-of-the-art diagnostic technology across all medical specialties.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200">
                <Link to="/departments" className="inline-flex items-center text-sm font-extrabold text-sky-700 hover:text-sky-900">
                  Explore Specialties <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-10 min-h-[280px] flex flex-col justify-between hover:shadow-xl transition duration-300 group">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-rose-600 text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors">Our Vision</h3>
                <p className="mt-4 text-slate-600 text-base leading-relaxed">
                  To be globally recognized as a premier destination for complex organ transplants, robotic surgical interventions, preventive healthcare innovation, and international clinical research.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200">
                <Link to="/procedures" className="inline-flex items-center text-sm font-extrabold text-rose-600 hover:text-rose-800">
                  View Clinical Procedures <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. State-of-the-Art Infrastructure Section */}
      <section className="section bg-slate-50 border-b border-slate-200">
        <div className="section-container">
          <div className="section-header">
            <span className="text-xs font-extrabold tracking-widest text-rose-600 uppercase bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100 shadow-xs">
              CLINICAL INFRASTRUCTURE
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900">
              State-of-the-Art Infrastructure & Facilities
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Equipped with cutting-edge medical technology and ultra-clean surgical suites built to international accreditation guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6">
                <Building className="w-7 h-7" />
              </div>
              <span className="text-3xl font-black text-slate-900">500+</span>
              <h4 className="font-extrabold text-slate-900 text-lg mt-2">Inpatient Beds</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">Includes Deluxe Suites, General Wards, and Isolation Rooms.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-6">
                <HeartPulse className="w-7 h-7" />
              </div>
              <span className="text-3xl font-black text-slate-900">90 Beds</span>
              <h4 className="font-extrabold text-slate-900 text-lg mt-2">ICU Critical Care</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">Dedicated Cardiac, Neuro, Neonatal (NICU) and Surgical ICUs.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
                <Cpu className="w-7 h-7" />
              </div>
              <span className="text-3xl font-black text-slate-900">14 OTs</span>
              <h4 className="font-extrabold text-slate-900 text-lg mt-2">Operation Theaters</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">Modular OTs equipped with DaVinci Robotic Surgical Systems.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                <Award className="w-7 h-7" />
              </div>
              <span className="text-3xl font-black text-slate-900">NABH & JCI</span>
              <h4 className="font-extrabold text-slate-900 text-lg mt-2">Gold Standard</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">Rigorous adherence to international patient safety standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why AegisCare Section (Spacious 2-column) */}
      <section className="section bg-white border-b border-slate-200">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Large Healthcare Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=900"
                  alt="AegisCare Clinical Excellence"
                  className="w-full h-[520px] object-cover"
                />
              </div>
            </div>

            {/* Right: Text, Feature List, CTA */}
            <div className="space-y-6">
              <span className="text-xs font-extrabold tracking-widest text-sky-700 uppercase bg-sky-50 px-4 py-1.5 rounded-full border border-sky-100 shadow-xs">
                THE AEGISCARE ADVANTAGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Why Patients & Families Trust AegisCare
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                For over two decades, AegisCare has delivered world-class clinical care, pioneering treatments, and patient-first healthcare infrastructure supported by top medical consultants.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">Multidisciplinary Medical Boards</h4>
                    <p className="text-sm text-slate-600 mt-1">Cross-specialty consultation for complex surgeries and organ transplants.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">100% Digital Health Records & Portal</h4>
                    <p className="text-sm text-slate-600 mt-1">Instant access to doctor notes, prescriptions, and diagnostic lab reports.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">Cashless Insurance Desk</h4>
                    <p className="text-sm text-slate-600 mt-1">Empaneled with 45+ TPA providers for seamless hospital admissions.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/contact"
                  className="px-8 h-13 bg-sky-700 hover:bg-sky-800 text-white font-extrabold rounded-xl shadow-md transition inline-flex items-center justify-center text-sm"
                >
                  Contact Our Patient Desk <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Healthcare Excellence / Statistics Band */}
      <section className="section bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 text-white border-b border-sky-900/40">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">500+</span>
              <p className="mt-2 text-lg font-extrabold text-sky-200">Hospital Beds</p>
              <p className="mt-1 text-xs text-slate-300">Quaternary Care Facility</p>
            </div>

            <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">90</span>
              <p className="mt-2 text-lg font-extrabold text-sky-200">ICU Beds</p>
              <p className="mt-1 text-xs text-slate-300">Dedicated Critical Care</p>
            </div>

            <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">50+</span>
              <p className="mt-2 text-lg font-extrabold text-sky-200">Specialists</p>
              <p className="mt-1 text-xs text-slate-300">Board-Certified Doctors</p>
            </div>

            <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">24/7</span>
              <p className="mt-2 text-lg font-extrabold text-sky-200">Emergency Care</p>
              <p className="mt-1 text-xs text-slate-300">Level 1 Trauma Center</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Emergency CTA Section (Full-width horizontal banner) */}
      <section className="bg-rose-600 text-white min-h-[200px] py-16 flex items-center shadow-inner">
        <div className="section-container px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-black uppercase tracking-widest text-rose-200 bg-rose-700/80 px-3.5 py-1 rounded-full border border-rose-500">
                CRITICAL CARE RESPONSE
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white">Emergency & Trauma Hotline</h3>
              <p className="text-base text-rose-100 max-w-xl">
                Immediate dispatch & cardiac resuscitation team on standby 24 hours a day, 7 days a week.
              </p>
            </div>

            <div className="flex items-center space-x-4 shrink-0">
              <a
                href="tel:+9104044885000"
                style={{ color: '#e11d48', backgroundColor: '#ffffff' }}
                className="px-8 h-14 bg-white font-black rounded-2xl shadow-xl transition flex items-center justify-center text-lg gap-3"
              >
                <PhoneCall className="w-6 h-6 text-rose-600" />
                <span style={{ color: '#e11d48', fontWeight: 900 }}>Call +91 040 4488 5000</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <PublicFooter />
      <QuickEnquiryModal />
    </div>
  );
}
