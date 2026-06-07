'use client'

import React, { useState, useTransition } from 'react'
import { Search, MessageCircle, Edit, Trash2, X, Loader2 } from 'lucide-react'
import ExportButtons from './ExportButtons'
import { useRouter } from 'next/navigation'
import { deleteRegistration, updateRegistration } from '@/app/actions/registrations'

interface RegistrationsTableProps {
  initialData: any[]
}

export default function RegistrationsTable({ initialData }: RegistrationsTableProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('All')

  // Modal Edit state
  const [editingRow, setEditingRow] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Hardcoded levels as per requirement: 'All', 'Level 1', 'Level 2'
  const levels = ['All', 'Level 1', 'Level 2']

  const filteredData = initialData.filter((item) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = 
      (item.parent_name?.toLowerCase().includes(searchLower)) ||
      (item.student_name?.toLowerCase().includes(searchLower)) ||
      (item.parent_whatsapp?.toLowerCase().includes(searchLower))
      
    const matchesLevel = filterLevel === 'All' || item.grade_level === filterLevel
    
    return matchesSearch && matchesLevel
  })

  const formatWhatsApp = (wa: string) => {
    if (!wa) return ''
    let cleaned = wa.replace(/\D/g, '')
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.substring(1)
    } else if (!cleaned.startsWith('62')) {
      cleaned = '62' + cleaned
    }
    return cleaned
  }

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data pendaftar ini?')) {
      startTransition(async () => {
        const result = await deleteRegistration(id)
        if (result.success) {
          router.refresh()
        } else {
          alert('Gagal menghapus data: ' + result.error)
        }
      })
    }
  }

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    const result = await updateRegistration(editingRow.id, editingRow)
    setIsSaving(false)
    if (result.success) {
      setEditingRow(null)
      startTransition(() => {
        router.refresh()
      })
    } else {
      alert('Gagal menyimpan data: ' + result.error)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
      {/* Top Bar: Search, Filter, Export */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari nama, WA..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level === 'All' ? 'Semua Kelas' : level}
              </option>
            ))}
          </select>
        </div>
        
        <ExportButtons data={filteredData} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-white border-b border-gray-200">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">No.</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Tanggal</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Nama Orang Tua</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">No. WA</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Nama Anak</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Kelas</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Program</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.length > 0 ? (
              filteredData.map((row, idx) => (
                <tr key={row.id || idx} className={`hover:bg-gray-50 transition-colors bg-white ${isPending ? 'opacity-50' : ''}`}>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold text-center">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(row.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {row.parent_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>{row.parent_whatsapp}</span>
                      {row.parent_whatsapp && (
                        <a
                          href={`https://wa.me/${formatWhatsApp(row.parent_whatsapp)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors flex-shrink-0"
                          title="Chat via WhatsApp"
                        >
                          <MessageCircle size={16} />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.student_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.grade_level && (
                      <span className="inline-flex px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                        {row.grade_level}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.program_choice}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setEditingRow(row)}
                        className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                        title="Edit Data"
                        disabled={isPending}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(row.id)}
                        className="text-red-600 hover:text-red-800 transition-colors p-1"
                        title="Hapus Data"
                        disabled={isPending}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                  <p className="text-base font-medium">Tidak ada data pendaftar yang ditemukan.</p>
                  <p className="text-sm mt-1">Coba sesuaikan pencarian atau filter kelas Anda.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingRow && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 shrink-0">
              <h3 className="text-lg font-bold text-slate-800">Edit Data Pendaftar</h3>
              <button 
                onClick={() => setEditingRow(null)} 
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Orang Tua</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={editingRow.parent_name}
                  onChange={e => setEditingRow({...editingRow, parent_name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nomor WhatsApp</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={editingRow.parent_whatsapp}
                  onChange={e => setEditingRow({...editingRow, parent_whatsapp: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Anak</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={editingRow.student_name}
                  onChange={e => setEditingRow({...editingRow, student_name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kelas</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={editingRow.grade_level}
                  onChange={e => setEditingRow({...editingRow, grade_level: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Program</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={editingRow.program_choice}
                  onChange={e => setEditingRow({...editingRow, program_choice: e.target.value})}
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingRow(null)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors flex justify-center items-center gap-2 disabled:bg-blue-400"
                >
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
