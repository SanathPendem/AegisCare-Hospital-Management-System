import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, ShieldCheck, Award, HeartPulse, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="section bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 text-white min-h-[480px] lg:min-h-[520px] flex items-center relative overflow-hidden border-b border-sky-900/40">
      {/* Background Glow */}
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full">
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-100">
                NABH Accredited Multi-Specialty Hospital
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
              Advanced Healthcare. <br />
              <span className="text-sky-400">Compassionate Care.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal max-w-xl">
              Modern medical care powered by experienced board-certified specialists, state-of-the-art diagnostic technology, and patient-first service available 24 hours a day.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/book-appointment"
                className="px-8 h-13 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl shadow-lg hover:shadow-rose-600/30 transition flex items-center justify-center text-sm"
              >
                <Calendar className="w-4 h-4 mr-2" />
                BOOK AN APPOINTMENT
              </Link>

              <Link
                to="/doctors"
                className="px-8 h-13 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition flex items-center justify-center text-sm"
              >
                <Search className="w-4 h-4 mr-2" />
                FIND A DOCTOR
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-white/15 flex flex-wrap gap-8">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-7 h-7 text-sky-400 shrink-0" />
                <div>
                  <strong className="block text-white text-base font-extrabold">24/7 Emergency</strong>
                  <span className="text-xs text-slate-300">Trauma & Critical Care</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-7 h-7 text-sky-400 shrink-0" />
                <div>
                  <strong className="block text-white text-base font-extrabold">50+ Specialists</strong>
                  <span className="text-xs text-slate-300">Across 15 Departments</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=900"
                alt="AegisCare Advanced Hospital Care"
                className="w-full h-[400px] lg:h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Level 1 Trauma Center</span>
                  <p className="text-lg font-black text-white mt-0.5">24/7 Rapid Emergency Response</p>
                </div>
                <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
