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
  Integritas: <ShieldCheck size={40} className="text-yellow-400" />,
  "Keselamatan Utama": <HeartHandshake size={40} className="text-yellow-400" />,
  Keandalan: <BadgeCheck size={40} className="text-yellow-400" />,
  Kepuasan: <Smile size={40} className="text-yellow-400" />,
  Inovasi: <Lightbulb size={40} className="text-yellow-400" />,
  Efisiensi: <Zap size={40} className="text-yellow-400" />,
  // English Keys
  Integrity: <ShieldCheck size={40} className="text-yellow-400" />,
  "Safety First": <HeartHandshake size={40} className="text-yellow-400" />,
  Reliability: <BadgeCheck size={40} className="text-yellow-400" />,
  Satisfaction: <Smile size={40} className="text-yellow-400" />,
  Innovation: <Lightbulb size={40} className="text-yellow-400" />,
  Efficiency: <Zap size={40} className="text-yellow-400" />,
};

const CoreValues = ({ dictionary }) => {
  const values = dictionary.values || [];

  const ValueCard = ({ value }) => (
    <div className="p-8 bg-slate-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow h-full">
      <div className="flex justify-center mb-4">
        {iconMap[value.name] || <Cog size={40} className="text-yellow-400" />}
      </div>
      <h3 className="font-bold text-xl text-black">{value.name}</h3>
      <p className="mt-2 text-gray-600 text-sm">{value.description}</p>
    </div>
  );

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px] text-center">
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

        {/* Updated grid to handle 6 items gracefully */}
        <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
