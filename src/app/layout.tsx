import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Bimbel Alazza — Wujudkan Potensi Terbaik Anak",
  description:
    "Bimbingan belajar terbaik dengan metode interaktif, tutor berpengalaman, dan kelas fokus maksimal 5 anak. Program SD, SMP, SMA, dan Intensif UTBK.",
  keywords: [
    "bimbel",
    "bimbingan belajar",
    "les privat",
    "bimbel SD",
    "bimbel SMP",
    "bimbel SMA",
    "UTBK",
    "Bimbel Alazza",
  ],
  openGraph: {
    title: "Bimbel Alazza — Wujudkan Potensi Terbaik Anak",
    description:
      "Bimbingan belajar terbaik dengan metode interaktif, tutor berpengalaman, dan kelas fokus maksimal 5 anak.",
    type: "website",
    locale: "id_ID",
    siteName: "Bimbel Alazza",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={plusJakarta.variable}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
