'use client';

import { useState, useEffect, useRef } from 'react'; // Tambah useRef untuk timeout
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight, ChevronDown } from 'lucide-react';
import PartsCard from './PartsCard'; // Ganti ProductCard dengan PartsCard (pastikan komponen ini ada atau buat baru)
// Hapus import ComparisonBar dan ComparisonModal karena tidak diperlukan

// Helper untuk mengubah nama kategori menjadi format URL-friendly
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Ganti spasi dengan -
    .replace(/[^\w\-]+/g, '') // Hapus karakter non-word
    .replace(/\-\-+/g, '-') // Ganti -- jadi -
    .replace(/^-+/, '') // Hapus - di awal
    .replace(/-+$/, ''); // Hapus - di akhir

export default function InteractivePartsView({
  categories,
  partsData, // Ganti productData dengan partsData
  lang,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  // Fungsi untuk mencari nama kategori asli dari parameter URL
  const findCategoryNameBySlug = (slug) => {
    const category = categories.find((cat) => slugify(cat.name) === slug);
    return category ? category.name : null;
  };

  const initialCategoryName =
    findCategoryNameBySlug(categoryParam) || categories[0]?.name || '';

  const [activeCategory, setActiveCategory] = useState(initialCategoryName);
  const [parts, setParts] = useState(
    // Ganti products dengan parts
    partsData[initialCategoryName] || []
  );
  // Hapus state compareList dan isCompareModalOpen karena tidak diperlukan

  const [hoveredCategory, setHoveredCategory] = useState(null); // State untuk hover
  const [selectedType, setSelectedType] = useState(null); // State untuk filter type

  const hoverTimeoutRef = useRef(null); // Ref untuk timeout hover

  // Fungsi untuk mendapatkan unique types dari parts kategori
  const getUniqueTypes = (categoryName) => {
    const categoryParts = partsData[categoryName] || [];
    const types = [...new Set(categoryParts.map((part) => part.type))];
    return types;
  };

  // Filter parts berdasarkan type jika ada
  useEffect(() => {
    let filtered = partsData[activeCategory] || [];
    if (selectedType) {
      filtered = filtered.filter((part) => part.type === selectedType);
    }
    setParts(filtered);
  }, [activeCategory, selectedType, partsData]);

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    setSelectedType(null); // Reset filter type saat ganti kategori
    setHoveredCategory(null); // Reset hover

    // Update URL dengan kategori yang baru dipilih, ganti /products dengan /spare-parts
    const newUrl = `/${lang}/spare-parts?category=${slugify(categoryName)}`;
    router.push(newUrl, { scroll: false });
  };

  const handleTypeClick = (type, categoryName) => {
    // Ganti kategori dulu jika berbeda
    if (categoryName !== activeCategory) {
      setActiveCategory(categoryName);
      // Update URL
      const newUrl = `/${lang}/spare-parts?category=${slugify(categoryName)}`;
      router.push(newUrl, { scroll: false });
    }
    setSelectedType(type);
    setHoveredCategory(null); // Tutup submenu setelah klik
  };

  const handleAllTypesClick = (categoryName) => {
    // Ganti kategori dulu jika berbeda
    if (categoryName !== activeCategory) {
      setActiveCategory(categoryName);
      // Update URL
      const newUrl = `/${lang}/spare-parts?category=${slugify(categoryName)}`;
      router.push(newUrl, { scroll: false });
    }
    setSelectedType(null);
    setHoveredCategory(null);
  };

  // Fungsi untuk handle mouse enter pada kategori
  const handleMouseEnter = (categoryName) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current); // Clear timeout jika hover lagi
    }
    const types = getUniqueTypes(categoryName);
    if (types.length > 1) {
      setHoveredCategory(categoryName);
    }
  };

  // Fungsi untuk handle mouse leave pada kategori
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 500); // Delay 1 detik sebelum hilang
  };

  // Hapus fungsi handleCompareChange karena tidak diperlukan

  // Hapus fungsi clearCompareList karena tidak diperlukan

  return (
    <section
      className={`bg-gray-50 py-12 lg:py-16`} // Hapus kondisi compareList.length > 0
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Mobile: Horizontal Tabs */}
        <div className="lg:hidden mb-6">
          <div className="overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.name
                      ? 'bg-yellow-400 text-black'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Original Grid Layout */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 bg-white p-4 lg:p-6 rounded-lg shadow-sm h-fit relative">
            <h2 className="text-lg sm:text-xl font-bold mb-4 border-b pb-3">
              Categories
            </h2>
            <ul className="space-y-2">
              {categories.map((category) => {
                const types = getUniqueTypes(category.name);
                const hasMultipleTypes = types.length > 1;

                return (
                  <li
                    key={category.name}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(category.name)} // Ganti dengan handleMouseEnter
                    onMouseLeave={handleMouseLeave} // Ganti dengan handleMouseLeave
                  >
                    <button
                      onClick={() => handleCategoryClick(category.name)}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors flex justify-between items-center ${
                        activeCategory === category.name
                          ? 'bg-yellow-400 font-bold text-black'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span>{category.name}</span>
                      {hasMultipleTypes &&
                        (activeCategory === category.name ||
                          hoveredCategory === category.name) && (
                          <ChevronRight size={18} />
                        )}
                    </button>

                    {/* Invisible bridge untuk smooth hover - hanya jika ada multiple types */}
                    {hasMultipleTypes && hoveredCategory === category.name && (
                      <div className="absolute left-full top-0 h-full w-3 z-10" />
                    )}

                    {/* Submenu untuk types saat hover - hanya jika ada multiple types */}
                    {hasMultipleTypes && hoveredCategory === category.name && (
                      <div className="absolute left-full top-0 ml-3 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-20">
                        <h3 className="text-sm font-semibold mb-2 text-gray-800">
                          Types
                        </h3>
                        <ul className="space-y-1">
                          <li key="all-types">
                            <button
                              onClick={() => handleAllTypesClick(category.name)}
                              className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                                !selectedType &&
                                activeCategory === category.name
                                  ? 'bg-yellow-400 text-black font-medium'
                                  : 'hover:bg-gray-100 text-gray-700'
                              }`}
                            >
                              All Types
                            </button>
                          </li>
                          {types.map((type) => (
                            <li key={type}>
                              <button
                                onClick={() =>
                                  handleTypeClick(type, category.name)
                                }
                                className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                                  selectedType === type &&
                                  activeCategory === category.name
                                    ? 'bg-yellow-400 text-black font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`}
                              >
                                {type}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-3">
            {parts.length > 0 ? ( // Ganti products dengan parts
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {parts.map(
                  (
                    part // Ganti product dengan part
                  ) => (
                    <PartsCard
                      key={part.name}
                      part={{ ...part, category: activeCategory }} // Ganti product dengan part
                      lang={lang}
                      // Hapus onCompareChange dan compareList karena tidak diperlukan
                    />
                  )
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-white rounded-lg p-10">
                <p className="text-sm sm:text-base text-gray-500">
                  Spare parts untuk kategori ini akan segera hadir.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Parts Grid */}
        <div className="lg:hidden">
          {parts.length > 0 ? ( // Ganti products dengan parts
            <div className="grid grid-cols-1 gap-4">
              {parts.map(
                (
                  part // Ganti product dengan part
                ) => (
                  <PartsCard
                    key={part.name}
                    part={{ ...part, category: activeCategory }} // Ganti product dengan part
                    lang={lang}
                    // Hapus onCompareChange dan compareList karena tidak diperlukan
                  />
                )
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center bg-white rounded-lg p-6">
              <p className="text-sm text-gray-500 text-center">
                Spare parts untuk kategori ini akan segera hadir.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
