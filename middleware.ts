import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['en', 'mr'] as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Hindi is not currently translated. Send legacy Hindi URLs to the
  // Marathi homepage rather than letting the generic [locale] route render
  // an unsupported language.
  if (pathname === '/hi' || pathname.startsWith('/hi/')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the path already starts with a valid locale prefix, pass it through.
  // Do NOT redirect/strip — LanguageContext relies on the /en prefix being
  // present in the URL to detect the active locale client-side.
  const hasLocalePrefix = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  // No locale prefix → default language (Marathi), just continue.
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
};
