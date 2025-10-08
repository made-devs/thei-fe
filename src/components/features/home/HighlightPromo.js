"use client";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Tag,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HighlightPromo() {
  const [hoveredId, setHoveredId] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
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
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  // Mock data - nanti dari dictionary
  const promos = [
    {
      id: "promo-1",
      badge: "BEST VALUE",
      title: "Paket Bundling Forklift Premium",
      description: "Unit baru + Service 1 tahun + Training operator",
      discount: "Hemat 50 Juta",
      validUntil: "3 Hari Lagi",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800",
      isFeatured: true,
      urgent: true,
    },
    {
      id: "promo-2",
      badge: "FLASH SALE",
      title: "Rental Excavator Diskon 40%",
      description: "Khusus proyek infrastruktur",
      discount: "40% OFF",
      validUntil: "5 Hari Lagi",
      image:
        "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800",
      isFeatured: false,
      urgent: true,
    },
    {
      id: "promo-3",
      badge: "FREE BONUS",
      title: "Gratis Oli & Filter Premium",
      description: "Setiap pembelian suku cadang",
      discount: "Bonus 5 Juta",
      validUntil: "2 Minggu",
      image:
        "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800",
      isFeatured: false,
      urgent: false,
    },
    {
      id: "promo-4",
      badge: "SPECIAL",
      title: "Service Package Platinum",
      description: "Perawatan lengkap all-in",
      discount: "Diskon 25%",
      validUntil: "1 Bulan",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      isFeatured: false,
      urgent: false,
    },
    {
      id: "promo-5",
      badge: "HOT DEAL",
      title: "Trade-In Unit Lama",
      description: "Nilai tukar tinggi + bonus",
      discount: "Best Price",
      validUntil: "3 Bulan",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800",
      isFeatured: false,
      urgent: false,
    },
  ];

  const getBadgeStyle = (badge) => {
    const styles = {
      "BEST VALUE": "from-yellow-400 to-orange-500",
      "FLASH SALE": "from-red-500 to-pink-600",
      "FREE BONUS": "from-green-500 to-emerald-600",
      SPECIAL: "from-purple-500 to-indigo-600",
      "HOT DEAL": "from-orange-500 to-red-600",
    };
    return styles[badge] || "from-yellow-400 to-orange-500";
  };

  return (
    <section className="bg-black py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">
              Promo Bulan Ini
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Penawaran <span className="text-yellow-400">Terbatas</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Jangan lewatkan kesempatan emas untuk meningkatkan produktivitas
            bisnis Anda
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 touch-pan-y">
              {promos.map((promo, index) => (
                <div
                  key={promo.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                  onMouseEnter={() => setHoveredId(promo.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div
                    className={`relative rounded-2xl overflow-hidden transition-all duration-300 h-full ${
                      hoveredId === promo.id
                        ? "shadow-2xl shadow-yellow-400/30 scale-105"
                        : "shadow-lg shadow-black/50"
                    }`}
                  >
                    {/* Corner Ribbon for Featured */}
                    {promo.isFeatured && (
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
                        )} text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1`}
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

                    {/* Square Image */}
                    <div className="relative aspect-square">
                      <img
                        src={promo.image}
                        alt={promo.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          hoveredId === promo.id ? "scale-110" : "scale-100"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                      {/* Discount Badge on Image */}
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-yellow-400 text-black px-4 py-2 rounded-xl text-xl font-black transform -rotate-2 shadow-lg">
                          {promo.discount}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
                      {/* Valid Until */}
                      <div className="flex items-center gap-2 text-yellow-300 text-sm mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">
                          {promo.validUntil}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {promo.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {promo.description}
                      </p>

                      {/* CTA Button */}
                      <button
                        className={`
                        w-full font-semibold py-3 px-4 rounded-lg transition-all 
                        flex items-center justify-center gap-2 group
                        ${
                          promo.isFeatured
                            ? "bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg shadow-yellow-400/20"
                            : "bg-white/10 backdrop-blur-md hover:bg-yellow-400 text-white hover:text-black border border-white/20"
                        }
                      `}
                      >
                        <span>
                          {promo.isFeatured ? "Ambil Promo" : "Lihat Detail"}
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
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
                    ? "w-8 h-3 bg-yellow-400"
                    : "w-3 h-3 bg-gray-600 hover:bg-gray-500"
                } rounded-full`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 sm:mt-12">
          <button
            className="
            inline-flex items-center gap-2
            bg-transparent hover:bg-yellow-400/10
            border-2 border-yellow-400 hover:border-yellow-400
            text-yellow-400 hover:text-yellow-400
            font-bold px-8 py-3.5 rounded-xl
            transition-all duration-300
            group
          "
          >
            <span>Lihat Semua Promo</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
