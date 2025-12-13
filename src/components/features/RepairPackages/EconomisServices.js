'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Percent, MessageCircle, X, ZoomIn } from 'lucide-react';
import { economisServices } from '@/data/package';

const EconomisServices = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsApp = (item) => {
    const message = encodeURIComponent(
      `Halo THEI, saya tertarik dengan ${item.title} (${
        item.capacity
      }). Harga promo ${formatRupiah(
        item.pricePromo
      )}. Mohon info lebih lanjut.`
    );
    window.open(`https://wa.me/6285195886789?text=${message}`, '_blank');
  };

  return (
    <>
      <section className="py-20 bg-neutral-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          {/* Header Section - Left Aligned for variety */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase flex items-center gap-2">
                <span className="bg-yellow-400 p-1 px-3 text-lg md:text-xl transform -rotate-2 text-black rounded-sm shadow-sm">
                  Budget
                </span>
                Economis Package
              </h2>
              <p className="text-gray-500 max-w-xl">
                Solusi perawatan ringan untuk menjaga performa unit tetap prima
                dengan biaya yang sangat terjangkau.
              </p>
            </div>
            {/* Decor Line */}
            <div className="hidden md:block h-px flex-1 bg-gray-300 mx-8 relative top-[-10px]"></div>
          </div>

          {/* Grid System - Dense Marketplace Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {economisServices.map((item) => {
              const discountPercent = Math.round(
                ((item.priceNormal - item.pricePromo) / item.priceNormal) * 100
              );
              const savedAmount = item.priceNormal - item.pricePromo;

              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 flex flex-col"
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
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {/* Zoom Indicator Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3 shadow-lg">
                        <ZoomIn className="w-6 h-6 text-gray-900" />
                      </div>
                    </div>
                    {/* Small Zoom Badge */}
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-3 h-3" />
                      <span>Klik untuk perbesar</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Badge Diskon */}
                    <div className="mb-2">
                      <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                        <Percent className="w-3 h-3" /> {discountPercent}% OFF
                      </span>
                    </div>

                    {/* Title */}
                    <div className="mb-1">
                      <h3 className="text-sm font-bold text-gray-900 uppercase leading-snug line-clamp-2 min-h-[40px] group-hover:text-yellow-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    {/* Capacity */}
                    <div className="mb-3">
                      <span className="inline-block text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 uppercase">
                        Cap: {item.capacity}
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="mt-auto pt-3 border-t border-gray-100 border-dashed space-y-2">
                      <p className="text-xs text-gray-400 line-through">
                        {formatRupiah(item.priceNormal)}
                      </p>
                      <div className="space-y-1">
                        <p className="text-lg font-black text-gray-900">
                          {formatRupiah(item.pricePromo)}
                        </p>
                        <p className="text-[10px] text-green-600 font-semibold">
                          Hemat {formatRupiah(savedAmount)}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => handleWhatsApp(item)}
                        className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">Chat WhatsApp</span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom Accent Bar */}
                  <div className="h-1 w-0 group-hover:w-full bg-yellow-400 transition-all duration-500 ease-out" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all z-10"
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

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-lg p-4 max-w-md mx-4">
            <h3 className="font-bold text-gray-900 text-sm mb-1">
              {selectedImage.title}
            </h3>
            <p className="text-xs text-gray-600">{selectedImage.capacity}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EconomisServices;
