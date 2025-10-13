import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, MapPin, Tag } from 'lucide-react';

const PromoHero = ({ promo }) => {
  if (!promo) return null;

  return (
    <section className="relative h-[60vh] flex items-center justify-center text-white text-center">
      <Image
        src="/promo/promo-products.webp"
        alt={promo.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 p-4 flex flex-col items-center max-w-5xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-center text-sm mb-4">
          <Link
            href="/"
            className="text-gray-300 hover:text-yellow-400 transition"
          >
            Home
          </Link>
          <ChevronRight size={16} className="mx-2 text-yellow-400" />
          <Link
            href="/promotions"
            className="text-gray-300 hover:text-yellow-400 transition"
          >
            Promotions
          </Link>
          <ChevronRight size={16} className="mx-2 text-yellow-400" />
          <span className="text-white font-semibold">{promo.category}</span>
        </div>

        {/* Badge & Category */}
        {promo.badge && (
          <div className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
            {promo.badge}
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 sm:mt-4 max-w-4xl leading-tight">
          {promo.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <MapPin size={16} className="text-yellow-400" />
            <span>{promo.location}</span>
          </div>
          {promo.discount && (
            <div className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1.5 rounded-full font-bold">
              <Tag size={16} />
              <span>{promo.discount} OFF</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PromoHero;
