'use client';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function HeroHeader({ dictionary }) {
  const {
    background_image,
    brand_text,
    headline_line1,
    headline_line2,
    headline_highlight,
    headline_line3,
    subheadline1,
  } = dictionary;

  return (
    <section className="relative h-[82vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={background_image}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black/20" />
      </div>

      {/* Content */}
      <div className="container mx-auto lg:-mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 h-full flex flex-col justify-center items-center text-center">
        {/* Brand Text */}
        <p
          className="text-yellow-400 text-xs sm:text-sm md:text-xl font-bold tracking-widest uppercase mb-8 sm:mb-10 animate-fade-in"
          style={{
            textShadow: '0 2px 16px rgba(0,0,0,0.9), 0 2px 2px rgba(0,0,0,0.9)',
          }}
        >
          {brand_text}
        </p>

        {/* Main Headlines */}
        <div className="space-y-3 sm:space-y-4">
          {/* Subheadline 1 - PERTAMA DI INDONESIA */}
          <p
            className="text-yellow-400 text-base sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-wider uppercase"
            style={{
              textShadow:
                '0 2px 16px rgba(0,0,0,0.7), 0 2px 2px rgba(0,0,0,0.4)',
            }}
          >
            {subheadline1}
          </p>

          {/* Line 1 - BELI ALAT BERAT */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight"
            style={{
              textShadow:
                '0 2px 16px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.4)',
            }}
          >
            {headline_line1}
          </h1>

          {/* Line 2 - BONUS SENILAI */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight"
            style={{
              textShadow:
                '0 2px 16px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.4)',
            }}
          >
            {headline_line2}
          </h2>

          {/* Highlight - 1 MILIAR RUPIAH */}
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-yellow-400 tracking-tight leading-tight"
            style={{
              textShadow:
                '0 2px 16px rgba(0,0,0,0.9), 0 3px 2px rgba(0,0,0,0.9)',
            }}
          >
            {headline_highlight}
          </h2>

          {/* Line 3 - HANYA DI THEI */}
          <p
            className="text-yellow-400 text-base sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-wider uppercase mt-4"
            style={{
              textShadow:
                '0 2px 16px rgba(0,0,0,0.9), 0 2px 2px rgba(0,0,0,0.9)',
            }}
          >
            {headline_line3}
          </p>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white text-xs sm:text-sm font-semibold tracking-widest uppercase">
          SCROLL DOWN
        </span>
        <ChevronDown className="w-6 h-6 text-yellow-400 animate-bounce-slow" />
      </div>
    </section>
  );
}
