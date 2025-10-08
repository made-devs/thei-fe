import Image from "next/image";
import { Cog, CheckCircle } from "lucide-react";

const HsseCommitment = ({ dictionary }) => {
  return (
    // Ganti bg section menjadi putih agar card kuning terlihat menonjol
    <section className="bg-gray-50 py-12 lg:py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Tambahkan div ini sebagai card kuning yang rounded */}
        <div className="bg-yellow-300 text-black rounded-2xl p-12 lg:p-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center text-sm font-bold uppercase text-black mb-2">
                <Cog
                  size={20}
                  className="mr-2 animate-spin"
                  style={{ animationDuration: "5s" }}
                />
                <span>{dictionary.subtitle}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                {dictionary.title}
              </h2>
              <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-800">
                {dictionary.description}
              </p>

              {/* Checklist Points */}
              <ul className="mt-4 lg:mt-6 space-y-2 lg:space-y-3">
                {dictionary.points.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-green-600 mr-3 flex-shrink-0 mt-1"
                    />
                    <span className="text-sm sm:text-base lg:text-lg text-gray-900">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/about-us/about1.webp"
                alt="HSSE Commitment"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HsseCommitment;
