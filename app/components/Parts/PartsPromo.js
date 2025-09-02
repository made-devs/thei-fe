import { PlayCircle } from 'lucide-react';

const PartsPromo = ({ dictionary }) => {
  if (!dictionary) return null;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1024px] text-center">
        <h2 className="text-3xl font-bold text-black">{dictionary.title}</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          {dictionary.description}
        </p>
        <div className="mt-8 relative aspect-video w-full mx-auto rounded-lg overflow-hidden bg-gray-800 group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle
              size={80}
              className="text-white opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartsPromo;
