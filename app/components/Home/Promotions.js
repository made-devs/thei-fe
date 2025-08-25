// /app/components/Home/Promotions.js
import React from 'react';
import Image from 'next/image';

const Promotions = ({ dictionary }) => {
  const promoCards = [
    {
      ...dictionary.cards[0],
      image: '/promo1.webp',
      date: 'December 31, 2025',
    },
    {
      ...dictionary.cards[1],
      image: '/promo2.webp',
      date: 'September 30, 2025',
    },
    {
      ...dictionary.cards[2],
      image: '/promo3.webp',
      date: 'December 31, 2025',
    },
    {
      ...dictionary.cards[3],
      image: '/promo4.webp',
      date: 'September 30, 2025',
    },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl font-bold text-black">{dictionary.title}</h2>
          <a
            href="#"
            className="text-blue-600 font-bold text-sm hover:underline"
          >
            {dictionary.view_all}
          </a>
        </div>

        {/* Grid Kartu Promo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {promoCards.map((promo, index) => (
            // FIX: Tambahkan border abu-abu tipis
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl border border-gray-200"
            >
              {/* Wadah Gambar */}
              <div className="overflow-hidden">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  width={400}
                  height={250}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              {/* Konten Teks */}
              <div className="p-6 flex flex-col">
                <h3 className="font-bold text-black text-lg mb-4 h-20">
                  {promo.title}
                </h3>
                <p className="text-gray-500 text-xs mt-auto">
                  {dictionary.valid_until}
                  <br />
                  <span className="font-semibold">{promo.date}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
