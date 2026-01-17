'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { PlayCircle, X, ArrowLeft, ArrowRight } from 'lucide-react';

const BranchesVideos = ({ dictionary }) => {
  // Destructure data dari dictionary baru
  const { title, description, list } = dictionary || {};
  const videos = list || [];

  const [selectedVideo, setSelectedVideo] = useState(null);

  // -- Embla Carousel Setup --
  // UBAH align: 'center' menjadi align: 'start'
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
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
    emblaApi.on('scroll', onSelect);

    return () => {
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
      emblaApi.off('scroll', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!videos || videos.length === 0) return null;

  return (
    <section className="bg-gray-50 py-20 border-b border-gray-200">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            {title || 'Galeri Video'}
          </h2>
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
          )}
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
          <div className="overflow-hidden py-4" ref={emblaRef}>
            <div className="flex gap-6 touch-pan-y justify-start">
              {videos.map((video, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedVideo(video)}
                  className="relative flex-none w-[220px] md:w-[300px] aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:-translate-y-2 transition-transform duration-300"
                >
                  {/* Thumbnail / Gradient Fallback */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-black">
                    {video.thumbnail && (
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
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

      {/* Video Modal (YouTube Shorts Style) */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
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

            {/* Video Iframe */}
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

export default BranchesVideos;
