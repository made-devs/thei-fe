// /app/components/Equipment/HeroEquipment.js
import React from 'react';
import Image from 'next/image';

const HeroEquipment = ({ dictionary }) => {
  return (
    <section className="relative h-[65vh] bg-black text-white flex items-center justify-center text-center">
      <Image
        src="/equipment/banner.webp" // Menggunakan banner.webp
        alt="Toughest Applications"
        fill
        className="object-cover z-0"
        priority
        sizes="100vw"
      />
      {/* Gradasi hitam tipis */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="relative z-10 p-4">
        <p className="text-sm font-semibold tracking-widest uppercase mb-4">
          {dictionary.hero_subtitle}
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
          {dictionary.hero_title_line1}
          <br />
          {dictionary.hero_title_line2}
        </h1>
      </div>
    </section>
  );
};

export default HeroEquipment;
