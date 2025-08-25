// /app/components/Home/ContactUs.js
import React from 'react';
import Image from 'next/image';

const ContactUs = ({ dictionary }) => {
  return (
    // Tambahkan padding vertikal untuk memberi jarak
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Bungkus semuanya dalam container */}
        <div className="relative rounded-lg overflow-hidden">
          {/* Gambar Background */}
          <Image
            src="/contact.webp"
            alt="Contact Us"
            fill
            className="object-cover z-0"
            sizes="100vw"
          />
          {/* Gradient Overlay dibuat lebih pekat */}
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/70 to-transparent z-10"></div>

          {/* Konten Teks */}
          <div className="relative z-20">
            <div className="flex justify-end items-center min-h-[50vh] p-8 md:p-16 lg:p-24">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-8">
                  {dictionary.title}
                </h2>
                <a
                  href="#"
                  className="bg-yellow-400 text-black font-bold text-sm px-8 py-4 inline-block hover:bg-yellow-500 transition-colors"
                >
                  {dictionary.button}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
