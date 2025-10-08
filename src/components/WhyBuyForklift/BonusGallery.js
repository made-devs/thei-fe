'use client';
import React, { useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const BonusGallery = ({ dictionary }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!dictionary || !dictionary.images || dictionary.images.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1280px]">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black">{dictionary.title}</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            {dictionary.description}
          </p>
        </div>

        {/* REVISI: Kontainer ini sekarang menjadi 'relative' untuk menampung panah */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {dictionary.images.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                >
                  <div className="group">
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <h3 className="mt-4 text-center font-semibold text-lg text-gray-800">
                      {image.caption}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* REVISI: Panah dipindahkan ke dalam kontainer 'relative' */}
          <button
            className="absolute top-[40%] -translate-y-1/2 -left-4 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ArrowLeft size={24} className="text-black" />
          </button>
          <button
            className="absolute top-[40%] -translate-y-1/2 -right-4 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ArrowRight size={24} className="text-black" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BonusGallery;
