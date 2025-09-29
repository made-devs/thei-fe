"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { specMap } from "../../data/comparison-spec-map"; // Impor specMap dari file baru

// Helper untuk mengambil nilai dari nested object dengan aman
const getSpec = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const ComparisonModal = ({ isOpen, onClose, products }) => {
  if (!isOpen || !products || products.length === 0) {
    return null;
  }

  // Filter hanya spesifikasi yang relevan dengan produk yang dibandingkan
  const relevantSpecs = specMap.filter((spec) =>
    products.some((p) => getSpec(p, spec.path))
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Product Comparison</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        <div className="overflow-auto">
          <div
            className="grid gap-0"
            style={{
              gridTemplateColumns: `minmax(200px, 1.5fr) repeat(${products.length}, minmax(220px, 1fr))`,
            }}
          >
            {/* Header */}
            <div className="font-bold p-4 bg-gray-100 border-b sticky top-0">
              Feature
            </div>
            {products.map((product) => (
              <div
                key={product.model}
                className="p-4 text-center border-l border-b bg-gray-100 sticky top-0"
              >
                <div className="relative w-full h-32 mx-auto">
                  <Image
                    src={product.image || "/placeholder.png"}
                    alt={product.model}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold mt-2 text-lg">{product.model}</h3>
              </div>
            ))}

            {/* Rows */}
            {relevantSpecs.map((spec, index) => (
              <React.Fragment key={spec.label}>
                <div
                  className={`font-semibold p-4 border-t ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  {spec.label}
                </div>
                {products.map((product) => (
                  <div
                    key={product.model}
                    className={`p-4 border-l border-t text-center ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    {getSpec(product, spec.path) || "-"}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
