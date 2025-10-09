'use client';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const FacilityGallery = ({ dictionary }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 3000 }),
  ]);

  if (!dictionary || !dictionary.images) return null;

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black text-center mb-8 sm:mb-12">
          {dictionary.title}
        </h2>

        {/* Grid for Desktop/Tablet */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {dictionary.images.map((src, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden group"
            >
              <Image
                src={src}
                alt={`Facility Gallery Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

        {/* Carousel for Mobile */}
        <div className="block md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {dictionary.images.map((src, index) => (
                <div key={index} className="flex-[0_0_100%] pl-4">
                  <div className="relative aspect-square rounded-lg overflow-hidden group">
                    <Image
                      src={src}
                      alt={`Facility Gallery Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="100vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilityGallery;
