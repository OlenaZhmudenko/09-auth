import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
  const isPrivateRoute = pathname.startsWith('/profile') || pathname.startsWith('/notes');

  if (!accessToken && refreshToken && isPrivateRoute) { 
    try {
      const response = await fetch(new URL('/api/auth/session', request.url), {
      method: 'GET',
      headers: {
        Cookie: `refreshToken=${refreshToken.value}`
      }
    });

    if (response.ok) { 
      const setCookieHeader = response.headers.get('set-cookie');

      if (setCookieHeader) {
        const newResponse = NextResponse.next();
        newResponse.headers.append('Set-Cookie', setCookieHeader);
        return newResponse;
      }
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/sign-in', request.url));
      }
    } catch (error) {
      console.error('Session refresh failed', error);
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  const hasValidTokens = accessToken && refreshToken;

  if (!hasValidTokens && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (hasValidTokens && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
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