import Image from 'next/image';
import { PlayCircle, Quote } from 'lucide-react';

const ProofSection = ({ dictionary }) => {
  // Guard clause untuk memastikan dictionary ada
  if (!dictionary) {
    return null;
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-bold mb-2">
              {dictionary.video_title}
            </h3>
            <p className="text-gray-600 mb-6">{dictionary.video_description}</p>
            <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer shadow-lg">
              <Image
                src="/trade-in/appraisal-video-thumb.webp"
                alt="Appraisal Process"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <PlayCircle
                  size={80}
                  className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <Quote size={40} className="text-yellow-400 mb-4" />
            <blockquote className="italic text-lg text-gray-800">
              {/* FIX: Menggunakan &quot; untuk escape karakter kutip */}
              &quot;{dictionary.testimonial_quote}&quot;
            </blockquote>
            <div className="mt-6">
              <p className="font-bold text-black">
                {dictionary.testimonial_name}
              </p>
              <p className="text-sm text-gray-500">
                {dictionary.testimonial_company}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
