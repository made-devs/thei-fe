'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const EquipmentCategoryList = ({ dictionary, lang }) => {
  // State untuk melacak tab yang sedang aktif, defaultnya yang pertama (index 0)
  const [activeIndex, setActiveIndex] = useState(0);

  if (!Array.isArray(dictionary) || dictionary.length === 0) {
    return null;
  }

  const activeCategory = dictionary[activeIndex];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1280px]">
        {/* Bagian Navigasi Tab */}
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-12">
          {dictionary.map((category, index) => (
            <button
              key={category.title}
              onClick={() => setActiveIndex(index)}
              className={`px-5 py-3 text-sm lg:text-base font-bold rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-yellow-400 text-black shadow-md'
                  : 'bg-white text-gray-600 hover:bg-yellow-100 hover:text-black'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Bagian Konten Tab yang Aktif */}
        {activeCategory && (
          <div className="max-w-5xl mx-auto text-center">
            {/* Urutan 1: Gambar */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-xl mb-8">
              <Image
                src={activeCategory.image}
                alt={activeCategory.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 80vw"
                priority={true} // Prioritaskan gambar pertama agar cepat dimuat
              />
            </div>

            {/* Urutan 2: Judul */}
            <h3 className="text-4xl font-bold text-black">
              {activeCategory.title}
            </h3>

            {/* Urutan 3: Deskripsi */}
            <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {activeCategory.description}
            </p>

            {/* Tombol CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${lang}${activeCategory.cta1_link}` || '#'}
                className="inline-flex items-center justify-center px-8 py-3 font-bold text-black bg-yellow-400 rounded-full hover:bg-yellow-500 transition-colors"
              >
                {activeCategory.cta1_text}
              </Link>
              {activeCategory.cta2_text && (
                <Link
                  href={`/${lang}${activeCategory.cta2_link}` || '#'}
                  className="inline-flex items-center justify-center px-8 py-3 font-bold text-gray-800 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                >
                  {activeCategory.cta2_text}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EquipmentCategoryList;
