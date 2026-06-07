'use server';

import { cookies } from 'next/headers';
import { encrypt } from '@/lib/session';

export async function loginAdmin(pin: string) {
  const adminPin = process.env.ADMIN_PIN || '123456';
  
  if (pin === adminPin) {
    const sessionToken = await encrypt({ role: 'admin' });
    
    // In Next.js 15, cookies() is async, but this pattern works in Next 14 as well 
    // depending on the version. We use the standard approach.
    const cookieStore = await cookies();
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    
    return { success: true };
  }
  
  return { success: false, error: 'PIN Salah!' };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}
