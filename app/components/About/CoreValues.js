"use client";

import React from "react";
import {
  ShieldCheck,
  HeartHandshake,
  BadgeCheck,
  Smile,
  Lightbulb,
  Zap,
  Cog,
} from "lucide-react";

// Mapping name to icon component for easy lookup
const iconMap = {
  // Indonesian Keys
  Integritas: <ShieldCheck size={40} className="text-black" />,
  "Keselamatan Utama": <HeartHandshake size={40} className="text-black" />,
  Keandalan: <BadgeCheck size={40} className="text-black" />,
  Kepuasan: <Smile size={40} className="text-black" />,
  Inovasi: <Lightbulb size={40} className="text-black" />,
  Efisiensi: <Zap size={40} className="text-black" />,
  // English Keys
  Integrity: <ShieldCheck size={40} className="text-black" />,
  "Safety First": <HeartHandshake size={40} className="text-black" />,
  Reliability: <BadgeCheck size={40} className="text-black" />,
  Satisfaction: <Smile size={40} className="text-black" />,
  Innovation: <Lightbulb size={40} className="text-black" />,
  Efficiency: <Zap size={40} className="text-black" />,
};

const CoreValues = ({ dictionary }) => {
  const values = dictionary.values || [];

  const ValueCard = ({ value }) => (
    <div className="group p-4 lg:p-8 bg-yellow-400 rounded-lg shadow-lg transition-all duration-200 h-full hover:shadow-2xl hover:-translate-y-2">
      <div className="flex justify-center mb-4">
        <span className="inline-block transition-transform duration-300 group-hover:scale-125">
          {iconMap[value.name] || <Cog size={40} className="text-black" />}
        </span>
      </div>
      <h3 className="font-bold text-lg sm:text-xl text-black">{value.name}</h3>
      <p className="mt-2 text-xs sm:text-sm text-black">{value.description}</p>
    </div>
  );

  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px] text-center">
        <div className="flex items-center justify-center text-sm font-bold uppercase text-yellow-400 mb-2">
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
        <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
          {dictionary.description}
        </p>

        {/* Updated grid to handle 6 items gracefully */}
        <div className="mt-12 lg:mt-16 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
