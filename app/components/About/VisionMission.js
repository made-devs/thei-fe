"use client";

import React from "react";
import { Eye, Target } from "lucide-react"; // Impor ikon

// Checkmark icon component
const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const VisionMission = ({ dictionary }) => {
  // Langsung gunakan prop 'dictionary' karena isinya sudah objek vision_mission
  const vision_mission = dictionary;

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bagian Visi dengan Ikon */}
          <div className="flex items-start gap-6 p-8 bg-white rounded-2xl shadow-sm">
            <div className="flex-shrink-0 bg-yellow-400 p-4 rounded-full">
              <Eye size={32} className="text-black" />
            </div>
            <div>
              <h2 className="text-black font-bold uppercase tracking-wider text-sm mb-2">
                {vision_mission.vision_title}
              </h2>
              <p className="text-2xl font-semibold text-gray-800">
                {vision_mission.vision_text}
              </p>
            </div>
          </div>

          {/* Bagian Misi dengan Ikon */}
          <div className="flex items-start gap-6 p-8 bg-white rounded-2xl shadow-sm">
            <div className="flex-shrink-0 bg-yellow-400 p-4 rounded-full">
              <Target size={32} className="text-black" />
            </div>
            <div>
              <h2 className="text-black font-bold uppercase tracking-wider text-sm mb-2">
                {vision_mission.mission_title}
              </h2>
              {/* Mengubah dari paragraf menjadi daftar */}
              <ul className="space-y-3 text-gray-700">
                {vision_mission.mission_points &&
                  vision_mission.mission_points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckIcon />
                      <span>{point}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
