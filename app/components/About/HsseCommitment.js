import Image from 'next/image';

const HsseCommitment = ({ dictionary }) => {
  return (
    <section className="bg-gray-800 text-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold">{dictionary.title}</h2>
            <p className="mt-4 text-gray-300">{dictionary.description}</p>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            {/* Placeholder untuk foto safety wall */}
            <Image
              src="/commit1.webp" // Ganti dengan path gambar yang sesuai
              alt="HSSE Commitment"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HsseCommitment;
