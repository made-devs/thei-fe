'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Percent, MessageCircle, X, ZoomIn, Zap, Shield } from 'lucide-react';
import { repairServices } from '@/data/package';

const RepairSection = () => {
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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          {/* Header with Toggle */}
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase mb-4">
              Paket{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Repair
              </span>{' '}
              Alat Berat
            </h2>
            <p className="text-gray-600 mb-8">
              Pilih paket repair yang sesuai dengan kebutuhan dan budget Anda
            </p>

            {/* Toggle Switch */}
            <div className="inline-flex items-center bg-gray-200 rounded-full p-1.5 shadow-inner">
              <button
                onClick={() => setActiveTab('hemat')}
                className={`relative px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeTab === 'hemat'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Paket Hemat
                </span>
                {activeTab === 'hemat' && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                    PROMO
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('super')}
                className={`relative px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeTab === 'super'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg scale-105'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Paket Super
                </span>
                {activeTab === 'super' && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                    PROMO
                  </span>
                )}
              </button>
            </div>

            {/* Info Badge */}
            <div className="mt-6 inline-block">
              <div
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'hemat'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-orange-100 text-orange-800'
                } text-sm font-semibold`}
              >
                {activeTab === 'hemat'
                  ? '💰 Solusi repair hemat untuk budget terbatas'
                  : '⚡ Repair lebih lengkap dengan garansi maksimal'}
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
                  className="group bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-yellow-400 hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  {/* Image Area - Aspect Square (1:1) with Zoom Indicator */}
                  <div
                    className="relative w-full aspect-square bg-gray-100 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(item)}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {/* Zoom Indicator Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 rounded-full p-4 shadow-2xl transform group-hover:scale-110">
                        <ZoomIn className="w-7 h-7 text-gray-900" />
                      </div>
                    </div>
                    {/* Small Zoom Badge */}
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[10px] px-2.5 py-1.5 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-3 h-3" />
                      <span>Klik</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Badge Diskon */}
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm ${
                          activeTab === 'hemat'
                            ? 'bg-gradient-to-r from-green-600 to-green-700'
                            : 'bg-gradient-to-r from-orange-500 to-red-600'
                        }`}
                      >
                        <Percent className="w-3 h-3" /> {discountPercent}% OFF
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded ${
                          activeTab === 'hemat'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {activeTab === 'hemat' ? 'HEMAT' : 'SUPER'}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                      <h3 className="text-sm font-bold text-gray-900 uppercase leading-tight line-clamp-2 min-h-[42px] group-hover:text-yellow-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    {/* Pricing */}
                    <div className="mt-auto pt-3 border-t border-gray-100 space-y-2">
                      <p className="text-xs text-gray-400 line-through">
                        {formatRupiah(item.priceNormal)}
                      </p>
                      <div className="space-y-1">
                        <p className="text-xl font-black text-gray-900">
                          {formatRupiah(item.pricePromo)}
                        </p>
                        <p className="text-[11px] text-green-600 font-bold flex items-center gap-1">
                          <span>💰</span> Hemat {formatRupiah(savedAmount)}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => handleWhatsApp(item)}
                        className={`w-full mt-3 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-xl transform hover:scale-105 ${
                          activeTab === 'hemat'
                            ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                            : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                        }`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">Chat WhatsApp</span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom Accent Bar */}
                  <div
                    className={`h-1 w-0 group-hover:w-full transition-all duration-500 ease-out ${
                      activeTab === 'hemat'
                        ? 'bg-green-500'
                        : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all z-10 hover:scale-110"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-4xl aspect-square">
            <Image
              src={selectedImage.image}
              alt={selectedImage.title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-xl p-4 max-w-md mx-4 shadow-2xl">
            <h3 className="font-bold text-gray-900 text-sm mb-2">
              {selectedImage.title}
            </h3>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 line-through">
                {formatRupiah(selectedImage.priceNormal)}
              </span>
              <span className="text-lg font-black text-green-600">
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
