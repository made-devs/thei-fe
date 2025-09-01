// /app/[lang]/layout.js

import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google'; // 1. Impor font
import { i18n } from '../../i18n-config';
import { getLayoutDictionary } from '../../lib/dictionary';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// 2. Inisialisasi font dengan subset yang dibutuhkan
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const dictionary = await getLayoutDictionary(lang);

  return (
    <html lang={lang}>
      {/* 3. Terapkan kelas font ke body, gabungkan dengan kelas yang sudah ada */}
      <body className={`${jakarta.className} bg-gray-100`}>
        <Navbar dictionary={dictionary.navigation} currentLocale={lang} />
        <main>{children}</main>
        <Footer dictionary={dictionary.footer} />
        <div className="h-20 lg:hidden"></div>
      </body>
    </html>
  );
}

