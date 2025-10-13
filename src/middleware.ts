import createMiddleware from 'next-intl/middleware';
import { getLocale } from 'next-intl/server';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const locale = await getLocale();
  const { pathname } = request.nextUrl;
  if (pathname.endsWith(`/profile`)) {
    const token = request.cookies.get('auth_token');
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/sign-up`, request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
