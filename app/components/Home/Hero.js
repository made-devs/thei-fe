// Filepath: app/components/Home/Hero.js
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

// FIX: Menambahkan `currentLocale` ke dalam parameter fungsi
const Hero = ({ dictionary, currentLocale }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = useMemo(() => dictionary.slides || [], [dictionary.slides]);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, slides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-[85vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Pastikan kamu punya 6 gambar banner */}
          <Image
            src={`/banner-slider${index + 1}.webp`}
            alt={slide.title}
            fill
            className="object-cover -z-10"
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
              <div className="max-w-xl">
                <div className="mb-4">
                  <span className="text-sm font-semibold tracking-wider text-white uppercase">
                    {slide.category}
                  </span>
                </div>
                <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-8">
                  {slide.title}
                </h1>
                <Link
                  href={`/${currentLocale}${slide.link}`}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 text-sm font-bold tracking-wide uppercase transition-colors shadow-lg"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-[6rem] left-0 right-0 z-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
          {/* Indikator sekarang center di mobile dan start di desktop */}
          <div className="flex space-x-2 pb-7 items-center justify-center lg:justify-start">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 transition-all cursor-pointer duration-500 ${
                  index === currentSlide
                    ? 'w-16 bg-yellow-400'
                    : 'w-8 bg-white/50'
                }`}
              ></button>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-[5rem] left-1/2 -translate-x-1/2 text-center text-white">
          <div className="flex flex-col items-center space-y-1">
            <span className="text-xs font-medium tracking-wider uppercase">
              {dictionary.scroll_down}
            </span>
            <div className="relative h-8 w-8 mt-1">
              <ChevronDown
                size={38}
                className="absolute top-0 left-1/2 -translate-x-1/2 animate-scroll-loop text-yellow-400"
                style={{ animationDelay: '0s' }}
              />
              <ChevronDown
                size={38}
                className="absolute top-0 left-1/2 -translate-x-1/2 animate-scroll-loop text-yellow-400"
                style={{ animationDelay: '1s' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
