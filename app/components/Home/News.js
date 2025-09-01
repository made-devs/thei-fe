// app/components/Home/News.js
'use client';
import React, { useLayoutEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cog, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const News = ({ dictionary }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const articles = useMemo(
    () => dictionary.articles || [],
    [dictionary.articles]
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const getScrollAmount = () => {
      let trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth);
    };

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [articles]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px] pt-20 text-center">
        {/* Subtitle dengan ikon Cog */}
        <div className="flex items-center justify-center text-sm font-bold uppercase text-yellow-400 mb-2">
          <Cog
            size={20}
            className="mr-2 animate-spin"
            style={{ animationDuration: 's' }}
          />
          <span>{dictionary.subtitle}</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold">{dictionary.title}</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          {dictionary.description}
        </p>
      </div>

      <div
        ref={trackRef}
        className="absolute top-1/2 -translate-y-1/2 flex items-center pl-[10vw]"
      >
        {articles.map((article, index) => (
          <div
            key={`${article.title}-${index}`}
            className="flex-shrink-0 w-[70vw] lg:w-[30vw] px-4 mt-[6rem]"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <div className="relative aspect-video">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-yellow-500 uppercase">
                  {article.category}
                </span>
                <h3 className="font-bold text-lg mt-2 mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600 h-16">
                  {article.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* --- KARTU "LIHAT SEMUA" DI UJUNG (DIUBAH JADI LINGKARAN) --- */}
        <div className="flex-shrink-0 w-[30vw] lg:w-[15vw] px-4 flex items-center justify-center">
          <a
            href="#"
            className="flex flex-col items-center justify-center w-40 h-40 lg:w-48 lg:h-48 bg-gray-100 rounded-full text-black hover:bg-yellow-400 transition-colors group"
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

        <div className="flex-shrink-0 w-[10vw] h-1"></div>
      </div>
    </section>
  );
};

export default News;
