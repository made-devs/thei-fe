'use client';
import React, { useLayoutEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Cog, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Komponen harga dengan format khusus
const PriceDisplay = ({ priceString }) => {
  const number = parseInt(priceString.replace(/[^0-9]/g, ''), 10);
  const fullPrice = number * 1000000;
  const formatted = new Intl.NumberFormat('id-ID').format(fullPrice);

  const parts = formatted.split('.');
  const mainDigits = parts[0];
  const trailingDigits = `.${parts.slice(1).join('.')},-`;

  return (
    <div className="flex items-baseline">
      {/* Warna teks disesuaikan untuk background terang */}
      <span className="text-lg font-bold text-gray-800 mr-1 self-start">
        Rp
      </span>
      <span className="text-3xl font-extrabold text-black leading-none">
        {mainDigits}
      </span>
      <span className="text-lg font-bold text-gray-800">{trailingDigits}</span>
    </div>
  );
};

const HighlightPromo = ({ dictionary, currentLocale }) => {
  const packages = useMemo(
    () => dictionary.packages || [],
    [dictionary.packages]
  );
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, { opacity: 0, y: 100 });

      gsap.to(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center 80%',
          scrub: 1,
        },
        opacity: 1,
        y: 0,
        ease: 'power1.out',
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [packages]);

  return (
    <section ref={sectionRef} className="bg-black pt-[5rem] pb-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center text-sm font-bold uppercase text-yellow-400 mb-2">
            <Cog
              size={20}
              className="mr-2 animate-spin"
              style={{ animationDuration: '5s' }}
            />
            <span>{dictionary.subtitle}</span>
          </div>
          <h2 className="text-4xl font-bold leading-[2.5rem] text-yellow-400">
            {dictionary.title_line1}
            <br />
            {dictionary.title_line2}
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            {dictionary.description}
          </p>
        </div>

        {/* Grid Kartu Promo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {packages.map((pkg, index) => {
            const isDiamond = pkg.name === 'DIAMOND';
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                // UBAH BG KARTU MENJADI PUTIH
                className={`bg-white rounded-lg shadow-lg flex flex-col relative text-left transition-transform duration-300 ${
                  isDiamond
                    ? 'lg:scale-105 border-4 border-yellow-400'
                    : 'hover:scale-105'
                }`}
              >
                <div className="p-6 flex flex-col flex-grow">
                  {isDiamond && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-4 py-1 rounded-full">
                      {dictionary.best_value}
                    </div>
                  )}
                  <div className="relative w-full aspect-video mb-4 rounded-md overflow-hidden">
                    <Image
                      src={`/home/promo${index + 1}.webp`}
                      alt={`${pkg.name} promo image`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* UBAH WARNA TEKS KARTU MENJADI GELAP */}
                  <h3 className="text-xl font-bold text-black">{pkg.name}</h3>
                  <p className="text-gray-600 text-xs mt-2 h-10">
                    {pkg.description}
                  </p>

                  <div className="my-2">
                    <PriceDisplay priceString={pkg.price} />
                  </div>

                  <button
                    className={`w-full py-2 my-2 font-bold rounded-lg transition-colors ${
                      isDiamond
                        ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    {dictionary.button_text}
                  </button>

                  <hr className="my-3 border-gray-200" />

                  <div className="flex-grow">
                    <p className="text-xs font-semibold mb-2 text-black">
                      {dictionary.what_included}
                    </p>
                    <ul className="space-y-1.5 max-h-32 overflow-y-auto">
                      {pkg.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start">
                          <Check
                            size={16}
                            className="text-green-500 mr-2 flex-shrink-0 mt-0.5"
                          />
                          <span className="text-gray-600 text-xs">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HighlightPromo;
