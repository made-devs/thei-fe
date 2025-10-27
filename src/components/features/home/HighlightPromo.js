"use client";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Tag,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HighlightPromo({
  dictionary,
  promos,
  currentLocale,
  header,
}) {
  // Tambahkan array custom images (ganti dengan path gambar Anda)
  const customImages = [
    "/home/promo1.webp", // Untuk card pertama
    "/home/promo2.webp", // Untuk card kedua
    "/home/promo3.webp", // Untuk card ketiga
    "/home/promo4.webp", // Untuk card keempat
  ];

  const sectionBadge = dictionary?.section_badge || "This Month's Promo";
  const title = dictionary?.title || "Offers";
  const titleHighlight = dictionary?.title_highlight || "Limited";
  const description =
    dictionary?.description ||
    "Don't miss the golden opportunity to increase your business productivity";
  const viewAllText = dictionary?.view_all_text || "View All Promos";
  const viewAllLink = dictionary?.view_all_link || "/promotions";
  const ctaRegular = dictionary?.cta_regular || "View Details";

  const enhancedPromos = (promos || [])
    .filter((promo) => ["r1", "r2", "r3", "r4"].includes(promo.id)) // Filter hanya ID r1 sampai r4
    .slice(0, 4) // Pastikan maksimal 4, meski filter sudah batasi
    .map((promo, index) => ({
      ...promo,
      is_featured: promo.size === "large",
      urgent: promo.badge === "HOT" || promo.badge === "FLASH SALE",
      valid_until: promo.valid_until || promo.expiry || "Limited Time",
      customImage: customImages[index] || promo.image, // Fallback ke promo.image jika custom tidak ada
    }));

  const [hoveredId, setHoveredId] = useState(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
      containScroll: "trimSnaps",
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      }),
    ]
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
    setScrollSnaps(snaps.slice(0, enhancedPromos.length));
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect, enhancedPromos.length]);

  if (!enhancedPromos || enhancedPromos.length === 0) {
    return null;
  }

  return (
    <section className=" py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header dari page.js - dipindah ke sini */}
        <div className="text-center pt-10 sm:pt-[5rem] pb-6 sm:pb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-yellow-400 tracking-wider">
            {header?.title || "THEI - TJM Heavy Equipment Indonesia"}
          </h1>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-300 tracking-wide px-4">
            {header?.subtitle ||
              "Indonesia's One-Stop Solution for Heavy Equipment Rental, Service & Sales"}
          </p>
        </div>
        <div className="h-px w-1/3 mx-auto bg-yellow-400 opacity-60 rounded" />

        {/* Header Promo - yang sudah ada */}
        <div className="text-center mt-10 mb-8 sm:mb-12">
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
        <div className="relative px-0 lg:px-16">
          {/* Embla Viewport - tambah padding bawah agar shadow tidak kepotong */}
          <div className="overflow-hidden py-4 pb-12" ref={emblaRef}>
            <div className="flex -ml-4">
              {enhancedPromos.map((promo) => (
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
                  {/* Card dengan Split Design */}
                  <div
                    className={`relative rounded-2xl overflow-hidden transition-all duration-300 bg-zinc-900 flex flex-col ${
                      hoveredId === promo.id
                        ? "shadow-2xl shadow-yellow-400/30 scale-[1.02]"
                        : "shadow-lg shadow-black/50"
                    }`}
                    style={{ height: "650px" }} // Tingkatkan dari 550px ke 650px agar judul dan konten full tampil
                  >
                    {/* Image Section - ubah ke aspect-square untuk 1:1 */}
                    <div className="relative aspect-square overflow-hidden bg-zinc-800">
                      <Image
                        src={promo.customImage}
                        alt={promo.title}
                        fill
                        className={`object-contain transition-transform duration-700 ${
                          hoveredId === promo.id ? "scale-110" : "scale-100"
                        }`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Content Section - hapus h-[40%] agar fleksibel mengisi sisa tinggi */}
                    <div className="py-5 px-5 flex flex-col justify-between bg-zinc-900 flex-1">
                      <div>
                        {/* Valid Until */}
                        <div className="flex items-center gap-2 text-yellow-400 text-xs mb-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-semibold">
                            {promo.valid_until}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                          {promo.title}
                        </h3>

                        <p className="text-sm text-gray-400 mb-3 line-clamp-3">
                          {promo.description}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={`/${currentLocale}/promotions/${promo.slug}`}
                        className="w-full font-semibold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 group text-sm bg-yellow-400 hover:bg-yellow-500 text-black"
                      >
                        <span>{ctaRegular}</span>
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
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full shadow-xl transition-all hover:scale-110 flex items-center justify-center z-20"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full shadow-xl transition-all hover:scale-110 flex items-center justify-center z-20"
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
                    ? "w-6 h-2 bg-yellow-400"
                    : "w-2 h-2 bg-gray-600 hover:bg-gray-500"
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
