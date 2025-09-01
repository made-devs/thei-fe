// app/components/Home/WhyThei.js
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
} from 'lucide-react';

const iconMap = {
  // English keys
  'One Stop Solution': <Users size={24} />,
  '24/7 Field Service': <FileText size={24} />,
  'Genuine Parts': <TrendingUp size={24} />,
  'HSSE Certified': <Presentation size={24} />,
  // Indonesian keys
  'Solusi Satu Pintu': <Users size={24} />,
  'Layanan Lapangan 24/7': <FileText size={24} />,
  'Suku Cadang Asli': <TrendingUp size={24} />,
  'Tersertifikasi HSSE': <Presentation size={24} />,
};

const WhyThei = ({ dictionary }) => {
  const { subtitle, title, description, image_url, features, stats } =
    dictionary;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center text-sm font-bold uppercase text-yellow-400 mb-2">
            <Cog
              size={20}
              className="mr-2 animate-spin"
              style={{ animationDuration: '5s' }}
            />
            <span>{subtitle}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            {title}
          </h2>
          <p className="text-gray-600">{description}</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Kolom Kiri: Gambar */}
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
            <Image src={image_url} alt={title} fill className="object-cover" />
          </div>

          {/* Kolom Kanan: Fitur */}
          <div className="bg-[#1C3C34] text-white p-12 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {features.map((feature, index) => (
                <div key={index}>
                  <div className="bg-yellow-400 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                    <div className="text-black">
                      {iconMap[feature.title] || <Package size={24} />}
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="relative">
                <h3 className="text-4xl font-bold text-black">{stat.value}</h3>
                <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
                {index < stats.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 h-16 w-px bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyThei;
