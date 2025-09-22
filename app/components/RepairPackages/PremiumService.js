"use client";

import React, { useState, useMemo } from "react";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
// Path ini seharusnya tetap berfungsi karena kedalaman foldernya sama
import dataId from "../../data/premium-service-packages-id.json";
import dataEn from "../../data/premium-service-packages-en.json";

// Helper component untuk merender setiap bagian list
const ListSection = ({ title, items }) => {
  // Jangan render jika tidak ada item
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
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

// Komponen untuk Kartu Paket
const PackageCard = ({ aPackage, dictionary }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const tiers = aPackage.tiers || [];

  const borderColor =
    {
      Ultimate: "border-yellow-400",
      "Super Komplit": "border-gray-400",
      "Super Complete": "border-gray-400",
      Komplit: "border-amber-700",
      Complete: "border-amber-700",
    }[aPackage.level] || "border-gray-200";

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === tiers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? tiers.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className={`flex flex-col bg-white rounded-lg shadow-lg p-6 border-t-8 ${borderColor}`}
    >
      <h3 className="text-xl font-bold text-black">{aPackage.level}</h3>
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
                <p className="font-bold text-gray-800">{tier.capacity}</p>
                <p className="text-2xl font-bold text-black">
                  {tier.promo_price}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="line-through">{tier.normal_price}</span> -{" "}
                  <span className="font-semibold text-red-500">
                    {tier.savings}
                  </span>
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

// Komponen Utama diganti namanya
const PremiumService = ({ lang, dictionary }) => {
  if (!dictionary) {
    console.error("Dictionary for PremiumService is missing!");
    return null;
  }

  const data = useMemo(() => (lang === "en" ? dataEn : dataId), [lang]);

  const [activeCategory, setActiveCategory] = useState(
    data.equipment_types[0].name
  );

  const activeEquipment = useMemo(
    () => data.equipment_types.find((eq) => eq.name === activeCategory),
    [activeCategory, data]
  );

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            {dictionary.title}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {dictionary.description}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {data.equipment_types.map((eq) => (
            <button
              key={eq.name}
              onClick={() => setActiveCategory(eq.name)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                activeCategory === eq.name
                  ? "bg-black text-yellow-400"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {eq.name}
            </button>
          ))}
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeEquipment?.packages.map((pkg, index) => (
            <PackageCard key={index} aPackage={pkg} dictionary={dictionary} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumService;
