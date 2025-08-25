// /app/components/Home/TestimonialsAndNews.js
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { ArrowRight, Quote } from 'lucide-react';

const TestimonialsAndNews = ({ dictionary }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonials = useMemo(
    () => dictionary.testimonials || [],
    [dictionary.testimonials]
  );

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, testimonials]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="bg-white border-t border-b border-gray-200">
      <div className="flex flex-col lg:flex-row">
        {/* Kolom Kiri - Testimonial */}
        <div className="bg-yellow-400 px-8 py-16 md:px-16 lg:px-24 relative overflow-hidden flex flex-col lg:w-1/2">
          <Quote
            className="absolute -left-12 -bottom-12 text-yellow-500/50"
            size={300}
            strokeWidth={1}
          />
          <div className="relative z-10 flex flex-col h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-black">
                {dictionary.testimonial_title}
              </h2>
            </div>

            <div className="flex-grow flex flex-col justify-center">
              <div className="relative h-56 mt-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <Image
                        src={`https://i.pravatar.cc/100?u=${testimonial.name}`}
                        alt={testimonial.name}
                        width={100}
                        height={100}
                        className="rounded-full mb-4 border-4 border-white shadow-lg"
                      />
                      <h4 className="font-bold text-black">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-800 mb-4">
                        {testimonial.company}
                      </p>
                      {/* FIX: Ganti tanda kutip dengan entitas HTML */}
                      <p className="text-black italic max-w-lg text-sm">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center space-x-2 items-center my-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1 transition-all cursor-pointer duration-500 ${
                      currentSlide === index
                        ? 'w-12 bg-black'
                        : 'w-6 bg-black/30'
                    }`}
                  ></button>
                ))}
              </div>

              <div className="text-center">
                <a
                  href="#"
                  className="font-bold text-black text-sm flex items-center justify-center group"
                >
                  <span>{dictionary.view_testimonial}</span>
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan - News & Events */}
        <div className="bg-white px-8 py-16 md:px-16 lg:px-24 flex flex-col lg:w-1/2">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-4">
              {dictionary.news_title}
            </h2>
            <p className="text-sm text-gray-500 mb-12">
              {dictionary.list_news}
            </p>
          </div>

          <div className="space-y-6 flex-grow">
            {dictionary.news.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-6 border-b border-gray-200 pb-4 group"
              >
                <p className="text-xs text-gray-400 w-28 flex-shrink-0 pt-1">
                  {item.date}
                </p>
                <a
                  href="#"
                  className="font-bold text-black group-hover:text-blue-600 transition-colors"
                >
                  {item.title}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a
              href="#"
              className="font-bold text-blue-600 text-sm flex items-center group"
            >
              <span>{dictionary.see_all_news}</span>
              <ArrowRight
                size={16}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAndNews;
