"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

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

  // GSAP animasi slide in/out hanya di mobile
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 640) return;
    if (subTexts.length <= 1) return;

    const animateOut = () => {
      gsap.to(textRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setActiveIdx((prev) => (prev + 1) % subTexts.length);
        },
      });
    };

    const animateIn = () => {
      gsap.fromTo(
        textRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.35, ease: "power2.out" }
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
    if (typeof window === "undefined" || window.innerWidth >= 640) return;
    if (subTexts.length <= 1) return;
    gsap.set(textRef.current, { x: "100%", opacity: 0 });
    gsap.to(textRef.current, {
      x: "0%",
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [activeIdx]);

  return (
    <div className="relative h-[70vh] sm:h-[85vh] overflow-hidden flex items-center justify-center text-center">
      {/* Gambar Latar Statis */}
      <Image
        src="/banner-slider1.webp"
        alt="Heavy Equipment Fleet"
        fill
        className="object-cover -z-10"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl sm:max-w-4xl mx-auto w-full">
          {/* Teks Utama */}
          <h1 className="text-white text-xl xs:text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
            {heroDict.main_copy}
          </h1>

          {/* Sub Teks: Slider di mobile, static di desktop */}
          <div className="mt-4 sm:mt-6 min-h-[3rem] flex items-center justify-center relative overflow-hidden">
            {/* Mobile: slider dengan GSAP */}
            <p
              ref={textRef}
              className="text-yellow-400 text-base sm:hidden font-semibold tracking-wider uppercase m-0 w-full absolute left-0 top-0"
              style={{ minHeight: "3rem" }}
            >
              {subTexts[activeIdx]}
            </p>
            {/* Desktop: static */}
            <p className="hidden sm:block text-yellow-400 sm:text-lg md:text-xl font-semibold tracking-wider uppercase break-words m-0">
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
    </div>
  );
};

export default Hero;
