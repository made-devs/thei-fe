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

// Card untuk satu service dengan desain THEI (Kuning & Hitam)
const ServiceCard = ({ service, area_note, dictionary }) => (
  <div
    className="group bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full mx-2 overflow-hidden border-2 border-yellow-400 hover:border-yellow-500 hover:-translate-y-2"
    style={{
      width: `${CARD_WIDTH}px`,
      minWidth: `${CARD_WIDTH}px`,
      maxWidth: `${CARD_WIDTH}px`,
    }}
  >
    {/* Icon Header dengan gradient kuning */}
    <div className="w-full h-40 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      <Wrench
        className="h-16 w-16 text-black group-hover:scale-110 transition-transform duration-300"
        strokeWidth={2}
      />
    </div>

    {/* Content */}
    <div className="flex-1 flex flex-col p-4 sm:p-6">
      <h4 className="font-bold text-yellow-400 text-sm sm:text-base mb-2 flex-grow group-hover:text-yellow-300 transition-colors">
        {service.name}
      </h4>
      <p className="text-xl sm:text-2xl font-bold text-white mb-3">
        {service.price}
      </p>
      {area_note && (
        <p className="text-xs text-gray-400 italic mb-4">{area_note}</p>
      )}
      <button className="mt-auto w-full bg-yellow-400 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-all transform hover:scale-105 duration-300 shadow-lg">
        {dictionary.get_quote_button}
      </button>
    </div>
  </div>
);

// Card untuk bonus dengan warna THEI
const BonusCard = ({ bonuses, dictionary }) => (
  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-6 sm:p-8 flex flex-col h-full border-4 border-black shadow-2xl">
    <div className="flex items-center mb-4">
      <div className="bg-black rounded-full p-3 mr-4">
        <Gift className="h-6 w-6 text-yellow-400" />
      </div>
      <h4 className="font-bold text-black text-lg sm:text-xl">
        {dictionary.bonus_title}
      </h4>
    </div>
    <ul className="text-black text-sm sm:text-base space-y-3">
      {bonuses.map((bonus, idx) => (
        <li key={idx} className="flex items-start">
          <div className="bg-black rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
            <CheckCircle className="h-4 w-4 text-yellow-400" />
          </div>
          <span className="font-medium">{bonus}</span>
        </li>
      ))}
    </ul>
  </div>
);

const RetailPackagesSlider = ({ dictionary, packages }) => {
  const [activeTab, setActiveTab] = useState(0);

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
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
            {dictionary.title}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
            {dictionary.subtitle}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-8 space-x-2 md:space-x-4 flex-wrap">
          {packages.map((pkg, idx) => (
            <button
              key={pkg.id}
              onClick={() => setActiveTab(idx)}
              className={`px-4 md:px-6 py-2 rounded-full font-bold text-sm md:text-base transition-all duration-300 m-1 border-2 ${
                activeTab === idx
                  ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg scale-105'
                  : 'bg-black text-yellow-400 border-black hover:bg-gray-800 hover:border-gray-800'
              }`}
            >
              {pkg.equipment_type}
            </button>
          ))}
        </div>

        {/* Carousel */}
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

          {/* Navigation Buttons */}
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-yellow-400 text-black p-3 rounded-full shadow-lg hover:bg-yellow-500 disabled:opacity-30 disabled:cursor-not-allowed z-10 transition-all"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-yellow-400 text-black p-3 rounded-full shadow-lg hover:bg-yellow-500 disabled:opacity-30 disabled:cursor-not-allowed z-10 transition-all"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Bonus Card */}
        <div className="max-w-3xl mx-auto mt-8 sm:mt-12">
          <BonusCard bonuses={activePackage.bonuses} dictionary={dictionary} />
        </div>
      </div>
    </section>
  );
};

export default RetailPackagesSlider;
