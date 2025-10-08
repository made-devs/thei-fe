'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { PlayCircle, X, ArrowLeft, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const FeaturedVideo = ({ dictionary }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const openVideo = (videoId) => {
    setSelectedVideoId(videoId);
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
    setSelectedVideoId(null);
  };

  const videos = dictionary?.videos || [];

  if (videos.length === 0) return null;

  return (
    <>
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1280px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              {dictionary.title}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {dictionary.description}
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                  >
                    <div
                      className="group cursor-pointer"
                      onClick={() => openVideo(video.id)}
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                        <Image
                          src={`https://placehold.co/1600x900/1a1a1a/ffc700?text=Event+Video+${
                            index + 1
                          }`}
                          alt={video.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
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
                      <h3 className="mt-4 text-center font-semibold text-gray-800">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="absolute top-1/2 -translate-y-1/2 -left-4 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
              onClick={scrollPrev}
              aria-label="Previous video"
            >
              <ArrowLeft size={24} className="text-black" />
            </button>
            <button
              className="absolute top-1/2 -translate-y-1/2 -right-4 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
              onClick={scrollNext}
              aria-label="Next video"
            >
              <ArrowRight size={24} className="text-black" />
            </button>
          </div>
        </div>
      </section>

      {showVideo && selectedVideoId && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeVideo}
              className="absolute -top-10 right-0 text-white hover:text-yellow-400"
            >
              <X size={32} />
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedVideo;
