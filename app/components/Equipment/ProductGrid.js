import Image from 'next/image';
import Link from 'next/link';

const ProductGrid = ({ dictionary }) => {
  if (!Array.isArray(dictionary)) {
    return null;
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="flex flex-wrap justify-center gap-8">
          {dictionary.map((product) => (
            <Link
              href={product.link} // Menggunakan product.link
              key={product.name}
              className="group block border border-gray-200 rounded-lg hover:shadow-xl hover:border-yellow-400 transition-all duration-300 w-full basis-full sm:basis-[calc(50%-1rem)] md:basis-[calc(33.333%-1.34rem)] lg:basis-[calc(25%-1.5rem)]"
            >
              <div className="relative aspect-square w-full rounded-t-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105 p-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
