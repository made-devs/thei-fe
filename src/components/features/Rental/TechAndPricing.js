'use client';
import Image from 'next/image';
import { PlayCircle, X } from 'lucide-react';
import { useState } from 'react';

const TechAndPricing = ({ dictionary }) => {
  const [showVideo, setShowVideo] = useState(false);

  if (!dictionary) return null;

  // Video ID from the provided YouTube Shorts link
  const videoId = 'qlUKYYgrIg0';

  const handlePlay = () => {
    setShowVideo(true);
  };

  return (
    <>
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1280px]">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-yellow-500 font-semibold text-sm sm:text-base mb-3 uppercase tracking-wide">
              {dictionary.subtitle}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
              {dictionary.title}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              {dictionary.description}
            </p>
          </div>

          {/* Video Section */}
          <div className="max-w-5xl mx-auto">
            <div
              className="relative aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer shadow-2xl hover:shadow-3xl transition-shadow duration-300 mx-auto max-w-xs"
              onClick={handlePlay}
            >
              {/* Overlay with Play Button */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center z-10 group-hover:bg-black/50 transition-all duration-300">
                <div className="text-center">
                  <PlayCircle
                    size={60}
                    className="text-yellow-400 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 mx-auto drop-shadow-lg"
                    strokeWidth={1.5}
                  />
                  <p className="text-white font-semibold mt-4 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Tonton Video
                  </p>
                </div>
              </div>

              {/* Thumbnail/Placeholder */}
              <Image
                src={'/rental/thumbnail.webp'}
                alt="THEI Rental Video Demo"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 320px"
                unoptimized={!dictionary.thumbnail}
                priority
              />

              {/* Decorative Corner Badge */}
              <div className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-full text-xs font-bold uppercase z-20 shadow-lg">
                Video Demo
              </div>
            </div>

            {/* Video Info */}
            <div className="mt-8 text-center">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Monitoring GPS Real-time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Armada Terawat & Modern</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Support 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 right-0 text-white hover:text-yellow-400"
            >
              <X size={32} />
            </button>
            <div className="aspect-[9/16]">
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

export default TechAndPricing;
