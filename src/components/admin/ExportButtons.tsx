'use client'

import React from 'react'
import { Download, FileText } from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface ExportButtonsProps {
  data: any[]
}

export default function ExportButtons({ data }: ExportButtonsProps) {
  const handleExportCSV = () => {
    if (!data || data.length === 0) return

    const headers = ['Tanggal', 'Orang Tua', 'No. WA', 'Anak', 'Kelas', 'Program']
    const csvRows = []
    
    // Add headers
    csvRows.push(headers.join(','))
    
    // Add data
    data.forEach(row => {
      const values = [
        new Date(row.created_at).toLocaleDateString('id-ID'),
        `"${(row.parent_name || '').replace(/"/g, '""')}"`,
        `"${(row.parent_whatsapp || '').replace(/"/g, '""')}"`,
        `"${(row.student_name || '').replace(/"/g, '""')}"`,
        `"${(row.grade_level || '').replace(/"/g, '""')}"`,
        `"${(row.program_choice || '').replace(/"/g, '""')}"`
      ]
      csvRows.push(values.join(','))
    })

    const csvString = csvRows.join('\n')
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'registrations.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExportPDF = () => {
    if (!data || data.length === 0) return

    const doc = new jsPDF()
    doc.text('Data Pendaftar Bimbel Alazza', 14, 15)

    const tableData = data.map(row => [
      new Date(row.created_at).toLocaleDateString('id-ID'),
      row.parent_name || '',
      row.parent_whatsapp || '',
      row.student_name || '',
      row.grade_level || '',
      row.program_choice || ''
    ])

    autoTable(doc, {
      startY: 20,
      head: [['Tgl', 'Orang Tua', 'WA', 'Anak', 'Kelas', 'Program']],
      body: tableData,
    })

    doc.save('registrations.pdf')
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleExportCSV}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
      >
        <Download size={16} />
        Export CSV
      </button>
      <button
        onClick={handleExportPDF}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
      >
        <FileText size={16} />
        Export PDF
      </button>
    </div>
  )
}
