import React from 'react';
import { Wrench, ShieldCheck, TrendingUp, Users, Clock } from 'lucide-react';

const advantageIcons = {
  'Biaya Ekonomis': Wrench,
  'Minim Downtime': Clock,
  'Teknisi Bersertifikat': Users,
  'Digital Maintenance System': TrendingUp,
  'Garansi Performa Unit': ShieldCheck,
};

const AdvantageCard = ({ title, desc, icon: Icon }) => (
  <div className="bg-yellow-50 p-6 rounded-lg shadow-md text-center h-full border border-black">
    <div className="flex justify-center mb-4">
      <Icon className="w-8 h-8 text-yellow-400" />
    </div>
    <h4 className="text-lg font-bold text-black mb-2">{title}</h4>
    <p className="text-gray-700 text-sm">{desc}</p>
  </div>
);

const AdvantagesSection = ({ dictionary }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-black text-center mb-12">
          {dictionary.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {dictionary.items.map((item) => (
            <AdvantageCard
              key={item.title}
              title={item.title}
              desc={item.desc}
              icon={advantageIcons[item.title] || Wrench}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
