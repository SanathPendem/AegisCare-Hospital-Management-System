import React from 'react';
import TopContactBar from '../../components/public/TopContactBar';
import MainHeader from '../../components/public/MainHeader';
import PrimaryNav from '../../components/public/PrimaryNav';
import PublicFooter from '../../components/public/PublicFooter';
import QuickEnquiryModal from '../../components/public/QuickEnquiryModal';
import QuickBookingBar from '../../components/public/QuickBookingBar';
import { Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PublicBookingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      <TopContactBar />
      <MainHeader />
      <PrimaryNav />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/50">
            Instant Online OPD Booking
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-3">
            Book an OPD Appointment with Senior Specialists
          </h1>
          <p className="mt-3 text-slate-200 max-w-2xl text-base">
            Guaranteed minimal waiting time, instant SMS confirmation, and priority registration.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <QuickBookingBar />

        {/* Benefits list */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Instant Confirmation</h4>
              <p className="text-xs text-slate-600 mt-1">Receive immediate appointment reference ID & SMS updates.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Zero Upfront Payment</h4>
              <p className="text-xs text-slate-600 mt-1">Pay consultation fee at hospital desk or digitally post-consultation.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Priority Consultation Slot</h4>
              <p className="text-xs text-slate-600 mt-1">Dedicated express desk for online booked appointments.</p>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
      <QuickEnquiryModal />
    </div>
  );
}
