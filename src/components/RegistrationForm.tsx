'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Turnstile } from '@marsidev/react-turnstile';
import { CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUTMParams } from '@/hooks/useUTMParams';
import { submitRegistration } from '@/app/actions/register';

const registrationSchema = z.object({
  parentName: z.string().min(3, 'Nama minimal 3 karakter'),
  parentWhatsapp: z
    .string()
    .min(10, 'Nomor WA minimal 10 digit')
    .max(15, 'Nomor WA maksimal 15 digit')
    .regex(/^[0-9]+$/, 'Hanya boleh angka'),
  studentName: z.string().min(3, 'Nama minimal 3 karakter'),
  schoolOrigin: z.string().optional(),
  gradeLevel: z.string().min(1, 'Pilih kelas'),
  programChoice: z.string().min(1, 'Pilih program'),
});

type FormData = z.infer<typeof registrationSchema>;

const gradeOptions = [
  { label: 'Pra Sekolah/PAUD/TK', value: 'Pra Sekolah/PAUD/TK' },
  { label: 'SD Kelas 1', value: 'SD Kelas 1' },
  { label: 'SD Kelas 2', value: 'SD Kelas 2' },
  { label: 'SD Kelas 3', value: 'SD Kelas 3' },
  { label: 'SD Kelas 4', value: 'SD Kelas 4' },
  { label: 'SD Kelas 5', value: 'SD Kelas 5' },
  { label: 'SD Kelas 6', value: 'SD Kelas 6' },
];

const programOptions = [
  { label: 'Level 1 (60 Menit) - PAUD/SD 1-2', value: 'Level 1 (60 Menit) - PAUD/SD 1-2' },
  { label: 'Level 2 (90 Menit) - SD 3-6', value: 'Level 2 (90 Menit) - SD 3-6' },
];

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const utmParams = useUTMParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      parentName: '',
      parentWhatsapp: '',
      studentName: '',
      schoolOrigin: '',
      gradeLevel: '',
      programChoice: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await submitRegistration({
        ...data,
        turnstileToken: turnstileToken || '',
        utmSource: utmParams.utm_source,
        utmMedium: utmParams.utm_medium,
        utmCampaign: utmParams.utm_campaign,
        referrerSource: utmParams.referrer_source,
      });
      if (result.success) {
        setIsSuccess(true);
        setSubmittedData(data);
      } else {
        setError(result.error || 'Terjadi kesalahan. Silakan coba lagi.');
      }
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const getWhatsAppUrl = (): string => {
    if (!submittedData) return '#';
    const message = `_Assalaamu'alaikum_, saya ${submittedData.parentName} orang tua dari *${submittedData.studentName}*, baru saja mengisi form pendaftaran di website untuk program ${submittedData.programChoice}. Saya ingin konfirmasi lebih lanjut.`;
    return `https://wa.me/6285222828303?text=${encodeURIComponent(message)}`;
  };

  const inputClasses =
    'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all';
  const labelClasses = 'block text-sm font-medium text-slate-700 mb-1';
  const errorClasses = 'text-red-500 text-xs mt-1';

  return (
    <section id="registration" className="py-20 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Daftar Sekarang
          </h2>
          <p className="text-slate-600 text-lg">
            Isi form di bawah ini untuk mendaftarkan anak Anda
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSuccess && submittedData ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center"
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Terima kasih!
              </h3>
              <p className="text-slate-600 mb-8">
                Data pendaftaran {submittedData.studentName} telah kami terima.
              </p>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Lanjutkan ke WhatsApp
              </a>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-10"
            >
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                {/* Nama Orang Tua */}
                <div>
                  <label htmlFor="parentName" className={labelClasses}>
                    Nama Orang Tua
                  </label>
                  <input
                    id="parentName"
                    type="text"
                    className={inputClasses}
                    placeholder="Masukkan nama orang tua"
                    {...register('parentName')}
                    suppressHydrationWarning
                  />
                  {errors.parentName && (
                    <p className={errorClasses}>{errors.parentName.message}</p>
                  )}
                </div>

                {/* Nomor WhatsApp */}
                <div>
                  <label htmlFor="parentWhatsapp" className={labelClasses}>
                    Nomor WhatsApp
                  </label>
                  <input
                    id="parentWhatsapp"
                    type="tel"
                    className={inputClasses}
                    placeholder="08xxxxxxxxxx"
                    {...register('parentWhatsapp')}
                    suppressHydrationWarning
                  />
                  {errors.parentWhatsapp && (
                    <p className={errorClasses}>
                      {errors.parentWhatsapp.message}
                    </p>
                  )}
                </div>

                {/* Nama Lengkap Anak */}
                <div>
                  <label htmlFor="studentName" className={labelClasses}>
                    Nama Lengkap Anak
                  </label>
                  <input
                    id="studentName"
                    type="text"
                    className={inputClasses}
                    placeholder="Masukkan nama lengkap anak"
                    {...register('studentName')}
                    suppressHydrationWarning
                  />
                  {errors.studentName && (
                    <p className={errorClasses}>{errors.studentName.message}</p>
                  )}
                </div>

                {/* Asal Sekolah */}
                <div>
                  <label htmlFor="schoolOrigin" className={labelClasses}>
                    Asal Sekolah{' '}
                    <span className="text-slate-400 font-normal">
                      (opsional)
                    </span>
                  </label>
                  <input
                    id="schoolOrigin"
                    type="text"
                    className={inputClasses}
                    placeholder="Masukkan asal sekolah"
                    {...register('schoolOrigin')}
                    suppressHydrationWarning
                  />
                </div>

                {/* Kelas */}
                <div>
                  <label htmlFor="gradeLevel" className={labelClasses}>
                    Kelas
                  </label>
                  <select
                    id="gradeLevel"
                    className={inputClasses}
                    defaultValue=""
                    {...register('gradeLevel')}
                    suppressHydrationWarning
                  >
                    <option value="" disabled>
                      Pilih kelas
                    </option>
                    {gradeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.gradeLevel && (
                    <p className={errorClasses}>{errors.gradeLevel.message}</p>
                  )}
                </div>

                {/* Program */}
                <div>
                  <label htmlFor="programChoice" className={labelClasses}>
                    Program
                  </label>
                  <select
                    id="programChoice"
                    className={inputClasses}
                    defaultValue=""
                    {...register('programChoice')}
                    suppressHydrationWarning
                  >
                    <option value="" disabled>
                      Pilih program
                    </option>
                    {programOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.programChoice && (
                    <p className={errorClasses}>
                      {errors.programChoice.message}
                    </p>
                  )}
                </div>

                {/* Cloudflare Turnstile */}
                {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                  <div className="flex justify-center">
                    <Turnstile
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                      onSuccess={(token) => setTurnstileToken(token)}
                      onError={() => setTurnstileToken(null)}
                      onExpire={() => setTurnstileToken(null)}
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-full transition-colors flex items-center justify-center gap-2"
                  suppressHydrationWarning
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    'Daftar Sekarang'
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
