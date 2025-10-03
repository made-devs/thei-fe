// app/components/Equipment/ProductCard.js

"use client";

import Image from "next/image";
import Link from "next/link";
import { ListChecks, MessageSquare } from "lucide-react";
import ProductSpecs from "./ProductSpecs"; // Import komponen baru

// Helper untuk mengubah nama kategori menjadi format URL-friendly (kebab-case)
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Ganti spasi dengan -
    .replace(/[^\w\-]+/g, "") // Hapus karakter non-word
    .replace(/\-\-+/g, "-") // Ganti -- jadi -
    .replace(/^-+/, "") // Hapus - di awal
    .replace(/-+$/, ""); // Hapus - di akhir

// Kartu produk sekarang lebih fleksibel untuk menampilkan data yang berbeda
const ProductCard = ({ product, lang, onCompareChange, compareList }) => {
  const categoryName = product.category || "";

  const displayType = product.subtype
    ? `${categoryName} (${product.subtype})`
    : product.type || categoryName;

  const isSelected = compareList.some((p) => p.model === product.model);
  const isComparable =
    compareList.length === 0 || compareList[0].category === product.category;
  const isFull = compareList.length >= 3 && !isSelected;
  const isDisabled = !isComparable || isFull;

  return (
    <div className="group flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-200 h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={
            product.image || "https://placehold.co/600x400?text=No+Image.png"
          }
          alt={product.model || "Equipment"}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 border-t border-gray-100 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-black">{product.model}</h3>
        <p className="text-sm text-gray-500 mb-4">{displayType}</p>

        {/* Panggil komponen ProductSpecs di sini */}
        <div className="space-y-2 text-xs flex-grow">
          <ProductSpecs product={product} categoryName={categoryName} />
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`compare-${product.model}`}
              checked={isSelected}
              onChange={() => onCompareChange(product)}
              disabled={isDisabled}
              className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 disabled:opacity-50 cursor-pointer"
            />
            <label
              htmlFor={`compare-${product.model}`}
              className={`ml-2 text-sm cursor-pointer ${
                isDisabled && !isSelected ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Add to Compare
            </label>
          </div>
          <Link
            href={`/${lang}/equipment/new-machines/${slugify(
              categoryName
            )}/${encodeURIComponent(product.model)}`} // <-- PERBAIKAN DI SINI
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-black bg-yellow-400 hover:bg-yellow-500 transition-colors"
          >
            <ListChecks size={16} className="mr-2" />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
