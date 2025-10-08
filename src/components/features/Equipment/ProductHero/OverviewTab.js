'use client';

const OverviewTab = ({ product, mainSpecs }) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-semibold text-black text-lg">{product.type}</p>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-black mt-2 leading-tight">
          {product.model}
        </h1>
        <p className="mt-4 text-gray-800 leading-relaxed">
          {product.description ||
            `The latest generation of ${product.category.toLowerCase()}, designed for maximum efficiency and power.`}
        </p>
      </div>

      {/* Key Specs */}
      <div>
        <h3 className="text-lg font-bold text-black mb-4">
          Key Specifications
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {mainSpecs.slice(0, 4).map((spec) => (
            <div
              key={spec.label}
              className="flex justify-between py-2 border-b border-gray-200"
            >
              <span className="text-gray-600">{spec.label}:</span>
              <span className="font-bold text-black">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
