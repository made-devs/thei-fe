// Filepath: app/components/Promotions/CollaborationBenefits.js
import Image from 'next/image';
import {
  CreditCard,
  Wrench,
  Repeat,
  CalendarClock,
  Phone,
  Gift,
  Users,
  ShieldCheck,
  Briefcase,
  Truck,
} from 'lucide-react';

const iconMap = {
  CreditCard: (
    <CreditCard size={20} className="text-yellow-500 sm:w-6 sm:h-6" />
  ),
  Wrench: <Wrench size={20} className="text-yellow-500 sm:w-6 sm:h-6" />,
  Repeat: <Repeat size={20} className="text-yellow-500 sm:w-6 sm:h-6" />,
  CalendarClock: (
    <CalendarClock size={20} className="text-yellow-500 sm:w-6 sm:h-6" />
  ),
  Phone: <Phone size={20} className="text-yellow-500 sm:w-6 sm:h-6" />,
  Gift: <Gift size={20} className="text-yellow-500 sm:w-6 sm:h-6" />,
  Users: <Users size={20} className="text-yellow-500 sm:w-6 sm:h-6" />,
  ShieldCheck: (
    <ShieldCheck size={20} className="text-yellow-500 sm:w-6 sm:h-6" />
  ),
  Briefcase: <Briefcase size={20} className="text-yellow-500 sm:w-6 sm:h-6" />,
  Truck: <Truck size={20} className="text-yellow-500 sm:w-6 sm:h-6" />,
};

const CollaborationBenefits = ({ dictionary }) => {
  if (!dictionary) return null;

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
              {dictionary.title}
            </h2>
            {/* Menambahkan deskripsi di sini */}
            <p className="text-gray-600 mt-3 sm:mt-4 mb-6 sm:mb-8 text-sm sm:text-base">
              {dictionary.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-6">
              {(dictionary.benefits || []).map((benefit) => (
                <div
                  key={benefit.name}
                  className="flex items-center gap-3 sm:gap-4"
                >
                  <div className="flex-shrink-0 bg-gray-100 p-2 sm:p-3 rounded-full">
                    {iconMap[benefit.icon]}
                  </div>
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">
                    {benefit.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative w-full h-[40vh] sm:h-[50vh] rounded-lg overflow-hidden">
            <Image
              src="/banner-slider2.webp" // Ganti dengan path gambar yang sesuai
              alt="Customer receiving gift pack"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationBenefits;
