'use client';
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Car,
  ShieldCheck,
  HardHat,
  Wrench,
  Repeat,
  Truck,
  PhoneCall,
  Gift,
  MapPin,
  Filter,
  CalendarClock,
  TrendingUp,
  Shield,
  Clock,
  Database,
  Camera,
  Banknote,
  Rocket,
  Tags,
  Building,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

const iconMap = {
  Car,
  ShieldCheck,
  HardHat,
  Wrench,
  Repeat,
  Truck,
  PhoneCall,
  Gift,
  MapPin,
  Filter,
  CalendarClock,
  TrendingUp,
  Shield,
  Clock,
  Database,
  Camera,
  Banknote,
  Rocket,
  Tags,
  Building,
};

const BenefitsCarousel = ({ dictionary }) => {
  // Panggil semua hooks di paling atas, sebelum ada kondisi.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
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

  // Lakukan pengecekan data setelah hooks dipanggil.
  if (!dictionary || !dictionary.items) return null;

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black">{dictionary.title}</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            {dictionary.description}
          </p>
        </div>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {dictionary.items.map((benefit, index) => {
                const Icon = iconMap[benefit.icon] || Car;
                return (
                  <div
                    key={index}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 py-2"
                  >
                    <div className="bg-white p-8 rounded-lg shadow-sm h-full text-center flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
                      <div className="bg-yellow-100 p-4 rounded-full mb-4">
                        <Icon size={32} className="text-yellow-500" />
                      </div>
                      <h3 className="text-xl font-bold text-black">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2 flex-grow">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hidden lg:flex"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hidden lg:block"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsCarousel;
