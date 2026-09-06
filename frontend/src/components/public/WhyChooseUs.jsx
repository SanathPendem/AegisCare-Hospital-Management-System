import React from 'react';
import { ShieldCheck, Award, Clock, Cpu, FileCheck, PhoneCall, CheckCircle2 } from 'lucide-react';

const features = [
  {
    title: 'JCI & NABH Accredited Standards',
    description: 'Adhering to international safety, infection control, and clinical governance protocols.',
    icon: Award,
  },
  {
    title: '24/7 Emergency & ICU Critical Care',
    description: 'Level 1 trauma triage with dedicated cardiac cath lab and rapid response ambulances.',
    icon: Clock,
  },
  {
    title: 'Robotic & Minimally Invasive Surgery',
    description: 'State-of-the-art robotic surgical suites for precision orthopedics, urology, and oncology.',
    icon: Cpu,
  },
  {
    title: '100% Digital Health Records',
    description: 'Seamless patient portal access to prescriptions, lab results, billing, and telehealth.',
    icon: FileCheck,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold tracking-wider text-rose-600 uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
              Why AegisCare
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl leading-tight">
              Pioneering Healthcare Excellence with Compassion & Precision
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              For over two decades, AegisCare has delivered world-class clinical care, pioneering treatments, and patient-first healthcare infrastructure.
            </p>

            <div className="mt-8 space-y-6">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center border border-sky-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-slate-900">{feat.title}</h3>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">{feat.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <p className="text-sm text-emerald-900 font-semibold">
                Cashless insurance coverage available across 45+ leading TPA providers.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
                alt="AegisCare Medical Facility"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white bg-slate-900/80 backdrop-blur-md p-6 rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-rose-400 uppercase tracking-widest">
                      24/7 Emergency Line
                    </span>
                    <p className="text-2xl font-black mt-0.5 tracking-wide text-white">
                      +91 (800) 456-7890
                    </p>
                  </div>
                  <a
                    href="tel:18004567890"
                    className="w-12 h-12 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex items-center justify-center shadow-lg transition"
                  >
                    <PhoneCall className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Floating rating badge */}
            <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-slate-200 hidden sm:flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                ★
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">99.4% Patient Rating</p>
                <p className="text-xs text-slate-500">Based on 15,000+ verified surveys</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
