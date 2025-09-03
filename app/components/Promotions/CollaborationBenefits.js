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
  CreditCard: <CreditCard size={24} className="text-yellow-500" />,
  Wrench: <Wrench size={24} className="text-yellow-500" />,
  Repeat: <Repeat size={24} className="text-yellow-500" />,
  CalendarClock: <CalendarClock size={24} className="text-yellow-500" />,
  Phone: <Phone size={24} className="text-yellow-500" />,
  Gift: <Gift size={24} className="text-yellow-500" />,
  Users: <Users size={24} className="text-yellow-500" />,
  ShieldCheck: <ShieldCheck size={24} className="text-yellow-500" />,
  Briefcase: <Briefcase size={24} className="text-yellow-500" />,
  Truck: <Truck size={24} className="text-yellow-500" />,
};

const CollaborationBenefits = ({ dictionary }) => {
  if (!dictionary) return null;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-black">
              {dictionary.title}
            </h2>
            {/* Menambahkan deskripsi di sini */}
            <p className="text-gray-600 mt-4 mb-8">{dictionary.description}</p>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
              {(dictionary.benefits || []).map((benefit) => (
                <div key={benefit.name} className="flex items-center gap-4">
                  <div className="flex-shrink-0 bg-gray-100 p-3 rounded-full">
                    {iconMap[benefit.icon]}
                  </div>
                  <span className="font-semibold text-gray-800">
                    {benefit.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative w-full h-[50vh] rounded-lg overflow-hidden">
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
