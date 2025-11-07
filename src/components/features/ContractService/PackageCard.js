import React from 'react';
import { CheckIcon, Tag, Clock } from 'lucide-react';

const PackageCard = ({
  title,
  subtitle,
  discount,
  price_before,
  price_after,
  note,
  features,
}) => {
  // Helper function untuk format harga
  const formatPrice = (price) => {
    if (!price) return '';
    // Hapus semua karakter non-digit, lalu parse ke number
    const numericPrice = parseInt(price.toString().replace(/\D/g, ''), 10);
    return numericPrice.toLocaleString('id-ID');
  };

  return (
    <div className="relative group">
      {/* Discount Badge */}
      {discount && (
        <div className="absolute -top-4 -right-4 z-20">
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border-2 border-white">
            <Tag className="w-4 h-4" />
            <span className="font-bold text-sm">Diskon {discount}</span>
          </div>
        </div>
      )}

      {/* Animated Border */}
      <div className="absolute -inset-[1px] bg-gradient-to-b from-white via-gray-400 to-gray-600 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 animate-border-spin opacity-50"
            style={{
              background:
                'linear-gradient(0deg, transparent 0%, rgb(234 179 8) 40%, rgb(234 179 8) 60%, transparent 100%)',
              height: '300%',
              width: '200%',
              left: '-50%',
              top: '-100%',
            }}
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="relative flex flex-col rounded-2xl bg-gradient-to-br from-black via-black to-gray-900 shadow-2xl overflow-hidden h-full">
        {/* Inner Glow */}
        <div className="absolute inset-0 shadow-[inset_0_-16px_24px_0px_rgba(255,255,255,0.15)] pointer-events-none rounded-2xl" />

        {/* Header */}
        <div className="bg-gradient-to-b from-yellow-400 to-yellow-500 p-6 relative">
          <div className="absolute inset-0 shadow-[inset_0_-2px_25px_-4px_rgba(255,255,255,0.6)]" />
          <div className="relative z-10 space-y-2">
            <h3 className="text-xl font-bold text-gray-900 text-center uppercase">
              {title}
            </h3>
            {subtitle && (
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-gray-800" />
                <p className="text-sm font-semibold text-gray-800">
                  {subtitle}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pricing Section */}
        {(price_before || price_after) && (
          <div className="p-6 bg-gradient-to-b from-black to-gray-900 border-b border-gray-700">
            <div className="text-center space-y-2">
              {price_before && (
                <div className="text-gray-400 line-through text-sm">
                  Rp {formatPrice(price_before)}
                </div>
              )}
              {price_after && (
                <div className="text-3xl font-bold text-yellow-400">
                  Rp {formatPrice(price_after)}
                </div>
              )}
              {note && <p className="text-xs text-gray-500 italic">{note}</p>}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="h-[1px] bg-gray-700 mx-4" />

        {/* Features List */}
        <ul className="p-6 space-y-3 flex-grow overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-800">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex items-center justify-center w-5 h-5 bg-yellow-400 rounded-full flex-shrink-0 mt-0.5">
                <CheckIcon
                  className="w-3.5 h-3.5 text-gray-900"
                  strokeWidth={3}
                />
              </span>
              <span className="text-white text-sm leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <div className="p-6 pt-10">
          <button className="w-full py-3 px-4 bg-gradient-to-b from-yellow-400 to-yellow-200 text-black text-sm font-semibold rounded-full shadow-[inset_0_-2px_25px_-4px_rgba(255,255,255,0.4)] hover:shadow-[inset_0_-2px_25px_-4px_rgba(255,255,255,0.6)] hover:scale-105 transition-all duration-300">
            Pilih Paket
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
