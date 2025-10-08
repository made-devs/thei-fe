import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const EquipmentHero = ({ dictionary }) => {
  // Pengecekan sederhana untuk memastikan breadcrumbs ada
  const breadcrumbs = dictionary.breadcrumbs || [];

  return (
    <section className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center text-white text-center">
      <Image
        src={dictionary.image}
        alt={dictionary.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 p-4 flex flex-col items-center">
        <p className="text-sm sm:text-base font-semibold tracking-widest uppercase text-yellow-400">
          {dictionary.subtitle}
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 sm:mt-4 max-w-4xl">
          {dictionary.title}
        </h1>

        {/* Breadcrumb dinamis dari array */}
        <div className="flex items-center justify-center text-xs sm:text-sm mt-2 sm:mt-4">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.name}>
              <Link
                href={crumb.link}
                className={`hover:underline ${
                  // Membuat item terakhir tidak bisa di-hover dan lebih tebal
                  index === breadcrumbs.length - 1
                    ? "font-semibold pointer-events-none"
                    : ""
                }`}
              >
                {crumb.name}
              </Link>
              {/* Hanya tampilkan chevron jika bukan item terakhir */}
              {index < breadcrumbs.length - 1 && (
                <ChevronRight size={16} className="mx-1" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentHero;
