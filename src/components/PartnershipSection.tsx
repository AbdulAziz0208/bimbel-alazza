'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const PartnershipSection: React.FC = () => {
  return (
    <section className="mx-auto mt-20 mb-10 max-w-4xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-slate-50 border border-slate-200 p-8 md:p-12 text-center"
      >
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl mb-6">
          Kemitraan Resmi
        </h2>
        <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
          "Dalam memberikan layanan bimbingan belajar, kami didukung oleh sistem dan kurikulum dari <strong>Missisti</strong>. Berikut adalah bukti legalitas kemitraan kami sebagai mitra resmi <strong>Missisti</strong> yang berdedikasi untuk kemajuan belajar siswa."
        </p>
        
        <div className="relative mx-auto w-full max-w-2xl rounded-xl overflow-hidden shadow-lg border border-slate-200">
          <Image
            src="/images/sertifikat.jpeg"
            alt="Sertifikat Kemitraan Bimbel Alazza dengan Missisti"
            width={1200}
            height={848}
            className="w-full h-auto object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default PartnershipSection;
