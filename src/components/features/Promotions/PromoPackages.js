'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  MapPin,
  X,
  Sparkles,
} from 'lucide-react';

const PromoPackages = ({ dictionary, lang }) => {
  const [selectedPromo, setSelectedPromo] = useState(null);

  // Data promo dari dictionary
  const allPromos = useMemo(() => dictionary?.list || [], [dictionary]);

  // Pisahkan promo berdasarkan ID dan remove duplicates
  const featuredPromos = useMemo(() => {
    const filtered = allPromos.filter((promo) =>
      ['r1', 'r2', 'r3', 'r4'].includes(promo.id)
    );
    // Remove duplicates by ID
    return filtered.filter(
      (promo, index, self) => index === self.findIndex((p) => p.id === promo.id)
    );
  }, [allPromos]);

  const servicePromos = useMemo(() => {
    const filtered = allPromos.filter((promo) =>
      ['r5', 'r6', 'r9', 'r7', 'r8'].includes(promo.id)
    );
    return filtered.filter(
      (promo, index, self) => index === self.findIndex((p) => p.id === promo.id)
    );
  }, [allPromos]);

  // Setup Embla Carousel untuk Service Promo
  const [emblaRef2, emblaApi2] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const scrollPrev2 = useCallback(() => {
    if (emblaApi2) emblaApi2.scrollPrev();
  }, [emblaApi2]);

  const scrollNext2 = useCallback(() => {
    if (emblaApi2) emblaApi2.scrollNext();
  }, [emblaApi2]);

  // Hardcoded data untuk header
  const sectionBadge = 'Exclusive Offers';
  const title = 'Best Deals,';
  const titleHighlight = 'Maximum Benefits.';
  const description =
    'Discover our latest promotions on heavy equipment with unbeatable discounts and benefits.';

  const sendWhatsApp = useCallback((promo) => {
    const message = `Halo, saya tertarik dengan promo ${
      promo.title || 'alat berat ini'
    }. Bisa info lebih lanjut?`;
    const waUrl = `https://wa.me/6285195886789?text=${encodeURIComponent(
      message
    )}`;
    window.open(waUrl, '_blank');
  }, []);

  const openDetail = useCallback((promo) => {
    setSelectedPromo(promo);
  }, []);

  const closeDetail = useCallback(() => {
    setSelectedPromo(null);
  }, []);

  // Component untuk Small Promo Card
  const SmallPromoCard = ({ promo }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden h-full flex flex-col">
      {/* Image Section */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-200">
        <Image
          src={promo.image}
          alt={promo.title || 'Promo Alat Berat'}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => openDetail(promo)}
        />
        {promo.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full font-bold text-xs">
            -{promo.discount}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title & Location */}
        <div className="mb-2">
          <h4 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1">
            {promo.title}
          </h4>
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="w-3 h-3" />
            <span className="text-xs">{promo.location}</span>
          </div>
        </div>

        {/* Description or Price */}
        <div className="mb-3 flex-grow">
          {promo.price ? (
            <div>
              {promo.originalPrice && (
                <p className="text-xs line-through text-gray-400">
                  {promo.originalPrice}
                </p>
              )}
              <p className="text-lg font-bold text-yellow-600">{promo.price}</p>
            </div>
          ) : promo.description ? (
            <p className="text-xs text-gray-600 line-clamp-2">
              {promo.description}
            </p>
          ) : null}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <Link
            href={`/${lang}/promotions/${promo.slug}`}
            className="w-full bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-lg text-xs font-semibold transition text-center"
          >
            Detail
          </Link>
          <button
            onClick={() => sendWhatsApp(promo)}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <MessageCircle className="w-3 h-3" />
            Chat
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">
            {sectionBadge}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
          {title} <span className="text-yellow-400">{titleHighlight}</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {/* Featured Promos (r1-r4) - Vertical Layout */}
      {featuredPromos.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 space-y-16">
          {featuredPromos.map((promo, index) => (
            <div key={`featured-${promo.id}-${index}`} className="space-y-6">
              {/* Header dengan Badge & Title */}
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
                  {promo.title}
                </h3>
                {promo.description && (
                  <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                    {promo.description}
                  </p>
                )}
              </div>

              {/* Card */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                {/* Image Section */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-200">
                  <Image
                    src={promo.image}
                    alt={promo.title || 'Promo Alat Berat'}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => openDetail(promo)}
                  />
                  {promo.discount && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                      -{promo.discount}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Location */}
                  <div className="flex items-center gap-1 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{promo.location}</span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/${lang}/promotions/${promo.slug}`}
                      className="flex-1 bg-black hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition text-center"
                    >
                      Detail
                    </Link>
                    <button
                      onClick={() => sendWhatsApp(promo)}
                      className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Slider 2: Service Promo */}
      {servicePromos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Service Promo
          </h3>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef2}>
              <div className="flex gap-6">
                {servicePromos.map((promo, index) => (
                  <div
                    key={`service-${promo.id}-${index}`}
                    className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                  >
                    <SmallPromoCard promo={promo} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={scrollPrev2}
              className="absolute -left-4 sm:left-0 top-1/3 -translate-y-1/2 bg-white hover:bg-gray-100 p-2 rounded-full shadow-lg transition z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={scrollNext2}
              className="absolute -right-4 sm:right-0 top-1/3 -translate-y-1/2 bg-white hover:bg-gray-100 p-2 rounded-full shadow-lg transition z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </section>
      )}

      {/* Modal Detail */}
      {selectedPromo && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeDetail}
        >
          <div
            className="relative bg-white rounded-lg overflow-hidden shadow-2xl max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeDetail}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={selectedPromo.image}
              alt={selectedPromo.title}
              width={800}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoPackages;
