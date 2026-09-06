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
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm font-bold tracking-wider text-rose-600 uppercase bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100 shadow-sm">
              Why AegisCare
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl leading-tight">
              Pioneering Healthcare Excellence with Compassion & Precision
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              For over two decades, AegisCare has delivered world-class clinical care, pioneering treatments, and patient-first healthcare infrastructure.
            </p>

            <div className="mt-10 space-y-7">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex items-start">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center border border-sky-200 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="ml-5">
                      <h3 className="text-xl font-bold text-slate-900">{feat.title}</h3>
                      <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{feat.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-4 shadow-sm">
              <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
              <p className="text-sm text-emerald-900 font-bold">
                Cashless insurance coverage available across 45+ leading TPA providers.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
                alt="AegisCare Medical Facility"
                className="w-full h-[560px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 text-white bg-slate-900/85 backdrop-blur-md p-7 rounded-2xl border border-white/20 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
                      24/7 Emergency Line
                    </span>
                    <p className="text-2xl font-black mt-1 tracking-wide text-white">
                      +91 040 4488 5000
                    </p>
                  </div>
                  <a
                    href="tel:+9104044885000"
                    className="w-14 h-14 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl flex items-center justify-center shadow-lg transition"
                  >
                    <PhoneCall className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Floating rating badge */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-2xl p-5 border border-slate-200 hidden sm:flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl shadow-inner">
                ★
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-900">99.4% Patient Rating</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Based on 15,000+ verified surveys</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
