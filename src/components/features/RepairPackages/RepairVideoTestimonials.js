'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { PlayCircle, ArrowLeft, ArrowRight, X } from 'lucide-react';

const RepairVideoTestimonials = ({ dictionary }) => {
  const videos = dictionary?.videos || [];

  // Konfigurasi Embla Carousel (Looping & Align Center)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: 'trimSnaps',
    loop: true,
  });

  const [selectedVideo, setSelectedVideo] = useState(null);

  // Navigasi Prev/Next
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  if (!videos || videos.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20 border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-black">
            {dictionary.title}
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel">
          <div className="overflow-hidden px-4 sm:px-0" ref={emblaRef}>
            <div className="flex -ml-4">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                >
                  <div
                    className="group cursor-pointer"
                    onClick={() => setSelectedVideo(video)}
                  >
                    {/* Card Image (Aspect Ratio 4:5 samain kaya Testimonial.js) */}
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-gray-100">
                      <Image
                        src={
                          video.thumbnail ||
                          `https://placehold.co/600x750/1a1a1a/ffc700?text=Testimonial+${
                            index + 1
                          }`
                        }
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Overlay Play Icon */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <PlayCircle
                          size={64}
                          className="text-white opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-lg"
                        />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 text-left">
                      <h4 className="font-bold text-lg text-black leading-tight mb-1">
                        {video.title}
                      </h4>
                      <p className="text-sm font-medium text-yellow-600">
                        {video.name}
                      </p>
                      {video.company && (
                        <p className="text-xs text-gray-500">{video.company}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons (Hidden on Mobile, Visible Desktop) */}
          <button
            className="absolute top-[40%] -left-4 lg:-left-12 transform -translate-y-1/2 bg-white hover:bg-yellow-400 text-black rounded-full p-3 shadow-lg z-10 hidden lg:flex transition-all hover:scale-110"
            onClick={scrollPrev}
            aria-label="Previous video"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            className="absolute top-[40%] -right-4 lg:-right-12 transform -translate-y-1/2 bg-white hover:bg-yellow-400 text-black rounded-full p-3 shadow-lg z-10 hidden lg:flex transition-all hover:scale-110"
            onClick={scrollNext}
            aria-label="Next video"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-sm md:max-w-md bg-black rounded-2xl overflow-hidden shadow-2xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-20 text-white bg-black/50 hover:bg-red-600 rounded-full p-2 transition-colors"
              onClick={() => setSelectedVideo(null)}
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-full">
              <iframe
                src={selectedVideo.videoUrl}
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

export default RepairVideoTestimonials;
