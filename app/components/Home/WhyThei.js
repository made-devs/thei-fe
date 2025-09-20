'use client';

import React from 'react';
import Image from 'next/image';
import {
  Users,
  FileText,
  TrendingUp,
  Presentation,
  Package,
  Cog,
  Award,
} from 'lucide-react';

const iconMap = {
  // English keys
  'One Stop Solution': <Users size={24} />,
  '24/7 Field Service': <FileText size={24} />,
  'Genuine Parts': <TrendingUp size={24} />,
  'HSSE Certified': <Presentation size={24} />,
  'Huge Bonuses': <Award size={24} />,
  // Indonesian keys
  'Solusi Satu Pintu': <Users size={24} />,
  'Layanan Lapangan 24/7': <FileText size={24} />,
  'Suku Cadang Asli': <TrendingUp size={24} />,
  'Tersertifikasi HSSE': <Presentation size={24} />,
  'Bonus Ratusan Juta': <Award size={24} />,
};

const WhyThei = ({ dictionary }) => {
  const { subtitle, title, description, image_url, features, stats } =
    dictionary;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Horizontal Features List at the top */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-20 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-yellow-400 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <div className="text-black">
                  {iconMap[feature.title] || <Package size={32} />}
                </div>
              </div>
              <h3 className="font-bold text-md text-black">{feature.title}</h3>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Kolom Kiri: Teks */}
          <div className="text-left pr-[3rem]">
            <div className="flex items-center text-sm font-bold uppercase text-yellow-400 mb-2">
              <Cog
                size={20}
                className="mr-2 animate-spin"
                style={{ animationDuration: '5s' }}
              />
              <span>{subtitle}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl leading-[3.3rem] font-bold text-black mb-4">
              {title}
            </h2>
            <p className="text-gray-600 mb-12 text-justify">{description}</p>

            {/* Stats Section */}
            <div className="pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {stats.map((stat, index) => (
                  <div key={index} className="relative">
                    <h3 className="text-4xl font-bold text-black">
                      {stat.value}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
                    {index < stats.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 h-16 w-px bg-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Gambar */}
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
            <Image src={image_url} alt={title} fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyThei;
