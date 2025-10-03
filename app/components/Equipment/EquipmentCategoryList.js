"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react"; // Import ikon

const EquipmentCategoryList = ({ dictionary, lang }) => {
  if (!Array.isArray(dictionary) || dictionary.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Menggunakan grid untuk layout yang lebih rapi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dictionary.map((category, idx) => (
            <div
              key={category.title}
              className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Kontainer untuk gambar dan judul */}
              <div className="relative">
                <div className="aspect-[4/3] w-full relative">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={idx < 3} // Prioritaskan gambar di baris pertama
                  />
                </div>
                {/* Overlay gradien untuk keterbacaan teks */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-xl"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    {category.title}
                  </h3>
                </div>
              </div>

              {/* Kontainer untuk tombol CTA */}
              <div className="p-6 mt-auto">
                <Link
                  href={`/${lang}${category.cta1_link}` || "#"}
                  className="w-full inline-flex items-center justify-center px-4 py-3 font-bold text-black bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors duration-300"
                >
                  <span>{category.cta1_text}</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentCategoryList;
