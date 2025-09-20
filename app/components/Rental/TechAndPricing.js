'use client';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';

const TechAndPricing = ({ dictionary }) => {
  if (!dictionary) return null;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1280px]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black">{dictionary.title}</h2>
        </div>

        {/* Mengubah menjadi flex-col untuk layout vertikal */}
        <div className="flex flex-col items-center gap-16 lg:gap-20">
          {/* IoT Demo Section */}
          <div className="text-center w-full max-w-4xl">
            <h3 className="text-2xl lg:text-3xl font-bold mb-2">
              {dictionary.iot_demo.title}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {dictionary.iot_demo.description}
            </p>
            <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer shadow-lg">
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <PlayCircle
                  size={60}
                  className="text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all"
                />
              </div>
              <Image
                // Menggunakan placeholder untuk video demo
                src="https://placehold.co/1600x900/1a1a1a/ffc700?text=IoT+Demo"
                alt="IoT GPS Tracking Demo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
                unoptimized
              />
            </div>
          </div>

          {/* Pricing Table Section */}
          <div className="text-center w-full max-w-4xl">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              {dictionary.pricing_table.title}
            </h3>
            <div className="relative aspect-square rounded-lg overflow-hidden border shadow-lg">
              <Image
                // Menggunakan placeholder untuk tabel harga
                src={
                  'https://placehold.co/1000x1000/1a1a1a/ffc700?text=Pricing+Table'
                }
                alt="Tabel Harga Rental"
                fill
                className="object-contain p-4 bg-gray-50"
                sizes="(max-width: 1024px) 100vw, 896px"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechAndPricing;
