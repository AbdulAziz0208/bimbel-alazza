'use client';

import React from 'react';
import { BookOpen, GraduationCap, Award, UserCheck } from 'lucide-react';

interface MenuItem {
  label: string;
  icon: React.ElementType;
  bgColor: string;
  iconColor: string;
}

const menus: MenuItem[] = [
  {
    label: 'SD',
    icon: BookOpen,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    label: 'SMP',
    icon: GraduationCap,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    label: 'SMA',
    icon: Award,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    label: 'Privat',
    icon: UserCheck,
    bgColor: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
];

const QuickMenus: React.FC = () => {
  const scrollToRegistration = () => {
    const el = document.getElementById('registration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mx-4 mt-6">
      <div className="grid grid-cols-4 gap-4">
        {menus.map((menu) => {
          const Icon = menu.icon;
          return (
            <button
              key={menu.label}
              onClick={scrollToRegistration}
              className="flex flex-col items-center gap-2 transition-transform duration-200 active:scale-95"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full ${menu.bgColor}`}
              >
                <Icon className={`h-6 w-6 ${menu.iconColor}`} strokeWidth={2} />
              </div>
              <span className="text-xs font-medium text-slate-700">
                {menu.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickMenus;
