'use client';
import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

const PriceDisplay = ({ priceString }) => {
  if (!priceString) return null;
  const number = parseInt(priceString.replace(/[^0-9]/g, ''), 10);
  const fullPrice = number * 1000000;
  const formatted = new Intl.NumberFormat('id-ID').format(fullPrice);

  const parts = formatted.split('.');
  const mainDigits = parts[0];
  const trailingDigits = `.${parts.slice(1).join('.')},-`;

  return (
    <div className="flex items-baseline">
      <span className="text-lg font-bold text-black mr-1 self-start">Rp</span>
      <span className="text-3xl font-extrabold text-black leading-none">
        {mainDigits}
      </span>
      <span className="text-lg font-bold text-black">{trailingDigits}</span>
    </div>
  );
};

const PromoPackages = ({ dictionary }) => {
  if (!dictionary || !dictionary.list) return null;

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black">{dictionary.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {dictionary.list.map((pkg, index) => {
            const isDiamond = pkg.name === 'DIAMOND';
            return (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg flex flex-col relative text-left transition-transform duration-300 ${
                  isDiamond
                    ? 'lg:scale-105 border-4 border-yellow-400'
                    : 'hover:scale-105'
                }`}
              >
                <div className="p-6 flex flex-col flex-grow">
                  {isDiamond && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-4 py-1 rounded-full">
                      {dictionary.best_value}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-black">{pkg.name}</h3>
                  <p className="text-gray-600 text-xs mt-2 h-10">
                    {pkg.description}
                  </p>

                  <div className="my-4">
                    <PriceDisplay priceString={pkg.price} />
                  </div>

                  <button
                    className={`w-full py-2.5 my-2 font-bold rounded-lg transition-colors ${
                      isDiamond
                        ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                        : 'bg-gray-800 text-white hover:bg-black'
                    }`}
                  >
                    {dictionary.button_text}
                  </button>

                  <hr className="my-4 border-gray-200" />

                  <div className="flex-grow">
                    <p className="text-xs font-semibold mb-3 text-black">
                      {dictionary.what_included}
                    </p>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start">
                          <Check
                            size={16}
                            className="text-green-500 mr-2 flex-shrink-0 mt-0.5"
                          />
                          <span className="text-gray-600 text-xs">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromoPackages;
