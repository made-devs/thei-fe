// /src/app/[lang]/layout.js

import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

// ✅ FIX: Dari src/app/[lang]/ ke root (naik 3 level)
import { i18n } from "../../../i18n-config";

// ✅ FIX: Pakai alias @/ lebih clean
import { getLayoutDictionary } from "@/lib/dictionary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/General/FloatingActionButton";

// Inisialisasi font dengan subset yang dibutuhkan
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
