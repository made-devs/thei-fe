// app/components/Home/NewsTicker.js
'use client';

import React from 'react';
import Marquee from 'react-fast-marquee';
import { Megaphone, Cog } from 'lucide-react';

// Terima 'dictionary' sebagai prop
const NewsTicker = ({ dictionary }) => {
  // Ambil data dari dictionary, sediakan array kosong jika tidak ada
  const newsItems = dictionary.items || [];

  return (
    <div className="bg-black text-white flex items-center h-12 overflow-hidden">
      <div className="bg-yellow-400 h-full flex items-center px-4 z-10">
        <Megaphone size={20} className="text-black" />
      </div>

      <div className="flex-1 overflow-hidden">
        <Marquee
          pauseOnHover={true}
          speed={50}
          gradient={true}
          gradientColor="#000"
          gradientWidth={50}
        >
          {newsItems.map((news, index) => (
            <div key={index} className="flex items-center">
              <span className="mx-8 text-sm font-medium whitespace-nowrap">
                {news}
              </span>
              <Cog
                size={16}
                className="text-yellow-400 animate-spin flex-shrink-0"
                style={{ animationDuration: '5s' }}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default NewsTicker;
