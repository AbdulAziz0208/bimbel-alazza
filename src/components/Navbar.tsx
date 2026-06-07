'use client';

import React from 'react';

const Navbar: React.FC = () => {
  const scrollToRegistration = () => {
    const el = document.getElementById('registration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 flex items-center justify-between px-4 md:px-8">
      <span className="font-bold text-xl text-blue-600 tracking-tight">
        Bimbel Alazza
      </span>
      <button
        onClick={scrollToRegistration}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full px-5 py-2 transition-colors duration-200"
      >
        Daftar
      </button>
    </nav>
  );
};

export default Navbar;
