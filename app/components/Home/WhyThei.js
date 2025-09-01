'use client';
import React from 'react';
// Tambahkan Cog ke dalam import
import { ShieldCheck, Clock, Package, Wrench, Award, Cog } from 'lucide-react';

const iconMap = {
  'One Stop Solution': <Package size={40} className="mb-4 text-yellow-400" />,
  '24/7 Field Service': <Clock size={40} className="mb-4 text-yellow-400" />,
  'Genuine Parts': <ShieldCheck size={40} className="mb-4 text-yellow-400" />,
  'HSSE Certified': <Wrench size={40} className="mb-4 text-yellow-400" />,
  'Hundreds of Millions in Bonuses': (
    <Award size={40} className="mb-4 text-yellow-400" />
  ),
  // Terjemahan untuk ikon
  'Solusi Satu Pintu': <Package size={40} className="mb-4 text-yellow-400" />,
  'Layanan Lapangan 24/7': <Clock size={40} className="mb-4 text-yellow-400" />,
  'Suku Cadang Asli': (
    <ShieldCheck size={40} className="mb-4 text-yellow-400" />
  ),
  'Tersertifikasi HSSE': <Wrench size={40} className="mb-4 text-yellow-400" />,
  'Bonus Ratusan Juta': <Award size={40} className="mb-4 text-yellow-400" />,
};

const WhyThei = ({ dictionary }) => {
  const features = dictionary.features || [];

  return (
    <section
      className="relative text-white py-20 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/banner-slider1.webp')" }}
    >
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-[1440px] text-center">
        {/* Subtitle dengan ikon Cog ditambahkan di sini */}
        <div className="flex items-center justify-center text-sm font-bold uppercase text-yellow-400 mb-4">
          <Cog
            size={20}
            className="mr-2 animate-spin"
            style={{ animationDuration: '5s' }}
          />
          <span>{dictionary.subtitle}</span>
        </div>

        <h2 className="text-4xl lg:text-5xl font-bold mb-16">
          {dictionary.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-white/20 hover:scale-105"
            >
              {iconMap[feature.title]}
              <h3 className="font-bold text-lg">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyThei;
