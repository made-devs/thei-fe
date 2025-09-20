'use client';
import React, { useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { PlayCircle, ArrowLeft, ArrowRight } from 'lucide-react';

const EventVideos = ({ dictionary }) => {
  // Hooks dipanggil di level atas, sebelum pengecekan apapun.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    loop: true,
  });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  // Pengecekan data dilakukan setelah hooks dipanggil.
  if (!dictionary || !dictionary.videos || dictionary.videos.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold">{dictionary.title}</h2>
        </div>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {dictionary.videos.map((video, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                >
                  <div className="group cursor-pointer">
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={`https://placehold.co/1600x900/1a1a1a/ffc700?text=Event+Video+${
                          index + 1
                        }`}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <PlayCircle
                          size={64}
                          className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
                        />
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-bold text-lg mt-2 mb-2">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Buttons */}
          <button
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
            onClick={scrollPrev}
          >
            <ArrowLeft size={24} className="text-black" />
          </button>
          <button
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
            onClick={scrollNext}
          >
            <ArrowRight size={24} className="text-black" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventVideos;
