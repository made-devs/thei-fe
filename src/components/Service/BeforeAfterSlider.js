'use client';
import { ReactCompareSlider } from 'react-compare-slider';
import Image from 'next/image';

const BeforeAfterSlider = ({ dictionary }) => {
  if (!dictionary || !dictionary.image_before || !dictionary.image_after) {
    return null;
  }

  // Komponen kustom untuk handle Next.js Image di dalam slider
  const CompareImage = ({ src, alt }) => (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 768px"
      unoptimized
    />
  );

  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-black">
            {dictionary.title}
          </h2>
        </div>
        <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl">
          <ReactCompareSlider
            // Menggunakan komponen kustom Next.js Image
            itemOne={
              <CompareImage
                src={dictionary.image_before}
                alt="Before service"
              />
            }
            itemTwo={
              <CompareImage src={dictionary.image_after} alt="After service" />
            }
            className="w-full aspect-video"
          />
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
