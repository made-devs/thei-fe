'use client';

import React, { useState, useMemo, useRef } from 'react';
import { CheckCircle, MessageCircle } from 'lucide-react';
import Image from 'next/image';

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
  // Function untuk WhatsApp
  const handleWhatsAppClick = () => {
    const message = `Halo, saya tertarik dengan paket rental ${aPackage.level} - ${aPackage.title}. Bisa info harga dan detailnya?`;
    const waUrl = `https://wa.me/6285195886789?text=${encodeURIComponent(
      message
    )}`;
    window.open(waUrl, '_blank');
  };

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

      {/* Custom Quote Badge - Menggantikan Price Carousel */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 rounded-lg text-center mb-6 shadow-md">
        <div className="flex items-center justify-center gap-2 mb-1">
          <MessageCircle className="w-4 h-4 text-black" />
          <p className="text-sm font-bold text-black">
            Price Available via WhatsApp
          </p>
        </div>
        <p className="text-xs text-gray-800">
          Get personalized quote instantly
        </p>
      </div>

      <div className="flex-grow overflow-y-auto max-h-[300px] pr-2 space-y-4 border-t pt-4">
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
        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-yellow-400 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          {dictionary.getQuote}
        </button>
      </div>
    </div>
  );
};

// Komponen utama RentalPackages
const RentalPackages = ({ dictionary }) => {
  const data = useMemo(() => dictionary?.equipment_types || [], [dictionary]);
  const [activeCategory, setActiveCategory] = useState(data[0]?.name || '');
  const activeEquipment = useMemo(
    () => data.find((eq) => eq.name === activeCategory),
    [activeCategory, data]
  );

  const tabRef = useRef(null);

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

        {/* Filter Tabs - Mobile: horizontal scroll, Desktop: flex wrap */}
        <div className="mb-12">
          {/* Mobile Version */}
          <div
            className="lg:hidden overflow-x-auto scrollbar-visible pb-2"
            ref={tabRef}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#FCD34D #F3F4F6',
            }}
          >
            <div className="flex space-x-2">
              {data.map((eq) => (
                <button
                  key={eq.name}
                  onClick={() => setActiveCategory(eq.name)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                    ${
                      activeCategory === eq.name
                        ? 'bg-yellow-400 text-black'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {eq.name}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Version - Flex Wrap with max-w-[1440px] */}
          <div className="hidden lg:block">
            <div className="flex flex-wrap justify-center gap-3 max-w-[1440px] mx-auto">
              {data.map((eq) => (
                <button
                  key={eq.name}
                  onClick={() => setActiveCategory(eq.name)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                    ${
                      activeCategory === eq.name
                        ? 'bg-yellow-400 text-black'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
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
