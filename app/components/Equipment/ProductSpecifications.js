'use client';

// Helper untuk mengubah 'rated_capacity' menjadi 'Rated Capacity'
const formatLabel = (key) => {
  if (!key) return '';
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const SpecItem = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex justify-between py-3 border-b border-gray-200">
      <span className="text-gray-600">{label}:</span>
      <span className="font-bold text-black text-right">{value}</span>
    </div>
  );
};

// Komponen untuk me-render satu seksi spesifikasi
const SpecificationSection = ({ title, data }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  return (
    <div className="mb-8 break-inside-avoid">
      <h3 className="text-xl font-bold text-black pb-2 mb-2 border-b">
        {title}
      </h3>
      <div className="space-y-2 text-sm">
        {Object.entries(data).map(([key, value]) => (
          <SpecItem key={key} label={formatLabel(key)} value={value} />
        ))}
      </div>
    </div>
  );
};

const ProductSpecifications = ({ product }) => {
  if (!product) return null;

  // Konfigurasi semua kemungkinan seksi spesifikasi
  const specSections = [
    { title: 'Basic Technical Data', data: product.basic_technical_data },
    { title: 'Performance', data: product.performance },
    { title: 'Speed', data: product.speed },
    { title: 'Gradeability', data: product.gradeability },
    { title: 'Power', data: product.power },
    { title: 'Size', data: product.size },
    { title: 'Dimensions and Blade', data: product.dimensions_and_blade },
    { title: 'Operating Range', data: product.operating_range },
    { title: 'Engine', data: product.engine },
    { title: 'Lifting Performance', data: product.lifting_performance },
    {
      title: 'Dimensions and Performance',
      data: product.dimensions_and_performance,
    },
    { title: 'Size and Performance', data: product.size_and_performance },
    { title: 'Power and Transmission', data: product.power_and_transmission },
    { title: 'Hydraulic and Tanks', data: product.hydraulic_and_tanks },
    { title: 'Tire and Fork', data: product.tire_and_fork },
    { title: 'Working Speed', data: product.working_speed },
    { title: 'Technical Data', data: product.technical_data },
    { title: 'Boom Data', data: product.boom_data },
    { title: 'Pump Data', data: product.pump_data },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1280px]">
        <h2 className="text-3xl font-bold border-b pb-4 mb-8">
          Detailed Specifications
        </h2>

        {/* Menggunakan kolom agar rapi di layar besar */}
        <div className="md:columns-2 md:gap-12">
          {specSections.map(
            (section) =>
              section.data && (
                <SpecificationSection
                  key={section.title}
                  title={section.title}
                  data={section.data}
                />
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSpecifications;
