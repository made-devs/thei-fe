// /app/components/Equipment/CategoryList.js
import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const CategoryList = ({ dictionary }) => {
  // Menambahkan path gambar ke setiap kategori
  const categoriesWithImages = dictionary.categories.map((category, index) => ({
    ...category,
    image: `/equipment/equip${index + 1}.webp`, // contoh: /equipment-cat1.webp
  }));

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* FIX: Hapus 'text-center' dari div ini */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            {dictionary.main_title}
          </h2>
          {/* FIX: Hapus 'mx-auto' agar garis rata kiri */}
          <div className="w-[5rem] h-1 bg-yellow-400 my-4"></div>
          <p className="text-gray-600 text-2xl">
            {dictionary.main_description}
          </p>
        </div>

        <div className="space-y-12 mx-auto max-w-[65rem]">
          {categoriesWithImages.map((category, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-[5rem] ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : '' // Ganti urutan untuk baris genap
              }`}
            >
              <div className="w-full md:w-[25vw] relative aspect-[7/5] rounded-lg overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold text-black mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <a
                  href="#"
                  className="font-bold text-yellow-500 text-sm flex items-center group"
                >
                  <span>{category.cta}</span>
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20 pt-12 border-t border-gray-200">
          <p className="text-gray-500">{dictionary.bottom_text}</p>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
