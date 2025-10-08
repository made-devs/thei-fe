"use client";

import Image from "next/image";
import { X } from "lucide-react";

const ComparisonBar = ({ compareList, onRemove, onClear, onCompareClick }) => {
  if (compareList.length === 0) return null;

  return (
    <div
      className={`
        fixed left-0 right-0 z-50
        bg-black bg-opacity-90 text-white p-4 shadow-lg
        animate-slide-down
        lg:bottom-0 lg:animate-slide-up
        top-0 lg:top-auto
      `}
    >
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
          <button
            onClick={onCompareClick}
            className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-md text-sm hover:bg-yellow-500"
          >
            Compare ({compareList.length})
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ComparisonBar;
