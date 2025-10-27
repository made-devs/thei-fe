// Filepath: app/components/Contact/CustomerService.js
"use client";
import Image from "next/image";

const CustomerService = ({ dictionary }) => {
  // Ambil data foto dari dictionary
  const imageData = dictionary?.image;

  if (!dictionary) return null;

  return (
    <section className="bg-yellow-300 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
              {dictionary.title}
            </h2>
            <p className="text-gray-800 text-sm sm:text-base">
              {dictionary.description}
            </p>
          </div>

          {/* Tampilkan foto saja, tanpa play button atau video */}
          {imageData ? (
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image
                src={imageData}
                alt={dictionary.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            // Placeholder jika foto tidak ada
            <div className="relative aspect-video rounded-lg bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500 text-sm sm:text-base">
                Image coming soon
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomerService;
