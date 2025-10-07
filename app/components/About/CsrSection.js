"use client";
import { useState, useEffect, useCallback } from "react";
import { Check, Cog, ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const CsrSection = ({ dictionary }) => {
  const images = dictionary.images || [];
  const [activeIndex, setActiveIndex] = useState(0);

  // Carousel utama untuk gambar besar
  const [mainViewportRef, emblaApi] = useEmblaCarousel(
    { skipSnaps: false, loop: true },
    [Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  // Carousel untuk thumbnail, diatur secara vertikal
  const [thumbViewportRef, emblaThumbsApi] = useEmblaCarousel({
    axis: "y",
    containScroll: "keepSnaps",
    align: "start",
    loop: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaApi || !emblaThumbsApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi || !emblaThumbsApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap());
  }, [emblaApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Tombol navigasi untuk mengontrol carousel thumbnail
  const scrollPrev = useCallback(
    () => emblaThumbsApi && emblaThumbsApi.scrollPrev(),
    [emblaThumbsApi]
  );
  const scrollNext = useCallback(
    () => emblaThumbsApi && emblaThumbsApi.scrollNext(),
    [emblaThumbsApi]
  );

  if (images.length === 0) {
    return null;
  }

  return (
    // STRATEGI 2: Ganti background color
    <section className="bg-gray-50 py-12 lg:py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Grid Konten Utama */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* STRATEGI 1: Balik layout, galeri di kiri */}
          {/* Kolom Kiri: Galeri Gambar */}
          <div className="grid grid-cols-4 gap-4 md:order-first">
            {/* Carousel Gambar Utama */}
            <div
              className="col-span-3 relative rounded-lg overflow-hidden"
              ref={mainViewportRef}
            >
              <div className="flex h-full">
                {images.map((image, index) => (
                  <div
                    className="relative aspect-[4/3] flex-[0_0_100%]"
                    key={index}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigasi Thumbnail */}
            <div className="col-span-1 flex flex-col items-center justify-center gap-2">
              <button
                onClick={scrollPrev}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Previous thumbnail"
              >
                <ChevronUp size={20} className="text-gray-600" />
              </button>

              {/* Viewport Thumbnail */}
              <div
                className="w-full h-[300px] overflow-hidden"
                ref={thumbViewportRef}
              >
                <div className="flex flex-col h-full">
                  {images.map((image, index) => (
                    <div
                      // Setiap slide thumbnail mengambil 1/3 dari tinggi viewport
                      className="flex-[0_0_33.33%] min-h-0 p-1"
                      key={`${image.src}-${index}`}
                      onClick={() => onThumbClick(index)}
                    >
                      <div
                        className={`relative w-full h-full rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${
                          activeIndex === index
                            ? "ring-2 ring-yellow-400"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          sizes="10vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={scrollNext}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Next thumbnail"
              >
                <ChevronDown size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Header dan Checklist */}
          <div className="pl-0 md:pl-[3rem]">
            {/* Header Section */}
            <div className="text-left mb-6 lg:mb-8">
              <div className="flex items-center justify-start text-sm font-bold uppercase text-yellow-400 mb-2">
                <Cog
                  size={20}
                  className="mr-2 animate-spin"
                  style={{ animationDuration: "5s" }}
                />
                <span>{dictionary.subtitle}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                {dictionary.title}
              </h2>
              <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl">
                {dictionary.description}
              </p>
            </div>

            {/* Checklist */}
            <ul className="space-y-4">
              {dictionary.activities.map((activity, index) => (
                <li key={index} className="flex items-start">
                  <Check
                    size={24}
                    className="text-green-500 mr-4 flex-shrink-0 mt-1"
                  />
                  <span className="text-sm sm:text-base text-gray-700">
                    {activity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CsrSection;
