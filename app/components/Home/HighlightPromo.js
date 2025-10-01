'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Check, Cog, ChevronLeft, ChevronRight } from 'lucide-react'; // 1. Tambah ikon panah
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

// Komponen harga gak berubah
const PriceDisplay = ({ priceString }) => {
  const number = parseInt(priceString.replace(/[^0-9]/g, ''), 10);
  const fullPrice = number * 1000;
  const formatted = new Intl.NumberFormat('id-ID').format(fullPrice);
  const parts = formatted.split('.');
  const mainDigits = parts[0];
  const trailingDigits = `.${parts.slice(1).join('.')},-`;

  return (
    <div className="flex items-baseline">
      <span className="text-lg font-bold text-gray-800 mr-1 self-start">
        Rp
      </span>
      <span className="text-3xl font-extrabold text-black leading-none">
        {mainDigits}
      </span>
      <span className="text-xl font-bold text-gray-800">{trailingDigits}</span>
    </div>
  );
};

const HighlightPromo = ({ dictionary }) => {
  const packages = dictionary.packages || [];
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUrl) => setSelectedImage(imageUrl);
  const closeModal = () => setSelectedImage(null);

  const autoplay = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    })
  );

  // 2. Ambil emblaApi buat kontrol carousel
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [autoplay.current]
  );

  // 3. Bikin fungsi buat geser carousel
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  return (
    <>
      <section className="bg-black pt-[5rem] pb-20">
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

          {/* 4. Bungkus Carousel dengan div relative buat posisi panah */}
          <div className="relative">
            <div className="overflow-hidden py-4" ref={emblaRef}>
              <div className="flex">
                {packages.map((pkg, index) => {
                  const isDiamond = pkg.name === 'DIAMOND';
                  const largeImagePath =
                    pkg.largeSrc || `/promo/promo${index + 1}.webp`;

                  return (
                    <div
                      key={index}
                      className="relative basis-full md:basis-1/2 lg:basis-1/4 shrink-0 grow-0 px-4"
                    >
                      <div
                        className={`bg-white rounded-lg shadow-lg flex flex-col h-full relative text-left transition-transform duration-300 ${
                          isDiamond
                            ? 'lg:scale-102 border-4 border-yellow-400'
                            : ''
                        }`}
                      >
                        <div className="p-6 flex flex-col flex-grow">
                          {isDiamond && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-4 py-1 rounded-full">
                              {dictionary.best_value}
                            </div>
                          )}

                          <div
                            onClick={() => openModal(largeImagePath)}
                            className="relative group w-full aspect-square mb-4 rounded-md overflow-hidden cursor-pointer"
                          >
                            <Image
                              src={`/promo/promo${index + 1}.webp`}
                              alt={`${pkg.name} promo image`}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="text-white font-bold">
                                Click to Zoom
                              </span>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold text-black">
                            {pkg.name}
                          </h3>
                          <p className="text-gray-600 text-xs mt-2 h-10">
                            {pkg.description}
                          </p>
                          <div className="mb-2 mt-4">
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
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Tombol panah navigasi */}
            <button
              className="absolute top-1/2 -translate-y-1/2 left-0 z-10 flex items-center justify-center h-12 w-12 rounded-full bg-white/20 hover:bg-white/40 text-white transition -ml-4"
              onClick={scrollPrev}
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute top-1/2 -translate-y-1/2 right-0 z-10 flex items-center justify-center h-12 w-12 rounded-full bg-white/20 hover:bg-white/40 text-white transition -mr-4"
              onClick={scrollNext}
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Modal (tidak berubah) */}
      {selectedImage && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative cursor-default"
          >
            <Image
              src={selectedImage}
              alt="Zoomed Promo Image"
              width={800}
              height={800}
              className="object-contain max-w-[90vw] max-h-[90vh] rounded-lg"
            />
            <button
              onClick={closeModal}
              className="absolute -top-3 -right-3 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HighlightPromo;
