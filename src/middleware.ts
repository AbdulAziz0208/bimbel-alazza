import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('admin_session')?.value;
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      await decrypt(sessionCookie);
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  if (pathname === '/admin/login') {
    const sessionCookie = request.cookies.get('admin_session')?.value;
    if (sessionCookie) {
      try {
        await decrypt(sessionCookie);
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch (e) {}
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
