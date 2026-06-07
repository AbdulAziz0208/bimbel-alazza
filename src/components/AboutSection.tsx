'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  return (
    <section className="mx-4 mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-12 md:px-16 md:py-16 shadow-lg"
      >
        {/* Background Decorative Elements */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" />
        
        {/* Dot pattern */}
        <div className="pointer-events-none absolute right-10 bottom-10 grid grid-cols-4 gap-3 opacity-20">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-white" />
          ))}
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-20">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl leading-tight">
              Apa itu Bimbel Alazza?
            </h2>
            <div className="mt-4 h-1.5 w-16 rounded-full bg-amber-400" />
          </div>
          
          <div className="md:w-2/3">
            <p className="text-base leading-relaxed text-blue-50 md:text-lg lg:text-xl font-medium">
              Bimbel Alazza adalah rumah belajar bagi putra-putri tercinta yang
              berfokus pada pendampingan belajar secara intensif dan
              menyenangkan.
            </p>
            <p className="mt-4 text-base leading-relaxed text-blue-100/90 md:text-lg">
              Kami bukan sekadar tempat mengulang pelajaran sekolah, tapi kami
              membantu anak untuk memahami konsep pelajaran dengan cara yang
              mudah dipahami, sehingga mereka lebih percaya diri saat di
              sekolah.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
