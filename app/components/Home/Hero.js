'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Komponen Hero telah dirombak dari slider menjadi statis.
const Hero = ({ dictionary, currentLocale }) => {
  const heroDict = dictionary || {};
  const ctaDict = heroDict.cta || {};

  return (
    <div className="relative h-[85vh] overflow-hidden flex items-center justify-center text-center">
      {/* Gambar Latar Statis */}
      <Image
        src="/banner-slider1.webp"
        alt="Heavy Equipment Fleet"
        fill
        className="object-cover -z-10"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl mx-auto">
          {/* Teks Utama (Ukuran diperbesar) */}
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">
            {heroDict.main_copy}
          </h1>

          {/* Sub Teks (Ukuran diperkecil) */}
          <p className="mt-6 text-yellow-400 text-lg md:text-xl font-semibold tracking-wider uppercase">
            {heroDict.sub_copy_line1}
            <span className="mx-2 hidden md:inline">|</span>
            <br className="md:hidden" /> {heroDict.sub_copy_line2}
            <span className="mx-2 hidden md:inline">|</span>
            <br className="md:hidden" /> {heroDict.sub_copy_line3}
          </p>

          {/* Tombol CTA */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={`/${currentLocale}/contact`}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 text-sm font-bold tracking-wide uppercase transition-colors shadow-lg rounded-md"
            >
              {ctaDict.quote}
            </Link>
            <Link
              href={`/${currentLocale}/equipment`}
              className="bg-gray-800 hover:bg-yellow-400 hover:text-black text-white px-6 py-3 text-sm font-bold tracking-wide uppercase transition-colors shadow-lg rounded-md"
            >
              {ctaDict.explore}
            </Link>
            {/* CTA dengan warna gelap dan hover kuning */}
            <Link
              href={`/${currentLocale}/service`}
              className="bg-gray-800 hover:bg-yellow-400 hover:text-black text-white px-6 py-3 text-sm font-bold tracking-wide uppercase transition-colors shadow-lg rounded-md"
            >
              {ctaDict.book}
            </Link>
            <Link
              href={`/${currentLocale}/branches`}
              className="bg-gray-800 hover:bg-yellow-400 hover:text-black text-white px-6 py-3 text-sm font-bold tracking-wide uppercase transition-colors shadow-lg rounded-md"
            >
              {ctaDict.branch}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
