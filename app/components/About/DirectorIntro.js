'use client';
import { PlayCircle, Cog } from 'lucide-react';

const DirectorIntro = ({ dictionary }) => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px] text-center">
        {/* Subtitle dan Title Baru */}
        <div className="flex items-center justify-center text-sm font-bold uppercase text-yellow-400 mb-2">
          <Cog
            size={20}
            className="mr-2 animate-spin"
            style={{ animationDuration: '5s' }}
          />
          <span>{dictionary.subtitle}</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-black max-w-4xl mx-auto">
          {dictionary.title}
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          &quot;{dictionary.quote}&quot;
        </p>

        {/* Video Player */}
        <div className="mt-12">
          <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden bg-black group cursor-pointer">
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <PlayCircle
                size={80}
                className="text-white opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorIntro;
