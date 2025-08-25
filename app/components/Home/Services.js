// /app/components/Home/Services.js
import React from 'react';
import Image from 'next/image';

const Services = ({ dictionary }) => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Judul Section */}
        <h2 className="text-2xl font-bold text-black mb-8">
          {dictionary.section_title}
        </h2>

        {/* Kontainer Utama */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden">
          {/* Gambar Background */}
          <Image
            src="/service.webp"
            alt="Services and Support"
            fill
            className="object-cover z-0"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* FIX: Gradient Overlay dengan 3 titik yang lebih spesifik */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 from-30% via-gray-100/30 to-transparent z-10"></div>

          {/* Konten Teks */}
          <div className="relative z-20 p-8 md:p-16 lg:p-24">
            <div className="max-w-md">
              <h3 className="text-3xl lg:text-4xl font-extrabold text-black mb-6">
                {dictionary.main_title}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-8">
                {dictionary.description}
              </p>
              <a
                href="#"
                className="bg-yellow-400 text-black font-bold text-sm px-8 py-3 inline-block hover:bg-yellow-500 transition-colors"
              >
                {dictionary.view_all_services}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
