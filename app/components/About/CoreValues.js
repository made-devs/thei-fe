import {
  ShieldCheck,
  Briefcase,
  HeartHandshake,
  Lightbulb,
  Cog,
} from 'lucide-react';

const iconMap = {
  Integrity: <ShieldCheck size={40} className="text-yellow-400" />,
  Integritas: <ShieldCheck size={40} className="text-yellow-400" />,
  Professionalism: <Briefcase size={40} className="text-yellow-400" />,
  Profesionalisme: <Briefcase size={40} className="text-yellow-400" />,
  Safety: <HeartHandshake size={40} className="text-yellow-400" />,
  Keselamatan: <HeartHandshake size={40} className="text-yellow-400" />,
  Innovation: <Lightbulb size={40} className="text-yellow-400" />,
  Inovasi: <Lightbulb size={40} className="text-yellow-400" />,
};

const CoreValues = ({ dictionary }) => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px] text-center">
        <div className="flex items-center justify-center text-sm font-bold uppercase text-yellow-400 mb-2">
          <Cog
            size={20}
            className="mr-2 animate-spin"
            style={{ animationDuration: '5s' }}
          />
          <span>{dictionary.subtitle}</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-black">
          {dictionary.title}
        </h2>
        {/* Tambahkan paragraf deskripsi di sini */}
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          {dictionary.description}
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dictionary.values.map((value) => (
            <div
              key={value.name}
              className="p-8 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">
                {iconMap[value.name]}
              </div>
              <h3 className="font-bold text-xl">{value.name}</h3>
              <p className="mt-2 text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
