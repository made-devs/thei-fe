'use client';

import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Hardcoded retail package data (EN)
const retailPackages = [
  {
    equipment_type: 'EXCAVATOR',
    starting_price: 'RP 1.750K',
    area_note: '*JABODETABEK AREA ONLY',
    services: [
      'HYDRAULIC PUMP LIGHT : RP1.750K',
      'OVERHAUL HYDRAULIC PUMP : RP1.750K',
      'SWING MOTOR : RP1.750K',
      'TRAVEL MOTOR : RP1.750K',
      'FINAL DRIVE : RP1.750K',
      'UNDERCARRIAGE SET : RP1.750K',
      'BOOM & ARM CYLINDER : RP1.750K',
      'BUCKET CYLINDER : RP1.750K',
      'OVERHAUL LIGHT ENGINE : RP1.750K',
      'OVERHAUL COMPLETE ENGINE : RP1.750K',
    ],
    bonuses: [
      '40+ POINT INSPECTION (ENGINE, TURBO, FUEL, INJECTOR, SWING, BRAKE, UNDERCARRIAGE, SAFETY AUDIT)',
      'MOBILE SERVICE',
    ],
  },
  {
    equipment_type: 'FORKLIFT',
    starting_price: 'RP 1.500K',
    area_note: null,
    services: [
      'HYDRAULIC LIFT & TILT CYLINDER : RP1.500K',
      'MAST & FORK : RP1.500K',
      'ENGINE LIGHT : RP1.500K',
      'BRAKE SYSTEM : RP1.500K',
      'OVERHAUL COMPLETE ENGINE : RP1.500K',
      'TRANSMISSION / TORQUE CONVERTER : RP1.500K',
      'DIFFERENTIAL : RP1.500K',
      'STEERING SYSTEM : RP1.500K',
      'AC CABIN : RP1.500K',
      'LOAD TEST : RP1.500K',
    ],
    bonuses: [
      '25-POINT INSPECTION (TRANSMISSION, DIFFERENTIAL, BRAKE, RADIATOR, BATTERY, SAFETY SWITCH, SEAT BELT, EXHAUST)',
      'MOBILE SERVICE',
    ],
  },
  {
    equipment_type: 'MINI EXCAVATOR',
    starting_price: 'RP 1.750K',
    area_note: '*JABODETABEK AREA ONLY',
    services: [
      'HYDRAULIC PUMP LIGHT : RP1.750K',
      'OVERHAUL HYDRAULIC PUMP : RP1.750K',
      'SWING MOTOR : RP1.750K',
      'TRAVEL MOTOR : RP1.750K',
      'FINAL DRIVE : RP1.750K',
      'UNDERCARRIAGE : RP1.750K',
      'BOOM & ARM CYLINDER : RP1.750K',
      'OVERHAUL LIGHT ENGINE : RP1.750K',
      'OVERHAUL COMPLETE ENGINE : RP1.750K',
    ],
    bonuses: [
      '40-POINT INSPECTION (ENGINE, TURBO, COOLING, UNDERCARRIAGE, SWING, CABIN, SENSOR, EXHAUST)',
      'MOBILE SERVICE',
    ],
  },
];

const CARD_WIDTH = 320; // px

// Card untuk satu service
const ServiceCard = ({ service, area_note }) => (
  <div
    className="bg-white rounded-lg shadow-md border-t-4 border-yellow-400 flex flex-col h-full mx-2"
    style={{
      width: `${CARD_WIDTH}px`,
      minWidth: `${CARD_WIDTH}px`,
      maxWidth: `${CARD_WIDTH}px`,
    }}
  >
    {/* Placeholder image */}
    <div className="w-full h-32 bg-gray-200 rounded-t-md flex items-center justify-center mb-4">
      <Image
        src="/placeholder-service.svg"
        alt="Service Illustration"
        width={64}
        height={64}
        className="opacity-60 object-contain"
        priority={false}
      />
    </div>
    <div className="flex-1 flex flex-col px-6 pb-6">
      <h4 className="font-bold text-black text-base mb-2">
        {service.split(':')[0]}
      </h4>
      <p className="text-lg font-bold text-yellow-600 mb-2">
        {service.split(':')[1]}
      </p>
      {area_note && <p className="text-xs text-gray-500 italic">{area_note}</p>}
      <div className="flex-grow" />
      <button className="mt-4 w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors">
        GET QUOTE
      </button>
    </div>
  </div>
);

// Card untuk bonus
const BonusCard = ({ bonuses }) => (
  <div className="bg-gray-50 rounded-lg shadow-inner p-6 flex flex-col h-full border border-yellow-400">
    <h4 className="font-bold text-black mb-2">BONUS</h4>
    <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
      {bonuses.map((bonus, idx) => (
        <li key={idx}>{bonus}</li>
      ))}
    </ul>
  </div>
);

const RetailPackagesTabsSlider = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activePackage = retailPackages[activeTab];

  // Embla setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 1,
    align: 'start',
    dragFree: true,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

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

  // Reset slider position when tab changes
  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(0);
  }, [activeTab, emblaApi]);

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            RETAIL SERVICE PACKAGES
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Choose individual repair services that fit your equipment needs.
            Professional service with guaranteed quality.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 space-x-4">
          {retailPackages.map((pkg, idx) => (
            <button
              key={pkg.equipment_type}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-2 rounded-t-lg font-bold text-base transition-colors ${
                activeTab === idx
                  ? 'bg-yellow-400 text-black shadow'
                  : 'bg-white text-gray-700 border border-b-0'
              }`}
            >
              {pkg.equipment_type}
            </button>
          ))}
        </div>

        {/* Embla Carousel */}
        <div className="relative max-w-[1000px] mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {activePackage.services.map((service, idx) => (
                <div key={idx}>
                  <ServiceCard
                    service={service}
                    area_note={activePackage.area_note}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Prev/Next Buttons */}
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 z-10"
            onClick={() => emblaApi && emblaApi.scrollPrev()}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 z-10"
            onClick={() => emblaApi && emblaApi.scrollNext()}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Bonus Card */}
        <div className="max-w-2xl mx-auto mt-10">
          <BonusCard bonuses={activePackage.bonuses} />
        </div>
      </div>
    </section>
  );
};

export default RetailPackagesTabsSlider;
