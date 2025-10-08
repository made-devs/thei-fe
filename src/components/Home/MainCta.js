// app/components/Home/MainCta.js
'use client';
import React from 'react';
import Image from 'next/image';

const MainCta = ({ dictionary }) => {
  // FIX: Pengecekan untuk memastikan data ada sebelum render
  if (!dictionary || !dictionary.title) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Kontainer utama dengan sudut melengkung */}
        <div className="relative h-[50vh] rounded-xl overflow-hidden shadow-2xl">
          {/* Gambar Background */}
          <Image
            src="/banner-slider1.webp" // Pastikan gambar ini ada di folder public
            alt="Heavy equipment yard"
            fill
            className="object-cover"
          />
          {/* Overlay Gradasi dan Konten */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/50 to-black flex items-center justify-end">
            {/* Wrapper Teks dan Tombol */}
            <div className="w-full md:w-1/2 lg:w-2/5 text-white p-8 md:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                {dictionary.title}
              </h2>
              <a
                href="#"
                className="mt-8 inline-block bg-yellow-400 text-black px-8 py-3 text-sm font-bold tracking-wide uppercase hover:bg-yellow-500 transition-colors rounded-md"
              >
                {dictionary.cta_button}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCta;
