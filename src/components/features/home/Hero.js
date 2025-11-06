'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';

const Hero = ({ dictionary, currentLocale }) => {
  const heroDict = dictionary || {};
  const ctaDict = heroDict.cta || {};

  // Array subtext
  const subTexts = [
    heroDict.sub_copy_line1,
    heroDict.sub_copy_line2,
    heroDict.sub_copy_line3,
  ].filter(Boolean);

  // State untuk slider mobile
  const [activeIdx, setActiveIdx] = useState(0);
  const textRef = useRef(null);

  // Brand list
  const brands = [
    { name: 'Zoomlion', logo: '/zoomlion.webp' },
    { name: 'Mitsubishi', logo: '/mitsubishi.webp' },
    { name: 'Nichiyu', logo: '/nichiyu.webp' },
    { name: 'CAT', logo: '/cat.webp' },
    { name: 'XCMG', logo: '/xcmg.webp' },
  ];

  // GSAP animasi slide in/out hanya di mobile
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth >= 640) return;
    if (subTexts.length <= 1) return;

    const animateOut = () => {
      gsap.to(textRef.current, {
        x: '-100%',
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          setActiveIdx((prev) => (prev + 1) % subTexts.length);
        },
      });
    };

    const animateIn = () => {
      gsap.fromTo(
        textRef.current,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
    };

    const interval = setInterval(() => {
      animateOut();
      setTimeout(() => {
        animateIn();
      }, 350);
    }, 2500);

    return () => clearInterval(interval);
  }, [subTexts.length, activeIdx]);

  // Animate in on mount and when activeIdx changes (for manual trigger)
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth >= 640) return;
    if (subTexts.length <= 1) return;
    gsap.set(textRef.current, { x: '100%', opacity: 0 });
    gsap.to(textRef.current, {
      x: '0%',
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out',
    });
  }, [activeIdx, subTexts.length]);

  return (
    <div className="relative flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[70vh] sm:h-[90vh] overflow-hidden flex flex-col items-center justify-between text-center pb-8">
        {/* Gambar Latar Statis */}
        <Image
          src="/banner-hero.webp"
          alt="Heavy Equipment Fleet"
          fill
          className="object-cover -z-10"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/10" />

        {/* Content wrapper */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
          <div className="max-w-2xl sm:max-w-4xl mx-auto w-full">
            {/* Teks Utama */}
            <h1
              className="text-white text-xl xs:text-2xl sm:text-3xl md:text-5xl font-bold leading-tight"
              style={{
                textShadow:
                  '0 2px 16px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.4)',
              }}
            >
              {heroDict.main_copy}
            </h1>

            {/* Sub Teks: Slider di mobile, static di desktop */}
            <div className="mt-4 sm:mt-6 min-h-[3rem] flex items-center justify-center relative overflow-hidden">
              {/* Mobile: slider dengan GSAP */}
              <p
                ref={textRef}
                className="text-yellow-400 text-base sm:hidden font-semibold tracking-wider uppercase m-0 w-full absolute left-0 top-0"
                style={{
                  minHeight: '3rem',
                  textShadow:
                    '0 2px 16px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.4)',
                }}
              >
                {subTexts[activeIdx]}
              </p>
              {/* Desktop: static */}
              <p
                className="hidden sm:block text-yellow-400 sm:text-lg md:text-xl font-semibold tracking-wider uppercase break-words m-0"
                style={{
                  textShadow:
                    '0 2px 16px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.4)',
                }}
              >
                {heroDict.sub_copy_line1}
                <span className="mx-2 hidden md:inline">|</span>
                <br className="md:hidden" /> {heroDict.sub_copy_line2}
                <span className="mx-2 hidden md:inline">|</span>
                <br className="md:hidden" /> {heroDict.sub_copy_line3}
              </p>
            </div>

            {/* Tombol CTA */}
            <div className="mt-6 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link
                href={`/${currentLocale}/contact`}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold tracking-wide uppercase transition-colors shadow-lg rounded-md"
              >
                {ctaDict.quote}
              </Link>
              <Link
                href={`/${currentLocale}/products`}
                className="bg-gray-800 hover:bg-yellow-400 hover:text-black text-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold tracking-wide uppercase transition-colors shadow-lg rounded-md"
              >
                {ctaDict.explore}
              </Link>
              <Link
                href={`/${currentLocale}/service`}
                className="bg-gray-800 hover:bg-yellow-400 hover:text-black text-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold tracking-wide uppercase transition-colors shadow-lg rounded-md"
              >
                {ctaDict.book}
              </Link>
              <Link
                href={`/${currentLocale}/branches`}
                className="bg-gray-800 hover:bg-yellow-400 hover:text-black text-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold tracking-wide uppercase transition-colors shadow-lg rounded-md"
              >
                {ctaDict.branch}
              </Link>
            </div>
          </div>
        </div>

        {/* Brand Section - At bottom of hero banner */}
        <div className="relative z-20 w-full px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <h2 className="text-center text-white text-sm sm:text-base font-semibold mb-6 drop-shadow-lg">
              Brand Partner Kami
            </h2>

            {/* Brand Grid with backdrop */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 sm:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 items-center justify-items-center">
                {brands.map((brand) => (
                  <div
                    key={brand.name}
                    className="h-14 sm:h-16 relative w-full flex items-center justify-center"
                  >
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      height={64}
                      width={150}
                      className="object-contain transition-all duration-300 filter brightness-100 hover:brightness-125"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
