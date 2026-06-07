import { ReactNode } from 'react';
import { AdminSidebar } from './admin-sidebar';

export const metadata = {
  title: 'Admin Dashboard | Bimbel Alazza',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 hidden md:block">
          <h1 className="text-xl font-semibold text-slate-800">Admin Dashboard</h1>
        </header>
        
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
