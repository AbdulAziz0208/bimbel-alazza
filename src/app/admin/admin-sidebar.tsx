'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';
import { logoutAdmin } from '@/app/actions/auth';

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Pendaftar', href: '/admin/registrations', icon: Users },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-center bg-white border-b border-slate-200 px-4 py-2 sticky top-0 z-20">
        <span className="font-bold text-base text-slate-800 tracking-tight">Bimbel Alazza <span className="text-blue-600">Admin</span></span>
      </div>

      {/* Desktop Sidebar Container */}
      <aside
        className="hidden md:flex sticky top-0 left-0 z-30 h-screen w-64 bg-slate-900 text-slate-300 flex-col"
      >
        <div className="px-6 py-5 border-b border-slate-800">
          <span className="font-bold text-xl text-white tracking-tight">
            Bimbel Alazza
            <span className="block text-sm font-normal text-slate-400 mt-1">Admin Portal</span>
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                `}
              >
                <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="flex items-center gap-3 w-full px-3 py-2.5 text-slate-400 font-medium rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              <LogOut size={20} className="text-slate-400 group-hover:text-red-400" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 px-4 py-1.5 pb-safe flex justify-around items-center shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center p-1 rounded-lg transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <div className={`p-1 rounded-full ${isActive ? 'bg-blue-50' : 'bg-transparent'}`}>
                <Icon size={18} className={isActive ? 'text-blue-600' : 'text-slate-500'} />
              </div>
              <span className={`text-[9px] font-medium mt-0.5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
        
        {/* Logout Mobile Button */}
        <form action={logoutAdmin} className="flex">
          <button
            type="submit"
            className="flex flex-col items-center p-1 rounded-lg text-slate-500 hover:text-red-500 transition-colors"
          >
            <div className="p-1 rounded-full bg-transparent">
              <LogOut size={18} />
            </div>
            <span className="text-[9px] font-medium mt-0.5">
              Logout
            </span>
          </button>
        </form>
      </div>
    </>
  );
}
