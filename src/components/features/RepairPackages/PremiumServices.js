'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check, Star, ShieldCheck, Zap } from 'lucide-react';
import { premiumServices } from '@/data/package';

const PremiumServices = () => {
  const [activeCategory, setActiveCategory] = useState(
    premiumServices[0].category
  );

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern Halus untuk Section Putih */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-yellow-500 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4" />
            Heavy Equipment
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tight">
            Premium Service Packages
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Pilih kategori alat berat Anda dan temukan paket perawatan terbaik.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-14">
          {premiumServices.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wide transition-all duration-300 border-2 ${
                activeCategory === cat.category
                  ? 'bg-yellow-500 border-yellow-500 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]'
                  : 'bg-white border-black text-black hover:bg-gray-100'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {premiumServices
            .find((cat) => cat.category === activeCategory)
            ?.items.map((item) => {
              const discountPercent = Math.round(
                ((item.priceNormal - item.pricePromo) / item.priceNormal) * 100
              );

              return (
                <div
                  key={item.id}
                  className={`group flex flex-col relative rounded-3xl overflow-hidden transition-all duration-500 ${
                    item.isRecommended
                      ? 'bg-black border-2 border-yellow-500 shadow-[0_20px_50px_-12px_rgba(234,179,8,0.3)] scale-[1.02]'
                      : 'bg-neutral-900 border border-neutral-800 hover:shadow-2xl hover:shadow-black/20'
                  }`}
                >
                  {/* --- BAGIAN IMAGE (CLEAN) --- */}
                  <div className="relative w-full aspect-square bg-neutral-800 p-8 flex items-center justify-center overflow-hidden">
                    {/* Background Glow Effect di belakang gambar */}
                    <div className="absolute w-3/4 h-3/4 bg-yellow-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl z-10"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* --- BAGIAN BODY CARD (SEMUA INFO) --- */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow relative">
                    {/* Badge Recommended (Floating di perbatasan image & body) */}
                    {item.isRecommended && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-lg flex items-center gap-1 z-20 whitespace-nowrap">
                        <Star className="w-3.5 h-3.5 fill-black" /> Best Value
                      </div>
                    )}

                    {/* Meta Tags (Capacity & Discount) */}
                    <div className="flex justify-between items-start mb-4">
                      {item.capacity ? (
                        <span className="bg-neutral-800 border border-neutral-700 text-neutral-300 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                          Cap {item.capacity}
                        </span>
                      ) : (
                        <span></span>
                      )}

                      <span className="bg-red-600/20 text-red-500 border border-red-600/30 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                        Save {discountPercent}%
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black text-white uppercase leading-tight mb-6 group-hover:text-yellow-400 transition-colors">
                      {item.title}
                    </h3>

                    {/* Pricing */}
                    <div className="mb-8 p-4 bg-neutral-800/50 rounded-2xl border border-neutral-800">
                      <p className="text-gray-500 text-sm line-through decoration-red-500/50 mb-1">
                        {formatRupiah(item.priceNormal)}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl lg:text-3xl font-bold text-white">
                          {formatRupiah(item.pricePromo)}
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex-grow mb-8">
                      <ul className="space-y-3">
                        {item.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="mt-0.5 w-5 h-5 flex items-center justify-center bg-yellow-500 rounded-full flex-shrink-0">
                              <Check
                                className="w-3 h-3 text-black"
                                strokeWidth={4}
                              />
                            </span>
                            <span className="text-sm text-gray-300 font-medium">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group/btn ${
                        item.isRecommended
                          ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                          : 'bg-white text-black hover:bg-gray-200'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        Pilih Paket
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Note Footer */}
        <div className="mt-16 text-center border-t border-gray-200 pt-8 max-w-2xl mx-auto">
          <p className="text-gray-500 text-sm">
            *Harga dan ketersediaan paket dapat berubah sewaktu-waktu. Hubungi
            tim sales kami untuk penawaran khusus unit fleet (borongan).
          </p>
        </div>
      </div>
    </section>
  );
};

export default PremiumServices;
