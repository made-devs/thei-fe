'use client';
import { useState } from 'react';
import Image from 'next/image';
import { PlayCircle, X, CheckCircle, Cog } from 'lucide-react';

const WhyJoin = ({ dictionary }) => {
  const [showVideo, setShowVideo] = useState(false);

  if (!dictionary) return null;

  return (
    <>
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Kolom Teks */}
            <div className="pl-[2rem]">
              <div className="flex items-center text-sm font-bold uppercase text-yellow-400 mb-2">
                <Cog size={20} className="mr-2" />
                <span>{dictionary.subtitle}</span>
              </div>
              <h2 className="text-4xl font-bold text-black">
                {dictionary.title}
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {dictionary.description}
              </p>
              <ul className="mt-6 space-y-3">
                {dictionary.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle
                      size={20}
                      className="text-green-500 mr-3 flex-shrink-0"
                    />
                    <span className="text-gray-800">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Kolom Video - Ditukar ke Kiri */}
            <div className="text-center lg:order-first">
              <h3 className="text-xl font-bold mb-4">
                {dictionary.video_testimonial.title}
              </h3>
              <div
                className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer shadow-lg"
                onClick={() => setShowVideo(true)}
              >
                <Image
                  src={dictionary.video_testimonial.video_thumb}
                  alt="Testimonial thumbnail"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayCircle
                    size={80}
                    className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Video */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 right-0 text-white hover:text-yellow-400"
            >
              <X size={32} />
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${dictionary.video_testimonial.video_id}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhyJoin;
