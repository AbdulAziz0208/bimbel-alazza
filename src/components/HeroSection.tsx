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
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 px-6 py-12 md:px-12 md:py-20 shadow-[0_8px_30px_rgb(37,99,235,0.3)]"
      >
        {/* Decorative glowing orbs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-indigo-400/30 blur-3xl" />
        <div className="pointer-events-none absolute right-10 bottom-10 h-40 w-40 rounded-full bg-blue-300/20 blur-2xl" />

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
            className="text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md md:text-5xl"
          >
            Wujudkan Potensi Terbaik Anak Bersama Bimbel Alazza
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="mt-4 text-sm leading-relaxed text-blue-50 md:text-lg opacity-90"
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
              className="inline-flex items-center rounded-full border-2 border-white bg-white px-6 py-3 text-sm font-bold text-blue-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-blue-50 active:scale-95 md:px-8 md:text-base"
            >
              Konsultasi Gratis
            </a>
            <button
              onClick={scrollToRegistration}
              className="inline-flex items-center rounded-full border-2 border-white/60 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 active:scale-95 md:px-8 md:text-base"
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
