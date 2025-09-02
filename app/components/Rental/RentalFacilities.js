import Image from 'next/image';
import {
  Truck,
  Clock3,
  Wrench,
  Repeat,
  MapPin,
  HardHat,
  Users,
} from 'lucide-react';

const iconMap = {
  Truck: <Truck size={24} className="text-yellow-400" />,
  Clock3: <Clock3 size={24} className="text-yellow-400" />,
  Wrench: <Wrench size={24} className="text-yellow-400" />,
  Repeat: <Repeat size={24} className="text-yellow-400" />,
  MapPin: <MapPin size={24} className="text-yellow-400" />,
  HardHat: <HardHat size={24} className="text-yellow-400" />,
  Users: <Users size={24} className="text-yellow-400" />,
};

const RentalFacilities = ({ dictionary }) => {
  if (!dictionary || !dictionary.items) return null;

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1280px]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-black mb-8">
              {dictionary.title}
            </h2>
            <div className="space-y-6">
              {dictionary.items.map((facility) => (
                <div key={facility.name} className="flex items-start">
                  <div className="flex-shrink-0 bg-gray-200 rounded-full p-3">
                    {iconMap[facility.icon]}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{facility.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[3/4] h-[60vh] rounded-lg overflow-hidden">
            <Image
              src={dictionary.image}
              alt="Operator Training"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalFacilities;
