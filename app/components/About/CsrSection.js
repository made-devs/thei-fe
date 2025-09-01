import { Check, PlayCircle } from 'lucide-react';
import Image from 'next/image';

const CsrSection = ({ dictionary }) => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black">{dictionary.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <ul className="space-y-4">
              {dictionary.activities.map((activity, index) => (
                <li key={index} className="flex items-start">
                  <Check
                    size={24}
                    className="text-green-500 mr-4 flex-shrink-0 mt-1"
                  />
                  <span className="text-lg text-gray-700">{activity}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/commitment.webp" // Ganti dengan path gambar yang sesuai
                alt="CSR Activity"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black group cursor-pointer">
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <PlayCircle
                  size={60}
                  className="text-white opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CsrSection;
