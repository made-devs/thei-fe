'use client';

// Helper untuk format label spesifikasi
const formatLabel = (key) => {
  if (!key) return '';
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

// Komponen SpecItem untuk tab Specs
const SpecItem = ({ label, value }) => {
  if (!value) return null;

  // Jika value adalah objek, render isinya secara rekursif
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return (
      <div className="pl-3 border-l-2 border-yellow-300 mt-2">
        <span className="text-gray-700 font-semibold text-sm">{label}:</span>
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

  return (
    <div className="flex justify-between py-2 border-b border-gray-800">
      <span className="text-gray-700 text-base">{label}:</span>
      <span className="font-semibold text-black text-base text-right">
        {String(value)}
      </span>
    </div>
  );
};

// Komponen untuk satu section spesifikasi
const SpecificationSection = ({ title, data }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h4 className="text-lg font-bold text-black pb-2 mb-3 border-b-2 border-gray-900">
        {title}
      </h4>
      <div className="space-y-1">
        {Object.entries(data).map(([key, value]) => (
          <SpecItem key={key} label={formatLabel(key)} value={value} />
        ))}
      </div>
    </div>
  );
};

const SpecsTab = ({ specSections }) => {
  return (
    <div
      className="space-y-6 max-h-96 overflow-y-auto pr-6"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#FFD600 #fff',
      }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 8px;
        }
        div::-webkit-scrollbar-thumb {
          background: #ffd600;
          border-radius: 8px;
        }
        div::-webkit-scrollbar-track {
          background: #fff;
        }
      `}</style>
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
  );
};

export default SpecsTab;
