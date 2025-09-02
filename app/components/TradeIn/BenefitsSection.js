'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  TrendingUp,
  Zap,
  PiggyBank,
  FastForward,
  ThumbsUp,
  ShieldCheck,
  CreditCard,
  Wrench,
  ClipboardCheck,
  LineChart,
  Award,
  Gift,
  Briefcase,
  Truck,
  Users,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

const iconMap = {
  TrendingUp: <TrendingUp size={32} className="text-yellow-500" />,
  Zap: <Zap size={32} className="text-yellow-500" />,
  PiggyBank: <PiggyBank size={32} className="text-yellow-500" />,
  FastForward: <FastForward size={32} className="text-yellow-500" />,
  ThumbsUp: <ThumbsUp size={32} className="text-yellow-500" />,
  ShieldCheck: <ShieldCheck size={32} className="text-yellow-500" />,
  CreditCard: <CreditCard size={32} className="text-yellow-500" />,
  Wrench: <Wrench size={32} className="text-yellow-500" />,
  ClipboardCheck: <ClipboardCheck size={32} className="text-yellow-500" />,
  LineChart: <LineChart size={32} className="text-yellow-500" />,
  Award: <Award size={32} className="text-yellow-500" />,
  Gift: <Gift size={32} className="text-yellow-500" />,
  Briefcase: <Briefcase size={32} className="text-yellow-500" />,
  Truck: <Truck size={32} className="text-yellow-500" />,
  Users: <Users size={32} className="text-yellow-500" />,
};

const BenefitsSection = ({ dictionary }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!dictionary || !dictionary.benefits) return null;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div className="text-left md:max-w-2xl">
            <h2 className="text-4xl font-bold text-black">
              {dictionary.title}
            </h2>
            <p className="mt-4 text-gray-600">{dictionary.description}</p>
          </div>
          <div className="flex-shrink-0 mt-6 md:mt-0 flex gap-4">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-yellow-400 text-black flex items-center justify-center transition-colors"
              aria-label="Previous benefit"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-yellow-400 text-black flex items-center justify-center transition-colors"
              aria-label="Next benefit"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {dictionary.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4"
              >
                <div className="bg-gray-50 p-8 rounded-lg h-full flex flex-col">
                  <div className="flex-shrink-0 bg-white p-3 rounded-full shadow-md w-max mb-4">
                    {iconMap[benefit.icon]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-gray-700 leading-relaxed text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
