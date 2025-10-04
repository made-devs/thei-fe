'use client';
import { Download } from 'lucide-react';

const DownloadTab = ({ product }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-black mb-4">
          Download Resources
        </h3>
        <p className="text-gray-700 mb-6">
          Access detailed technical documentation and marketing materials for
          the {product.model}.
        </p>
      </div>

      <div>
        <a
          href={product.brochure || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center px-6 py-3 bg-black hover:bg-gray-900 text-yellow-400 font-bold rounded-lg shadow transition"
        >
          <Download size={20} className="mr-2" />
          Download Brochure
        </a>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <p className="text-xs text-yellow-400">
          All downloads are in PDF format. For additional technical
          documentation, please contact our technical support team.
        </p>
      </div>
    </div>
  );
};

export default DownloadTab;
