import React from 'react';
import { Users, Building2, HeartPulse, Clock, Sparkles } from 'lucide-react';

const stats = [
  {
    icon: Building2,
    number: '15+',
    label: 'Centers of Excellence',
    subtext: 'Specialized Clinical Depts'
  },
  {
    icon: Users,
    number: '50+',
    label: 'Senior Consultants',
    subtext: 'International Board Certified'
  },
  {
    icon: HeartPulse,
    number: '100,000+',
    label: 'Patients Treated',
    subtext: 'Across IPD & OPD Operations'
  },
  {
    icon: Clock,
    number: '24 / 7',
    label: 'Emergency & Trauma Care',
    subtext: 'Sub-15 Min Triage Time'
  }
];

export default function StatisticsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white shadow-inner">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500/20 text-sky-300 mb-5 border border-sky-400/30 shadow-inner">
                  <Icon className="w-7 h-7" />
                </div>
                <p className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {item.number}
                </p>
                <p className="mt-2 text-lg font-extrabold text-sky-200">
                  {item.label}
                </p>
                <p className="mt-1.5 text-xs text-slate-300 font-medium">
                  {item.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
