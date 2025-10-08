import Image from 'next/image';

const FacilityGallery = ({ dictionary }) => {
  if (!dictionary || !dictionary.images) return null;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <h2 className="text-3xl font-bold text-black text-center mb-12">
          {dictionary.title}
        </h2>
        {/* Simple responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dictionary.images.map((src, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden group"
            >
              <Image
                src={src}
                alt={`Facility Gallery Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilityGallery;
