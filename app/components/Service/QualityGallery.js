import Image from 'next/image';
import { PlayCircle, GitCompareArrows } from 'lucide-react';

const QualityGallery = ({ dictionary }) => {
  if (!dictionary) return null;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black">{dictionary.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Before & After */}
          <div className="relative aspect-video rounded-lg overflow-hidden group">
            <Image
              src={dictionary.before_after.image_before}
              alt="Before Overhaul"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4">
              <GitCompareArrows size={48} className="mb-4" />
              <h3 className="font-bold text-xl">
                {dictionary.before_after.title}
              </h3>
              <p className="text-sm mt-2">Slider Interaktif Segera Hadir</p>
            </div>
          </div>
          {/* Video */}
          <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
            <Image
              src={dictionary.video.thumbnail}
              alt="Video Thumbnail"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 transition-opacity opacity-100 group-hover:opacity-0">
              <h3 className="font-bold text-xl">{dictionary.video.title}</h3>
            </div>
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <PlayCircle size={64} className="text-yellow-400" />
            </div>
          </div>
          {/* Image 1 */}
          <div className="relative aspect-video rounded-lg overflow-hidden group">
            <Image
              src={dictionary.image1.src}
              alt={dictionary.image1.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="font-bold text-white">
                {dictionary.image1.title}
              </h3>
            </div>
          </div>
          {/* Image 2 */}
          <div className="relative aspect-video rounded-lg overflow-hidden group">
            <Image
              src={dictionary.image2.src}
              alt={dictionary.image2.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="font-bold text-white">
                {dictionary.image2.title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityGallery;
