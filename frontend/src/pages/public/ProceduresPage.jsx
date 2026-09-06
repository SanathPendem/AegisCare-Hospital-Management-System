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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      <TopContactBar />
      <MainHeader />
      <PrimaryNav />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/50">
            Surgical Excellence
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-3">
            Advanced Clinical & Surgical Procedures
          </h1>
          <p className="mt-3 text-slate-200 max-w-2xl text-base">
            Equipped with 14 ultra-modern modular operation theaters and DaVinci robotic platforms for complex surgical interventions.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {procedures.map((proc, idx) => {
            const Icon = proc.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4 hover:shadow-lg transition">
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center border border-sky-200">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
                  {proc.dept}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{proc.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{proc.description}</p>
                <div className="pt-2 border-t border-slate-100 space-y-1">
                  {proc.benefits.map((b, i) => (
                    <div key={i} className="flex items-center text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => navigate('/book-appointment')}
                    className="inline-flex items-center text-sm font-bold text-sky-700 hover:text-sky-900"
                  >
                    Request Surgical Evaluation <ArrowRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <PublicFooter />
      <QuickEnquiryModal />
    </div>
  );
}
