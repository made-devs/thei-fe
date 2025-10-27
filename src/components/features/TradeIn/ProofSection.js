"use client";

import Image from "next/image";
import { Quote } from "lucide-react";

const ProofSection = ({ dictionary }) => {
  if (!dictionary) {
    return null;
  }

  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Title & Description Centered on Page */}
        <div className="mb-10 flex flex-col items-center justify-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center w-full max-w-3xl mx-auto">
            {dictionary.video_title}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg mt-2 text-center w-full max-w-2xl mx-auto">
            {dictionary.video_description}
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          <div>
            {/* Image stays left-aligned in column */}
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image
                src={
                  dictionary.video_thumb ||
                  "/trade-in/appraisal-video-thumb.webp"
                }
                alt="Appraisal Process"
                fill
                className="object-cover transition-transform duration-300"
              />
            </div>
          </div>
          {/* Testimonial stays right-aligned in column */}
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
  );
};

export default ProofSection;
