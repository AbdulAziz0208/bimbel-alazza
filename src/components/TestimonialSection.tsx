'use client';

import React from 'react';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  childGrade: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Ibu Sari',
    childGrade: 'Orang tua murid kelas 4 SD',
    text: 'Anak saya jadi lebih semangat belajar sejak ikut bimbel di sini. Nilai matematikanya naik drastis!',
  },
  {
    name: 'Bapak Ahmad',
    childGrade: 'Orang tua murid kelas 8 SMP',
    text: 'Tutornya sabar dan sangat memahami karakter anak. Laporan perkembangan juga detail.',
  },
  {
    name: 'Ibu Rina',
    childGrade: 'Orang tua murid kelas 6 SD',
    text: 'Alhamdulillah anak saya diterima di SMP favorit. Terima kasih Bimbel Alazza!',
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="mt-10">
      <h2 className="mx-4 text-lg font-bold text-slate-900 md:text-2xl">
        Kata Orang Tua Murid
      </h2>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Mobile: horizontal scroll / Desktop: grid */}
      <div className="scrollbar-hide mt-5 flex gap-4 overflow-x-auto px-4 pb-2 md:grid md:grid-cols-3 md:overflow-x-visible">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.name}
            className={`min-w-[280px] flex-shrink-0 rounded-2xl bg-white p-6 shadow-sm md:min-w-0 ${
              index === testimonials.length - 1 ? 'mr-4 md:mr-0' : ''
            }`}
          >
            {/* Quote icon */}
            <Quote className="h-8 w-8 text-blue-200" strokeWidth={2} />

            {/* Testimonial text */}
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              &ldquo;{testimonial.text}&rdquo;
            </p>

            {/* Stars */}
            <div className="mt-4 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                  strokeWidth={1.5}
                />
              ))}
            </div>

            {/* Author */}
            <div className="mt-3">
              <p className="text-sm font-semibold text-slate-900">
                {testimonial.name}
              </p>
              <p className="text-xs text-slate-500">{testimonial.childGrade}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
