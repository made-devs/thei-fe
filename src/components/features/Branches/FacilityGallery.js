'use client';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

const FacilityGallery = ({ dictionary }) => {
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

  if (!dictionary || !dictionary.images) return null;

  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            {dictionary.title}
          </h2>
          {/* Opsional: Jika facility gallery punya description di masa depan */}
          {dictionary.description && (
            <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              {dictionary.description}
            </p>
          )}
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-lg" ref={emblaRef}>
            <div className="flex gap-6 py-6 px-6">
              {dictionary.images.map((src, index) => (
                <div
                  className="relative flex-[0_0_100%] md:flex-[0_0_33.333%] aspect-video group cursor-pointer px-2"
                  key={index}
                  onClick={() =>
                    setPopup({
                      open: true,
                      src: src,
                      title: `${dictionary.title} - Image ${index + 1}`,
                    })
                  }
                >
                  <Image
                    src={src}
                    alt={`${dictionary.title} ${index + 1}`}
                    fill
                    className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tombol Navigasi */}
          <button
            className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex transition-all hover:scale-110"
            onClick={scrollPrev}
          >
            <ArrowLeft size={24} className="text-black" />
          </button>
          <button
            className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex transition-all hover:scale-110"
            onClick={scrollNext}
          >
            <ArrowRight size={24} className="text-black" />
          </button>
        </div>
      </div>

      {/* Popup Modal - Modern & Aesthetic (Sama persis dengan QualityGallery) */}
      {popup.open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setPopup({ open: false, src: '', title: '' })}
        >
          <div
            className="relative w-full max-w-6xl animate-scaleIn flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div className="relative w-full h-[60vh] md:h-[80vh] bg-black/20 rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400">
              <Image
                src={popup.src}
                alt={popup.title || 'Facility gallery image'}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />

              {/* Close Button */}
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
              <div className="mt-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-4 md:p-6 shadow-xl border-2 border-yellow-600 max-w-2xl w-full">
                <h3 className="text-center text-black text-lg md:text-2xl font-bold">
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

export default FacilityGallery;
