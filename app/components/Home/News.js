'use client';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { Cog, ArrowRight, ArrowLeft, PlayCircle } from 'lucide-react';

const News = ({ dictionary, currentLocale }) => {
  const articles = useMemo(
    () => dictionary.articles || [],
    [dictionary.articles]
  );
  const eventVideos = useMemo(
    () => dictionary.event_videos?.videos || [],
    [dictionary.event_videos]
  );

  // Carousel for Videos
  const [videoEmblaRef, videoEmblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: true,
  });
  const videoScrollPrev = useCallback(
    () => videoEmblaApi && videoEmblaApi.scrollPrev(),
    [videoEmblaApi]
  );
  const videoScrollNext = useCallback(
    () => videoEmblaApi && videoEmblaApi.scrollNext(),
    [videoEmblaApi]
  );

  // Carousel for Articles
  const [articleEmblaRef, articleEmblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const articleScrollPrev = useCallback(
    () => articleEmblaApi && articleEmblaApi.scrollPrev(),
    [articleEmblaApi]
  );
  const articleScrollNext = useCallback(
    () => articleEmblaApi && articleEmblaApi.scrollNext(),
    [articleEmblaApi]
  );
  const scrollTo = useCallback(
    (index) => articleEmblaApi && articleEmblaApi.scrollTo(index),
    [articleEmblaApi]
  );

  const onSelect = useCallback(() => {
    if (!articleEmblaApi) return;
    setSelectedIndex(articleEmblaApi.selectedScrollSnap());
  }, [articleEmblaApi]);

  useEffect(() => {
    if (!articleEmblaApi) return;
    onSelect();
    setScrollSnaps(articleEmblaApi.scrollSnapList());
    articleEmblaApi.on('select', onSelect);
    articleEmblaApi.on('reInit', onSelect);
  }, [articleEmblaApi, onSelect]);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Event Videos Section */}
        {eventVideos.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center text-sm font-bold uppercase text-yellow-400 mb-2">
                <Cog
                  size={20}
                  className="mr-2 animate-spin"
                  style={{ animationDuration: '5s' }}
                />
                <span>{dictionary.subtitle}</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold">
                {dictionary.event_videos.title}
              </h2>
              {/* Added event videos description */}
              {dictionary.event_videos.description && (
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                  {dictionary.event_videos.description}
                </p>
              )}
            </div>
            <div className="relative">
              <div className="overflow-hidden" ref={videoEmblaRef}>
                <div className="flex -ml-4">
                  {eventVideos.map((video, index) => (
                    <div
                      key={index}
                      className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                    >
                      <div className="group cursor-pointer">
                        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                          <Image
                            src={`https://placehold.co/1600x900/1a1a1a/ffc700?text=Event+Video+${
                              index + 1
                            }`}
                            alt={video.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <PlayCircle
                              size={64}
                              className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
                            />
                          </div>
                        </div>
                        <div className="p-4 text-center">
                          <h3 className="font-bold text-lg mt-2 mb-2">
                            {video.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="absolute top-[calc(50%-2.5rem)] -left-4 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
                onClick={videoScrollPrev}
              >
                <ArrowLeft size={24} className="text-black" />
              </button>
              <button
                className="absolute top-[calc(50%-2.5rem)] -right-4 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
                onClick={videoScrollNext}
              >
                <ArrowRight size={24} className="text-black" />
              </button>
            </div>
          </div>
        )}

        {/* News & Articles Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold">{dictionary.title}</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {dictionary.description}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={articleEmblaRef}>
            <div className="flex -ml-4">
              {articles.map((article, index) => (
                <div
                  key={`${article.title}-${index}`}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] pl-4"
                >
                  <Link
                    href={`/${currentLocale}/news/${article.slug}`}
                    className="h-full block group"
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 h-full flex flex-col">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Buttons */}
          <button
            className="absolute top-[calc(50%-4rem)] -left-4 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
            onClick={articleScrollPrev}
          >
            <ArrowLeft size={24} className="text-black" />
          </button>
          <button
            className="absolute top-[calc(50%-4rem)] -right-4 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
            onClick={articleScrollNext}
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

        {/* Tombol CTA "See All News" */}
        <div className="text-center mt-12">
          <Link
            href={`/${currentLocale}/news`}
            className="inline-block bg-yellow-400 text-black px-8 py-3 text-sm font-bold tracking-wide uppercase hover:bg-yellow-500 transition-colors rounded-full"
          >
            {dictionary.see_more}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;
