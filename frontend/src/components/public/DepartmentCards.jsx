import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Brain, 
  Bone, 
  Stethoscope, 
  ShieldAlert, 
  Baby, 
  Activity, 
  Microscope, 
  ArrowRight 
} from 'lucide-react';

const departments = [
  {
    id: 'cardiology',
    name: 'Cardiology & Heart Care',
    icon: Heart,
    color: 'bg-rose-50 text-rose-600 border-rose-100',
    hoverBg: 'group-hover:bg-rose-600 group-hover:text-white',
    doctorsCount: '12 Specialists',
    description: 'Comprehensive cardiovascular care including interventional cardiology, heart surgery, and electrophysiology.'
  },
  {
    id: 'neurology',
    name: 'Neurology & Neurosurgery',
    icon: Brain,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    hoverBg: 'group-hover:bg-indigo-600 group-hover:text-white',
    doctorsCount: '8 Specialists',
    description: 'Advanced diagnosis and surgical treatment for stroke, epilepsy, neurodegenerative disorders, and spine care.'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Joint Replacement',
    icon: Bone,
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    hoverBg: 'group-hover:bg-amber-600 group-hover:text-white',
    doctorsCount: '10 Specialists',
    description: 'Robotic-assisted knee/hip joint replacements, sports injury management, and trauma reconstruction.'
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology & Hepatology',
    icon: Stethoscope,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    hoverBg: 'group-hover:bg-emerald-600 group-hover:text-white',
    doctorsCount: '7 Specialists',
    description: 'Expert care for liver disorders, digestive diseases, endoscopic procedures, and organ transplantation.'
  },
  {
    id: 'emergency',
    name: '24/7 Trauma & Emergency',
    icon: ShieldAlert,
    color: 'bg-red-50 text-red-600 border-red-100',
    hoverBg: 'group-hover:bg-red-600 group-hover:text-white',
    doctorsCount: '15 Emergency Physicians',
    description: 'Level 1 Trauma center equipped with ultra-fast triage, cardiac resuscitation, and ICU ambulances.'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Neonatology',
    icon: Baby,
    color: 'bg-sky-50 text-sky-600 border-sky-100',
    hoverBg: 'group-hover:bg-sky-600 group-hover:text-white',
    doctorsCount: '9 Specialists',
    description: 'Specialized neonatal ICU (NICU), pediatric surgery, and child health immunization programs.'
  },
  {
    id: 'oncology',
    name: 'Comprehensive Cancer Care',
    icon: Activity,
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    hoverBg: 'group-hover:bg-purple-600 group-hover:text-white',
    doctorsCount: '11 Oncologists',
    description: 'Precision radiation therapy, medical oncology, immunotherapy, and multidisciplinary tumor boards.'
  },
  {
    id: 'pathology',
    name: 'Advanced Diagnostics & Lab',
    icon: Microscope,
    color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    hoverBg: 'group-hover:bg-cyan-600 group-hover:text-white',
    doctorsCount: '6 Pathologists',
    description: 'Fully automated diagnostic lab, 3T MRI, 128-Slice CT scanner, and molecular diagnostic testing.'
  }
];

export default function DepartmentCards() {
  const navigate = useNavigate();

  return (
    <section className="section bg-slate-50 border-b border-slate-200">
      <div className="section-container">
        <div className="section-header">
          <span className="text-xs font-extrabold tracking-widest text-rose-600 uppercase bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100 shadow-xs">
            CENTER OF EXCELLENCE
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900">
            World-Class Clinical Specialties
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            AegisCare brings together renowned medical experts, cutting-edge surgical technology, and compassionate patient care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.id}
                onClick={() => navigate(`/departments?dept=${dept.id}`)}
                className="group relative bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-sky-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-colors duration-300 ${dept.color} ${dept.hoverBg} mb-6`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="inline-block text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full mb-3 border border-sky-100">
                    {dept.doctorsCount}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {dept.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-sky-700 group-hover:text-sky-800">
                  <span>Explore Department</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={() => navigate('/departments')}
            className="inline-flex items-center px-8 h-13 border-2 border-sky-700 text-base font-extrabold rounded-xl text-sky-700 bg-white hover:bg-sky-50 shadow-md transition"
          >
            View All Departments & Medical Services
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
