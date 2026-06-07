'use client';

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFAB: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-24 right-4 z-40">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
          Tanya Admin
          <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 bg-slate-900" />
        </div>
      )}

      {/* Button with pulse ring */}
      <a
        href="https://wa.me/6285222828303?text=Halo%20Admin%2C%20saya%20ingin%20bertanya%20tentang%20program%20bimbel%20Alazza."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-colors duration-200 hover:bg-green-600"
        aria-label="Chat via WhatsApp"
      >
        {/* Pulse animation ring */}
        <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-25" />
        <MessageCircle className="relative h-6 w-6" strokeWidth={2} />
      </a>
    </div>
  );
};

export default WhatsAppFAB;
