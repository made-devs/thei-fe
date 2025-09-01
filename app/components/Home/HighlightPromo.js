'use client';
import React, { useLayoutEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
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
      {/* UKURAN FONT DIKECILKAN */}
      <span className="text-lg font-bold text-black mr-1 self-start">Rp</span>
      <span className="text-3xl font-extrabold text-black leading-none">
        {mainDigits}
      </span>
      <span className="text-lg font-bold text-black">{trailingDigits}</span>
    </div>
  );
};

const HighlightPromo = ({ dictionary }) => {
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
          // FIX: Memberi lebih banyak ruang untuk animasi selesai
          end: 'center 80%',
          scrub: 1,
        },
        opacity: 1,
        y: 0,
        ease: 'power1.out',
        // FIX: Mengurangi jeda antar animasi agar tidak terlalu terasa "telat"
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [packages]);

  return (
    <section ref={sectionRef} className="bg-gray-100 pt-[8rem] pb-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <div className="flex items-center text-sm font-bold uppercase text-yellow-400 mb-2">
              <Cog
                size={20}
                className="mr-2 animate-spin"
                style={{ animationDuration: '5s' }}
              />
              <span>{dictionary.subtitle}</span>
            </div>
            <h2 className="text-5xl font-bold leading-[3.5rem] text-black">
              {dictionary.title_line1}
              <br />
              {dictionary.title_line2}
            </h2>
          </div>
          <a
            href="#"
            className="mt-4 md:mt-0 bg-yellow-300 text-black font-semibold text-sm px-6 py-3 rounded-full shadow-md hover:bg-gray-200 transition-colors flex items-center"
          >
            <span>{dictionary.view_all}</span>
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>

        {/* Grid Kartu Promo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {packages.map((pkg, index) => {
            const isDiamond = pkg.name === 'DIAMOND';
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`bg-white rounded-lg shadow-lg flex flex-col relative text-left transition-transform duration-300 ${
                  isDiamond
                    ? 'lg:scale-105 border-4 border-yellow-400'
                    : 'hover:scale-105'
                }`}
              >
                {/* PADDING KARTU DIKECILKAN DARI p-8 MENJADI p-6 */}
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
                  {/* UKURAN FONT NAMA PAKET DIKECILKAN DARI 2xl MENJADI xl */}
                  <h3 className="text-xl font-bold text-black">{pkg.name}</h3>
                  {/* UKURAN FONT DESKRIPSI DIKECILKAN DARI sm MENJADI xs */}
                  <p className="text-gray-600 text-xs mt-2 h-10">
                    {pkg.description}
                  </p>

                  {/* MARGIN HARGA DIKURANGI */}
                  <div className="my-2">
                    <PriceDisplay priceString={pkg.price} />
                  </div>

                  <button
                    className={`w-full py-2 my-2 font-bold rounded-lg transition-colors ${
                      isDiamond
                        ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                        : 'bg-gray-800 text-white hover:bg-black'
                    }`}
                  >
                    {dictionary.button_text}
                  </button>

                  <hr className="my-3 border-gray-200" />

                  <div className="flex-grow">
                    <p className="text-xs font-semibold mb-2 text-black">
                      {dictionary.what_included}
                    </p>
                    {/* TINGGI LIST DIKURANGI, FONT DIKECILKAN */}
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
