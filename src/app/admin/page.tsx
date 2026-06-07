import { supabaseServer as supabase } from '@/lib/supabase-server';
import { Users, BookOpen, GraduationCap } from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [
    { count: totalCount },
    { count: level1Count },
    { count: level2Count },
    { data: recentData }
  ] = await Promise.all([
    supabase.from('students_registration').select('*', { count: 'exact', head: true }),
    supabase.from('students_registration').select('*', { count: 'exact', head: true }).ilike('program_choice', '%Level 1%'),
    supabase.from('students_registration').select('*', { count: 'exact', head: true }).ilike('program_choice', '%Level 2%'),
    supabase.from('students_registration')
      .select('id, student_name, program_choice, created_at')
      .order('created_at', { ascending: false })
      .limit(5)
  ]);

  const stats = [
    { 
      label: 'Total Pendaftar', 
      value: totalCount || 0, 
      icon: Users, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100' 
    },
    { 
      label: 'Pendaftar Level 1', 
      value: level1Count || 0, 
      icon: BookOpen, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-100' 
    },
    { 
      label: 'Pendaftar Level 2', 
      value: level2Count || 0, 
      icon: GraduationCap, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-100' 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
              <div className={`p-4 rounded-full ${stat.bg}`}>
                <Icon size={24} className={stat.color} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Pendaftar Terbaru</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Program</th>
                <th className="px-6 py-3">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentData && recentData.length > 0 ? (
                recentData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{row.student_name}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {row.program_choice}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Intl.DateTimeFormat('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }).format(new Date(row.created_at))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                    Belum ada pendaftar
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
