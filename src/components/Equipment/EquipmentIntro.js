// Filepath: app/components/Equipment/EquipmentIntro.js
import { Cog } from "lucide-react";

const EquipmentIntro = ({ dictionary }) => {
  // Guard clause to ensure dictionary and its properties exist
  if (!dictionary) {
    return null;
  }

  return (
    <section className="bg-white pt-12 pb-6 lg:py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px] text-center">
        {/* Subtitle and Cog Icon */}
        {dictionary.subtitle && (
          <div className="flex items-center justify-center text-sm font-bold uppercase text-yellow-400 mb-2">
            <Cog
              size={20}
              className="mr-2 animate-spin"
              style={{ animationDuration: "5s" }}
            />
            <span>{dictionary.subtitle}</span>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black max-w-4xl mx-auto">
          {dictionary.title}
        </h2>
        <p className="mt-2 sm:mt-4 lg:mt-6 text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {dictionary.description}
        </p>
      </div>
    </section>
  );
};

export default EquipmentIntro;
