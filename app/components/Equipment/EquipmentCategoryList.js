import Image from 'next/image';
import Link from 'next/link';

const EquipmentCategoryList = ({ dictionary, lang }) => {
  if (!Array.isArray(dictionary) || dictionary.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1280px] space-y-16">
        {dictionary.map((category, index) => (
          <div
            key={category.title}
            // Menambah gap antar kolom di layar besar
            className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            {/* Image Container */}
            <div
              className={`relative aspect-[4/3] rounded-lg overflow-hidden ${
                index % 2 === 0 ? 'lg:order-last' : ''
              }`}
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Text Container */}
            <div
              // Memberi padding agar teks tidak terlalu mepet ke gambar
              className={`text-center lg:text-left ${
                index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'
              }`}
            >
              <h3 className="text-3xl font-bold text-black">
                {category.title}
              </h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {category.description}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href={`/${lang}${category.cta1_link}` || '#'}
                  className="inline-flex items-center justify-center px-6 py-3 font-semibold text-black bg-yellow-400 rounded-md hover:bg-yellow-500 transition-colors"
                >
                  {category.cta1_text}
                </Link>
                {category.cta2_text && (
                  <Link
                    href={`/${lang}${category.cta2_link}` || '#'}
                    className="inline-flex items-center justify-center px-6 py-3 font-semibold text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    {category.cta2_text}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EquipmentCategoryList;
