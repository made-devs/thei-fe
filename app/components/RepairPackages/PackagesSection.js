import Image from 'next/image';
import { Gift } from 'lucide-react';

const PackagesSection = ({ dictionary }) => {
  if (!dictionary || !dictionary.items) return null;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1280px]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black">{dictionary.title}</h2>
        </div>
        <div className="space-y-16">
          {dictionary.items.map((item, index) => (
            <div
              key={item.name}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div
                className={`relative aspect-video h-[40vh] rounded-lg overflow-hidden ${
                  index % 2 === 0 ? 'lg:order-last' : ''
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-black">{item.name}</h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {item.details}
                </p>
                <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Gift className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-yellow-800">
                        Bonus: {item.bonus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
