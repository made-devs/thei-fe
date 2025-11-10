"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

// Helper component untuk merender setiap bagian list
const ListSection = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-4">
      <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start text-sm text-gray-600">
            <CheckCircle className="flex-shrink-0 w-4 h-4 mr-2 mt-0.5 text-green-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Komponen Kartu untuk setiap paket di dalam slider
const CareProtectionCard = ({ aPackage, dictionary }) => (
  <div className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 min-w-0 px-4">
    <div className="flex flex-col bg-white h-full rounded-lg shadow-lg p-4 sm:p-6 border-t-8 border-yellow-400">
      <h3 className="text-lg sm:text-xl font-bold text-black">
        {aPackage.equipment_type}
      </h3>
      <p className="text-xs text-gray-500 uppercase mb-4">{aPackage.level}</p>

      <div className="bg-gray-50 p-4 rounded-md mb-6 text-center">
        <p className="text-2xl sm:text-3xl font-bold text-black">
          {aPackage.pricing.promo_price}
        </p>
        <p className="text-sm text-gray-500">
          <span className="line-through">{aPackage.pricing.normal_price}</span>{" "}
          -{" "}
          <span className="font-semibold text-red-500">
            Save {aPackage.pricing.savings}
          </span>
        </p>
      </div>

      {/* Area scroll untuk detail paket */}
      <div className="flex-grow overflow-y-auto max-h-[300px] pr-2 space-y-4 border-t pt-4">
        <ListSection
          title={dictionary.coverageDetails}
          items={aPackage.coverage_details}
        />
        <ListSection title={dictionary.benefits} items={aPackage.benefits} />
        <ListSection title={dictionary.bonuses} items={aPackage.bonuses} />
        <div>
          <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
            {dictionary.specialBonus}
          </h4>
          <p className="text-sm text-gray-600">{aPackage.special_bonus}</p>
        </div>
      </div>

      <div className="mt-6">
        <button className="w-full bg-yellow-400 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors">
          {dictionary.getQuote}
        </button>
      </div>
    </div>
  </div>
);

// Komponen Slider Utama
const CareProtectionSlider = ({ lang, dictionary, carePackagesData }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const data = carePackagesData[lang]?.care_packages || [];

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (!dictionary || data.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
            {dictionary.title}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
            {dictionary.description}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {data.map((pkg, index) => (
                <CareProtectionCard
                  key={index}
                  aPackage={pkg}
                  dictionary={dictionary}
                />
              ))}
            </div>
          </div>

          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full ${
                selectedIndex === index ? "bg-black" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareProtectionSlider;
