'use client';
import { Mail, Phone, MapPin } from 'lucide-react';

const QuoteTab = ({ product }) => {
  // Pesan otomatis untuk WhatsApp
  const waText = encodeURIComponent(
    `Halo, saya ingin menanyakan penawaran untuk unit ${product.model}.`
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-black mb-4">Request a Quote</h3>
        <p className="text-gray-700 mb-6">
          Get competitive pricing and financing options for the {product.model}.
          Our team will contact you within 24 hours.
        </p>
      </div>

      <div className="space-y-4">
        <a
          href={`https://wa.me/6285195886789?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center px-6 py-3 bg-black hover:bg-gray-900 text-yellow-400 font-bold rounded-lg shadow transition"
        >
          <Phone size={20} className="mr-2" />
          Request Quote via WhatsApp
        </a>

        <div className="border-t pt-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Or contact us directly:
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Phone size={16} className="mr-2" />
              <span>+62 851-9588-6789</span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-2" />
              <span>admin@tjmheavyequipment.com</span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <span>
                Posh, Blk. A, Jl. Pusat Otomotif Sentra Harapan Indah No.2,
                Pejuang, Medan Satria, Bekasi City, West Java 17132
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteTab;
