'use server';

import { createClient } from '@supabase/supabase-js';

interface RegistrationData {
  parentName: string;
  parentWhatsapp: string;
  studentName: string;
  schoolOrigin?: string;
  gradeLevel: string;
  programChoice: string;
  turnstileToken: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrerSource?: string;
}

export async function submitRegistration(data: RegistrationData) {
  try {
    // 1. Verify Turnstile token
    const turnstileValid = await verifyTurnstile(data.turnstileToken);
    if (!turnstileValid) {
      return { success: false, error: 'Verifikasi keamanan gagal. Silakan muat ulang halaman.' };
    }

    // 2. Insert to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase credentials not configured');
      return { success: false, error: 'Sistem sedang maintenance. Silakan coba beberapa saat lagi.' };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { error: dbError } = await supabase
      .from('students_registration')
      .insert({
        parent_name: data.parentName,
        parent_whatsapp: data.parentWhatsapp,
        student_name: data.studentName,
        school_origin: data.schoolOrigin || null,
        grade_level: data.gradeLevel,
        program_choice: data.programChoice,
        utm_source: data.utmSource || null,
        utm_medium: data.utmMedium || null,
        utm_campaign: data.utmCampaign || null,
        referrer_source: data.referrerSource || null,
      });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return { success: false, error: 'Gagal menyimpan data. Silakan coba lagi.' };
    }

    // 3. Send email notification via Resend
    await sendEmailNotification(data);

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Terjadi kesalahan. Silakan coba lagi.' };
  }
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  
  if (!secretKey) {
    console.warn('Turnstile secret key not configured, skipping verification');
    return true; // Skip verification if not configured (for development)
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

async function sendEmailNotification(data: RegistrationData) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!resendApiKey || !adminEmail) {
    console.warn('Resend not configured, skipping email notification');
    return;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Bimbel Alazza <onboarding@resend.dev>',
        to: adminEmail,
        subject: '🎓 Pendaftar Baru — Bimbel Alazza',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563EB;">📋 Pendaftar Baru!</h2>
            <hr style="border: 1px solid #E2E8F0;" />
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748B;">Nama Orang Tua</td><td style="padding: 8px 0; font-weight: bold;">${data.parentName}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">No. WhatsApp</td><td style="padding: 8px 0; font-weight: bold;"><a href="https://wa.me/62${data.parentWhatsapp.replace(/^0/, '')}">${data.parentWhatsapp}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Nama Anak</td><td style="padding: 8px 0; font-weight: bold;">${data.studentName}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Asal Sekolah</td><td style="padding: 8px 0;">${data.schoolOrigin || '-'}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Kelas</td><td style="padding: 8px 0; font-weight: bold;">${data.gradeLevel}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Program</td><td style="padding: 8px 0; font-weight: bold;">${data.programChoice}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Sumber</td><td style="padding: 8px 0;">${data.utmSource || 'Direct'}</td></tr>
            </table>
            <hr style="border: 1px solid #E2E8F0;" />
            <p style="color: #64748B; font-size: 14px;">Segera follow-up via WhatsApp!</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      console.error('Failed to send email:', await response.text());
    }
  } catch (error) {
    console.error('Email sending error:', error);
  }
}
