'use client';

import { useState } from 'react';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const OpenPositions = ({ dictionary }) => {
  // ✅ Pindah useState ke atas, sebelum conditional logic
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!dictionary) return null;

  // Ambil data position yang dipilih
  const selectedPosition = dictionary.positions[selectedIndex];

  // Generate unsplash placeholder image berdasarkan index
  const getPlaceholderImage = (index) => {
    const unsplashIds = [
      'photo-1552664730-d307ca884978', // mechanic
      'photo-1552664730-d307ca884978', // service advisor
      'photo-1552664730-d307ca884978', // parts consultant
      'photo-1552664730-d307ca884978', // admin
      'photo-1552664730-d307ca884978', // marketing
    ];
    const id = unsplashIds[index] || 'photo-1552664730-d307ca884978';
    return `https://images.unsplash.com/${id}?w=800&h=600&fit=crop&q=80`;
  };

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-8 sm:mb-12">
          <p className="font-semibold tracking-widest uppercase text-yellow-400 text-xs sm:text-sm">
            {dictionary.subtitle}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mt-2 text-black">
            {dictionary.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            {dictionary.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Kolom Daftar Lowongan */}
          <div className="space-y-4 flex flex-col">
            {dictionary.positions.map((pos, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`p-4 sm:p-6 rounded-lg border-2 transition-all text-left flex justify-between items-center ${
                  selectedIndex === index
                    ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-yellow-300 hover:shadow-md'
                }`}
              >
                <div>
                  <h3
                    className={`font-bold text-base sm:text-lg ${
                      selectedIndex === index ? 'text-black' : 'text-gray-800'
                    }`}
                  >
                    {pos.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-500 mt-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="sm:w-4 sm:h-4" />
                      <span>{pos.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} className="sm:w-4 sm:h-4" />
                      <span>{pos.type}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight
                  size={20}
                  className={`sm:w-6 sm:h-6 transition-colors flex-shrink-0 ${
                    selectedIndex === index
                      ? 'text-yellow-600'
                      : 'text-gray-400'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Kolom Poster/Gambar - Dynamic */}
          <div className="relative h-[50vh] sm:h-[60vh] rounded-lg overflow-hidden shadow-lg bg-gray-200">
            <Image
              key={selectedIndex}
              src={getPlaceholderImage(selectedIndex)}
              alt={selectedPosition?.title || 'Position Image'}
              fill
              className="object-cover transition-opacity duration-300"
              priority={selectedIndex === 0}
              unoptimized={true} // Pakai unoptimized karena unsplash CDN
            />
            {/* Overlay dengan info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white font-bold text-xl sm:text-2xl">
                {selectedPosition?.title}
              </h3>
              <p className="text-yellow-300 text-sm sm:text-base mt-2">
                {selectedPosition?.location}
              </p>
            </div>

            {/* Indicator dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {dictionary.positions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedIndex === index
                      ? 'bg-yellow-400 w-6'
                      : 'bg-white/50 hover:bg-white'
                  }`}
                  aria-label={`Go to position ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3.5 rounded-lg transition-all group">
            <span>{dictionary.cta}</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OpenPositions;
