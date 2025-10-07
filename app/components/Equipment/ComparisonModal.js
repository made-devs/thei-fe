"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { specMap } from "../../data/comparison-spec-map"; // Impor specMap dari file baru

// Helper untuk mengambil nilai dari nested object dengan aman
const getSpec = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

// Helper untuk render value spesifikasi
const renderSpecValue = (value) => {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return Object.values(value).filter(Boolean).join(" / ");
  }
  return value ?? "-";
};

const ComparisonModal = ({ isOpen, onClose, products }) => {
  if (!isOpen || !products || products.length === 0) {
    return null;
  }

  // Ambil kategori dari produk pertama
  const category = products[0]?.category;
  const categoryKey = (category || "").toLowerCase().replace(/ /g, "-");
  // Ambil daftar spesifikasi untuk kategori tersebut
  const specList = specMap[categoryKey] || [];

  // Filter hanya spesifikasi yang relevan dengan produk yang dibandingkan
  const relevantSpecs = specList.filter((spec) =>
    products.some((p) => getSpec(p, spec.path))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:items-center sm:p-4 bg-black bg-opacity-90">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-6xl
        max-h-[85vh] mt-4
        sm:max-h-[90vh] sm:mt-0
        flex flex-col border-2 border-yellow-400"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-3 sm:p-4 border-b-2 border-black rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black">
              Product Comparison
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Mobile: Card Layout */}
        <div className="sm:hidden overflow-auto flex-1 p-4">
          <div className="space-y-6">
            {products.map((product, productIndex) => (
              <div
                key={product.model}
                className="bg-gray-50 rounded-lg p-4 border-l-4 border-yellow-400"
              >
                {/* Product Header */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div className="relative w-16 h-16 bg-white rounded-lg p-2">
                    <Image
                      src={product.image || "/placeholder.png"}
                      alt={product.model}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-sm text-black flex-1">
                    {product.model}
                  </h3>
                </div>

                {/* Specs */}
                <div className="space-y-3">
                  {relevantSpecs.map((spec) => {
                    const value = getSpec(product, spec.path);
                    if (!value) return null;

                    return (
                      <div
                        key={spec.label}
                        className="flex justify-between items-start"
                      >
                        <span className="text-xs font-medium text-gray-700 flex-1">
                          {spec.label}
                        </span>
                        <span className="text-xs font-semibold text-black text-right flex-1">
                          {renderSpecValue(value)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden sm:block overflow-auto flex-1">
          <div
            className="grid gap-0 min-w-full"
            style={{
              gridTemplateColumns: `minmax(200px, 1.5fr) repeat(${products.length}, minmax(220px, 1fr))`,
            }}
          >
            {/* Header */}
            <div className="font-bold p-4 bg-black text-yellow-400 border-b-2 border-yellow-400 sticky top-0 text-sm lg:text-base">
              Feature
            </div>
            {products.map((product, index) => (
              <div
                key={product.model}
                className={`p-4 text-center border-l-2 border-b-2 border-yellow-400 sticky top-0 ${
                  index % 2 === 0
                    ? "bg-gray-900 text-white"
                    : "bg-yellow-400 text-black"
                }`}
              >
                <div className="relative w-full h-24 mx-auto mb-3">
                  <Image
                    src={product.image || "/placeholder.png"}
                    alt={product.model}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-sm lg:text-base">
                  {product.model}
                </h3>
              </div>
            ))}

            {/* Rows */}
            {relevantSpecs.map((spec, specIndex) => (
              <React.Fragment key={spec.label}>
                <div
                  className={`font-semibold p-4 border-t border-yellow-400 ${
                    specIndex % 2 === 0 ? "bg-gray-100" : "bg-yellow-50"
                  } text-sm lg:text-base text-black`}
                >
                  {spec.label}
                </div>
                {products.map((product, productIndex) => (
                  <div
                    key={product.model}
                    className={`p-4 border-l-2 border-t border-yellow-400 text-center ${
                      specIndex % 2 === 0
                        ? productIndex % 2 === 0
                          ? "bg-gray-100"
                          : "bg-gray-50"
                        : productIndex % 2 === 0
                        ? "bg-yellow-50"
                        : "bg-yellow-100"
                    } text-sm lg:text-base text-black`}
                  >
                    {renderSpecValue(getSpec(product, spec.path))}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Footer */}
      </div>
    </div>
  );
};

export default ComparisonModal;
