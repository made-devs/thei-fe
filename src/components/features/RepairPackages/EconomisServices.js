'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Percent, MessageCircle, X, ZoomIn, Wallet } from 'lucide-react';
import { economisServices } from '@/data/package';

const EconomisServices = ({ dictionary }) => {
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
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-yellow-500 text-xs font-bold uppercase tracking-wider mb-2">
              <Wallet className="w-4 h-4" />
              {dictionary.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tight">
              {dictionary.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {dictionary.subtitle}
            </p>
          </div>

          {/* Grid System */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {economisServices.map((item) => {
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
                      <span>Klik perbesar</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col flex-grow relative">
                    {/* Badge Diskon */}
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1 bg-yellow-500 text-black text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm font-oswald tracking-wide">
                        <Percent className="w-3 h-3" /> {discountPercent}% OFF
                      </span>
                    </div>

                    {/* Capacity */}
                    <div className="mb-2">
                      <span className="inline-block text-[10px] font-bold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 uppercase tracking-wider">
                        {item.capacity}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="mb-4 flex-grow">
                      <h3 className="text-sm font-bold text-white uppercase leading-snug line-clamp-2 group-hover:text-yellow-500 transition-colors font-oswald tracking-wide">
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
                        <p className="text-[10px] text-green-400 font-bold tracking-wide">
                          Hemat {formatRupiah(savedAmount)}
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

                  {/* Bottom Accent Bar - Dipertegas */}
                  <div className="h-1 w-0 group-hover:w-full bg-yellow-500 transition-all duration-500 ease-out" />
                </div>
              );
            })}
          </div>

          {/* Note Footer */}
          <div className="mt-16 text-center border-t border-gray-200 pt-8 max-w-2xl mx-auto">
            <p className="text-gray-500 text-sm">{dictionary.note}</p>
          </div>
        </div>
      </section>

      {/* Image Popup Modal - Style Diperbarui */}
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

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#1A1A1A]/90 backdrop-blur-md rounded-lg p-5 max-w-md mx-4 border border-[#333333] text-center shadow-xl">
            <h3 className="font-bold text-white text-base mb-2 font-oswald uppercase tracking-wide">
              {selectedImage.title}
            </h3>
            <p className="text-xs text-yellow-500 font-medium uppercase tracking-wider bg-yellow-500/10 px-3 py-1 rounded-full inline-block border border-yellow-500/20">
              Kapasitas: {selectedImage.capacity}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default EconomisServices;
