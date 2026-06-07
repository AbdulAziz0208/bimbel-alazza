import React from 'react'
import { supabaseServer as supabase } from '@/lib/supabase-server'
import RegistrationsTable from '@/components/admin/RegistrationsTable'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function RegistrationsPage() {
  const { data, error } = await supabase
    .from('students_registration')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching registrations:', error)
  }

  const registrations = data || []

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Data Pendaftar</h1>
        <p className="text-gray-600 mt-2 text-base">Kelola data pendaftaran siswa Bimbel Alazza</p>
      </div>

      <RegistrationsTable initialData={registrations} />
    </div>
  )
}
