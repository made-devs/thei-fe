// app/components/Equipment/ProductDetail.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SpecItem = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex justify-between py-3 border-b border-gray-200">
      <span className="text-gray-600">{label}:</span>
      <span className="font-bold text-black">{value}</span>
    </div>
  );
};

const ProductDetail = ({ product, lang }) => {
  const breadcrumbs = [
    { name: "Home", link: `/${lang}` },
    { name: "Equipment", link: `/${lang}/equipment` },
    { name: "New Machines", link: `/${lang}/equipment/new-machines` },
    {
      name: product.category,
      link: `/${lang}/equipment/new-machines`,
    },
    { name: product.model, link: "#" },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1280px]">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gambar Produk */}
          <div className="relative aspect-square w-full rounded-lg overflow-hidden border">
            <Image
              src={product.image || "/placeholder.png"}
              alt={product.model}
              fill
              className="object-contain p-4"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Detail Spesifikasi */}
          <div>
            <span className="text-sm font-bold uppercase text-yellow-500">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold text-black mt-2">
              {product.model}
            </h1>
            <p className="text-gray-600 mt-4">{product.description || ""}</p>

            <div className="mt-8 space-y-2 text-sm">
              <h2 className="text-xl font-bold border-b pb-2 mb-4">
                Specifications
              </h2>
              {/* Render spesifikasi berdasarkan tipe datanya */}
              {product.basic_technical_data && (
                <>
                  <SpecItem
                    label="Operating Weight"
                    value={product.basic_technical_data.operating_weight}
                  />
                  <SpecItem
                    label="Rated Power"
                    value={product.basic_technical_data.rated_power}
                  />
                  <SpecItem
                    label="Standard Capacity"
                    value={product.basic_technical_data.standard_capacity}
                  />
                </>
              )}
              {product.performance && (
                <>
                  <SpecItem
                    label="Rated Capacity"
                    value={product.performance.rated_capacity}
                  />
                  <SpecItem
                    label="Lifting Height"
                    value={product.performance.lifting_height}
                  />
                </>
              )}
              {/* Tambahkan blok lain untuk tipe data yang berbeda */}
            </div>

            <div className="mt-10">
              <Link
                href={`/${lang}/contact`}
                className="inline-block bg-yellow-400 text-black px-8 py-4 font-bold rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
