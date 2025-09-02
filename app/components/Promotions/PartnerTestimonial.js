import { PlayCircle } from 'lucide-react';

const PartnerTestimonial = ({ dictionary }) => {
  if (!dictionary) return null;

  return (
    <section className="bg-gray-800 text-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <PlayCircle
                size={80}
                className="text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all"
              />
            </div>
            {/* Ganti dengan gambar thumbnail video */}
            <img
              src="https://placehold.co/1600x900/1a1a1a/333333?text=Video+Thumbnail"
              alt="Testimonial Video Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-4">{dictionary.title}</h2>
            <blockquote className="border-l-4 border-yellow-400 pl-6 italic text-lg text-gray-300">
              <p>&quot;{dictionary.quote}&quot;</p>
            </blockquote>
            <div className="mt-6">
              <p className="font-bold">{dictionary.name}</p>
              <p className="text-sm text-gray-400">{dictionary.company}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerTestimonial;
