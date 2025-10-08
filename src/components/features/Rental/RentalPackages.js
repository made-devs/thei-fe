"use client";

import React, { useState, useMemo, useRef } from "react";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Komponen untuk list fitur/bonus
const ListSection = ({ title, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="mb-4">
      <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start text-xs sm:text-sm text-gray-600"
          >
            <CheckCircle className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 mr-2 mt-0.5 text-green-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Komponen untuk satu kartu paket rental
const PackageCard = ({ aPackage, dictionary }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const tiers = aPackage.tiers || [];

  // Navigasi tier harga
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === tiers.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? tiers.length - 1 : prev - 1));
  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <div
      className={`flex flex-col bg-white rounded-lg shadow-lg p-6 border-t-8 border-yellow-400`}
    >
      {aPackage.image && (
        <div className="mb-4 flex justify-center">
          <Image
            src={aPackage.image}
            alt={aPackage.title}
            width={220}
            height={140}
            className="w-full max-w-[220px] h-auto rounded-md object-contain"
            loading="lazy"
          />
        </div>
      )}

      <h3 className="text-md sm:text-xl font-bold text-black">
        {aPackage.level}
      </h3>
      <p className="text-xs text-gray-500 uppercase mb-4">{aPackage.title}</p>

      <div className="relative w-full mb-6">
        <div className="overflow-hidden rounded-md mx-8">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {tiers.map((tier, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full bg-gray-50 p-3 text-center"
              >
                <p className="font-bold text-sm sm:text-md text-gray-800">
                  {tier.capacity}
                </p>
                <p className="text-lg sm:text-2xl font-bold text-black">
                  {tier.promo_price}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  <span className="line-through">{tier.normal_price}</span>
                  {tier.savings && (
                    <>
                      {" "}
                      -{" "}
                      <span className="font-semibold text-red-500">
                        {tier.savings}
                      </span>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {tiers.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 z-10"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {tiers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentIndex === index ? "bg-black" : "bg-gray-300"
                  }`}
                  aria-label={`Pilih harga ke-${index + 1}`}
                ></button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex-grow overflow-y-auto max-h-[300px] pr-2 space-y-4 border-t pt-4 mt-4">
        <ListSection
          title={dictionary.serviceContent}
          items={aPackage.service_content}
        />
        <ListSection
          title={dictionary.fullInspection}
          items={aPackage.full_inspection}
        />
        <ListSection
          title={dictionary.additionalInspection}
          items={aPackage.additional_inspection}
        />
        <ListSection title={dictionary.bonuses} items={aPackage.bonuses} />
      </div>

      <div className="mt-6">
        <button className="w-full bg-yellow-400 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors">
          {dictionary.getQuote}
        </button>
      </div>
    </div>
  );
};

// Komponen utama RentalPackages
const RentalPackages = ({ dictionary }) => {
  const data = useMemo(() => dictionary?.equipment_types || [], [dictionary]);
  const [activeCategory, setActiveCategory] = useState(data[0]?.name || "");
  const activeEquipment = useMemo(
    () => data.find((eq) => eq.name === activeCategory),
    [activeCategory, data]
  );

  // Tambahan untuk scroll indicator
  const tabRef = useRef(null);
  const [scrollInfo, setScrollInfo] = useState({
    left: 0,
    width: 0,
    scrollWidth: 0,
  });

  const handleTabScroll = () => {
    if (tabRef.current) {
      setScrollInfo({
        left: tabRef.current.scrollLeft,
        width: tabRef.current.clientWidth,
        scrollWidth: tabRef.current.scrollWidth,
      });
    }
  };

  if (!dictionary || !dictionary.equipment_types) return null;

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            {dictionary.title}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto">
            {dictionary.description}
          </p>
        </div>

        {/* Filter Tabs */}
        {/* Filter Tabs */}
        <div className="relative mb-12">
          <div
            className="overflow-x-auto lg:overflow-visible scrollbar-visible"
            ref={tabRef}
            onScroll={handleTabScroll}
            style={{
              scrollbarWidth: "thin", // Firefox
              scrollbarColor: "#FCD34D #F3F4F6", // Firefox: thumb & track
            }}
          >
            <div className="flex space-x-2 pb-2 sm:space-x-2 sm:pb-0 sm:justify-center">
              {data.map((eq) => (
                <button
                  key={eq.name}
                  onClick={() => setActiveCategory(eq.name)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${
              activeCategory === eq.name
                ? "bg-yellow-400 text-black"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
                >
                  {eq.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeEquipment?.packages?.map((pkg, index) => (
            <PackageCard key={index} aPackage={pkg} dictionary={dictionary} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RentalPackages;
