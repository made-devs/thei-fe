// Filepath: app/components/Career/CareerHero.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const CareerHero = ({ dictionary, lang }) => {
  if (!dictionary) return null;

  return (
    <section className="relative h-[60vh] flex items-center justify-center text-white text-center">
      <Image
        src={dictionary.image}
        alt={dictionary.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 p-4 flex flex-col items-center max-w-4xl">
        <p className="font-semibold tracking-widest uppercase text-yellow-400">
          {dictionary.subtitle}
        </p>
        <h1 className="text-5xl lg:text-6xl font-bold mt-2">
          {dictionary.title}
        </h1>
        <p className="mt-4 text-lg max-w-2xl text-gray-200">
          {dictionary.description}
        </p>

        <div className="flex items-center justify-center text-sm mt-8">
          {(dictionary.breadcrumbs || []).map((crumb, index) => (
            <React.Fragment key={crumb.name}>
              {index > 0 && <ChevronRight size={16} className="mx-1" />}
              {index === dictionary.breadcrumbs.length - 1 ? (
                <span className="font-semibold">{crumb.name}</span>
              ) : (
                <Link
                  href={`/${lang}${crumb.link}`}
                  className="hover:underline"
                >
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

export default CareerHero;
