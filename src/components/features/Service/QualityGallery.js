'use client';
import { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { PlayCircle, ArrowLeft, ArrowRight, X } from 'lucide-react';

const QualityGallery = ({ dictionary }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [popup, setPopup] = useState({ open: false, src: '', title: '' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!dictionary || !dictionary.media_items) return null;

  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            {dictionary.title}
          </h2>
          {dictionary.description && (
            <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              {dictionary.description}
            </p>
          )}
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-lg" ref={emblaRef}>
            <div className="flex gap-3 px-6">
              {dictionary.media_items.map((item, index) => (
                <div
                  className="relative flex-[0_0_100%] md:flex-[0_0_33.333%] aspect-video group cursor-pointer px-2"
                  key={index}
                  onClick={() =>
                    setPopup({ open: true, src: item.src, title: item.title })
                  }
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />

                  {item.type === 'video' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                      <PlayCircle
                        size={80}
                        className="text-white transform group-hover:scale-110 transition-transform"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tombol Navigasi */}
          <button
            className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
            onClick={scrollPrev}
          >
            <ArrowLeft size={24} className="text-black" />
          </button>
          <button
            className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
            onClick={scrollNext}
          >
            <ArrowRight size={24} className="text-black" />
          </button>
        </div>
      </div>

      {/* Popup Modal - Modern & Aesthetic */}
      {popup.open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setPopup({ open: false, src: '', title: '' })}
        >
          <div
            className="relative w-full max-w-5xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container - Aspect Video */}
            <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400">
              <Image
                src={popup.src}
                alt={popup.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />

              {/* Close Button - Inside Top Right */}
              <button
                className="absolute top-4 right-4 bg-yellow-400 hover:bg-yellow-500 rounded-full p-3 shadow-lg transition-all transform hover:scale-110 z-20"
                onClick={() => setPopup({ open: false, src: '', title: '' })}
                aria-label="Close"
              >
                <X size={24} className="text-black" />
              </button>
            </div>

            {/* Title Card */}
            {popup.title && (
              <div className="mt-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 shadow-xl border-2 border-yellow-600">
                <h3 className="text-center text-black text-xl md:text-2xl font-bold">
                  {popup.title}
                </h3>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default QualityGallery;
