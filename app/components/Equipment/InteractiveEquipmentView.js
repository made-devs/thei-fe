'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, ListChecks, MessageSquare } from 'lucide-react';
import Link from 'next/link';

// Kartu produk sekarang lebih fleksibel untuk menampilkan data yang berbeda
const ProductCard = ({ product, categoryName }) => {
  // Tentukan tipe produk untuk menampilkan data yang benar
  const isForklift = !!product.performance;
  const isBulldozer = !!product.basic_technical_data?.blade_capacity;
  const isCrane = !!product.lifting_performance;
  const isSkidSteer = !!product.dimensions_and_performance;

  const displayType = product.subtype
    ? `${categoryName} (${product.subtype})`
    : product.type || categoryName;

  return (
    <div className="group flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-200">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={product.image || 'https://placehold.co/600x400?text=No+Image'}
          alt={product.model || 'Equipment'}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 border-t border-gray-100 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-black">{product.model}</h3>
        <p className="text-sm text-gray-500 mb-4">{displayType}</p>
        <div className="space-y-2 text-xs flex-grow">
          {/* Tampilkan data sesuai tipe produk */}
          {isForklift ? (
            <>
              {/* Spesifikasi Forklift */}
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Rated Capacity:
                </span>
                <span className="font-bold text-black">
                  {product.performance.rated_capacity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Lifting Height:
                </span>
                <span className="font-bold text-black">
                  {product.performance.lifting_height}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Engine Type:
                </span>
                <span className="font-bold text-black">
                  {product.power.controller || 'Internal Combustion'}
                </span>
              </div>
            </>
          ) : isBulldozer ? (
            <>
              {/* Spesifikasi Bulldozer */}
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Operating Weight:
                </span>
                <span className="font-bold text-black">
                  {product.basic_technical_data.operating_weight}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Rated Power:
                </span>
                <span className="font-bold text-black">
                  {product.basic_technical_data.rated_power}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Blade Capacity:
                </span>
                <span className="font-bold text-black">
                  {product.basic_technical_data.blade_capacity}
                </span>
              </div>
            </>
          ) : isCrane ? (
            <>
              {/* Spesifikasi Crane */}
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Max Lifting Capacity:
                </span>
                <span className="font-bold text-black">
                  {product.lifting_performance.max_rated_lifting_capacity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Max Lifting Height:
                </span>
                <span className="font-bold text-black">
                  {product.lifting_performance.max_lifting_height_of_main_boom}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Max Jib Height:
                </span>
                <span className="font-bold text-black">
                  {product.lifting_performance.max_lifting_height_of_jib}
                </span>
              </div>
            </>
          ) : isSkidSteer ? (
            <>
              {/* Spesifikasi Skid Steer Loader */}
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Operating Weight:
                </span>
                <span className="font-bold text-black">
                  {product.basic_technical_data.operating_weight}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Rated Power:
                </span>
                <span className="font-bold text-black">
                  {product.basic_technical_data.rated_power}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Bucket Capacity:
                </span>
                <span className="font-bold text-black">
                  {product.basic_technical_data.bucket_capacity}
                </span>
              </div>
            </>
          ) : (
            <>
              {/* Spesifikasi Excavator / Lainnya */}
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Operating Weight:
                </span>
                <span className="font-bold text-black">
                  {product.basic_technical_data.operating_weight}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Rated Power:
                </span>
                <span className="font-bold text-black">
                  {product.basic_technical_data.rated_power}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Digging Depth:
                </span>
                <span className="font-bold text-black">
                  {product.operating_range.max_digging_depth}
                </span>
              </div>
            </>
          )}
        </div>

        {/* --- BAGIAN AKSI PENGGUNA --- */}
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`compare-${product.model}`}
              className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
            />
            <label
              htmlFor={`compare-${product.model}`}
              className="ml-2 text-sm text-gray-600"
            >
              Add to Compare
            </label>
          </div>

          <Link
            href="/contact"
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-black bg-yellow-400 hover:bg-yellow-500 transition-colors"
          >
            <MessageSquare size={16} className="mr-2" />
            Send Inquiry
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function InteractiveEquipmentView({ categories, productData }) {
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.name || ''
  );
  const [products, setProducts] = useState(productData[activeCategory] || []);

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    setProducts(productData[categoryName] || []);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Kolom Kiri: Daftar Kategori */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-4 border-b pb-3">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors flex justify-between items-center ${
                      activeCategory === category.name
                        ? 'bg-yellow-400 font-bold text-black'
                        : 'hover:bg-gray-100 text-gray-700'
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

          {/* Kolom Kanan: Grid Produk */}
          <div className="lg:col-span-3">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.model}
                    product={product}
                    categoryName={activeCategory}
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
    </section>
  );
}
