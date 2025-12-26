// /app/[lang]/layout.js

import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

// ✅ i18n-config tetap di root (2 level up dari app/[lang]/)
import { i18n } from "../../i18n-config";

// ✅ Components tetap pakai alias @/ (yang ada di src/)
import { getLayoutDictionary } from "@/lib/dictionary";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActionButton from "@/components/layout/FloatingActionButton";

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
        <Analytics />
      </body>
    </html>
  );
}
