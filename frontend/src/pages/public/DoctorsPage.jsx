import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import TopContactBar from '../../components/public/TopContactBar';
import MainHeader from '../../components/public/MainHeader';
import PrimaryNav from '../../components/public/PrimaryNav';
import PublicFooter from '../../components/public/PublicFooter';
import QuickEnquiryModal from '../../components/public/QuickEnquiryModal';
import { Search, Filter, Calendar, Star, ShieldCheck, Stethoscope } from 'lucide-react';

const fallbackDoctors = [
  {
    id: 1,
    user: { first_name: 'Sarah', last_name: 'Jenkins' },
    specialty: 'Cardiology',
    qualification: 'MD, DM (Cardiology), FACC',
    experience_years: 16,
    consultation_fee: 1500,
    availability_schedule: 'Mon - Fri (09:00 AM - 04:00 PM)',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    user: { first_name: 'Robert', last_name: 'Chen' },
    specialty: 'Neurology',
    qualification: 'MBBS, MCh (Neurosurgery)',
    experience_years: 20,
    consultation_fee: 1800,
    availability_schedule: 'Mon - Sat (10:00 AM - 05:00 PM)',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    user: { first_name: 'Elena', last_name: 'Rostova' },
    specialty: 'Orthopedics',
    qualification: 'MS (Orthopedics), Fellowship (Joint Replacement)',
    experience_years: 14,
    consultation_fee: 1400,
    availability_schedule: 'Tue - Sun (09:30 AM - 03:30 PM)',
    image: 'https://images.unsplash.com/photo-1594824813571-28a778853914?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 4,
    user: { first_name: 'Marcus', last_name: 'Vance' },
    specialty: 'Pediatrics',
    qualification: 'MD (Pediatrics), DCH',
    experience_years: 12,
    consultation_fee: 1200,
    availability_schedule: 'Mon - Fri (08:30 AM - 02:30 PM)',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 5,
    user: { first_name: 'Aisha', last_name: 'Patel' },
    specialty: 'Oncology',
    qualification: 'MD, DM (Medical Oncology)',
    experience_years: 18,
    consultation_fee: 2000,
    availability_schedule: 'Mon - Thu (10:00 AM - 04:00 PM)',
    image: 'https://images.unsplash.com/photo-1594824813571-28a778853914?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 6,
    user: { first_name: 'David', last_name: 'Kim' },
    specialty: 'Gastroenterology',
    qualification: 'MD, DM (Gastroenterology)',
    experience_years: 15,
    consultation_fee: 1600,
    availability_schedule: 'Mon - Sat (09:00 AM - 03:00 PM)',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'
  }
];

export default function DoctorsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState(searchParams.get('dept') || '');

  useEffect(() => {
    async function loadDoctors() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/v1/doctors/');
        const data = res.data.results || res.data || [];
        if (data.length > 0) {
          setDoctors(data);
        } else {
          setDoctors(fallbackDoctors);
        }
      } catch (err) {
        setDoctors(fallbackDoctors);
      } finally {
        setLoading(false);
      }
    }
    loadDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doc) => {
    const fullName = `${doc.user?.first_name || ''} ${doc.user?.last_name || ''}`.toLowerCase();
    const specialty = (doc.specialty || '').toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || specialty.includes(searchTerm.toLowerCase());
    const matchesDept = !selectedDept || specialty.includes(selectedDept.toLowerCase());
    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      <TopContactBar />
      <MainHeader />
      <PrimaryNav />

      {/* Page Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/50">
            Find Your Specialist
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-3">
            Consult Senior Medical Specialists
          </h1>
          <p className="mt-3 text-slate-200 max-w-2xl text-base">
            Book in-person or video consultations with board-certified consultants across 15+ specialties.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search doctor by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600 outline-none"
            />
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600 outline-none w-full sm:w-auto"
            >
              <option value="">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Oncology">Oncology</option>
              <option value="Gastroenterology">Gastroenterology</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-slate-200 h-80 rounded-xl" />
            ))}
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <p className="text-lg font-bold text-slate-700">No doctors matching your filter criteria.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedDept(''); }}
              className="mt-4 text-sky-700 font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc, idx) => {
              const fullName = doc.user ? `Dr. ${doc.user.first_name || ''} ${doc.user.last_name || ''}`.trim() : 'Dr. Senior Consultant';
              const imgUrl = doc.image || fallbackDoctors[idx % fallbackDoctors.length].image;

              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-64 overflow-hidden bg-slate-100">
                      <img
                        src={imgUrl}
                        alt={fullName}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full border border-slate-200 text-xs font-semibold text-amber-600 flex items-center shadow-sm">
                        <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 mr-1" />
                        4.9 Verified
                      </div>
                      <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium flex items-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                        {doc.experience_years || 15}+ Yrs Exp
                      </div>
                    </div>

                    <div className="p-5">
                      <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                        {doc.specialty || 'General Medicine'}
                      </span>
                      <h3 className="mt-2 text-xl font-bold text-slate-900">{fullName}</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{doc.qualification || 'MBBS, MD'}</p>

                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Consultation Fee:</span>
                          <span className="font-bold text-slate-900">₹{doc.consultation_fee || 1200}</span>
                        </div>
                        <div className="flex items-center text-slate-500 truncate">
                          <Stethoscope className="w-3.5 h-3.5 mr-1 text-sky-600 shrink-0" />
                          <span className="truncate">{doc.availability_schedule || 'Mon-Fri (9:00 AM - 4:00 PM)'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => navigate(`/book-appointment?doctor_id=${doc.id}`)}
                      className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-sky-700 rounded-lg text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 transition shadow-sm"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Consultation
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <PublicFooter />
      <QuickEnquiryModal />
    </div>
  );
}
