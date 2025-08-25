// /app/components/Home/CallToAction.js
import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const CallToAction = ({ dictionary }) => {
  return (
    <section className="bg-white lg:pt-[10rem]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Box Kiri - Rental */}
        {/* FIX: Ganti bg-red-700 dengan gradient */}
        <div className="bg-gradient-to-t from-black to-red-700 lg:h-[65vh] pt-10 pb-12 relative overflow-hidden lg:overflow-visible">
          <div className="relative w-[70vw] aspect-[4/3] mx-auto lg:absolute lg:-top-[20vh] lg:left-1/2 lg:-translate-x-1/2 lg:w-[30vw] lg:h-full lg:z-10">
            <Image
              src="/cta1.webp"
              alt="Rental Equipment"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 70vw, 30vw"
            />
          </div>
          {/* Konten */}
          <div className="container mx-auto px-6 lg:px-8 max-w-[1440px] flex flex-col items-center h-full">
            <div className="w-full max-w-md pt-8 lg:pt-0 lg:mt-auto">
              <h3 className="text-white text-3xl font-bold mb-8">
                {dictionary.rental.title}
              </h3>
              <div className="flex flex-col lg:flex-row flex-wrap gap-4">
                <a
                  href="#"
                  className="bg-yellow-400 text-black font-bold text-xs px-5 py-3 flex items-center justify-center hover:bg-yellow-500 transition-colors"
                >
                  <span>{dictionary.rental.view_detail}</span>
                  <ArrowRight size={16} className="ml-2" />
                </a>
                {/* FIX: Ganti border menjadi border-2 */}
                <a
                  href="#"
                  className="border-2 border-yellow-400 text-yellow-400 lg:border-white lg:text-white font-bold text-xs px-5 py-3 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <span>{dictionary.rental.go_to_store}</span>
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Box Kanan - Parts */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 lg:h-[65vh] pt-10 pb-12 relative overflow-hidden lg:overflow-visible">
          <div className="relative w-[70vw] aspect-[4/3] mx-auto lg:absolute lg:-top-[20vh] lg:left-1/2 lg:-translate-x-1/2 lg:w-[35vw] lg:h-full lg:z-10">
            <Image
              src="/cta2.webp"
              alt="Buy Parts Online"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 70vw, 35vw"
            />
          </div>
          {/* Konten */}
          <div className="container mx-auto px-6 lg:px-8 max-w-[1440px] flex flex-col items-center h-full">
            <div className="w-full max-w-md pt-8 lg:pt-0 lg:mt-auto">
              <h3 className="text-white text-3xl font-bold mb-8">
                {dictionary.parts.title}
              </h3>
              <div className="flex flex-col lg:flex-row flex-wrap gap-4">
                <a
                  href="#"
                  className="bg-yellow-400 text-black font-bold text-xs px-5 py-3 flex items-center justify-center hover:bg-yellow-500 transition-colors"
                >
                  <span>{dictionary.parts.go_to_parts}</span>
                  <ArrowRight size={16} className="ml-2" />
                </a>
                {/* FIX: Ganti border menjadi border-2 */}
                <a
                  href="#"
                  className="border-2 border-yellow-400 text-yellow-400 lg:border-white lg:text-white font-bold text-xs px-5 py-3 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <span>{dictionary.parts.view_all_parts}</span>
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
