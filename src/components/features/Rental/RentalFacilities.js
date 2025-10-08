// Filepath: app/components/Rental/RentalFacilities.js
import Image from "next/image";
import {
  Truck,
  Clock3,
  Wrench,
  Repeat,
  MapPin,
  HardHat,
  Users,
} from "lucide-react";

const iconMap = {
  Truck: (
    <Truck
      size={20}
      smSize={24}
      className="text-yellow-400 sm:w-6 sm:h-6 w-5 h-5"
    />
  ),
  Clock3: (
    <Clock3
      size={20}
      smSize={24}
      className="text-yellow-400 sm:w-6 sm:h-6 w-5 h-5"
    />
  ),
  Wrench: (
    <Wrench
      size={20}
      smSize={24}
      className="text-yellow-400 sm:w-6 sm:h-6 w-5 h-5"
    />
  ),
  Repeat: (
    <Repeat
      size={20}
      smSize={24}
      className="text-yellow-400 sm:w-6 sm:h-6 w-5 h-5"
    />
  ),
  MapPin: (
    <MapPin
      size={20}
      smSize={24}
      className="text-yellow-400 sm:w-6 sm:h-6 w-5 h-5"
    />
  ),
  HardHat: (
    <HardHat
      size={20}
      smSize={24}
      className="text-yellow-400 sm:w-6 sm:h-6 w-5 h-5"
    />
  ),
  Users: (
    <Users
      size={20}
      smSize={24}
      className="text-yellow-400 sm:w-6 sm:h-6 w-5 h-5"
    />
  ),
};

const RentalFacilities = ({ dictionary }) => {
  if (!dictionary || !dictionary.items) return null;

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1280px]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8">
              {dictionary.title}
            </h2>
            {/* Change from vertical stack to a 2-column grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {dictionary.items.map((facility) => (
                <div key={facility.name} className="flex items-center">
                  <div className="flex-shrink-0 bg-gray-200 rounded-full p-2 sm:p-3">
                    {iconMap[facility.icon]}
                  </div>
                  <div className="ml-3 sm:ml-4 flex items-center">
                    <h3 className="font-semibold text-sm sm:text-lg">
                      {facility.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-4/3 rounded-lg overflow-hidden">
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
