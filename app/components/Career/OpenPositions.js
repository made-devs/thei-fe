// Filepath: app/components/Career/OpenPositions.js
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const OpenPositions = ({ dictionary }) => {
  if (!dictionary) return null;

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-12">
          <p className="font-semibold tracking-widest uppercase text-yellow-400">
            {dictionary.subtitle}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold mt-2 text-black">
            {dictionary.title}
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            {dictionary.description}
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Kolom Daftar Lowongan */}
          <div className="space-y-4">
            {dictionary.positions.map((pos, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-yellow-400 hover:shadow-md transition-all flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-lg text-black">{pos.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{pos.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} />
                      <span>{pos.type}</span>
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-yellow-500 hover:text-black transition-colors"
                >
                  <ArrowRight size={24} />
                </a>
              </div>
            ))}
          </div>
          {/* Kolom Poster/Gambar */}
          <div className="relative aspect-[3/4] h-[60vh] rounded-lg overflow-hidden">
            <Image
              src="/service/mechanic.webp" // Menggunakan foto mekanik
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
