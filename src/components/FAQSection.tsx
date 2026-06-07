'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-blue-600 focus:outline-none"
      >
        <span className="text-base font-semibold text-slate-900 pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-slate-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-slate-600">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Kapan Jadwal Belajarnya?",
      answer: "Untuk saat ini, beroperasi hari Senin - Jumat dengan sesi jam 14.00-15.00 (60 menit) atau 15.30-17.00 (90 menit)."
    },
    {
      question: "Apakah ada laporan perkembangan anak?",
      answer: "Tentu ada! Kami sangat transparan mengenai progres Ananda. Kami akan memberikan *Laporan Perkembangan Bulanan* yang berisi catatan tentang materi apa saja yang sudah dikuasai dan area mana yang perlu ditingkatkan bersama. Laporan ini kami kirimkan melalui WhatsApp atau print out setiap akhir bulan."
    },
    {
      question: "Bagaimana cara mengetahui kemajuan anak?",
      answer: "Selain laporan tertulis, Ayah/Bunda bisa melihat kemajuan Ananda langsung dari peningkatan antusiasme belajar di rumah, kemandirian dalam mengerjakan PR, serta hasil evaluasi mingguan yang kami lakukan di kelas."
    },
    {
      question: "Apakah ada evaluasi atau ujian berkala?",
      answer: "Ya, kami melakukan evaluasi berkala untuk memastikan pemahaman Ananda benar-benar mendalam. Evaluasi ini dilakukan dalam suasana yang santai agar Ananda tidak merasa tertekan seperti sedang ujian sekolah."
    },
    {
      question: "Apakah mendapatkan sertifikat?",
      answer: "Sebagai apresiasi atas semangat belajar dan pencapaian Ananda di setiap tahapan, kami memberikan *Sertifikat Kelulusan/Pencapaian* dari Bimbel Alazza setelah Ananda menyelesaikan modul-modul tertentu. Ini sangat berguna untuk meningkatkan rasa bangga dan motivasi Ananda agar terus berprestasi. ✨"
    },
    {
      question: "Apakah Bisa Pilih Hari & Jam Sendiri?",
      answer: "Untuk menjaga efektivitas kelas, jadwal sudah disusun. Namun, kami sangat terbuka mendiskusikan ketersediaan slot yang paling pas."
    },
    {
      question: "Berapa Kali Pertemuan dalam Seminggu?",
      answer: "Kami menyediakan opsi paket 4x, 8x, atau 12x pertemuan dalam sebulan (bisa 1x-3x seminggu). Durasi 60 atau 90 menit agar materi tuntas tanpa kelelahan."
    },
    {
      question: "Jika Anak Berhalangan Hadir, Apakah Bisa Ganti Jadwal (Susulan)?",
      answer: "Tentu saja bisa! Silakan infokan maksimal 1 hari sebelumnya agar kami jadwalkan sesi susulan di hari lain selama kuota tersedia."
    }
  ];

  return (
    <section className="mx-auto mt-20 max-w-3xl px-4" id="faq">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="mt-3 text-slate-500">
          Beberapa pertanyaan umum seputar bimbingan belajar di Alazza.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-6 md:p-8 shadow-xl shadow-slate-200/40 border border-slate-100">
        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
