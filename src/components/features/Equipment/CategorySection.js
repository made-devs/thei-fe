import Image from 'next/image';
import Link from 'next/link';

const CategorySection = ({ dictionary, isReversed = false }) => {
  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-6 lg:px-[5rem] max-w-[1440px]">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Kolom Gambar */}
          <div
            className={`relative aspect-video rounded-lg overflow-hidden ${
              isReversed ? 'md:order-last' : ''
            }`}
          >
            <Image
              src={dictionary.image}
              alt={dictionary.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Kolom Teks */}
          <div>
            <h3 className="text-2xl font-bold text-black">
              {dictionary.title}
            </h3>
            <p className="mt-4 text-gray-600">{dictionary.description}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href={dictionary.cta1_link}>
                <span className="inline-block bg-yellow-400 text-black px-6 py-3 text-sm font-bold tracking-wide uppercase hover:bg-yellow-500 transition-colors rounded-md">
                  {dictionary.cta1_text}
                </span>
              </Link>
              {dictionary.cta2_text && (
                <Link href={dictionary.cta2_link}>
                  <span className="inline-block bg-transparent border border-black text-black px-6 py-3 text-sm font-bold tracking-wide uppercase hover:bg-gray-100 transition-colors rounded-md">
                    {dictionary.cta2_text}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
        <hr className="mt-10 border-gray-200" />
      </div>
    </section>
  );
};

export default CategorySection;
