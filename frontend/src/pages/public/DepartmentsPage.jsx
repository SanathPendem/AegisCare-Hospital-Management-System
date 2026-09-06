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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      <TopContactBar />
      <MainHeader />
      <PrimaryNav />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/50">
            Centers of Excellence
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-3">
            Clinical Departments & Specialties
          </h1>
          <p className="mt-3 text-slate-200 max-w-2xl text-base">
            Discover our world-class medical departments led by renowned doctors equipped with advanced diagnostic and surgical tools.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeDept && (
          <div className="mb-8 p-4 bg-sky-50 border border-sky-200 rounded-xl flex items-center justify-between">
            <span className="text-sm font-semibold text-sky-900 capitalize">
              Selected Specialty: <strong className="text-sky-700">{activeDept}</strong>
            </span>
            <button
              onClick={() => navigate('/book-appointment')}
              className="px-4 py-1.5 bg-sky-700 hover:bg-sky-800 text-white rounded-lg text-xs font-bold shadow-sm transition"
            >
              Book Doctor in {activeDept}
            </button>
          </div>
        )}

        <DepartmentCards />
      </main>

      <PublicFooter />
      <QuickEnquiryModal />
    </div>
  );
}
