import React from 'react';
import { MapPin, Phone, MessageCircle } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 bg-slate-900 pb-24 pt-10 text-white md:pb-10">
      <div className="mx-auto max-w-5xl px-4">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Logo & description */}
          <div>
            <h3 className="text-xl font-bold text-white">Bimbel Alazza</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Bimbel Alazza hadir untuk membantu anak-anak Indonesia meraih
              potensi terbaik mereka melalui metode belajar interaktif dan tutor
              berpengalaman.
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Hubungi Kami
            </h4>
            <ul className="space-y-4 mt-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-slate-400" />
                <span className="text-sm text-slate-400 leading-relaxed">
                  Kp. Pasar Kaler RT.002 RW. 003 Ds. Balewangi, Kec. Cisurupan-Garut
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-slate-400" />
                <a href="https://wa.me/6285222828303" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">
                  0852-2282-8303
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; 2026 Bimbel Alazza. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/sfwhalf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-colors hover:bg-blue-600 hover:text-white"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/6285222828303"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-colors hover:bg-green-500 hover:text-white"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
