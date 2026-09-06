import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopContactBar from '../../components/public/TopContactBar';
import MainHeader from '../../components/public/MainHeader';
import PrimaryNav from '../../components/public/PrimaryNav';
import PublicFooter from '../../components/public/PublicFooter';
import QuickEnquiryModal from '../../components/public/QuickEnquiryModal';
import { Cpu, HeartPulse, Bone, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

const procedures = [
  {
    title: 'DaVinci Robotic Surgery',
    dept: 'Multi-Specialty Surgical Unit',
    description: '3D High-Definition 10x magnified vision with wrist-articulated instruments for minimal scar, lower blood loss, and sub-48hr recovery.',
    benefits: ['Sub-1mm surgical accuracy', 'Faster discharge time', 'Minimization of post-op pain'],
    icon: Cpu
  },
  {
    title: 'Coronary Angioplasty & Stenting',
    dept: 'Interventional Cardiology',
    description: 'Emergency radial angioplasty with bio-resorbable drug-eluting stents in flat-panel digital catheterization labs.',
    benefits: ['24/7 Primary PCI readiness', 'Sub-30 min Door-to-Balloon time', 'Transradial approach'],
    icon: HeartPulse
  },
  {
    title: 'Robotic Total Joint Replacement',
    dept: 'Center for Orthopedics & Spine',
    description: 'Patient-specific 3D CT modeling for sub-millimeter implant positioning in total knee and hip arthroplasty.',
    benefits: ['Zero bone over-resection', 'Custom implant alignment', 'Same-day gait mobilization'],
    icon: Bone
  },
  {
    title: 'Living Donor Organ Transplantation',
    dept: 'Institute of Liver & Kidney Care',
    description: 'Dedicated transplant ICUs, ABO-incompatible transplantation protocols, and sterile laminar airflow OTs.',
    benefits: ['High long-term graft survival', 'Dedicated transplant team', 'Comprehensive donor safety'],
    icon: ShieldCheck
  }
];

export default function ProceduresPage() {
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
              Surgical Excellence
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-6 tracking-tight">
              Advanced Clinical & Surgical Procedures
            </h1>
            <p className="mt-6 text-slate-200 max-w-3xl text-lg sm:text-xl leading-relaxed">
              Equipped with 14 ultra-modern modular operation theaters, DaVinci XI robotic surgical suites, and dedicated organ transplant recovery ICUs.
            </p>
          </div>
        </section>

        {/* Intro Section */}
        <section className="section bg-white">
          <div className="section-container">
            <div className="section-header text-center mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
                Precision Surgery
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 tracking-tight">
                Pioneering Minimally Invasive Interventions
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
                Our surgical teams combine decades of specialized expertise with high-definition 3D imaging and robotic assistance to deliver superior clinical surgical outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* Procedures Grid */}
        <section className="section bg-slate-50">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {procedures.map((proc, idx) => {
                const Icon = proc.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-6">
                      <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center border border-sky-200 shadow-sm">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <span className="inline-block text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1.5 rounded-md border border-sky-100">
                          {proc.dept}
                        </span>
                        <h3 className="text-2xl font-black text-slate-900 mt-3">{proc.title}</h3>
                      </div>
                      <p className="text-slate-600 text-base sm:text-lg leading-relaxed">{proc.description}</p>
                      <div className="pt-4 border-t border-slate-100 space-y-3">
                        {proc.benefits.map((b, i) => (
                          <div key={i} className="flex items-center text-sm sm:text-base text-slate-700 font-medium">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-8">
                      <button
                        onClick={() => navigate('/book-appointment')}
                        style={{ minHeight: '48px' }}
                        className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-sm font-bold shadow-md transition"
                      >
                        <span>Request Surgical Evaluation</span>
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Surgical Infrastructure Suites */}
        <section className="section bg-white">
          <div className="section-container">
            <div className="section-header text-center mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100">
                World-Class Infrastructure
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 tracking-tight">
                State-of-the-Art Operating Theaters
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
                Built to international NABH and JCI accreditation standards for zero infection rate surgical environments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[
                {
                  title: '14 Modular OTs',
                  desc: 'Ultra-clean laminar air flow with HEPA filtration system replacing OT air 25+ times per hour.'
                },
                {
                  title: 'Bi-Plane Cath Labs',
                  desc: 'Flat-panel high-definition angiographic suites for complex neuro-vascular and cardiac stenting.'
                },
                {
                  title: 'Organ Transplant OT',
                  desc: 'Dedicated twin-operating suites for donor harvest and recipient implantation simultaneously.'
                },
                {
                  title: 'Day-Care Surgery Unit',
                  desc: 'Streamlined ambulatory surgical suites with fast-track recovery lounges for quick discharge.'
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

        {/* Appointment CTA Banner */}
        <section className="section bg-gradient-to-r from-rose-900 to-sky-900 text-white">
          <div className="section-container flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-300 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                Surgical Consultations
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-5 tracking-tight text-white">
                Schedule Your Surgical Evaluation Today
              </h2>
              <p className="mt-4 text-slate-200 text-base sm:text-lg leading-relaxed">
                Consult with our senior surgeons and chief department chairs to discuss procedure options, recovery timelines, and insurance coverage.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => navigate('/book-appointment')}
                style={{ minHeight: '48px', color: '#ffffff' }}
                className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg transition text-center"
              >
                Book Surgical Appointment
              </button>
              <a
                href="tel:+9104044885000"
                style={{ minHeight: '48px', color: '#ffffff' }}
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/30 transition text-center flex items-center justify-center"
              >
                Call Surgical Desk
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
