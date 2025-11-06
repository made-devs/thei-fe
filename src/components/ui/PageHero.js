'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

// Komponen Hero generik untuk semua halaman
const PageHero = ({ dictionary }) => {
  // Fallback jika dictionary atau breadcrumbs tidak ada
  const {
    title = 'Default Title',
    subtitle,
    breadcrumbs = [{ name: 'Home', link: '/' }],
    image = '/equipment/banner.webp',
  } = dictionary || {};

  const currentCrumb = breadcrumbs[breadcrumbs.length - 1];

  return (
    <section className="relative h-[40vh] sm:h-[60vh] flex items-center justify-center text-white text-center">
      <Image src={image} alt={title} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        {subtitle && (
          <p className="text-sm sm:text-base font-semibold tracking-widest uppercase text-yellow-400">
            {subtitle}
          </p>
        )}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 sm:mt-4 max-w-4xl"
          style={{
            textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.4)',
          }}
        >
          {title}
        </h1>
        {/* Logic untuk render breadcrumbs secara dinamis */}
        <div className="flex items-center justify-center text-sm mt-4">
          {breadcrumbs.slice(0, -1).map((crumb, index) => (
            <React.Fragment key={index}>
              <Link href={crumb.link} className="hover:underline">
                {crumb.name}
              </Link>
              <ChevronRight size={16} className="mx-1" />
            </React.Fragment>
          ))}
          <span className="font-semibold">{currentCrumb.name}</span>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
