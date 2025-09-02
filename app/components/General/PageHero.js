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
    <section className="relative h-[60vh] flex items-center justify-center text-white text-center">
      <Image src={image} alt={title} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 p-4 flex flex-col items-center">
        {subtitle && (
          <p className="font-semibold tracking-widest uppercase text-yellow-400">
            {subtitle}
          </p>
        )}
        <h1 className="text-5xl lg:text-6xl font-bold mt-2 max-w-4xl">
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
