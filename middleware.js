// /middleware.js
import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n } from './i18n-config';

function getLocale(request) {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const locales = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders })
    .languages()
    .filter((lang) => lang !== '*');
  return match(languages, locales, i18n.defaultLocale);
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname; // Cek jika path sudah punya locale. Matcher sudah memastikan ini bukan file statis.

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next(); // Lanjutkan jika sudah benar
  } // Redirect jika belum ada locale

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

// Matcher ini adalah satu-satunya filter yang kita butuhkan.
export const config = {
  matcher: [
    /*
     * Match semua path KECUALI yang:
     * - Dimulai dengan /api, /_next/static, /_next/image
     * - Mengandung titik (.), yang biasanya adalah file statis (e.g., /logo.webp)
     */
    '/((?!api|_next/static|_next/image|.*\\..*).*)',
  ],
};
