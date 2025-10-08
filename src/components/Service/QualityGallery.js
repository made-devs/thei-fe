'use client';
import { useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { PlayCircle, ArrowLeft, ArrowRight } from 'lucide-react';

const QualityGallery = ({ dictionary }) => {
  // FIX: Panggil semua hooks di level paling atas, sebelum kondisi apapun.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Kondisi untuk return null dipindahkan setelah semua hooks dipanggil.
  if (!dictionary || !dictionary.media_items) return null;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-black">
            {dictionary.title}
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-lg" ref={emblaRef}>
            <div className="flex">
              {dictionary.media_items.map((item, index) => (
                <div
                  className="relative flex-[0_0_100%] aspect-video group cursor-pointer"
                  key={index}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 896px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-start justify-end p-6">
                    <h3 className="font-bold text-white text-xl">
                      {item.title}
                    </h3>
                  </div>
                  {/* Tampilkan ikon Play hanya untuk video */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
    </section>
  );
};

export default QualityGallery;
