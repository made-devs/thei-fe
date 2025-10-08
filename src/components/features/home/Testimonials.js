"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Quote, Cog, ArrowLeft, ArrowRight, PlayCircle } from "lucide-react";

const Testimonials = ({ dictionary }) => {
  // Memoize data
  const testimonials = useMemo(() => dictionary.list || [], [dictionary.list]);
  const videoTestimonials = useMemo(
    () => dictionary.video_testimonials?.videos || [],
    [dictionary.video_testimonials]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  // Embla Carousel for Videos
  const [videoEmblaRef, videoEmblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
  });

  // Tambahkan state untuk index aktif video
  const [videoActiveIdx, setVideoActiveIdx] = useState(0);

  // Sinkronkan dots dengan embla
  useEffect(() => {
    if (!videoEmblaApi) return;
    const onSelect = () =>
      setVideoActiveIdx(videoEmblaApi.selectedScrollSnap());
    videoEmblaApi.on("select", onSelect);
    // Set index saat embla siap
    onSelect();
    return () => {
      videoEmblaApi.off("select", onSelect);
    };
  }, [videoEmblaApi]);

  const videoScrollPrev = useCallback(
    () => videoEmblaApi && videoEmblaApi.scrollPrev(),
    [videoEmblaApi]
  );
  const videoScrollNext = useCallback(
    () => videoEmblaApi && videoEmblaApi.scrollNext(),
    [videoEmblaApi]
  );

  if (testimonials.length === 0) {
    return null;
  }

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center text-sm font-bold uppercase text-yellow-400 mb-2">
            <Cog
              size={20}
              className="mr-2 animate-spin"
              style={{ animationDuration: "5s" }}
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

        {/* Thumbnail Selectors (mobile: di atas card) */}
        <div className="flex justify-center gap-3 mb-4 md:hidden">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative w-12 h-12 rounded-full border-2 transition-all duration-200
                ${
                  index === activeIndex
                    ? "border-yellow-400 scale-110 shadow-lg"
                    : "border-gray-200 opacity-60"
                }
              `}
              style={{ padding: 0, background: "none" }}
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="rounded-full object-cover"
                sizes="48px"
              />
              {/* Active ring effect */}
              {index === activeIndex && (
                <span className="absolute inset-0 rounded-full ring-2 ring-yellow-400 animate-pulse pointer-events-none" />
              )}
            </button>
          ))}
        </div>

        {/* Written Testimonial Card */}
        <div className="bg-yellow-400 text-black rounded-xl shadow-lg p-4 mb-8 relative overflow-hidden min-h-[180px] flex items-center md:p-12 md:mb-12 md:min-h-[350px]">
          <Quote
            className="absolute -bottom-8 -left-8 text-black/10"
            size={200}
          />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <p className="text-2xl lg:text-3xl font-light italic leading-snug mb-6">
                &quot;{activeTestimonial.quote}&quot;
              </p>
              <div>
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
                className="rounded-full object-cover border-4 border-black"
                sizes="200px"
              />
            </div>
          </div>
        </div>

        {/* Thumbnail Selectors (desktop: tetap di bawah) */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`bg-gray-100 p-4 rounded-lg flex items-center gap-4 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                index === activeIndex
                  ? "ring-2 ring-yellow-400 shadow-xl"
                  : "opacity-70 hover:opacity-100"
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

        {/* Video Testimonials Section */}
        {videoTestimonials.length > 0 && (
          <div className="mt-20 pt-16 border-t">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold">
                {dictionary.video_testimonials.title}
              </h3>
            </div>
            <div className="relative">
              <div className="overflow-hidden" ref={videoEmblaRef}>
                <div className="flex -ml-4">
                  {videoTestimonials.map((video, index) => (
                    <div
                      key={index}
                      className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                    >
                      <div className="group cursor-pointer">
                        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                          <Image
                            src={`https://placehold.co/1600x900/1a1a1a/ffc700?text=Video+${
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
                        <div className="p-4 text-left">
                          <h4 className="font-bold text-lg mt-2">
                            {video.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {video.name}, {video.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* DOTS INDICATOR MOBILE */}
              <div className="flex justify-center mt-6 space-x-2 md:hidden">
                {videoTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to video ${idx + 1}`}
                    onClick={() => videoEmblaApi && videoEmblaApi.scrollTo(idx)}
                    className={`h-2 rounded-full transition-all duration-200 focus:outline-none ${
                      videoActiveIdx === idx
                        ? "w-6 bg-yellow-400"
                        : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              {/* REVISI: Menyesuaikan posisi vertikal panah */}
              <button
                className="absolute top-[calc(50%-2.75rem)] -left-4 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
                onClick={videoScrollPrev}
              >
                <ArrowLeft size={24} className="text-black" />
              </button>
              <button
                className="absolute top-[calc(50%-2.75rem)] -right-4 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md z-10 hidden lg:flex"
                onClick={videoScrollNext}
              >
                <ArrowRight size={24} className="text-black" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
