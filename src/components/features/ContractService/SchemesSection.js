import React from 'react';

const SchemesSection = ({ dictionary }) => {
  return (
    <section className="py-20 bg-yellow-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-black text-center mb-12">
          {dictionary.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {dictionary.items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-400 border"
            >
              <h4 className="text-xl font-bold text-black mb-2">
                {item.title}
              </h4>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchemesSection;
