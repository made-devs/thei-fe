'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Eye,
  Bookmark,
  Share2,
  Clock,
  MapPin,
  X,
  Sparkles,
} from 'lucide-react';

const PromoPackages = ({ dictionary, lang }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [savedPromos, setSavedPromos] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [selectedPromo, setSelectedPromo] = useState(null); // State untuk modal detail

  // Data promo dari dictionary
  const allPromos = dictionary?.list || [];

  // Pisahkan large dan small promos
  const largePromos = allPromos.filter((promo) => promo.size === 'large');
  const smallPromos = allPromos.filter((promo) => promo.size !== 'large');

  // Setup Embla Carousel untuk small promos
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Hardcoded data untuk header
  const sectionBadge = 'Exclusive Offers';
  const title = 'Best Deals,';
  const titleHighlight = 'Maximum Benefits.';
  const description =
    'Discover our latest promotions on heavy equipment with unbeatable discounts and benefits.';

  const filters = [
    'Semua',
    'Excavator',
    'Bulldozer',
    'Crane',
    'Loader',
    '<2JT',
    '<5JT',
    'Flash Sale',
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allPromos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allPromos.length) % allPromos.length);
  };

  const toggleSave = (promoId) => {
    setSavedPromos((prev) =>
      prev.includes(promoId)
        ? prev.filter((id) => id !== promoId)
        : [...prev, promoId]
    );
  };

  const sendWhatsApp = (promo) => {
    const messages = {
      Excavator: `Halo, mau sewa excavator ${
        promo.title || 'ini'
      }. Untuk berapa hari dan area mana?`,
      Bulldozer: `Halo, saya tertarik bulldozer ${
        promo.title || 'ini'
      }. Masih ready stock? Bisa COD?`,
      Crane: `Halo, saya mau rental crane ${
        promo.title || 'ini'
      }. Kapasitas berapa ton yang tersedia?`,
      Loader: `Halo, mau booking loader ${
        promo.title || 'ini'
      }. Kapan slot terdekat yang available?`,
    };

    const message =
      messages[promo.category] ||
      `Halo, saya tertarik dengan promo alat berat ini. Bisa info lebih lanjut?`;
    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
      message
    )}`;
    window.open(waUrl, '_blank');
  };

  const openDetail = (promo) => {
    setSelectedPromo(promo);
  };

  const closeDetail = () => {
    setSelectedPromo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center mt-10 gap-2 px-4 py-2 bg-yellow-400/10 rounded-full mb-4">
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

      {/* Large Promos Grid */}
      {largePromos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {largePromos.map((promo) => (
              <div
                key={promo.id}
                className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] col-span-1 row-span-1"
              >
                {/* Image */}
                <Image
                  src={promo.image}
                  alt={promo.title || 'Promo Alat Berat'}
                  width={500}
                  height={400}
                  className="w-full h-full object-cover"
                />

                {/* Overlay & Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/80 to-transparent p-6 flex flex-col justify-end">
                  {promo.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      {promo.badge}
                    </span>
                  )}

                  <button
                    onClick={() => toggleSave(promo.id)}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition"
                  >
                    <Bookmark
                      className={`w-5 h-5 ${
                        savedPromos.includes(promo.id)
                          ? 'fill-white text-white'
                          : 'text-white'
                      }`}
                    />
                  </button>

                  <div className="flex items-center gap-2 mb-2 text-white">
                    <span className="px-2 py-1 bg-red-500 rounded text-xs font-bold">
                      {promo.discount} OFF
                    </span>
                    <span className="text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {promo.expiry}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-yellow-400 mb-1">
                    {promo.title}
                  </h3>

                  <div className="flex items-center gap-2 text-white mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">{promo.location}</span>
                    <Eye className="w-4 h-4 ml-2" />
                    <span className="text-xs">{promo.views}</span>
                  </div>

                  {/* Kondisi: Jika ada price, tampilkan harga; jika tidak, tampilkan description */}
                  {promo.price ? (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm line-through text-gray-300">
                        {promo.originalPrice}
                      </span>
                      <span className="text-2xl font-bold text-white">
                        {promo.price}
                      </span>
                    </div>
                  ) : (
                    promo.description && (
                      <p className="text-base text-white mb-3">
                        {promo.description}
                      </p>
                    )
                  )}

                  <div className="flex gap-2">
                    <Link
                      href={`/${lang}/promotions/${promo.slug}`}
                      className="flex-1 bg-black hover:bg-gray-800 text-yellow-400 px-4 py-2 rounded-lg text-sm font-semibold transition text-center"
                    >
                      Detail
                    </Link>
                    <button
                      onClick={() => sendWhatsApp(promo)}
                      className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Small Promos Carousel */}
      {smallPromos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            More Promotions
          </h3>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {smallPromos.map((promo) => (
                  <div
                    key={promo.id}
                    className="flex-[0_0_300px] mr-4 h-[25rem]"
                  >
                    <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full">
                      {/* Image */}
                      <Image
                        src={promo.image}
                        alt={promo.title || 'Promo Alat Berat'}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay & Content */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/70 to-transparent p-3 flex flex-col justify-end h-full">
                        {promo.badge && (
                          <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                            {promo.badge}
                          </span>
                        )}

                        <button
                          onClick={() => toggleSave(promo.id)}
                          className="absolute top-2 right-2 p-1 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition"
                        >
                          <Bookmark
                            className={`w-3 h-3 ${
                              savedPromos.includes(promo.id)
                                ? 'fill-white text-white'
                                : 'text-white'
                            }`}
                          />
                        </button>

                        <div className="flex items-center gap-1 mb-1 text-white">
                          <span className="px-1 py-0.5 bg-red-500 rounded text-xs font-bold">
                            {promo.discount} OFF
                          </span>
                          <span className="text-xs flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            {promo.expiry}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-yellow-400 mb-1">
                          {promo.title}
                        </h4>

                        <div className="flex items-center gap-1 text-white mb-2">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">{promo.location}</span>
                          <Eye className="w-3 h-3 ml-1" />
                          <span className="text-xs">{promo.views}</span>
                        </div>

                        {/* Kondisi: Jika ada price, tampilkan harga; jika tidak, tampilkan description */}
                        {promo.price ? (
                          <div className="flex items-center gap-1 mb-2">
                            <span className="text-xs line-through text-gray-300">
                              {promo.originalPrice}
                            </span>
                            <span className="text-lg font-bold text-white">
                              {promo.price}
                            </span>
                          </div>
                        ) : (
                          promo.description && (
                            <p className="text-xs text-white mb-2">
                              {promo.description}
                            </p>
                          )
                        )}

                        <div className="flex flex-col gap-1">
                          <Link
                            href={`/${lang}/promotions/${promo.slug}`}
                            className="w-full bg-black hover:bg-gray-800 text-yellow-400 px-2 py-1 rounded text-xs font-semibold transition text-center"
                          >
                            Detail
                          </Link>
                          <button
                            onClick={() => sendWhatsApp(promo)}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold flex items-center justify-center gap-0.5 transition"
                          >
                            <MessageCircle className="w-3 h-3" />
                            Chat
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </section>
      )}

      {/* Modal Detail - Pop up image promo */}
      {selectedPromo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl">
            <button
              onClick={closeDetail}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={selectedPromo.image}
              alt={selectedPromo.title}
              width={1200}
              height={800}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoPackages;
