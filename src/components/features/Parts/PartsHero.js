import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const PartsHero = ({ dictionary }) => {
  if (!dictionary) return null;

  return (
    <section className="relative h-[60vh] flex items-center justify-center text-white text-center">
      <Image
        src={dictionary.image || "/parts/banner.webp"}
        alt={dictionary.title || "Parts"}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 p-4 flex flex-col items-center">
        <p className="font-semibold tracking-widest uppercase text-yellow-400 text-sm sm:text-base">
          {dictionary.subtitle}
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 max-w-4xl">
          {dictionary.title}
        </h1>
        <div className="flex items-center justify-center text-xs sm:text-sm mt-4">
          {dictionary.breadcrumbs?.map((crumb, index) => (
            <div key={crumb.name} className="flex items-center">
              {index > 0 && <ChevronRight size={16} className="mx-1" />}
              {index === dictionary.breadcrumbs.length - 1 ? (
                <span className="font-semibold">{crumb.name}</span>
              ) : (
                <Link href={crumb.link} className="hover:underline">
                  {crumb.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartsHero;
