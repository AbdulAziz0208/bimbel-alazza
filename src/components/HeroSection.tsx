'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const scrollToRegistration = () => {
    const el = document.getElementById('registration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mx-4 mt-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-10 md:px-12 md:py-16"
      >
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute right-16 bottom-12 h-20 w-20 rounded-full bg-white/5" />

        {/* Dot pattern */}
        <div className="pointer-events-none absolute right-6 top-6 grid grid-cols-3 gap-2 opacity-20">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-white" />
          ))}
        </div>
        <div className="pointer-events-none absolute left-10 bottom-8 grid grid-cols-3 gap-2 opacity-15">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-white" />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="text-2xl font-extrabold leading-tight text-white md:text-4xl"
          >
            Wujudkan Potensi Terbaik Anak Bersama Bimbel Alazza
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="mt-3 text-sm leading-relaxed text-blue-100 md:text-base"
          >
            Rumah belajar yang berfokus pada pendampingan intensif, nyaman, dan menyenangkan. Bukan sekadar mengulang pelajaran, tapi membantu anak memahami konsep dasar dengan percaya diri dan pembiasaan adab keseharian
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <a
              href="https://wa.me/6285222828303?text=Halo%20Admin%2C%20saya%20ingin%20konsultasi%20tentang%20program%20bimbel%20Alazza."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border-2 border-white bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 transition-colors duration-200 hover:bg-blue-50"
            >
              Konsultasi Gratis
            </a>
            <button
              onClick={scrollToRegistration}
              className="inline-flex items-center rounded-full border-2 border-white/60 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              Daftar Sekarang
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
