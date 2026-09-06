import React from 'react';
import { Link } from 'react-router-dom';
import { Cross, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Banner */}
      <div className="bg-sky-950 border-b border-sky-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold">
              24/7
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">Emergency & Trauma Hotline</h4>
              <p className="text-slate-400 text-xs">Immediate dispatch & cardiac resuscitation team on standby</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="tel:18004567890"
              className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md transition flex items-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call +91 (800) 456-7890
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-md">
                <Cross className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Aegis<span className="text-rose-500">Care</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              AegisCare is a premier multi-specialty quaternary care hospital committed to clinical excellence, patient safety, and compassionate healthcare.
            </p>
            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <p className="flex items-center">
                <MapPin className="w-4 h-4 text-sky-400 mr-2 shrink-0" />
                Plot 42, Healthcare City Blvd, Cyber Hills, Hyderabad - 500081
              </p>
              <p className="flex items-center">
                <Mail className="w-4 h-4 text-sky-400 mr-2 shrink-0" />
                contact@aegiscare.com | info@aegiscare.com
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About AegisCare</Link></li>
              <li><Link to="/departments" className="hover:text-white transition">Specialties & Centers</Link></li>
              <li><Link to="/doctors" className="hover:text-white transition">Find a Doctor</Link></li>
              <li><Link to="/procedures" className="hover:text-white transition">Clinical Procedures</Link></li>
              <li><Link to="/laboratory" className="hover:text-white transition">Laboratory & Diagnostics</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact & Support</Link></li>
            </ul>
          </div>

          {/* Col 3: Key Specialties */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Specialties
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/departments?dept=cardiology" className="hover:text-white transition">Cardiology & Heart Surgery</Link></li>
              <li><Link to="/departments?dept=neurology" className="hover:text-white transition">Neurology & Spine Care</Link></li>
              <li><Link to="/departments?dept=orthopedics" className="hover:text-white transition">Orthopedics & Joint Replacement</Link></li>
              <li><Link to="/departments?dept=oncology" className="hover:text-white transition">Comprehensive Oncology</Link></li>
              <li><Link to="/departments?dept=pediatrics" className="hover:text-white transition">Pediatrics & NICU</Link></li>
              <li><Link to="/departments?dept=gastroenterology" className="hover:text-white transition">Gastroenterology</Link></li>
            </ul>
          </div>

          {/* Col 4: Portals & Access */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Management Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/login" className="text-sky-400 font-semibold hover:text-sky-300 transition flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  Sign In to Portal
                </Link>
              </li>
              <li><Link to="/book-appointment" className="hover:text-white transition">Book Consultation</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Patient Dashboard</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Doctor Portal</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Reception & Billing</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Pharmacy & Inventory</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AegisCare Hospital Management System. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition">Patient Rights & Responsibilities</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
