import Image from 'next/image';
import Link from 'next/link';

const RentalCategoryGrid = ({ dictionary }) => {
  if (!dictionary || !dictionary.items) return null;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black">{dictionary.title}</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {dictionary.items.map((category) => (
            <Link
              href={category.link}
              key={category.name}
              className="group block border border-gray-200 rounded-lg hover:shadow-xl hover:border-yellow-400 transition-all duration-300 w-full basis-full sm:basis-[calc(50%-1rem)] md:basis-[calc(33.333%-1.34rem)] lg:basis-[calc(25%-1.5rem)]"
            >
              <div className="relative aspect-square w-full rounded-t-lg overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105 p-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4 text-center border-t border-gray-100">
                <h3 className="font-bold text-black group-hover:text-yellow-500 transition-colors">
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

export default RentalCategoryGrid;
