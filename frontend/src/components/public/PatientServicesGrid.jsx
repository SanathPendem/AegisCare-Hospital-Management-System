import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarCheck, 
  FileText, 
  Pill, 
  Microscope, 
  BedDouble, 
  CreditCard, 
  ArrowUpRight 
} from 'lucide-react';

const services = [
  {
    title: 'Instant Online Appointments',
    description: 'Schedule OPD consultations with top specialists in under 60 seconds with instant confirmation.',
    icon: CalendarCheck,
    link: '/book-appointment',
    btnText: 'Book Appointment'
  },
  {
    title: 'Digital Health Records & Prescriptions',
    description: 'Securely access doctor notes, prescriptions, and health history via your AegisCare patient account.',
    icon: FileText,
    link: '/login',
    btnText: 'Access Patient Portal'
  },
  {
    title: 'Hospital Pharmacy & Medicines',
    description: '24/7 in-house pharmacy with verified prescription dispensing, inventory tracking, and refill requests.',
    icon: Pill,
    link: '/login',
    btnText: 'Manage Prescriptions'
  },
  {
    title: 'Advanced Diagnostic Lab Reports',
    description: 'View and download automated blood test results, radiology imaging, and pathology reports online.',
    icon: Microscope,
    link: '/laboratory',
    btnText: 'Explore Lab Tests'
  },
  {
    title: 'IPD Admission & Bed Allocation',
    description: 'Real-time monitoring of ICU, General Ward, Deluxe, and Suite bed availability for emergency admissions.',
    icon: BedDouble,
    link: '/procedures',
    btnText: 'View Inpatient Care'
  },
  {
    title: 'Transparent Billing & Invoices',
    description: 'Itemized billing statements with one-click printable PDF invoices and insurance claim tracking.',
    icon: CreditCard,
    link: '/login',
    btnText: 'View Invoices'
  }
];

export default function PatientServicesGrid() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-semibold tracking-wider text-sky-700 uppercase bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Integrated Patient Experience
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Seamless Digital Healthcare Services
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Whether visiting in person or managing health remotely, AegisCare provides unified access to clinical operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-sky-300 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-700 text-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => navigate(srv.link)}
                    className="inline-flex items-center text-sm font-bold text-sky-700 hover:text-sky-900 transition"
                  >
                    {srv.btnText}
                    <ArrowUpRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
