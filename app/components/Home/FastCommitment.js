// /app/components/Home/FastCommitment.js
import React from 'react';
import Image from 'next/image';
import {
  Clock,
  Box,
  Wrench,
  Calendar,
  Smartphone,
  ThumbsUp,
} from 'lucide-react';

const icons = [Clock, Box, Wrench, Calendar, Smartphone, ThumbsUp];

const FastCommitment = ({ dictionary }) => {
  return (
    <section className="bg-gray-100 w-full">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px] py-12">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10">
          {/* Logo Komitmen */}
          <div className="flex-shrink-0">
            <Image
              src="/commit1.webp"
              alt="Komitmen Cepat & Pasti Trakindo"
              width={300}
              height={150}
              className="w-auto h-auto"
            />
          </div>

          {/* Daftar Komitmen */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 text-center">
            {dictionary.items.map((item, index) => {
              const Icon = icons[index];
              return (
                <div key={index} className="flex flex-col items-center">
                  <Icon
                    size={48}
                    className="text-gray-700 mb-4"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FastCommitment;
