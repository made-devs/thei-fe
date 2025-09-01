import {
  ShieldCheck,
  Briefcase,
  HeartHandshake,
  Lightbulb,
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
        <h2 className="text-3xl font-bold text-black">{dictionary.title}</h2>
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
