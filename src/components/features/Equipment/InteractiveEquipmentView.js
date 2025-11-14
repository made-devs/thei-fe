'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight, ChevronDown, X } from 'lucide-react';
import ProductCard from './ProductCard';
import ComparisonBar from './ComparisonBar';
import ComparisonModal from './ComparisonModal';
import Image from 'next/image';

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

const brandLogos = {
  Zoomlion: '/zoomlion.webp',
  Sany: '/sany.webp',
  EP: '/ep.webp',
  Nichiyu: '/nichiyu.webp',
  Mitsubishi: '/mitsubishi.webp',
  XCMG: '/xcmg.webp',
  // Tambahkan brand lain sesuai kebutuhan
};

// non-aktifkan brand tertentu dari filter (lowercase)
const disabledBrands = new Set(['sany']);

// helper: filter products excluding disabled brands
const filterDisabledProducts = (products = []) =>
  products.filter(
    (product) =>
      !product?.brand ||
      !disabledBrands.has(product.brand.toString().toLowerCase())
  );

export default function InteractiveEquipmentView({
  categories,
  productData,
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
  // gunakan products yang sudah difilter agar Sany gak muncul di list
  const [products, setProducts] = useState(
    filterDisabledProducts(productData[initialCategoryName] || [])
  );
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null); // Tambah brand filter
  const [showMobileFilters, setShowMobileFilters] = useState(false); // Mobile filter toggle

  // Fungsi untuk mendapatkan unique types dari kategori (exclude disabled)
  const getUniqueTypes = (categoryName) => {
    const categoryProducts = filterDisabledProducts(
      productData[categoryName] || []
    );
    const types = [...new Set(categoryProducts.map((product) => product.type))];
    return types.sort();
  };

  // Fungsi untuk mendapatkan unique brands dari kategori
  const getUniqueBrands = (categoryName) => {
    const categoryProducts = productData[categoryName] || [];
    const brands = [
      ...new Set(
        categoryProducts
          .map((product) => product.brand)
          .filter(
            (brand) =>
              brand && !disabledBrands.has(brand.toString().toLowerCase()) // exclude disabled
          )
      ),
    ];
    return brands.sort();
  };

  // Filter produk berdasarkan type dan brand (tambahkan filterDisabledProducts)
  useEffect(() => {
    let filtered = filterDisabledProducts(productData[activeCategory] || []);

    if (selectedType) {
      filtered = filtered.filter((product) => product.type === selectedType);
    }

    if (selectedBrand) {
      filtered = filtered.filter((product) => product.brand === selectedBrand);
    }

    setProducts(filtered);
  }, [activeCategory, selectedType, selectedBrand, productData]);

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    setSelectedType(null);
    setSelectedBrand(null); // Reset brand saat ganti kategori
    setHoveredCategory(null);
    setShowMobileFilters(false); // Tutup mobile filters

    // Update URL dengan kategori yang baru dipilih
    const newUrl = `/${lang}/products?category=${slugify(categoryName)}`;
    router.push(newUrl, { scroll: false });
  };

  const handleTypeClick = (type, categoryName) => {
    // Ganti kategori dulu jika berbeda
    if (categoryName !== activeCategory) {
      setActiveCategory(categoryName);
      // Update URL
      const newUrl = `/${lang}/products?category=${slugify(categoryName)}`;
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
      const newUrl = `/${lang}/products?category=${slugify(categoryName)}`;
      router.push(newUrl, { scroll: false });
    }
    setSelectedType(null);
    setHoveredCategory(null);
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(selectedBrand === brand ? null : brand);
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

  const clearAllFilters = () => {
    setSelectedType(null);
    setSelectedBrand(null);
    setShowMobileFilters(false);
  };

  const uniqueTypes = getUniqueTypes(activeCategory);
  const uniqueBrands = getUniqueBrands(activeCategory);
  const hasFilters = selectedType || selectedBrand;

  // Clear selectedBrand if it becomes disabled (or not available)
  useEffect(() => {
    if (
      selectedBrand &&
      disabledBrands.has(selectedBrand.toString().toLowerCase())
    ) {
      setSelectedBrand(null);
    }
  }, [selectedBrand]);

  return (
    <section
      className={`bg-gray-50 py-12 lg:py-16 ${
        compareList.length > 0 ? 'pt-32 lg:pt-16' : ''
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Mobile: Horizontal Tabs */}
        <div className="lg:hidden mb-6">
          <div className="overflow-x-auto mb-4">
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

          {/* Mobile: Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700 mb-4"
          >
            <span>
              Filters{' '}
              {hasFilters &&
                `(${(selectedType ? 1 : 0) + (selectedBrand ? 1 : 0)})`}
            </span>
            <ChevronDown
              size={18}
              className={`transition-transform ${
                showMobileFilters ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Mobile: Filter Content */}
          {showMobileFilters && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 space-y-4">
              {/* Type Filter */}
              {uniqueTypes.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">
                    Type
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedType(null)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        !selectedType
                          ? 'bg-yellow-400 text-black'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    {uniqueTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() =>
                          setSelectedType(selectedType === type ? null : type)
                        }
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          selectedType === type
                            ? 'bg-yellow-400 text-black'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Brand Filter */}
              {uniqueBrands.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">
                    Brand
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedBrand(null)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors h-10 self-center ${
                        // Tambahkan h-10 self-center untuk tinggi tetap dan center vertikal
                        !selectedBrand
                          ? 'bg-yellow-400 text-black'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    {uniqueBrands.map((brand) => (
                      <div
                        key={brand}
                        className={`relative cursor-pointer transition-all duration-200 hover:scale-105 w-[120px] h-[90px] ${
                          selectedBrand === brand
                            ? 'shadow-[0_4px_0_0_#fbbf24]' // Shadow bawah kuning saat aktif
                            : ''
                        }`}
                        onClick={() => handleBrandClick(brand)}
                      >
                        <Image
                          src={brandLogos[brand] || '/default-brand.webp'}
                          alt={brand}
                          fill
                          className="object-contain"
                          priority={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Clear Filters Button */}
              {hasFilters && (
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2 px-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Desktop: Original Grid Layout */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Categories */}
          <div className="lg:col-span-1 bg-white p-4 lg:p-6 rounded-lg shadow-sm h-fit">
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
                    onMouseEnter={() =>
                      hasMultipleTypes && setHoveredCategory(category.name)
                    }
                    onMouseLeave={() => setHoveredCategory(null)}
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

                    {hasMultipleTypes && hoveredCategory === category.name && (
                      <div className="absolute left-full top-0 h-full w-3 z-10" />
                    )}

                    {hasMultipleTypes && hoveredCategory === category.name && (
                      <div className="absolute left-full top-0 ml-3 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-20">
                        <h3 className="text-sm font-semibold mb-2 text-gray-800">
                          Types
                        </h3>
                        <ul className="space-y-1">
                          <li>
                            <button
                              onClick={() => {
                                setSelectedType(null);
                                setHoveredCategory(null);
                              }}
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
                                onClick={() => {
                                  setSelectedType(
                                    selectedType === type ? null : type
                                  );
                                  setHoveredCategory(null);
                                }}
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

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Desktop: Brand Filter Row */}
            {uniqueBrands.length > 0 && (
              <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Filter by Brand
                  </h3>
                  {selectedBrand && (
                    <button
                      onClick={() => setSelectedBrand(null)}
                      className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                    >
                      <X size={14} /> Clear
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-6">
                  <button
                    onClick={() => setSelectedBrand(null)}
                    className={`flex-shrink-0 min-w-[120px] h-10 px-3 py-1 rounded-lg text-sm font-medium transition-colors self-center ${
                      // Tambahkan self-center untuk center vertikal
                      !selectedBrand
                        ? 'bg-yellow-400 text-black'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Brands
                  </button>
                  {uniqueBrands.map((brand) => (
                    <div
                      key={brand}
                      className={`relative cursor-pointer transition-all duration-200 hover:scale-105 w-[100px] h-[60px] ${
                        selectedBrand === brand
                          ? 'shadow-[0_2px_0_0_#fbbf24]' // Shadow bawah kuning saat aktif
                          : ''
                      }`}
                      onClick={() => handleBrandClick(brand)}
                    >
                      <Image
                        src={brandLogos[brand] || '/default-brand.webp'}
                        alt={brand}
                        fill
                        className="object-contain"
                        priority={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Products Grid */}
            {products.length > 0 ? (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Showing {products.length} product
                  {products.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
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
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-white rounded-lg">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">
                    Tidak ada produk yang sesuai dengan filter.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Products Grid */}
        <div className="lg:hidden">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
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
            <div className="flex items-center justify-center bg-white rounded-lg p-6">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Tidak ada produk yang sesuai dengan filter.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
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
