import React from 'react';
import PackageCard from './PackageCard';

const PackagesSection = ({ dictionary }) => {
  const packages = [
    dictionary.threeMonth,
    dictionary.sixMonth,
    dictionary.oneYear,
  ];

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-black text-center mb-12">
          {dictionary.title}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.title}
              title={pkg.title}
              subtitle={pkg.subtitle}
              discount={pkg.discount}
              price_before={pkg.price_before}
              price_after={pkg.price_after}
              note={pkg.note}
              features={pkg.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
