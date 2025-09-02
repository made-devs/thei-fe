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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* IoT Demo */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">
              {dictionary.iot_demo.title}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {dictionary.iot_demo.description}
            </p>
            <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer max-w-lg mx-auto">
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <PlayCircle
                  size={60}
                  className="text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all"
                />
              </div>
              <Image
                src="/equipment/rental/iot-demo.webp"
                alt="IoT GPS Tracking Demo"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Pricing Table */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              {dictionary.pricing_table.title}
            </h3>
            <div className="relative aspect-square rounded-lg overflow-hidden border">
              <Image
                src={dictionary.pricing_table.image}
                alt="Tabel Harga Rental"
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechAndPricing;
