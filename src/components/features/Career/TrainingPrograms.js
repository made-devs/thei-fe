// Filepath: app/components/Career/TrainingPrograms.js
import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'lucide-react';

const TrainingPrograms = ({ dictionary }) => {
  if (!dictionary) return null;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Kolom Gambar */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={dictionary.image}
              alt="Pelatihan Operator"
              fill
              className="object-cover"
            />
          </div>
          {/* Kolom Teks */}
          <div>
            <p className="font-semibold tracking-widest uppercase text-yellow-400">
              {dictionary.subtitle}
            </p>
            <h2 className="text-4xl font-bold mt-2 text-black">
              {dictionary.title}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {dictionary.description}
            </p>
            <ul className="mt-6 space-y-4">
              {dictionary.programs.map((program, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle size={20} className="text-green-500 mr-3" />
                  <span className="font-semibold text-gray-800">{program}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="mt-8 inline-flex items-center bg-yellow-400 text-black font-bold px-6 py-3 rounded-md hover:bg-yellow-500 transition-colors"
            >
              <span>{dictionary.cta}</span>
              <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingPrograms;
