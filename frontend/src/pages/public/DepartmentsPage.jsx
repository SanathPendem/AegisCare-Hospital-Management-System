import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TopContactBar from '../../components/public/TopContactBar';
import MainHeader from '../../components/public/MainHeader';
import PrimaryNav from '../../components/public/PrimaryNav';
import PublicFooter from '../../components/public/PublicFooter';
import QuickEnquiryModal from '../../components/public/QuickEnquiryModal';
import DepartmentCards from '../../components/public/DepartmentCards';
import { Stethoscope, ArrowRight, CheckCircle } from 'lucide-react';

export default function DepartmentsPage() {
  const [searchParams] = useSearchParams();
  const activeDept = searchParams.get('dept');
  const navigate = useNavigate();

  return (
    <div className="public-page bg-slate-50 font-sans text-slate-800 antialiased">
      <TopContactBar />
      <MainHeader />
      <PrimaryNav />

      <main className="main-content">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white min-h-[450px] flex items-center py-24 px-6">
          <div className="section-container">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-950/60 px-4 py-2 rounded-full border border-rose-800/50">
              Centers of Excellence
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-6 tracking-tight">
              Clinical Departments & Specialties
            </h1>
            <p className="mt-6 text-slate-200 max-w-3xl text-lg sm:text-xl leading-relaxed">
              Discover our world-class medical departments led by internationally trained consultants, equipped with cutting-edge diagnostic technology and sub-specialty ICU suites.
            </p>
          </div>
        </section>

        {/* Selected Specialty Banner (if routed with query param) */}
        {activeDept && (
          <section className="bg-sky-50 border-b border-sky-200 py-8 px-6">
            <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-3">
                <Stethoscope className="w-6 h-6 text-sky-700" />
                <span className="text-lg font-extrabold text-sky-950 capitalize">
                  Selected Specialty: <strong className="text-sky-700">{activeDept}</strong>
                </span>
              </div>
              <button
                onClick={() => navigate(`/book-appointment?dept=${activeDept}`)}
                style={{ minHeight: '48px', color: '#ffffff' }}
                className="px-8 py-3 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-sm font-bold shadow-md transition shrink-0"
              >
                Book Specialist in {activeDept}
              </button>
            </div>
          </section>
        )}

        {/* Clinical Intro Section */}
        <section className="section bg-white">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1.5 rounded-md border border-sky-100">
                  Comprehensive Clinical Services
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 tracking-tight">
                  Multi-Disciplinary Care Backed by Cutting-Edge Science
                </h2>
                <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed">
                  AegisCare Hospitals brings together top-tier specialists from across medical disciplines to provide personalized, evidence-based healthcare. Our specialized clinics ensure seamless inter-departmental collaboration for complex diagnosis and treatment.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    'Sub-specialty intensive care units (ICUs) for Cardiac, Neuro, and Surgical recovery',
                    '24/7 Level-1 Emergency & Trauma Care center with dedicated triage suites',
                    'Advanced hybrid operating theaters with robotic navigation systems',
                    'Comprehensive outpatient consultation clinics open 6 days a week'
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-sky-600 mt-1 shrink-0" />
                      <span className="text-slate-700 text-base font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
                  alt="AegisCare Clinical Facility"
                  className="rounded-3xl shadow-xl border border-slate-200 object-cover w-full h-[460px]"
                />
                <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl hidden sm:block max-w-xs">
                  <p className="text-3xl font-black text-rose-400">15+</p>
                  <p className="text-sm font-semibold text-slate-300 mt-1">Dedicated Clinical Centers of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Departments Showcase Grid */}
        <section className="section bg-slate-50">
          <div className="section-container">
            <div className="section-header text-center mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/80 px-3.5 py-1.5 rounded-full">
                All Departments
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 tracking-tight">
                Explore Our Medical Divisions
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
                Click any department below to view specialized procedures, expert consultants, and available OPD consultation slots.
              </p>
            </div>

            <DepartmentCards />
          </div>
        </section>

        {/* Featured Super-Specialties */}
        <section className="section bg-white">
          <div className="section-container">
            <div className="section-header text-center mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100">
                Advanced Services
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 tracking-tight">
                Specialized Clinical Programs
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
                Tailored care pathways designed for targeted intervention and optimal long-term health outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: 'Robotic Joint Replacement',
                  dept: 'Orthopedics',
                  desc: 'Sub-millimeter precise knee and hip surgery delivering faster recovery and minimal soft-tissue damage.'
                },
                {
                  title: 'Interventional Cardiology',
                  dept: 'Cardiology',
                  desc: '24/7 primary angioplasty with door-to-balloon times consistently under 45 minutes.'
                },
                {
                  title: 'Comprehensive Neuro Care',
                  dept: 'Neurology',
                  desc: 'Endovascular clot retrieval for acute ischemic stroke and complex brain tumor resections.'
                },
                {
                  title: 'Precision Medical Oncology',
                  dept: 'Oncology',
                  desc: 'Targeted immunotherapy, chemotherapy, and multi-disciplinary tumor board evaluations.'
                },
                {
                  title: 'Advanced GI Endoscopy',
                  dept: 'Gastroenterology',
                  desc: 'ERCP, endoscopic ultrasound (EUS), and minimally invasive gastrointestinal surgery.'
                },
                {
                  title: 'Neonatal ICU (NICU Level 3)',
                  dept: 'Pediatrics',
                  desc: 'Round-the-clock specialized care for premature infants and critically ill pediatric patients.'
                }
              ].map((program, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-extrabold uppercase text-sky-700 tracking-wider">
                      {program.dept}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-2">{program.title}</h3>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">{program.desc}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/book-appointment?dept=${program.dept}`)}
                    className="mt-6 inline-flex items-center text-sm font-extrabold text-sky-700 hover:text-sky-900 group"
                  >
                    <span>Consult Program Specialist</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Appointment CTA Banner */}
        <section className="section bg-gradient-to-r from-rose-900 to-sky-900 text-white">
          <div className="section-container flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-300 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                Book Consultation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-5 tracking-tight text-white">
                Ready to Schedule a Consultation?
              </h2>
              <p className="mt-4 text-slate-200 text-base sm:text-lg leading-relaxed">
                Connect with our senior department heads and clinical consultants for expert diagnosis and customized care plans.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => navigate('/book-appointment')}
                style={{ minHeight: '48px', color: '#ffffff' }}
                className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg transition text-center"
              >
                Book Appointment Online
              </button>
              <button
                onClick={() => navigate('/doctors')}
                style={{ minHeight: '48px', color: '#ffffff' }}
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/30 transition text-center"
              >
                Browse All Doctors
              </button>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
      <QuickEnquiryModal />
    </div>
  );
}
