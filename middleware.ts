import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
  const isPrivateRoute = pathname.startsWith('/profile') || pathname.startsWith('/notes');

  if (!accessToken && refreshToken && isPrivateRoute) { 
    try {
      const response = await fetch(new URL('/api/auth/session', request.url), 
  {
      method: 'GET',
      headers: {
        Cookie: `refreshToken=${refreshToken.value}`
      }
    });

    if (response.ok) {
      return NextResponse.next();
    }
    } catch (error) {
      console.error('Session refresh failed', error);
    }
  }

  const hasValidTokens = accessToken && refreshToken;

  if (!hasValidTokens && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (hasValidTokens && isAuthRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

 export const config = {
  matcher: [
    '/profile/:path*', 
    '/notes/:path*', 
    '/sign-in', 
    '/sign-up'
  ],
};