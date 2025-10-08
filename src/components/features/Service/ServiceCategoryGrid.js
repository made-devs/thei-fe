import {
  ShieldCheck,
  Wrench,
  Droplets,
  Cpu,
  Layers,
  Sparkles,
  Snowflake,
  Truck,
  FileText,
  ClipboardCheck,
  Fuel,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// Mapping nama ikon ke komponen ikonnya
const iconMap = {
  ShieldCheck: <ShieldCheck size={32} className="text-yellow-400" />,
  Wrench: <Wrench size={32} className="text-yellow-400" />,
  Droplets: <Droplets size={32} className="text-yellow-400" />,
  Cpu: <Cpu size={32} className="text-yellow-400" />,
  Layers: <Layers size={32} className="text-yellow-400" />,
  Sparkles: <Sparkles size={32} className="text-yellow-400" />,
  Snowflake: <Snowflake size={32} className="text-yellow-400" />,
  Truck: <Truck size={32} className="text-yellow-400" />,
  FileText: <FileText size={32} className="text-yellow-400" />,
  ClipboardCheck: <ClipboardCheck size={32} className="text-yellow-400" />,
  Fuel: <Fuel size={32} className="text-yellow-400" />,
};

const ServiceCategoryGrid = ({ dictionary }) => {
  if (!dictionary || !dictionary.services) return null;

  return (
    <section className="bg-gray-50 py-12 sm:py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            {dictionary.title}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dictionary.services.map((service) => (
            <Link
              href="#"
              key={service.id}
              className="group bg-white p-4 sm:p-8 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col text-left"
            >
              {iconMap[service.icon]}
              <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-black mt-2 sm:mt-4">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg mt-1 sm:mt-2 flex-grow">
                {service.description}
              </p>
              <div className="mt-4 sm:mt-6 font-semibold text-yellow-500 flex items-center group-hover:text-black transition-colors">
                <span>Learn More</span>
                <ArrowRight
                  size={16}
                  className="ml-2 transform group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategoryGrid;
