"use client";
import { useState } from "react";
import Image from "next/image";
import { PlayCircle, Cog, X } from "lucide-react";

const DirectorIntro = ({ dictionary }) => {
  const [showVideo, setShowVideo] = useState(false);
  const videoData = dictionary?.video;

  return (
    <>
      <section className="bg-white py-12 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
          {/* Main container with side-by-side layout on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Text Content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start text-sm font-bold uppercase text-yellow-400 mb-2">
                <Cog
                  size={20}
                  className="mr-2 animate-spin"
                  style={{ animationDuration: "5s" }}
                />
                <span>{dictionary.subtitle}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                {dictionary.title}
              </h2>
              <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-600">
                &quot;{dictionary.quote}&quot;
              </p>
            </div>

            {/* Right Column: Video Player */}
            {videoData && (
              <div
                className="relative aspect-video w-full rounded-lg overflow-hidden group cursor-pointer shadow-lg"
                onClick={() => setShowVideo(true)}
              >
                <Image
                  src={videoData.thumbnail}
                  alt={videoData.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayCircle
                    size={80}
                    className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && videoData && (
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
                src={`https://www.youtube.com/embed/${videoData.id}?autoplay=1`}
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

export default DirectorIntro;
