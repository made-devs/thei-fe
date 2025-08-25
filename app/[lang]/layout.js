// /app/[lang]/layout.js

import './globals.css';
import { i18n } from '../../i18n-config';
import { getDictionary } from '../../lib/dictionary';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // 1. Impor komponen Footer

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className="bg-gray-100">
        <Navbar dictionary={dictionary.navigation} currentLocale={lang} />

        <main>{children}</main>

        {/* 2. Tambahkan komponen Footer di sini */}
        <Footer dictionary={dictionary.footer} />

        {/* Div spacer untuk FABs di mobile tetap dipertahankan */}
        <div className="h-20 lg:hidden"></div>
      </body>
    </html>
  );
}

