"use client";

import Image from "next/image";
import { X } from "lucide-react";

const ComparisonBar = ({
  compareList,
  onRemove,
  onClear,
  onCompareClick, // Prop baru untuk handle klik
}) => {
  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-90 text-white p-4 shadow-lg z-40 animate-slide-up">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-lg hidden md:block">Compare Items</h3>
          {compareList.map((product) => (
            <div
              key={product.model}
              className="relative flex items-center bg-gray-700 p-2 rounded-md"
            >
              <Image
                src={product.image || "/placeholder.png"}
                alt={product.model}
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-xs ml-2 hidden sm:inline">
                {product.model}
              </span>
              <button
                onClick={() => onRemove(product)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onClear}
            className="text-xs text-gray-400 hover:underline"
          >
            Clear All
          </button>
          {/* Tombol ini sekarang memanggil onCompareClick */}
          <button
            onClick={onCompareClick}
            className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-md text-sm hover:bg-yellow-500"
          >
            Compare ({compareList.length})
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ComparisonBar;
