'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

const painPoints = [
  'Belum lancar membaca, menulis, atau berhitung',
  'Kurang percaya diri saat belajar',
  'Sulit fokus ketika mengerjakan tugas sekolah',
  'Tertinggal materi pelajaran di sekolah',
  'Kurangnya pembiasaan adab dan karakter positif',
  'Terkendala waktu luang untuk mendampingi belajar',
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const PainPointsSection: React.FC = () => {
  return (
    <section className="mx-4 mt-12 mb-8">
      <div className="rounded-3xl bg-slate-50 px-6 py-10 md:px-12 md:py-14 shadow-sm border border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-xl font-bold text-slate-900 md:text-3xl">
            Apakah Ayah Bunda Mengalami Hal Ini?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg max-w-2xl mx-auto">
            Setiap anak memiliki cara belajar berbeda. Di tengah kesibukan,
            banyak anak yang mengalami kesulitan belajar seperti:
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 max-w-4xl mx-auto"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm border border-slate-100"
            >
              <div className="flex-shrink-0 mt-0.5">
                <XCircle className="h-6 w-6 text-red-400" strokeWidth={2} />
              </div>
              <p className="text-sm font-medium text-slate-700 leading-relaxed md:text-base">
                {point}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 mx-auto max-w-3xl rounded-2xl bg-blue-50/50 p-6 md:p-8 border border-blue-100 text-center"
        >
          <p className="text-base font-semibold leading-relaxed text-blue-900 md:text-lg">
            Kami memahami hal tersebut. Oleh karena itu, Bimbel Alazza hadir
            untuk membantu anak belajar dengan suasana yang nyaman, menyenangkan,
            dan penuh kasih sayang.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PainPointsSection;
