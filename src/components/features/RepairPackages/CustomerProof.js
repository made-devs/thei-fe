'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlayCircle, X } from 'lucide-react';

const CustomerProof = ({ dictionary }) => {
  const [showVideo, setShowVideo] = useState(false);

  if (!dictionary) return null;

  // Fallback to Rickroll video ID if not specified
  const videoId = dictionary.video_id || 'dQw4w9WgXcQ';

  return (
    <>
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                {dictionary.title}
              </h2>
              <blockquote className="border-l-4 border-yellow-400 pl-6 italic text-base sm:text-lg text-gray-700">
                <p>&quot;{dictionary.quote}&quot;</p>
              </blockquote>
              <div className="mt-6">
                <p className="font-bold text-sm sm:text-base">
                  {dictionary.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {dictionary.company}
                </p>
              </div>
            </div>
            <div
              className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => setShowVideo(true)}
            >
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <PlayCircle
                  size={80}
                  className="text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all"
                />
              </div>
              <Image
                src={dictionary.video_thumb || '/testi/thumbnail1.webp'}
                alt="Video Testimonial"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

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
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
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

export default CustomerProof;
