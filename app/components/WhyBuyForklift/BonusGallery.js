import Image from 'next/image';

const BonusGallery = ({ dictionary }) => {
  if (!dictionary || !dictionary.images) return null;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1280px]">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black">{dictionary.title}</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            {dictionary.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dictionary.images.map((image, index) => (
            <div key={index} className="group">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="mt-4 text-center font-semibold text-lg text-gray-800">
                {image.caption}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BonusGallery;
