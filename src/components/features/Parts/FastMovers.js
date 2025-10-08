import Image from 'next/image';

const FastMovers = ({ dictionary }) => {
  if (!dictionary) return null;

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1024px] text-center">
        <h2 className="text-3xl font-bold text-black">{dictionary.title}</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          {dictionary.description}
        </p>
        <div className="mt-8 relative aspect-video w-full mx-auto rounded-lg overflow-hidden border">
          <Image
            src={dictionary.image || '/parts/fast-movers-table.webp'}
            alt={dictionary.title || 'Fast moving parts'}
            fill
            className="object-contain p-4"
          />
        </div>
      </div>
    </section>
  );
};

export default FastMovers;
