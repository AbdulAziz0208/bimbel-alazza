'use client';

import React from 'react';

const StickyBottomBar: React.FC = () => {
  const scrollToRegistration = () => {
    const el = document.getElementById('registration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:hidden">
      <button
        onClick={scrollToRegistration}
        className="w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700 active:bg-blue-800"
      >
        Daftar Sekarang
      </button>
    </div>
  );
};

export default StickyBottomBar;
