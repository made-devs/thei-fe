'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ListChecks, MessageSquare } from 'lucide-react';

// Helper untuk mengubah nama kategori menjadi format URL-friendly (kebab-case)
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Ganti spasi dengan -
    .replace(/[^\w\-]+/g, '') // Hapus karakter non-word
    .replace(/\-\-+/g, '-') // Ganti -- jadi -
    .replace(/^-+/, '') // Hapus - di awal
    .replace(/-+$/, ''); // Hapus - di akhir

// Kartu parts, disesuaikan dari ProductCard untuk spare parts
const PartsCard = ({ part, lang }) => {
  const categoryName = part.category || '';

  // Jika subType sama dengan category, jangan tampilkan subType
  const displayType =
    part.subType && part.subType !== part.category
      ? `${categoryName} (${part.subType})`
      : part.type || categoryName;

  return (
    <div className="group flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-200 h-full">
      <div className="relative h-32 sm:h-48 w-full overflow-hidden">
        <Image
          src={part.image || 'https://placehold.co/600x400?text=No+Image.png'}
          alt={part.name || 'Spare Part'} // Ganti model dengan name
          fill
          className="object-contain p-2 sm:p-4 transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-2 sm:p-4 border-t border-gray-100 flex flex-col flex-grow">
        <h3 className="font-bold text-sm sm:text-lg text-black">
          {part.name} {/* Ganti model dengan name */}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4">
          {part.type}
        </p>

        {/* Tambah info price dan availability untuk parts */}
        <div className="space-y-1 sm:space-y-2 text-xs flex-grow">
          <p className="text-gray-700">
            <strong>Price:</strong> {part.price}
          </p>
          <p
            className={`font-medium ${
              part.availability === 'In Stock'
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            <strong>Availability:</strong> {part.availability}
          </p>
          <p className="text-gray-600">{part.description}</p>{' '}
          {/* Tambah description */}
        </div>

        <div className="mt-auto pt-2 sm:pt-4 border-t border-gray-100 space-y-2 sm:space-y-3">
          <Link
            href={`/${lang}/spare-parts/${slugify(
              categoryName
            )}/${encodeURIComponent(part.name)}`} // Ganti products dengan spare-parts, model dengan name
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-black bg-yellow-400 hover:bg-yellow-500 transition-colors"
          >
            <ListChecks size={16} className="mr-2" />
            View Details
          </Link>
          {/* Tambah tombol Chat seperti di PromoPackages */}
          <button
            onClick={() => {
              const message = `Halo, saya tertarik dengan spare part ${part.name}. Bisa info lebih lanjut?`;
              const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
                message
              )}`;
              window.open(waUrl, '_blank');
            }}
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-black bg-green-400 hover:bg-green-500 transition-colors"
          >
            <MessageSquare size={16} className="mr-2" />
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartsCard;
