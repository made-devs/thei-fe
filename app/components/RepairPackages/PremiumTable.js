import { CheckCircle } from 'lucide-react';

const PremiumTable = ({ dictionary }) => {
  if (!dictionary || !dictionary.tiers) return null;

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1280px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black">{dictionary.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dictionary.tiers.map((tier) => (
            <div
              key={tier.name}
              className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col text-center"
            >
              <h3 className="text-2xl font-bold mb-6">{tier.name}</h3>
              <ul className="space-y-4 text-left flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-black transition-colors">
                Pilih Paket {tier.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumTable;
