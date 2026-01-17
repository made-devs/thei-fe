'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import {
  LayoutGrid,
  Wrench,
  ShieldCheck,
  Award,
  Banknote,
  Package,
  Cog,
  PlayCircle,
  X,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

const iconMap = {
  // English keys
  'One Stop Solution': <LayoutGrid size={24} />,
  '24/7 Field Service': <Wrench size={24} />,
  'Genuine Parts': <ShieldCheck size={24} />,
  'HSSE Certified': <Award size={24} />,
  'Hundreds of Millions Rupiah in Bonuses': <Banknote size={24} />,
  // Indonesian keys
  'Solusi Satu Pintu': <LayoutGrid size={24} />,
  'Layanan Lapangan 24/7': <Wrench size={24} />,
  'Suku Cadang Asli': <ShieldCheck size={24} />,
  'Tersertifikasi HSSE': <Award size={24} />,
  'Bonus Ratusan Juta Rupiah': <Banknote size={24} />,
};

const WhyThei = ({ dictionary }) => {
  const {
    subtitle,
    title,
    description,
    image_url,
    features,
    stats,
    brand_videos,
  } = dictionary;

  const [selectedVideo, setSelectedVideo] = useState(null);

  // Hanya ambil data dari dictionary, tanpa fallback ke data dummy
  const videos = Array.isArray(brand_videos) ? brand_videos : [];

  // -- Embla Carousel Setup --
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center', // Center active slide for better focus
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback((api) => {
    setPrevBtnEnabled(api.canScrollPrev());
    setNextBtnEnabled(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', onSelect); // Update realtime saat drag

    return () => {
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
      emblaApi.off('scroll', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Horizontal Features List at the top */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-20 text-center">
          {features.map((feature, index) => {
            const isLastRowSingle =
              features.length % 2 === 1 && index === features.length - 1;

            return (
              <div
                key={index}
                className={
                  isLastRowSingle
                    ? 'flex flex-col items-center col-span-2 md:col-span-1'
                    : 'flex flex-col items-center'
                }
              >
                <div className="bg-yellow-400 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <div className="text-black">
                    {iconMap[feature.title] || <Package size={32} />}
                  </div>
                </div>
                <h3 className="font-bold text-md text-black">
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Kolom Kiri: Teks */}
          <div className="text-left pr-0 lg:pr-[3rem]">
            <div className="flex items-center text-sm font-bold uppercase text-yellow-400 mb-2">
              <Cog
                size={20}
                className="mr-2 animate-spin"
                style={{ animationDuration: '5s' }}
              />
              <span>{subtitle}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl leading-[3.3rem] font-bold text-black mb-4">
              {title}
            </h2>
            <p className="text-gray-600 mb-12 text-justify">{description}</p>

            {/* Stats Section */}
            <div className="pt-8 border-t border-gray-200">
              <div className="flex flex-row md:grid md:grid-cols-3 gap-3 md:gap-8 justify-center text-center overflow-x-auto whitespace-nowrap md:overflow-visible md:whitespace-normal pb-4 md:pb-0">
                {stats.map((stat, index) => (
                  <div key={index} className="relative min-w-[90px] md:min-w-0">
                    <h3 className="text-2xl md:text-4xl font-bold text-black">
                      {stat.value}
                    </h3>
                    <p className="text-gray-500 text-sm md:text-sm mt-2">
                      {stat.label}
                    </p>
                    {index < stats.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 h-16 w-px bg-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Gambar */}
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image src={image_url} alt={title} fill className="object-cover" />
          </div>
        </div>

        {/* NEW SECTION: Video Shorts / Reels Style */}
        <div className="border-t border-gray-100 pt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-black mb-2">
              Kisah Perjalanan & Komitmen Kami
            </h3>
            <p className="text-gray-500">
              Tonton cerita singkat di balik layar THEI
            </p>
          </div>

          {/* Carousel Container Wrapper */}
          <div className="relative px-0 lg:px-12 group/carousel">
            {/* Button Prev */}
            <button
              onClick={scrollPrev}
              className={`absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-yellow-400 text-black p-3 rounded-full shadow-lg transition-all duration-300 ${
                prevBtnEnabled
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-4 pointer-events-none'
              }`}
              aria-label="Previous videos"
            >
              <ArrowLeft size={24} />
            </button>

            {/* Embla Viewport */}
            <div className="overflow-hidden pt-5" ref={emblaRef}>
              <div className="flex gap-6 touch-pan-y">
                {videos.map((video, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedVideo(video)}
                    className="relative flex-none w-[220px] md:w-[300px] aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:-translate-y-2 transition-transform duration-300"
                  >
                    {/* Fallback pattern jika tidak ada thumbnail gambar */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        video.color || 'from-gray-700 to-black'
                      }`}
                    >
                      {video.thumbnail && (
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                        />
                      )}
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="text-white w-14 h-14 opacity-80 group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Text Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                      <h4 className="text-white font-bold text-xl leading-tight">
                        {video.title}
                      </h4>
                      <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                        {video.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Button Next */}
            <button
              onClick={scrollNext}
              className={`absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-yellow-400 text-black p-3 rounded-full shadow-lg transition-all duration-300 ${
                nextBtnEnabled
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-4 pointer-events-none'
              }`}
              aria-label="Next videos"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal (YouTube Shorts Style) */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-sm md:max-w-md bg-black rounded-2xl overflow-hidden shadow-2xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-20 text-white bg-black/50 hover:bg-red-600 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Video Iframe (Shorts URL format) */}
            <div className="relative w-full h-full">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0&modestbranding=1&loop=1`}
                title={selectedVideo.title}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyThei;
