// /app/components/Home/Commitment.js
import React from 'react';
import Image from 'next/image';

const Commitment = ({ dictionary }) => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* FIX: Tambahkan border abu-abu tipis */}
        <div className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200">
          {/* Gambar Background */}
          <Image
            src="/commitment.webp"
            alt="Company Commitment"
            fill
            className="object-cover z-0"
            sizes="100vw"
          />
          {/* Gradient Overlay dari kanan */}
          <div className="absolute inset-0 bg-gradient-to-l from-white from-35% via-white/80 to-transparent z-10"></div>

          {/* Konten Teks */}
          <div className="relative z-20 flex justify-end items-center min-h-[500px]">
            <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 text-left">
              <h3 className="text-3xl lg:text-4xl font-extrabold text-black mb-6">
                {dictionary.title}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-8">
                {dictionary.description}
              </p>
              <a
                href="#"
                className="bg-yellow-400 text-black font-bold text-sm px-8 py-3 inline-block hover:bg-yellow-500 transition-colors"
              >
                {dictionary.learn_more}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Commitment;
