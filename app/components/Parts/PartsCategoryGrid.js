import Image from 'next/image';
import Link from 'next/link';

const PartsCategoryGrid = ({ dictionary }) => {
  if (!dictionary || !dictionary.categories) return null;

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1280px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black">{dictionary.title}</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            {dictionary.description}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {dictionary.categories.map((category) => (
            <Link
              href={category.link}
              key={category.name}
              className="group block border border-gray-200 rounded-lg hover:shadow-xl hover:border-yellow-400 transition-all duration-300"
            >
              <div className="relative aspect-square w-full rounded-t-lg overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105 p-4"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 text-center border-t border-gray-100">
                <h3 className="font-bold text-black group-hover:text-yellow-500 transition-colors text-sm">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartsCategoryGrid;
