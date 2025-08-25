// /app/components/Home/Technology.js
import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const Technology = ({ dictionary }) => {
  const techCards = [
    { ...dictionary.cards[0], image: '/tech1.webp' },
    { ...dictionary.cards[1], image: '/tech2.webp' },
    { ...dictionary.cards[2], image: '/tech3.webp' },
  ];

  return (
    <section className="bg-white py-20">
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

        {/* Grid Kartu Teknologi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCards.map((card, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden group text-white"
            >
              {/* Gambar Background */}
              <Image
                src={card.image}
                alt={card.title}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Konten Teks */}
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold mb-4 leading-tight">
                  {card.title}
                </h3>
                <a
                  href="#"
                  className="font-bold text-yellow-400 text-sm flex items-center group-hover:underline"
                >
                  <span>{dictionary.view_detail}</span>
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;
