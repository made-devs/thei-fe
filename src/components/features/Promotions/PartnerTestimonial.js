// Filepath: app/components/Promotions/PartnerTestimonial.js
import { PlayCircle } from 'lucide-react';
import Image from 'next/image';

const PartnerTestimonial = ({ dictionary }) => {
  if (!dictionary) return null;

  return (
    // Latar belakang section dibuat transparan
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        {/* Kontainer baru ini yang menjadi kartu kuning dengan sudut tumpul */}
        <div className="bg-yellow-300 text-black rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <PlayCircle
                  size={60}
                  className="text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all sm:w-20 sm:h-20"
                />
              </div>
              <Image
                src="/promotions/testimonial-video.webp"
                alt="Testimonial Video Thumbnail"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                {dictionary.title}
              </h2>
              {/* Mengganti warna border dan teks quote */}
              <blockquote className="border-l-4 border-black pl-4 sm:pl-6 italic text-base sm:text-lg text-gray-800">
                <p>&quot;{dictionary.quote}&quot;</p>
              </blockquote>
              <div className="mt-4 sm:mt-6">
                <p className="font-bold text-sm sm:text-base">
                  {dictionary.name}
                </p>
                {/* Mengganti warna teks perusahaan */}
                <p className="text-xs sm:text-sm text-gray-700">
                  {dictionary.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerTestimonial;
