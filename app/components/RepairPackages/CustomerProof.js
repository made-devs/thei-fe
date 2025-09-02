import Image from 'next/image';
import { PlayCircle } from 'lucide-react';

const CustomerProof = ({ dictionary }) => {
  if (!dictionary) return null;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-4">{dictionary.title}</h2>
            <blockquote className="border-l-4 border-yellow-400 pl-6 italic text-lg text-gray-700">
              <p>&quot;{dictionary.quote}&quot;</p>
            </blockquote>
            <div className="mt-6">
              <p className="font-bold">{dictionary.name}</p>
              <p className="text-sm text-gray-500">{dictionary.company}</p>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
              <PlayCircle
                size={80}
                className="text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all"
              />
            </div>
            <Image
              src="/promotions/testimonial-video.webp" // Ganti dengan thumbnail video
              alt="Video Testimonial"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerProof;
