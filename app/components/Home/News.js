'use client';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { Cog, ArrowRight, ArrowLeft } from 'lucide-react';

const News = ({ dictionary }) => {
  const articles = useMemo(
    () => dictionary.articles || [],
    [dictionary.articles]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    loop: true, // Loop the carousel for a continuous feel
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center text-sm font-bold uppercase text-yellow-400 mb-2">
            <Cog
              size={20}
              className="mr-2 animate-spin"
              style={{ animationDuration: '5s' }}
            />
            <span>{dictionary.subtitle}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">{dictionary.title}</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {dictionary.description}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {articles.map((article, index) => (
                <div
                  key={`${article.title}-${index}`}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] pl-4"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 h-full flex flex-col">
                    <div className="relative aspect-video">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-xs font-bold text-yellow-500 uppercase">
                        {article.category}
                      </span>
                      <h3 className="font-bold text-lg mt-2 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 flex-grow">
                        {article.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* "See All" Card as the last item */}
              <div className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] pl-4">
                <a
                  href="#"
                  className="flex flex-col items-center justify-center h-full bg-gray-100 rounded-lg text-black hover:bg-yellow-400 transition-colors group"
                >
                  <ArrowRight
                    size={32}
                    className="mb-2 transition-transform group-hover:translate-x-2"
                  />
                  <span className="font-bold text-sm text-center">
                    {dictionary.see_more}
                  </span>
                </a>
              </div>
            </div>
          </div>
          {/* Navigation Buttons */}
          <button
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
            onClick={scrollPrev}
          >
            <ArrowLeft size={24} className="text-black" />
          </button>
          <button
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
            onClick={scrollNext}
          >
            <ArrowRight size={24} className="text-black" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? 'w-6 bg-yellow-400'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
