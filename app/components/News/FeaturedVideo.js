'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlayCircle, X } from 'lucide-react';

const FeaturedVideo = ({ dictionary }) => {
  const [showVideo, setShowVideo] = useState(false);

  if (!dictionary) return null;

  return (
    <>
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1024px] text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            {dictionary.title}
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            {dictionary.description}
          </p>
          <div
            className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer shadow-xl"
            onClick={() => setShowVideo(true)}
          >
            <Image
              src={dictionary.video_thumb}
              alt="Event Video Thumbnail"
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
                src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`}
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

export default FeaturedVideo;
