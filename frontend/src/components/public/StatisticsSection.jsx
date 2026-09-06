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
    <section className="py-14 bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-500/20 text-sky-300 mb-4 border border-sky-400/30">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {item.number}
                </p>
                <p className="mt-1 text-base font-bold text-sky-200">
                  {item.label}
                </p>
                <p className="mt-1 text-xs text-slate-300">
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
