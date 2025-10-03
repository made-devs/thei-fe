"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import ComparisonBar from "./ComparisonBar";
import ComparisonModal from "./ComparisonModal";

// Helper untuk mengubah nama kategori menjadi format URL-friendly
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Ganti spasi dengan -
    .replace(/[^\w\-]+/g, "") // Hapus karakter non-word
    .replace(/\-\-+/g, "-") // Ganti -- jadi -
    .replace(/^-+/, "") // Hapus - di awal
    .replace(/-+$/, ""); // Hapus - di akhir

export default function InteractiveEquipmentView({
  categories,
  productData,
  lang,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  // Fungsi untuk mencari nama kategori asli dari parameter URL
  const findCategoryNameBySlug = (slug) => {
    const category = categories.find((cat) => slugify(cat.name) === slug);
    return category ? category.name : null;
  };

  const initialCategoryName =
    findCategoryNameBySlug(categoryParam) || categories[0]?.name || "";

  const [activeCategory, setActiveCategory] = useState(initialCategoryName);
  const [products, setProducts] = useState(
    productData[initialCategoryName] || []
  );
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    setProducts(productData[categoryName] || []);
    setCompareList([]); // Reset compare list saat ganti kategori

    // Update URL dengan kategori yang baru dipilih
    const newUrl = `/${lang}/equipment/new-machines?category=${slugify(
      categoryName
    )}`;
    router.push(newUrl, { scroll: false });
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
        onCompareClick={() => setIsCompareModalOpen(true)}
      />

      <ComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        products={compareList}
      />
    </section>
  );
}
