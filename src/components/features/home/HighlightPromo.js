'use client';
import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Tag,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // Tambahkan import Image

export default function HighlightPromo({ dictionary, currentLocale }) {
  // Pindahkan definisi promos ke atas, setelah props
  const promos = dictionary?.promos || [];
  const sectionBadge = dictionary?.section_badge || 'Promo Bulan Ini';
  const title = dictionary?.title || 'Penawaran';
  const titleHighlight = dictionary?.title_highlight || 'Terbatas';
  const description =
    dictionary?.description ||
    'Jangan lewatkan kesempatan emas untuk meningkatkan produktivitas bisnis Anda';
  const viewAllText = dictionary?.view_all_text || 'Lihat Semua Promo';
  const viewAllLink = dictionary?.view_all_link || '/promotions';
  const ctaFeatured = dictionary?.cta_featured || 'Ambil Promo';
  const ctaRegular = dictionary?.cta_regular || 'Lihat Detail';

  const [hoveredId, setHoveredId] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
      dragFree: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    const snaps = emblaApi.scrollSnapList();
    // Batasi snap points ke jumlah promos untuk menghindari dots ekstra dari loop
    setScrollSnaps(snaps.slice(0, promos.length));
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect, promos.length]);

  const getBadgeStyle = (badge) => {
    const styles = {
      'BEST VALUE': 'from-yellow-400 to-orange-500',
      'FLASH SALE': 'from-red-500 to-pink-600',
      'FREE BONUS': 'from-green-500 to-emerald-600',
      SPECIAL: 'from-purple-500 to-indigo-600',
      'HOT DEAL': 'from-orange-500 to-red-600',
    };
    return styles[badge] || 'from-yellow-400 to-orange-500';
  };

  // Return null jika tidak ada data
  if (!promos || promos.length === 0) {
    return null;
  }

  return (
    <section className="bg-black py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">
              {sectionBadge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            {title} <span className="text-yellow-400">{titleHighlight}</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Embla Viewport */}
          <div className="overflow-hidden p-5 sm:p-18" ref={emblaRef}>
            <div className="flex -ml-4">
              {promos.map((promo) => (
                <div
                  key={promo.id}
                  className="
                    flex-[0_0_100%] min-w-0 pl-4
                    sm:flex-[0_0_50%] sm:pl-4
                    lg:flex-[0_0_33.3333%] lg:pl-4
                  "
                  onMouseEnter={() => setHoveredId(promo.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div
                    className={`relative rounded-2xl overflow-hidden transition-all duration-300 h-full ${
                      hoveredId === promo.id
                        ? 'shadow-2xl shadow-yellow-400/30 scale-105'
                        : 'shadow-lg shadow-black/50'
                    }`}
                  >
                    {/* Corner Ribbon for Featured */}
                    {promo.is_featured && (
                      <div className="absolute top-0 right-0 z-20">
                        <div className="relative">
                          <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden">
                            <div
                              className={`absolute top-5 -right-7 bg-gradient-to-r ${getBadgeStyle(
                                promo.badge
                              )} text-white text-xs font-bold py-1.5 px-10 transform rotate-45 shadow-lg`}
                            >
                              FEATURED
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div
                        className={`bg-gradient-to-r ${getBadgeStyle(
                          promo.badge
                        )} text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-lg flex items-center gap-1`}
                      >
                        <Tag className="w-3 h-3" />
                        {promo.badge}
                      </div>
                    </div>

                    {/* Urgent Indicator */}
                    {promo.urgent && (
                      <div className="absolute top-4 right-4 z-20">
                        <div className="flex items-center gap-1 bg-red-600 px-2 py-1 rounded-full">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          <span className="text-white text-xs font-bold">
                            SEGERA
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Card Image with 4:5 Aspect Ratio */}
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={promo.image}
                        alt={promo.title}
                        fill
                        className={`object-cover transition-transform duration-700 ${
                          hoveredId === promo.id ? 'scale-110' : 'scale-100'
                        }`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Overlay gradient: sepertiga bawah lebih pekat */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.85) 33%, rgba(0,0,0,0.5) 66%, transparent 100%)',
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
                      {/* Valid Until */}
                      <div className="flex items-center gap-2 text-yellow-300 text-sm mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">
                          {promo.valid_until}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-xl font-bold text-white mb-2 line-clamp-2">
                        {promo.title}
                      </h3>
                      <p className="text-xs sm:text-base lg:text-lg text-gray-300 mb-4 line-clamp-2">
                        {promo.description}
                      </p>

                      {/* CTA Button */}
                      <Link
                        href={`/${currentLocale}${promo.cta_link}`}
                        className={`w-full font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all flex items-center justify-center gap-2 group text-sm sm:text-base ${
                          promo.is_featured
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg shadow-yellow-400/20'
                            : 'bg-white/10 backdrop-blur-md hover:bg-yellow-400 text-white hover:text-black border border-white/20'
                        }`}
                      >
                        <span>
                          {promo.is_featured ? ctaFeatured : ctaRegular}
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Desktop */}
          <div className="hidden lg:block">
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all ${
                  index === selectedIndex
                    ? 'w-6 h-2 bg-yellow-400'
                    : 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
                } rounded-full`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 sm:mt-12">
          <Link
            href={`/${currentLocale}${viewAllLink}`}
            className="inline-flex items-center gap-2 bg-transparent hover:bg-yellow-400/10 border-2 border-yellow-400 hover:border-yellow-400 text-yellow-400 hover:text-yellow-400 font-bold px-8 py-3.5 rounded-xl transition-all duration-300 group"
          >
            <span>{viewAllText}</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
