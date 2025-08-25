// /app/components/Home/Career.js
import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const Career = ({ dictionary }) => {
  return (
    <section className="relative bg-gray-200">
      {/* Kontainer untuk Teks */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Pembungkus untuk memposisikan teks di 50% atas */}
        <div className="flex items-start justify-center h-[90vh] min-h-[400px] pt-20">
          <div className="text-center max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-black">
              {dictionary.title_line1}
              <br />
              {dictionary.title_line2}
            </h2>
            <p className="mt-6 text-gray-600">{dictionary.description}</p>
            <a
              href="#"
              className="mt-8 inline-flex items-center bg-yellow-400 text-black font-bold text-xs px-6 py-3 hover:bg-yellow-500 transition-colors"
            >
              <span>{dictionary.button}</span>
              <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* Gambar Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/career.webp"
          alt="Career at Trakindo"
          fill
          className="object-cover object-bottom"
          sizes="100vw"
        />
      </div>
    </section>
  );
};

export default Career;
