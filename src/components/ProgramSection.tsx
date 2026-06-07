'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Sparkles } from 'lucide-react';

const ProgramSection: React.FC = () => {
  const scrollToRegistration = () => {
    const el = document.getElementById('registration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="mt-16 px-4 max-w-5xl mx-auto" id="programs">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">
          Rincian Investasi Pendidikan
        </h2>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm border border-blue-100">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Biaya Pendaftaran GRATIS! ✨
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm border border-blue-100">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Biaya Modul Termasuk! ✨
          </div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
      >
        {/* Level 1 Card */}
        <motion.div
          variants={cardVariants}
          className="relative rounded-3xl bg-white p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Level 1: Fokus & Intensif</h3>
            <div className="flex items-center gap-2 text-blue-600 font-medium bg-blue-50 w-fit px-3 py-1 rounded-full text-sm">
              <Clock className="w-4 h-4" />
              60 Menit
            </div>
          </div>

          <div className="mb-6 pb-6 border-b border-slate-100">
            <div className="text-sm font-medium text-slate-500 mb-1">Mulai dari</div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-slate-900">Rp 10.000</span>
              <span className="text-slate-500">/ pertemuan</span>
            </div>
            <div className="mt-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
              <span className="font-semibold text-slate-700">Cocok untuk:</span> PAUD atau SD kelas 1-2
            </div>
          </div>

          <ul className="mb-8 space-y-3">
            {[
              "Pas dengan rentang konsentrasi anak yang pendek.",
              "Anak tidak cepat bosan atau lelah.",
              "Menjaga mood belajar agar tetap ceria."
            ].map((adv, i) => (
              <li key={i} className="flex gap-3 text-slate-600 text-sm">
                <Check className="w-5 h-5 text-blue-500 shrink-0" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-3">
            <div className="text-sm font-bold text-slate-900 mb-3">Pilihan Paket:</div>
            <div className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-sm font-medium text-slate-700">12x pertemuan</span>
              <span className="text-sm font-bold text-slate-900">Rp 120.000<span className="font-normal text-slate-500 text-xs">/bln</span></span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-sm font-medium text-slate-700">8x pertemuan</span>
              <span className="text-sm font-bold text-slate-900">Rp 80.000<span className="font-normal text-slate-500 text-xs">/bln</span></span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-sm font-medium text-slate-700">4x pertemuan</span>
              <span className="text-sm font-bold text-slate-900">Rp 40.000<span className="font-normal text-slate-500 text-xs">/bln</span></span>
            </div>
          </div>

          <button
            onClick={scrollToRegistration}
            className="mt-8 w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Pilih Paket Level 1
          </button>
        </motion.div>

        {/* Level 2 Card */}
        <motion.div
          variants={cardVariants}
          className="relative rounded-3xl bg-white p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-purple-500"></div>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Level 2: Mendalam & Komprehensif</h3>
            <div className="flex items-center gap-2 text-purple-600 font-medium bg-purple-50 w-fit px-3 py-1 rounded-full text-sm">
              <Clock className="w-4 h-4" />
              90 Menit
            </div>
          </div>

          <div className="mb-6 pb-6 border-b border-slate-100">
            <div className="text-sm font-medium text-slate-500 mb-1">Mulai dari</div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-slate-900">Rp 15.000</span>
              <span className="text-slate-500">/ pertemuan</span>
            </div>
            <div className="mt-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
              <span className="font-semibold text-slate-700">Cocok untuk:</span> SD kelas 3-6 (atau yang mengejar ketertinggalan materi)
            </div>
          </div>

          <ul className="mb-8 space-y-3">
            {[
              "Leluasa membahas PR dan pendalaman materi.",
              "Diskusi dua arah lebih panjang.",
              "Latihan soal lebih banyak (persiapan ujian)."
            ].map((adv, i) => (
              <li key={i} className="flex gap-3 text-slate-600 text-sm">
                <Check className="w-5 h-5 text-purple-500 shrink-0" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-3">
            <div className="text-sm font-bold text-slate-900 mb-3">Pilihan Paket:</div>
            <div className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-sm font-medium text-slate-700">12x pertemuan</span>
              <span className="text-sm font-bold text-slate-900">Rp 180.000<span className="font-normal text-slate-500 text-xs">/bln</span></span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-sm font-medium text-slate-700">8x pertemuan</span>
              <span className="text-sm font-bold text-slate-900">Rp 120.000<span className="font-normal text-slate-500 text-xs">/bln</span></span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-sm font-medium text-slate-700">4x pertemuan</span>
              <span className="text-sm font-bold text-slate-900">Rp 60.000<span className="font-normal text-slate-500 text-xs">/bln</span></span>
            </div>
          </div>

          <button
            onClick={scrollToRegistration}
            className="mt-8 w-full rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Pilih Paket Level 2
          </button>
        </motion.div>
      </motion.div>

      <div className="mt-12 text-center px-4 w-full">
        <div className="text-sm text-slate-600 bg-white inline-block px-6 py-5 rounded-3xl shadow-sm border border-slate-200 text-left w-full max-w-2xl">
          <p className="mb-4 text-center">
            <span className="font-semibold text-slate-800">Catatan:</span> Biaya sudah meliputi fasilitas pembelajaran anak seperti Lembar Aktivitas & Modul. <br className="hidden sm:block" />
            <span className="font-semibold text-blue-600">Pembayaran dilakukan pada saat pendaftaran di awal, bisa transfer atau cash.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 justify-center items-center pt-5 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="px-2 py-1">
                <img src="/images/bni.png" alt="BNI" className="h-6 object-contain" />
              </div>
              <div className="text-sm">
                <div className="font-bold text-slate-800 text-base">1396291568</div>
                <div className="text-slate-500 text-xs">a.n Sopi Nursopwah Alfiyani</div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="px-2 py-1">
                <img src="/images/dana.svg" alt="DANA" className="h-6 object-contain" />
              </div>
              <div className="text-sm">
                <div className="font-bold text-slate-800 text-base">085222828303</div>
                <div className="text-slate-500 text-xs">Bimbel Alazza</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
