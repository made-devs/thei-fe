import { Phone, Search, FileText, Truck } from 'lucide-react';

const icons = [
  <Phone size={32} key="1" />,
  <Search size={32} key="2" />,
  <FileText size={32} key="3" />,
  <Truck size={32} key="4" />,
];

const HowItWorks = ({ dictionary }) => {
  if (!dictionary || !dictionary.steps) return null;

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black">{dictionary.title}</h2>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 hidden md:block"></div>
          {dictionary.steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center p-6 bg-white rounded-lg shadow-md"
            >
              <div className="relative mb-4 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-yellow-400 text-black flex items-center justify-center text-2xl font-bold z-10">
                  {icons[index]}
                </div>
              </div>
              <h3 className="font-bold text-xl mt-4">{step.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
