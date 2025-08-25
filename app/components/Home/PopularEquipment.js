// /app/components/Home/PopularEquipment.js
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Tag } from 'lucide-react';

const PopularEquipment = ({ dictionary }) => {
  const [activeTab, setActiveTab] = useState('new');

  const tabs = [
    { id: 'new', label: dictionary.tabs.new },
    { id: 'used', label: dictionary.tabs.used },
    { id: 'engines', label: dictionary.tabs.engines },
    { id: 'lift_trucks', label: dictionary.tabs.lift_trucks },
    { id: 'work_tools', label: dictionary.tabs.work_tools },
  ];

  const products = {
    new: dictionary.products.new_machines || [],
    used: dictionary.products.used_machines || [],
    engines: [],
    lift_trucks: [],
    work_tools: [],
  };

  const productImages = {
    new: ['/newmachine1.webp', '/newmachine2.webp', '/newmachine3.webp'],
    used: ['/product-used1.png', '/product-used2.png'],
  };

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <h2 className="text-center text-3xl font-bold text-black mb-8">
          {dictionary.title}
        </h2>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder={dictionary.search_placeholder}
              className="w-full py-4 pl-12 pr-4 text-gray-700 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="text-gray-400" size={20} />
            </div>
          </div>
        </div>

        {/* FIX: Buat container untuk tab agar bisa scroll horizontal di mobile */}
        <div className="w-full overflow-x-auto pb-2 mb-12">
          <div className="flex justify-start md:justify-center border-b border-gray-200 whitespace-nowrap min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-bold transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[450px]">
          {products[activeTab].length > 0 ? (
            products[activeTab].map((product, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden text-center group hover:shadow-xl transition-shadow"
              >
                <div className="relative bg-gray-100 aspect-[4/3]">
                  <Image
                    src={productImages[activeTab][index]}
                    alt={`${product.name} ${product.model}`}
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-transform"
                  />
                  {product.promo && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded-full flex items-center">
                      <Tag size={14} className="mr-1" />
                      {dictionary.promo_package}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-gray-500 text-sm font-semibold">
                    {product.name}
                  </p>
                  <h3 className="text-black text-2xl font-bold mt-1">
                    {product.model}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center">
              <p className="text-center text-gray-500">
                {dictionary.no_products}
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-16">
          <a
            href="#"
            className="text-blue-600 font-bold text-sm hover:underline"
          >
            {dictionary.view_all_button}
          </a>
        </div>
      </div>
    </section>
  );
};

export default PopularEquipment;
