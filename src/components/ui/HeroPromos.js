'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Eye,
  X,
  Sparkles,
} from 'lucide-react';

const HeroPromos = ({ promos, dictionary, lang, title, description }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedPromoImage, setSelectedPromoImage] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  // Auto-slide setiap 5 detik - hanya jika lebih dari 1 promo
  useEffect(() => {
    if (promos.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % promos.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [promos.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promos.length) % promos.length);
  };

  const sendWhatsApp = (promo) => {
    const messages = {
      Makanan: `Halo, mau order promo ${
        promo.title || 'ini'
      }. Untuk berapa orang dan jam berapa tersedia?`,
      Fashion: `Halo, saya tertarik promo ${
        promo.title || 'ini'
      }. Masih ready stock? Bisa COD?`,
      Elektronik: `Halo, saya mau beli promo ${
        promo.title || 'ini'
      }. Garansi resmi kan? Bisa cicilan?`,
      Service: `Halo, mau booking promo ${
        promo.title || 'ini'
      }. Kapan slot terdekat yang available?`,
    };

    const message =
      messages[promo.category] ||
      `Halo, saya tertarik dengan promo ini. Bisa info lebih lanjut?`;
    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
      message
    )}`;
    window.open(waUrl, '_blank');
  };

  if (!promos || promos.length === 0) return null;

  return (
    <>
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="w-full">
          {/* Judul dan Deskripsi */}
          {title && (
            <div className="text-center mb-12 sm:mb-16 px-4 sm:px-6 lg:px-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-600 font-bold text-xs sm:text-sm uppercase tracking-wider">
                  Special Offers
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4">
                {title}
              </h2>
              {description && (
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Cards Container - Full Width */}
          <div className="flex flex-col gap-6 sm:gap-8 px-4 sm:px-6 lg:px-0">
            {promos.map((promo, index) => (
              <div
                key={promo.id}
                onMouseEnter={() => setHoveredId(promo.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group mx-auto w-full md:max-w-4xl flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white transition-all duration-300 ${
                  hoveredId === promo.id
                    ? 'shadow-2xl shadow-black/20 md:scale-105'
                    : 'shadow-lg shadow-black/10'
                }`}
              >
                {/* Image Container - Top Mobile / Kiri Desktop (4:5 Aspect Ratio) */}
                <div className="relative aspect-video md:aspect-[4/5] w-full md:w-[40%] overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    onClick={() => setSelectedPromoImage(promo.image)}
                  />

                  {/* Badge */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-yellow-400 text-black px-2 sm:px-3 py-1 rounded-full font-bold text-xs sm:text-sm">
                    {promo.badge || 'HOT DEAL'}
                  </div>

                  {/* Discount Tag jika ada */}
                  {promo.discount && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-500 text-white px-2 py-1 rounded-full font-bold text-xs">
                      -{promo.discount}
                    </div>
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Container - Bottom Mobile / Kanan Desktop */}
                <div className="flex-1 flex flex-col p-3 sm:p-4 md:p-8 w-full md:w-[60%] justify-between">
                  {/* Top Section */}
                  <div>
                    {/* Title */}
                    <h3 className="font-bold text-base sm:text-lg md:text-2xl text-black mb-1 sm:mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                      {promo.title}
                    </h3>

                    {/* Tagline */}
                    {promo.tagline && (
                      <p className="text-xs sm:text-sm text-gray-500 mb-2 line-clamp-1">
                        {promo.tagline}
                      </p>
                    )}

                    {/* Description */}
                    {promo.description && (
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 md:line-clamp-3">
                        {promo.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom Section */}
                  <div>
                    {/* Price Section */}
                    {promo.price && (
                      <div className="mb-3 sm:mb-4 md:mb-6 pb-3 sm:pb-4 md:pb-6 border-b border-gray-200">
                        {promo.originalPrice && (
                          <p className="text-xs sm:text-sm text-gray-400 line-through mb-1">
                            {promo.originalPrice}
                          </p>
                        )}
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600">
                          {promo.price}
                        </p>
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex gap-2 sm:gap-3">
                      <button
                        onClick={() => sendWhatsApp(promo)}
                        className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 sm:py-3 md:py-3.5 px-2 sm:px-4 md:px-6 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 shadow-md hover:shadow-lg text-xs sm:text-sm md:text-base"
                      >
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Chat</span>
                      </button>
                      <button
                        onClick={() => setSelectedPromoImage(promo.image)}
                        className="flex-1 bg-black hover:bg-gray-800 text-white font-bold py-2 sm:py-3 md:py-3.5 px-2 sm:px-4 md:px-6 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 shadow-md hover:shadow-lg text-xs sm:text-sm md:text-base"
                      >
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Detail</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls - Hanya tampil di mobile */}
          {promos.length > 1 && (
            <div className="flex md:hidden justify-center gap-3 sm:gap-4 mt-8 px-4">
              <button
                onClick={prevSlide}
                className="p-2 bg-black hover:bg-gray-800 text-yellow-400 rounded-full transition-all shadow-lg"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className="flex gap-2 items-center">
                {promos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? 'bg-yellow-400 w-6'
                        : 'bg-gray-300 w-2'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 bg-black hover:bg-gray-800 text-yellow-400 rounded-full transition-all shadow-lg"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal Full Screen Image */}
      {selectedPromoImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPromoImage(null)}
        >
          <div
            className="relative w-full h-screen max-h-[90vh] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPromoImage(null)}
              className="absolute top-4 right-4 p-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full transition-all z-10 shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Full Screen Image */}
            <Image
              src={selectedPromoImage}
              alt="Promo Detail"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HeroPromos;
