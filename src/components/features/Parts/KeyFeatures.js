import { MessageSquare, Truck, ShieldCheck, Tag } from "lucide-react";

const iconMap = {
  MessageSquare: <MessageSquare size={32} className="text-yellow-400" />,
  Truck: <Truck size={32} className="text-yellow-400" />,
  ShieldCheck: <ShieldCheck size={32} className="text-yellow-400" />,
  Tag: <Tag size={32} className="text-yellow-400" />,
};

const KeyFeatures = ({ dictionary }) => {
  if (!dictionary || !dictionary.features) return null;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            {dictionary.title}
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {dictionary.features.map((feature) => (
            <div
              key={feature.name}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] py-12 px-8 bg-gray-50 rounded-lg text-center"
            >
              <div className="flex justify-center mb-4">
                {iconMap[feature.icon] || (
                  <ShieldCheck size={32} className="text-yellow-400" />
                )}
              </div>
              <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-black">
                {feature.name}
              </h3>
              <p className="mt-2 text-gray-600 text-sm sm:text-base lg:text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
