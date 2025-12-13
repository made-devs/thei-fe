'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Percent, MessageCircle, X, ZoomIn, Zap, Shield } from 'lucide-react';
import { repairServices } from '@/data/package';

const RepairSection = ({ dictionary }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('hemat'); // 'hemat' or 'super'

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsApp = (item) => {
    const packageType = activeTab === 'hemat' ? 'Hemat' : 'Super';
    const message = encodeURIComponent(
      `Halo THEI, saya tertarik dengan ${
        item.title
      }. Harga promo ${formatRupiah(item.pricePromo)}. Mohon info lebih lanjut.`
    );
    window.open(`https://wa.me/6285195886789?text=${message}`, '_blank');
  };

  const currentPackages = repairServices[activeTab];

  return (
    <>
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          {/* Header with Toggle */}
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase mb-4 font-oswald tracking-tight relative inline-block">
              {dictionary.title}{' '}
              <span className="text-yellow-500">
                {dictionary.title_highlight}
              </span>{' '}
              ALAT BERAT
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-yellow-500"></div>
            </h2>
            <p className="text-gray-600 mb-10 pt-4 text-sm md:text-base">
              {dictionary.subtitle}
            </p>

            {/* Toggle Switch - Industrial Style */}
            <div className="inline-flex items-center bg-[#1A1A1A] rounded-lg p-1.5 shadow-lg border border-[#333333]">
              <button
                onClick={() => setActiveTab('hemat')}
                className={`relative px-8 py-3 rounded-md font-bold text-sm transition-all duration-300 font-oswald tracking-wide uppercase ${
                  activeTab === 'hemat'
                    ? 'bg-yellow-500 text-black shadow-md transform scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-[#333333]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  {dictionary.hemat_badge}
                </span>
                {activeTab === 'hemat' && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                    PROMO
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('super')}
                className={`relative px-8 py-3 rounded-md font-bold text-sm transition-all duration-300 font-oswald tracking-wide uppercase ${
                  activeTab === 'super'
                    ? 'bg-yellow-500 text-black shadow-md transform scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-[#333333]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  {dictionary.super_badge}
                </span>
                {activeTab === 'super' && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                    PROMO
                  </span>
                )}
              </button>
            </div>

            {/* Info Badge */}
            <div className="mt-8">
              <div
                className={`inline-block px-5 py-2 rounded-full border ${
                  activeTab === 'hemat'
                    ? 'bg-green-500/10 border-green-500/20 text-green-600'
                    : 'bg-orange-500/10 border-orange-500/20 text-orange-600'
                } text-sm font-bold tracking-wide transition-colors duration-300`}
              >
                {activeTab === 'hemat'
                  ? dictionary.hemat_info
                  : dictionary.super_info}
              </div>
            </div>
          </div>

          {/* Grid Packages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {currentPackages.map((item) => {
              const discountPercent = Math.round(
                ((item.priceNormal - item.pricePromo) / item.priceNormal) * 100
              );
              const savedAmount = item.priceNormal - item.pricePromo;

              return (
                <div
                  key={item.id}
                  className="group bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#333333] hover:border-yellow-500/50 hover:shadow-[0_8px_30px_rgba(250,204,21,0.15)] transition-all duration-300 flex flex-col"
                >
                  {/* Image Area - Aspect Square (1:1) */}
                  <div
                    className="relative w-full aspect-square bg-[#121212] overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(item)}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {/* Zoom Indicator Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-yellow-500 text-black rounded-full p-3 shadow-lg transform group-hover:scale-110">
                        <ZoomIn className="w-6 h-6" />
                      </div>
                    </div>
                    {/* Small Zoom Badge */}
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity font-medium border border-white/10">
                      <ZoomIn className="w-3 h-3 text-yellow-500" />
                      <span>Klik</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col flex-grow relative">
                    {/* Badge Diskon & Tipe */}
                    <div className="mb-4 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded-md shadow-sm font-oswald tracking-wide">
                        <Percent className="w-3 h-3" /> {discountPercent}% OFF
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-md border uppercase tracking-wider ${
                          activeTab === 'hemat'
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                        }`}
                      >
                        {activeTab === 'hemat' ? 'HEMAT' : 'SUPER'}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="mb-4 flex-grow">
                      <h3 className="text-sm font-bold text-white uppercase leading-snug line-clamp-2 group-hover:text-yellow-500 transition-colors font-oswald tracking-wide min-h-[40px]">
                        {item.title}
                      </h3>
                    </div>

                    {/* Pricing */}
                    <div className="mt-auto pt-4 border-t border-[#333333] border-dashed space-y-2 bg-[#1A1A1A] relative z-10">
                      <p className="text-xs text-gray-500 line-through font-medium">
                        {formatRupiah(item.priceNormal)}
                      </p>
                      <div className="space-y-1">
                        <p className="text-xl font-black text-yellow-500 font-oswald tracking-tight">
                          {formatRupiah(item.pricePromo)}
                        </p>
                        <p className="text-[10px] font-bold flex items-center gap-1 text-green-400 tracking-wide">
                          <span>💰</span> Hemat {formatRupiah(savedAmount)}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => handleWhatsApp(item)}
                        className="w-full mt-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-oswald tracking-wide text-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat WhatsApp</span>
                      </button>
                    </div>

                    {/* Decorative Background Accent (Optional) */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>

                  {/* Bottom Accent Bar */}
                  <div className="h-1 w-0 group-hover:w-full bg-yellow-500 transition-all duration-500 ease-out" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 bg-[#1A1A1A] hover:bg-[#333333] text-yellow-500 p-3 rounded-full transition-all z-10 border border-[#333333] hover:border-yellow-500"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-4xl aspect-square bg-[#121212] rounded-2xl overflow-hidden shadow-2xl border border-[#333333]">
            <Image
              src={selectedImage.image}
              alt={selectedImage.title}
              fill
              className="object-contain p-4"
              sizes="100vw"
            />
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#1A1A1A]/90 backdrop-blur-md rounded-lg p-5 max-w-md mx-4 border border-[#333333] text-center shadow-xl w-full">
            <h3 className="font-bold text-white text-base mb-3 font-oswald uppercase tracking-wide">
              {selectedImage.title}
            </h3>
            <div className="flex items-center justify-center gap-4 text-xs">
              <span className="text-gray-500 line-through">
                {formatRupiah(selectedImage.priceNormal)}
              </span>
              <span className="text-lg font-black text-yellow-500 font-oswald">
                {formatRupiah(selectedImage.pricePromo)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RepairSection;
