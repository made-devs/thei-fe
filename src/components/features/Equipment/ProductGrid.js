import Image from 'next/image';
import Link from 'next/link';

const ProductGrid = ({ dictionary }) => {
  if (!Array.isArray(dictionary) || dictionary.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* REVISI: Dibuat jadi 1 kolom di mobile, dan 2 kolom di layar lebih besar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {dictionary.map((product) => (
            <Link
              href={product.link}
              key={product.name}
              className="group block border border-gray-200 rounded-lg hover:shadow-xl hover:border-yellow-400 transition-all duration-300"
            >
              <div className="relative aspect-square w-full rounded-t-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105 p-4"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  unoptimized // Ditambahkan untuk placeholder SVG
                />
              </div>
              <div className="p-4 text-center border-t border-gray-100">
                <h3 className="font-bold text-black group-hover:text-yellow-500 transition-colors">
                  {product.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
