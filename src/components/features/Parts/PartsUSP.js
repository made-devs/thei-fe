'use client';

import {
  Truck,
  Tag,
  Shield,
  Droplet,
  CreditCard,
  Users,
  TrendingUp,
  GraduationCap,
  Shirt,
  Megaphone,
} from 'lucide-react';

const PartsUSP = ({ dictionary }) => {
  if (!dictionary) return null;

  const iconMap = {
    truck: Truck,
    tag: Tag,
    shield: Shield,
    droplet: Droplet,
    card: CreditCard,
    users: Users,
    trending: TrendingUp,
    graduation: GraduationCap,
    shirt: Shirt,
    megaphone: Megaphone,
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            {dictionary.title}{' '}
            <span className="text-yellow-400">
              {dictionary.title_highlight}
            </span>
          </h2>
          <p className="text-gray-600 text-base lg:text-lg max-w-3xl mx-auto">
            {dictionary.description}
          </p>
        </div>

        {/* USP Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dictionary.benefits?.map((benefit, idx) => {
            const IconComponent = iconMap[benefit.icon] || Tag;

            return (
              <div
                key={idx}
                className="group bg-yellow-400 rounded-2xl p-6 shadow-lg transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-3 cursor-pointer border-2 border-yellow-500/50"
              >
                {/* Icon + Title Container */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 bg-black rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={32} className="text-yellow-400" />
                  </div>
                  <h3 className="text-black font-bold text-lg leading-snug group-hover:text-gray-800 transition-colors">
                    {benefit.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-black text-sm leading-relaxed mb-4 pl-2">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Bottom (Optional) */}
        {dictionary.cta_text && (
          <div className="text-center mt-16">
            <a
              href={dictionary.cta_link || '/contact'}
              className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-yellow-400 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg border-2 border-yellow-400"
            >
              {dictionary.cta_text}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default PartsUSP;
