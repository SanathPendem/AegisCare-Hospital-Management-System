import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

const testimonials = [
  {
    name: 'Ananya Sharma',
    role: 'Cardiac Surgery Patient',
    content: 'The cardiology team at AegisCare was exceptional. From my bypass surgery preparation to my discharge, Dr. Jenkins and the ICU nurses treated me like family.',
    rating: 5,
    location: 'Hyderabad'
  },
  {
    name: 'Vikramaditya Rao',
    role: 'Orthopedic Knee Replacement',
    content: 'I had severe osteoarthritis in both knees. Thanks to the robotic knee replacement at AegisCare, I was walking pain-free within 48 hours. Truly world-class facility.',
    rating: 5,
    location: 'Bangalore'
  },
  {
    name: 'Priya Mukherjee',
    role: 'Pediatric Care Parent',
    content: 'The pediatric emergency team responded immediately when my daughter had high fever complications. Highly professional, empathetic, and spotless hospital cleanliness.',
    rating: 5,
    location: 'Chennai'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-semibold tracking-wider text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Patient Stories & Feedback
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Trusted by Thousands of Families
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Real stories from real patients who experienced healing and compassionate care at AegisCare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-sky-200" />
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center">
                    {t.name}
                    <CheckCircle className="w-4 h-4 text-emerald-500 ml-1.5 shrink-0" />
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {t.role} • {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
