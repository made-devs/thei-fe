'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Quote, Cog } from 'lucide-react';

const Testimonials = ({ dictionary }) => {
  const testimonials = useMemo(() => dictionary.list || [], [dictionary.list]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (testimonials.length === 0) {
    return null;
  }

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[max-w-7xl]">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center text-sm font-bold uppercase text-yellow-400 mb-2">
            <Cog
              size={20}
              className="mr-2 animate-spin"
              style={{ animationDuration: '5s' }}
            />
            <span>{dictionary.subtitle}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black">
            {dictionary.title}
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            {dictionary.description}
          </p>
        </div>

        {/* Highlight Card - WARNA DIUBAH */}
        <div className="bg-yellow-400 text-black rounded-xl shadow-2xl p-8 lg:p-12 mb-12 relative overflow-hidden min-h-[350px] flex items-center">
          <Quote
            className="absolute -bottom-8 -left-8 text-black/10" // Warna ikon quote diubah
            size={200}
          />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <p className="text-2xl lg:text-3xl font-light italic leading-snug mb-6">
                &quot;{activeTestimonial.quote}&quot;
              </p>
              <div>
                {/* Warna teks nama & perusahaan diubah */}
                <p className="font-bold text-lg text-black">
                  {activeTestimonial.name}
                </p>
                <p className="text-gray-800 text-sm">
                  {activeTestimonial.company}
                </p>
              </div>
            </div>
            <div className="relative w-40 h-40 lg:w-48 lg:h-48 mx-auto md:mx-0 md:ml-auto">
              <Image
                src={activeTestimonial.image}
                alt={activeTestimonial.name}
                fill
                className="rounded-full object-cover border-4 border-black" // Warna border diubah
                sizes="200px"
              />
            </div>
          </div>
        </div>

        {/* Thumbnail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`bg-gray-100 p-4 rounded-lg flex items-center gap-4 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                index === activeIndex
                  ? 'ring-2 ring-yellow-400 shadow-xl'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="rounded-full object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="font-bold text-black">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.company}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
