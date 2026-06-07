'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Heart } from 'lucide-react';

interface Benefit {
  title: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const benefits: Benefit[] = [
  {
    title: 'Kelas Eksklusif',
    description:
      'Satu sesi maksimal hanya 5 anak, supaya pendampingan lebih personal dan maksimal.',
    icon: Users,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Kurikulum Terstruktur',
    description:
      'Kami menggunakan modul pembelajaran yang sistematis sehingga materi lebih terarah.',
    icon: BookOpen,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    title: 'Pembiasaan Adab Keseharian',
    description:
      'Selain fokus pada akademik, kami menanamkan adab dan karakter baik agar anak tumbuh menjadi pribadi berakhlak mulia.',
    icon: Heart,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const BenefitSection: React.FC = () => {
  return (
    <section className="mx-4 mt-10">
      <h2 className="text-xl font-extrabold text-slate-900 md:text-3xl tracking-tight">
        Apa saja keunggulan di Bimbel Alazza?
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={benefit.title}
              variants={cardVariants}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-100 group"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${benefit.iconBg}`}
              >
                <Icon
                  className={`h-7 w-7 ${benefit.iconColor}`}
                  strokeWidth={2}
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {benefit.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-10 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/50 p-8 text-center shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-indigo-100 rounded-full blur-2xl opacity-50"></div>
        <p className="relative z-10 text-base font-semibold italic leading-relaxed text-slate-700 md:text-lg">
          "Kami percaya, setiap anak adalah bisa dengan caranya sendiri. Apakah
          Ayah/Bunda sedang mencari tempat belajar yang nyaman untuk Ananda?"
        </p>
      </motion.div>
    </section>
  );
};

export default BenefitSection;
