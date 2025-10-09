'use client';

import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  ChevronLeft,
  ChevronRight,
  Wrench,
  Gift,
  CheckCircle,
} from 'lucide-react';

const CARD_WIDTH = 320; // px

// Card untuk satu service dengan desain baru
const ServiceCard = ({ service, area_note, dictionary }) => (
  <div
    className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full mx-2 overflow-hidden border border-gray-200"
    style={{
      width: `${CARD_WIDTH}px`,
      minWidth: `${CARD_WIDTH}px`,
      maxWidth: `${CARD_WIDTH}px`,
    }}
  >
    <div className="w-full h-40 bg-gray-100 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      <Wrench
        className="h-16 w-16 text-gray-300 group-hover:text-yellow-500 transition-colors duration-300"
        strokeWidth={1.5}
      />
    </div>
    <div className="flex-1 flex flex-col p-4 sm:p-6">
      <h4 className="font-bold text-black text-sm sm:text-base mb-2 flex-grow">
        {service.name}
      </h4>
      <p className="text-lg sm:text-xl font-bold text-yellow-600 mb-3">
        {service.price}
      </p>
      {area_note && (
        <p className="text-xs text-gray-500 italic mb-4">{area_note}</p>
      )}
      <button className="mt-auto w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors transform hover:scale-105 duration-300">
        {dictionary.get_quote_button}
      </button>
    </div>
  </div>
);

// Card untuk bonus dengan desain baru
const BonusCard = ({ bonuses, dictionary }) => (
  <div className="bg-yellow-50/50 rounded-lg p-4 sm:p-6 flex flex-col h-full border-2 border-dashed border-yellow-400">
    <div className="flex items-center mb-3">
      <Gift className="h-6 w-6 text-yellow-600 mr-3" />
      <h4 className="font-bold text-black text-base sm:text-lg">
        {dictionary.bonus_title}
      </h4>
    </div>
    <ul className="text-gray-700 text-sm space-y-2">
      {bonuses.map((bonus, idx) => (
        <li key={idx} className="flex items-start">
          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
          <span>{bonus}</span>
        </li>
      ))}
    </ul>
  </div>
);

const RetailPackagesSlider = ({ dictionary, packages }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Embla setup - perbaiki typo embbaApi menjadi emblaApi
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 'auto',
    align: 'start',
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

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(0, true);
  }, [activeTab, emblaApi]);

  // Fallback jika packages kosong
  if (!packages || packages.length === 0) {
    return null;
  }

  const activePackage = packages[activeTab];

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
            {dictionary.title}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
            {dictionary.subtitle}
          </p>
        </div>

        <div className="flex justify-center mb-8 space-x-2 md:space-x-4 flex-wrap">
          {packages.map((pkg, idx) => (
            <button
              key={pkg.id}
              onClick={() => setActiveTab(idx)}
              className={`px-4 md:px-6 py-2 rounded-full font-bold text-sm md:text-base transition-all duration-300 m-1 ${
                activeTab === idx
                  ? 'bg-yellow-400 text-black shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {pkg.equipment_type}
            </button>
          ))}
        </div>

        <div className="relative max-w-full lg:max-w-6xl mx-auto">
          <div className="overflow-hidden py-4" ref={emblaRef}>
            <div className="flex -mx-2">
              {activePackage.services.map((service, idx) => (
                <div key={idx} className="flex-shrink-0">
                  <ServiceCard
                    service={service}
                    area_note={activePackage.area_note}
                    dictionary={dictionary}
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed z-10 transition-opacity"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed z-10 transition-opacity"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="max-w-3xl mx-auto mt-8 sm:mt-12">
          <BonusCard bonuses={activePackage.bonuses} dictionary={dictionary} />
        </div>
      </div>
    </section>
  );
};

export default RetailPackagesSlider;
