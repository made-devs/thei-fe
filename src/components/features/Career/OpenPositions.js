// Filepath: app/components/Career/OpenPositions.js
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const OpenPositions = ({ dictionary }) => {
  if (!dictionary) return null;

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-8 sm:mb-12">
          <p className="font-semibold tracking-widest uppercase text-yellow-400 text-xs sm:text-sm">
            {dictionary.subtitle}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mt-2 text-black">
            {dictionary.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            {dictionary.description}
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Kolom Daftar Lowongan */}
          <div className="space-y-4">
            {dictionary.positions.map((pos, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 hover:border-yellow-400 hover:shadow-md transition-all flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-black">
                    {pos.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-500 mt-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="sm:w-4 sm:h-4" />
                      <span>{pos.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} className="sm:w-4 sm:h-4" />
                      <span>{pos.type}</span>
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-yellow-500 hover:text-black transition-colors"
                >
                  <ArrowRight size={20} className="sm:w-6 sm:h-6" />
                </a>
              </div>
            ))}
          </div>
          {/* Kolom Poster/Gambar */}
          <div className="relative h-[50vh] sm:h-[60vh] rounded-lg overflow-hidden">
            <Image
              src={dictionary.image}
              alt="Lowongan Kerja THEI"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenPositions;
