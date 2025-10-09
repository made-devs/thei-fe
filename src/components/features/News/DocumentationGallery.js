'use client';
import { useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const DocumentationGallery = ({ dictionary }) => {
  // Panggil hooks di level atas
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

  // Lakukan pengecekan data setelah hooks dipanggil
  const images = dictionary?.images || [];
  if (images.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px]">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
            {dictionary.title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            {dictionary.description}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                >
                  <div className="group">
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={image.src}
                        alt={image.caption}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                    </div>
                    <h3 className="mt-4 text-center font-semibold text-gray-800 text-sm sm:text-base lg:text-lg">
                      {image.caption}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="absolute top-[40%] -translate-y-1/2 -left-4 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
            onClick={scrollPrev}
            aria-label="Previous image"
          >
            <ArrowLeft size={24} className="text-black" />
          </button>
          <button
            className="absolute top-[40%] -translate-y-1/2 -right-4 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
            onClick={scrollNext}
            aria-label="Next image"
          >
            <ArrowRight size={24} className="text-black" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DocumentationGallery;
