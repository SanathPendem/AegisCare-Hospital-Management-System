import React from 'react';
import TopContactBar from '../../components/public/TopContactBar';
import MainHeader from '../../components/public/MainHeader';
import PrimaryNav from '../../components/public/PrimaryNav';
import HeroSection from '../../components/public/HeroSection';
import QuickBookingBar from '../../components/public/QuickBookingBar';
import DepartmentCards from '../../components/public/DepartmentCards';
import DoctorsShowcase from '../../components/public/DoctorsShowcase';
import WhyChooseUs from '../../components/public/WhyChooseUs';
import StatisticsSection from '../../components/public/StatisticsSection';
import PatientServicesGrid from '../../components/public/PatientServicesGrid';
import TestimonialsSection from '../../components/public/TestimonialsSection';
import PublicFooter from '../../components/public/PublicFooter';
import QuickEnquiryModal from '../../components/public/QuickEnquiryModal';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-rose-500 selection:text-white">
      {/* Top Bar */}
      <TopContactBar />

      {/* Main Header & Nav */}
      <MainHeader />
      <PrimaryNav />

      {/* Hero Section with Quick Search */}
      <HeroSection />

      {/* Quick Interactive Booking Bar */}
      <QuickBookingBar />

      {/* Department Specialties */}
      <DepartmentCards />

      {/* Doctors Showcase */}
      <DoctorsShowcase />

      {/* Why Choose AegisCare */}
      <WhyChooseUs />

      {/* Performance Metrics */}
      <StatisticsSection />

      {/* Integrated Patient Services Grid */}
      <PatientServicesGrid />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Footer */}
      <PublicFooter />

      {/* Floating Side Quick Enquiry */}
      <QuickEnquiryModal />
    </div>
  );
}
