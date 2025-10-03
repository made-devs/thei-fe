"use client";

// Helper untuk mengubah 'rated_capacity' menjadi 'Rated Capacity'
const formatLabel = (key) => {
  if (!key) return "";
  return key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const SpecItem = ({ label, value }) => {
  if (!value) return null;

  // Jika value adalah objek, render isinya secara rekursif
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return (
      <div className="pl-4 border-l-2 border-gray-200 mt-2">
        <span className="text-gray-600 font-semibold">{label}:</span>
        <div className="space-y-1 mt-1">
          {Object.entries(value).map(([nestedKey, nestedValue]) => (
            <SpecItem
              key={nestedKey}
              label={formatLabel(nestedKey)}
              value={nestedValue}
            />
          ))}
        </div>
      </div>
    );
  }

  // Jika value adalah string atau angka, render seperti biasa
  return (
    <div className="flex justify-between py-2 border-b border-gray-100">
      <span className="text-gray-600">{label}:</span>
      <span className="font-semibold text-black text-right">
        {String(value)}
      </span>
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
      <div className="space-y-1 text-sm">
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
  const categorySpecSections = {
    forklift: [
      { title: "Performance", dataKey: "performance" },
      { title: "Speed", dataKey: "speed" },
      { title: "Gradeability", dataKey: "gradeability" },
      { title: "Power", dataKey: "power" },
      { title: "Size", dataKey: "size" },
    ],
    "mini-excavator": [
      { title: "Basic Technical Data", dataKey: "basic_technical_data" },
      { title: "Operating Range", dataKey: "operating_range" },
      { title: "Engine", dataKey: "engine" },
    ],
    excavator: [
      { title: "Basic Technical Data", dataKey: "basic_technical_data" },
      { title: "Operating Range", dataKey: "operating_range" },
      { title: "Engine", dataKey: "engine" },
    ],
    "wheel-loader": [
      { title: "Basic Technical Data", dataKey: "basic_technical_data" },
      { title: "Dimensions", dataKey: "dimensions" },
      { title: "Operating Range", dataKey: "operating_range" },
      { title: "Engine", dataKey: "engine" },
    ],
    bulldozer: [
      { title: "Basic Technical Data", dataKey: "basic_technical_data" },
      { title: "Dimensions and Blade", dataKey: "dimensions_and_blade" },
      { title: "Engine", dataKey: "engine" },
    ],
    crane: [
      { title: "Lifting Performance", dataKey: "lifting_performance" },
      { title: "Engine", dataKey: "engine" },
    ],
    "skid-steer-loader": [
      { title: "Basic Technical Data", dataKey: "basic_technical_data" },
      {
        title: "Dimensions and Performance",
        dataKey: "dimensions_and_performance",
      },
      { title: "Engine", dataKey: "engine" },
    ],
    "boom-lift": [
      { title: "Size and Performance", dataKey: "size_and_performance" },
      { title: "Power and Transmission", dataKey: "power_and_transmission" },
      { title: "Hydraulic and Tanks", dataKey: "hydraulic_and_tanks" },
    ],
    telehandler: [
      { title: "Performance", dataKey: "performance" },
      { title: "Dimensions", dataKey: "dimensions" },
      { title: "Engine", dataKey: "engine" },
      { title: "Tire and Fork", dataKey: "tire_and_fork" },
    ],
    "crawler-crane": [
      { title: "Technical Data", dataKey: "technical_data" },
      { title: "Engine", dataKey: "engine" },
    ],
    "telescopic-crawler-crane": [
      { title: "Boom Data", dataKey: "boom_data" },
      { title: "Engine", dataKey: "engine" },
    ],
    "concrete-pump-mixer": [
      { title: "Pump Data", dataKey: "pump_data" },
      { title: "Engine", dataKey: "engine" },
    ],
    "aerial-working-platform": [
      { title: "Size", dataKey: "size" },
      { title: "Weight and Pressure", dataKey: "weight_and_pressure" },
      { title: "Performance", dataKey: "performance" },
      { title: "Power", dataKey: "power" },
      { title: "Undercarriage", dataKey: "undercarriage" },
    ],
    "vibro-roller": [
      { title: "Load Data", dataKey: "load_data" },
      { title: "Compaction Data", dataKey: "compaction_data" },
      { title: "Maneuverability", dataKey: "maneuverability_data" },
      { title: "Engine Details", dataKey: "engine_data" },
      { title: "Capacities", dataKey: "capacities_data" },
    ],
    "motor-grader": [
      {
        title: "Power System Specification",
        dataKey: "power_system_specification",
      },
      { title: "Dimensions", dataKey: "dimensions" },
      { title: "Load Specification (STG140C-8S)", dataKey: "load_spec" }, // untuk STG140C-8S
      {
        title: "Load Specification (Other Models)",
        dataKey: "load_specification",
      }, // untuk model lain
      {
        title: "Operating Device Specification",
        dataKey: "operating_device_specification",
      },
      { title: "Running Specification", dataKey: "running_specification" },
      { title: "Tank Capacity", dataKey: "tank_capacity" },
    ],
  };

  const sectionsForCategory = categorySpecSections[product.category] || [];

  const specSections = sectionsForCategory.map((config) => ({
    title: config.title,
    data: product[config.dataKey],
  }));

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
