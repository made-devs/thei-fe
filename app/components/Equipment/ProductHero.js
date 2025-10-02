'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Download, Mail } from 'lucide-react';
import { mainSpecConfig } from '../../data/hero-spec-config';

// Helper untuk mendapatkan value dari nested object
const getValueByPath = (obj, path) =>
  path.split('.').reduce((acc, key) => acc?.[key], obj);

// Komponen kecil untuk menampilkan satu item spesifikasi
const SpecItem = ({ value, label }) => (
  <div className="text-left">
    <p className="text-4xl font-bold text-black">{value}</p>
    <p className="text-sm text-gray-800 mt-1">{label}</p>
  </div>
);

const ProductHero = ({ product, lang }) => {
  // Fallback jika data produk tidak ada
  if (!product) {
    return null;
  }

  // Menyiapkan data breadcrumbs secara dinamis
  const breadcrumbs = [
    { name: 'Home', link: `/${lang}` },
    { name: 'Products', link: `/${lang}/equipment/new-machines` },
    { name: product.model, link: '#' },
  ];

  // Logika dinamis untuk mendapatkan spesifikasi utama
  const categoryKey = product.category.toLowerCase().replace(/ /g, '-');
  const specsConfig = mainSpecConfig[categoryKey] || mainSpecConfig.default;

  const mainSpecs = specsConfig
    .map((spec) => {
      let value = getValueByPath(product, spec.path);
      // Jika value object, gabungkan jadi string
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        value = Object.values(value).filter(Boolean).join(' / ');
      }
      return { label: spec.label, value };
    })
    .filter((spec) => spec.value);

  return (
    <section className="bg-gradient-to-br from-yellow-300 to-yellow-500 pt-8 pb-10 lg:pt-12 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1280px]">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-800 mb-4">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.name} className="flex items-center">
              {index > 0 && <ChevronRight size={16} className="mx-1" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-black">{crumb.name}</span>
              ) : (
                <Link href={crumb.link} className="hover:underline">
                  {crumb.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Kolom Kiri: Teks dan Spesifikasi */}
          <div className="text-left py-8 lg:py-16 flex flex-col justify-center">
            <p className="font-semibold text-black">{product.type}</p>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-black mt-2 leading-tight">
              {product.model}
            </h1>
            <p className="mt-4 text-lg text-gray-800 max-w-lg">
              {product.description ||
                `The latest generation of ${product.category.toLowerCase()}, designed for maximum efficiency and power.`}
            </p>

            {/* Menampilkan spesifikasi utama yang sudah dinamis */}
            <div className="mt-10 flex items-center gap-10">
              {mainSpecs.slice(0, 3).map((spec) => (
                <SpecItem
                  key={spec.label}
                  value={spec.value}
                  label={spec.label}
                />
              ))}
            </div>

            {/* Tombol aksi */}
            <div className="mt-10 flex gap-4">
              <Link
                href={`/request-quote?model=${encodeURIComponent(
                  product.model
                )}`}
                className="inline-flex items-center px-6 py-3 bg-black hover:bg-gray-900 text-yellow-400 font-semibold rounded-lg shadow transition"
              >
                <Mail size={18} className="mr-2" />
                Request Quote
              </Link>
              {product.brochure && (
                <a
                  href={product.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-black text-yellow-400 font-semibold rounded-lg hover:bg-gray-900 transition"
                >
                  <Download size={18} className="mr-2" />
                  Download Brochure
                </a>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Gambar Produk */}
          <div className="relative flex items-center justify-end h-[420px] lg:h-full w-full">
            <div className="relative w-full max-w-[520px] h-[320px] lg:h-[420px] flex items-center justify-end ml-auto transition-transform duration-300 hover:scale-105">
              <Image
                src={product.image || '/placeholder.png'}
                alt={product.model}
                fill
                className="object-contain"
                style={{
                  filter: 'drop-shadow(0 35px 55px rgba(0,0,0,0.65))',
                  objectPosition: 'center',
                }}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
