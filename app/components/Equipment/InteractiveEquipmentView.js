"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import ComparisonBar from "./ComparisonBar";
import ComparisonModal from "./ComparisonModal"; // Import modal

export default function InteractiveEquipmentView({
  categories,
  productData,
  lang,
}) {
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.name || ""
  );
  const [products, setProducts] = useState(
    productData[categories[0]?.name] || []
  );
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false); // State untuk modal

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    setProducts(productData[categoryName] || []);
    setCompareList([]);
  };

  const handleCompareChange = (product) => {
    setCompareList((currentList) => {
      const isAlreadyInList = currentList.some(
        (item) => item.model === product.model
      );
      if (isAlreadyInList) {
        return currentList.filter((item) => item.model !== product.model);
      }
      if (currentList.length < 3) {
        return [...currentList, product];
      }
      return currentList;
    });
  };

  const clearCompareList = () => {
    setCompareList([]);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-4 border-b pb-3">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors flex justify-between items-center ${
                      activeCategory === category.name
                        ? "bg-yellow-400 font-bold text-black"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span>{category.name}</span>
                    {activeCategory === category.name && (
                      <ChevronRight size={18} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.model}
                    product={{ ...product, category: activeCategory }}
                    lang={lang}
                    onCompareChange={handleCompareChange}
                    compareList={compareList}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-white rounded-lg p-10">
                <p className="text-gray-500">
                  Produk untuk kategori ini akan segera hadir.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ComparisonBar
        compareList={compareList}
        onRemove={handleCompareChange}
        onClear={clearCompareList}
        onCompareClick={() => setIsCompareModalOpen(true)} // Buka modal saat diklik
      />

      <ComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)} // Tutup modal
        products={compareList}
      />
    </section>
  );
}
