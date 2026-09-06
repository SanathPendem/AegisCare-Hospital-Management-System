import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserCheck, Star, Calendar, ArrowRight, ShieldCheck, Stethoscope } from 'lucide-react';

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
  }
];

export default function DoctorsShowcase() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/doctors/');
        const data = response.data.results || response.data || [];
        if (data.length > 0) {
          setDoctors(data.slice(0, 4));
        } else {
          setDoctors(fallbackDoctors);
        }
      } catch (err) {
        console.warn('Backend doctors fetch failed, using fallback doctors:', err);
        setDoctors(fallbackDoctors);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  return (
    <section className="section bg-white border-b border-slate-200">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-sky-700 uppercase bg-sky-50 px-4 py-1.5 rounded-full border border-sky-100 shadow-xs">
              EXPERT CLINICAL TEAM
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Meet Our Senior Consultants
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
              Board-certified specialists bringing international expertise, clinical innovation, and compassionate patient care.
            </p>
          </div>
          <button
            onClick={() => navigate('/doctors')}
            className="mt-6 md:mt-0 inline-flex items-center text-sky-700 font-extrabold text-base hover:text-sky-900 transition"
          >
            View All Doctors <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-slate-100 h-[420px] rounded-2xl border border-slate-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doc, idx) => {
              const fullName = doc.user ? `Dr. ${doc.user.first_name || ''} ${doc.user.last_name || ''}`.trim() : 'Dr. Senior Consultant';
              const imgUrl = doc.image || fallbackDoctors[idx % fallbackDoctors.length].image;
              
              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-72 overflow-hidden bg-slate-100">
                      <img
                        src={imgUrl}
                        alt={fullName}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200 text-xs font-bold text-amber-600 flex items-center shadow-sm">
                        <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 mr-1" />
                        4.9 (120+ reviews)
                      </div>
                      <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold flex items-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                        {doc.experience_years || 15}+ Yrs Exp
                      </div>
                    </div>

                    <div className="p-6">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                        {doc.specialty || 'General Medicine'}
                      </span>
                      <h3 className="mt-3 text-xl font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors">
                        {fullName}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 font-semibold line-clamp-1">
                        {doc.qualification || 'MBBS, MD'}
                      </p>

                      <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Consultation Fee:</span>
                          <span className="font-extrabold text-slate-900 text-sm">₹{doc.consultation_fee || 1200}</span>
                        </div>
                        <div className="flex items-center text-slate-500 truncate">
                          <Stethoscope className="w-4 h-4 mr-1.5 text-sky-600 shrink-0" />
                          <span className="truncate font-medium">{doc.availability_schedule || 'Mon-Fri (9:00 AM - 4:00 PM)'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => navigate(`/book-appointment?doctor_id=${doc.id}`)}
                      className="w-full inline-flex items-center justify-center px-4 py-3 border border-sky-700 rounded-xl text-sm font-bold text-white bg-sky-700 hover:bg-sky-800 transition shadow-sm"
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
      </div>
    </section>
  );
}
