'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { Cog, ArrowLeft, ArrowRight } from 'lucide-react';

const ContentCarousel = ({
  items = [],
  subtitle = '',
  title = '',
  description = '',
  currentLocale = 'id',
  aspect = 'video',
  hoverText = 'Klik untuk Detail',
  cta_text = '',
  cta_link = '',
}) => {
  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: true,
  });

  const [activeIdx, setActiveIdx] = useState(0);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  // Sync dots with embla
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIdx(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const renderCard = (item) => (
    <>
      <div
        className={`relative w-full rounded-lg overflow-hidden shadow-lg group ${
          aspect === 'square' ? '' : 'aspect-video'
        }`}
        style={aspect === 'square' ? { aspectRatio: '1 / 1' } : undefined}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Overlay on hover - only show if there's a link */}
        {item.link && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
            <span className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {hoverText}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 text-center">
        <h3 className="font-bold text-lg mt-2 mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        {item.cta && (
          <span
            className={`inline-block bg-yellow-400 text-black px-6 py-2 text-sm font-bold tracking-wide uppercase rounded-md ${
              item.link ? 'hover:bg-yellow-500 transition-colors' : ''
            }`}
          >
            {item.cta}
          </span>
        )}
      </div>
    </>
  );

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Header */}
        {(subtitle || title || description) && (
          <div className="text-center mb-12">
            <div className="flex items-center justify-center text-sm font-bold uppercase text-yellow-400 mb-2">
              <Cog
                size={20}
                className="mr-2 animate-spin"
                style={{ animationDuration: '5s' }}
              />
              <span>{subtitle}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold">{title}</h2>
            {description && (
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Carousel */}
        {items.length > 0 && (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                  >
                    {item.link ? (
                      <Link href={item.link} className="block">
                        {renderCard(item)}
                      </Link>
                    ) : (
                      <div className="block">{renderCard(item)}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* DOTS INDICATOR MOBILE */}
            <div className="flex justify-center mt-6 space-x-2 md:hidden">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                  className={`h-2 rounded-full transition-all duration-200 focus:outline-none ${
                    activeIdx === idx ? 'w-6 bg-yellow-400' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              className="absolute top-[calc(50%-2.5rem)] -left-4 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
              onClick={scrollPrev}
            >
              <ArrowLeft size={24} className="text-black" />
            </button>
            <button
              className="absolute top-[calc(50%-2.5rem)] -right-4 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
              onClick={scrollNext}
            >
              <ArrowRight size={24} className="text-black" />
            </button>
          </div>
        )}

        {/* CTA Button - Single button for all slides */}
        {cta_text && cta_link && (
          <div className="text-center mt-12">
            <Link
              href={cta_link}
              className="inline-block bg-yellow-400 text-black px-8 py-3 text-sm font-bold tracking-wide uppercase hover:bg-yellow-500 transition-colors rounded-full"
            >
              {cta_text}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentCarousel;
