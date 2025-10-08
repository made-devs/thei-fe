import Link from 'next/link';
import Image from 'next/image';

const FieldServiceHighlight = ({ dictionary }) => {
  if (!dictionary) return null;

  return (
    <section className="relative py-24 text-white text-center">
      <Image
        src="/service/field-service-bg.webp"
        alt={dictionary.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-3xl">
        <h2 className="text-4xl font-bold">{dictionary.title}</h2>
        <p className="mt-4 text-lg text-gray-200">{dictionary.description}</p>
        <Link
          href="#"
          className="mt-8 inline-block bg-yellow-400 text-black px-8 py-3 text-sm font-bold tracking-wide uppercase hover:bg-yellow-500 transition-colors rounded-md"
        >
          {dictionary.cta}
        </Link>
      </div>
    </section>
  );
};

export default FieldServiceHighlight;
