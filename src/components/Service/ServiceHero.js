import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const ServiceHero = ({ dictionary }) => {
  if (!dictionary) return null;

  return (
    <section className="relative h-[60vh] flex items-center justify-center text-white text-center">
      {/* Gambar Latar */}
      <Image
        src="/banner-slider2.webp"
        alt={dictionary.title || 'Service and Support'}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Konten */}
      <div className="relative z-10 p-4 flex flex-col items-center max-w-4xl">
        <p className="font-semibold tracking-widest uppercase text-yellow-400">
          {dictionary.subtitle}
        </p>
        <h1 className="text-5xl lg:text-6xl font-bold mt-2">
          {dictionary.title}
        </h1>

        {/* Breadcrumb dipindahkan sedikit ke atas untuk mengisi ruang */}
        <div className="flex items-center justify-center text-sm mt-8">
          {(dictionary.breadcrumbs || []).map((crumb, index) => (
            <React.Fragment key={crumb.name}>
              {index > 0 && <ChevronRight size={16} className="mx-1" />}
              {index === dictionary.breadcrumbs.length - 1 ? (
                <span className="font-semibold">{crumb.name}</span>
              ) : (
                <Link href={crumb.link || '#'} className="hover:underline">
                  {crumb.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
