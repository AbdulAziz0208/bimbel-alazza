'use server'

import { supabaseServer as supabase } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function deleteRegistration(id: number) {
  try {
    const { error } = await supabase.from('students_registration').delete().eq('id', id)
    if (error) {
      return { success: false, error: error.message }
    }
    revalidatePath('/admin/registrations')
    revalidatePath('/admin')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function updateRegistration(id: number, data: any) {
  try {
    const { error } = await supabase.from('students_registration').update({
      parent_name: data.parent_name,
      parent_whatsapp: data.parent_whatsapp,
      student_name: data.student_name,
      grade_level: data.grade_level,
      program_choice: data.program_choice
    }).eq('id', id)
    
    if (error) {
      return { success: false, error: error.message }
    }
    revalidatePath('/admin/registrations')
    revalidatePath('/admin')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
