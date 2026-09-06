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
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-sm font-bold tracking-wider text-emerald-700 uppercase bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 shadow-sm">
            Patient Stories & Feedback
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Trusted by Thousands of Families
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Real stories from real patients who experienced healing and compassionate care at AegisCare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-10 h-10 text-sky-200" />
                </div>
                <p className="text-slate-700 text-base leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-extrabold text-slate-900 flex items-center">
                    {t.name}
                    <CheckCircle className="w-4 h-4 text-emerald-500 ml-2 shrink-0" />
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
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
