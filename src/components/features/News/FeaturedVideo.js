'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { PlayCircle, X, ArrowLeft, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const FeaturedVideo = ({ dictionary }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // -- Embla Carousel Setup (Sama seperti WhyThei) --
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
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

  // Ambil vides dari dictionary
  const videos = dictionary?.videos || [];

  if (videos.length === 0) return null;

  return (
    <>
      <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px]">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
              {dictionary.title}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              {dictionary.description}
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

            <div className="overflow-hidden py-4" ref={emblaRef}>
              {/* Tambahkan 'justify-start lg:justify-center' di sini */}
              <div className="flex gap-6 touch-pan-y justify-start lg:justify-center">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedVideo(video)}
                    className="relative flex-none w-[220px] md:w-[300px] aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:-translate-y-2 transition-transform duration-300"
                  >
                    {/* Gradient Background Fallback */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-gray-700 to-black`}
                    >
                      <Image
                        src={
                          video.thumbnail ||
                          `https://placehold.co/600x800/1a1a1a/ffc700?text=Shorts+${
                            index + 1
                          }`
                        }
                        alt={video.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="text-white w-14 h-14 opacity-80 group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Text Content Overlay (Bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                      <h3 className="text-white font-bold text-xl leading-tight">
                        {video.title}
                      </h3>
                      {/* Deskripsi opsional jika ada di dictionary */}
                      {video.desc && (
                        <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                          {video.desc}
                        </p>
                      )}
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
      </section>

      {/* Video Modal (Shorts / Vertical Style) */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-sm md:max-w-md bg-black rounded-2xl overflow-hidden shadow-2xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-20 text-white bg-black/50 hover:bg-red-600 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-full">
              <iframe
                src={`https://www.youtube.com/embed/${
                  selectedVideo.videoId || selectedVideo.id
                }?autoplay=1&rel=0&modestbranding=1&loop=1`}
                title={selectedVideo.title}
                className="w-full h-full object-cover"
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
