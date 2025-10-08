import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const AboutHero = ({ dictionary }) => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center text-white text-center">
      {/* Gambar Latar */}
      <Image
        src="/career.webp" // Ganti dengan gambar yang lebih relevan untuk "About Us"
        alt={dictionary.title}
        fill
        className="object-cover"
        priority
      />
      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Konten */}
      <div className="relative z-10 p-4 flex flex-col items-center">
        {/* Subtitle */}
        <p className="font-semibold tracking-widest uppercase text-yellow-400">
          {dictionary.subtitle}
        </p>

        {/* Title */}
        <h1 className="text-5xl lg:text-6xl font-bold mt-2 max-w-4xl">
          {dictionary.title}
        </h1>

        {/* Breadcrumb di bawah title */}
        <div className="flex items-center justify-center text-sm mt-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <ChevronRight size={16} className="mx-1" />
          <span className="font-semibold">{dictionary.breadcrumb}</span>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
