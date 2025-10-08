"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle, Quote, X } from "lucide-react";

const ProofSection = ({ dictionary }) => {
  const [showVideo, setShowVideo] = useState(false);

  if (!dictionary) {
    return null;
  }

  const videoId = dictionary.video_id || "dQw4w9WgXcQ"; // Fallback video ID

  return (
    <>
      <section className="bg-white py-12 sm:py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {dictionary.video_title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
                {dictionary.video_description}
              </p>
              <div
                className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer shadow-lg"
                onClick={() => setShowVideo(true)}
              >
                <Image
                  src={
                    dictionary.video_thumb ||
                    "/trade-in/appraisal-video-thumb.webp"
                  }
                  alt="Appraisal Process"
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
            <div className="bg-gray-50 p-4 sm:p-8 rounded-lg">
              <Quote size={40} className="text-yellow-400 mb-4" />
              <blockquote className="italic text-sm sm:text-base lg:text-lg text-gray-800">
                &quot;{dictionary.testimonial_quote}&quot;
              </blockquote>
              <div className="mt-6">
                <p className="font-bold text-black text-sm sm:text-base lg:text-lg">
                  {dictionary.testimonial_name}
                </p>
                <p className="text-xs sm:text-sm lg:text-base text-gray-500">
                  {dictionary.testimonial_company}
                </p>
              </div>
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

export default ProofSection;
