// /app/[lang]/layout.js

import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google"; // 1. Impor font
import { i18n } from "../../i18n-config";
import { getLayoutDictionary } from "../../lib/dictionary";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActionButton from "../components/General/FloatingActionButton";

// 2. Inisialisasi font dengan subset yang dibutuhkan
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const dictionary = await getLayoutDictionary(lang);

  return (
    <html lang={lang}>
      <body
        className={`${jakarta.className} bg-black min-h-screen flex flex-col`}
      >
        <Navbar dictionary={dictionary} currentLocale={lang} />
        <main className="flex-1">{children}</main>
        <Footer dictionary={dictionary} currentLocale={lang} />
        <FloatingActionButton dictionary={dictionary} currentLocale={lang} />
      </body>
    </html>
  );
}
