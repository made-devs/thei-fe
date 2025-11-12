'use client';
import Image from 'next/image';
import {
  ShoppingCart,
  Wrench,
  Repeat,
  Truck,
  Phone,
  MapPin,
  Gift,
  CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';

const CollaborationBenefits = ({ dictionary }) => {
  const [activeTab, setActiveTab] = useState('pembelian');

  const promoCategories = {
    pembelian: {
      title: 'Pembelian Alat Berat',
      bonus: 'Bonus hingga Rp1 Miliar',
      icon: <ShoppingCart size={24} className="text-yellow-500" />,
      benefits: [
        'Diamond & Exclusive Car Care',
        'Free Gift Pack & Branding Unit',
        'Diskon hingga 30%',
        'Free Training Operator',
      ],
    },
    service: {
      title: 'Service & Kontrak Service',
      bonus: 'Bonus hingga Rp100 Juta',
      icon: <Wrench size={24} className="text-yellow-500" />,
      benefits: [
        'Silver–Gold–Platinum Car Care',
        'Free Inspeksi & Rust Remover',
        'Diskon Service & Sparepart',
        'After-Sales Tanpa Hari Libur',
      ],
    },
    tradein: {
      title: 'Trade-In Unit Lama',
      bonus: 'Bonus hingga Rp100 Juta',
      icon: <Repeat size={24} className="text-yellow-500" />,
      benefits: [
        'Platinum Car Care',
        'Free Inspeksi & Pick-Up Unit',
        'Appraisal Harga Tinggi',
        'Garansi Unit Terbaru',
      ],
    },
    rental: {
      title: 'Rental Alat Berat',
      bonus: 'Bonus hingga Rp100 Juta',
      icon: <Truck size={24} className="text-yellow-500" />,
      benefits: [
        'Free Antar–Jemput Unit',
        'Unit Replacement Guarantee',
        'Safety Kit Lengkap',
        'Diskon Rental 20% + Digital Report',
      ],
    },
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
            Bagaimana Cara Mendapatkan Semua Promo di THEI?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto">
            Program promo terbesar di Indonesia — total hingga{' '}
            <span className="font-bold text-yellow-600">Rp1 Miliar</span> bonus
            lintas ekosistem untuk pembelian, service, rental, dan trade-in alat
            berat.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Left Side - Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Step 1: Promo Categories */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-yellow-400 text-black font-bold text-lg sm:text-xl w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                  1
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-black">
                  Pilih Program Promo Anda
                </h3>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {Object.entries(promoCategories).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      activeTab === key
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200 hover:border-yellow-300'
                    }`}
                  >
                    {data.icon}
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">
                      {data.title.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Tab Content */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 sm:p-6 border-2 border-yellow-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-yellow-400 p-2 rounded-lg">
                    {promoCategories[activeTab].icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg text-black">
                      {promoCategories[activeTab].title}
                    </h4>
                    <p className="text-yellow-700 font-semibold text-sm sm:text-base">
                      {promoCategories[activeTab].bonus}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {promoCategories[activeTab].benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-gray-700"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-green-600 flex-shrink-0 mt-0.5"
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step 2: Cara Daftar */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-400 text-black font-bold text-lg sm:text-xl w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                  2
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-black">
                  Cara Mendaftar
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base text-gray-700">
                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-yellow-500 flex-shrink-0" />
                  <p>
                    Hubungi tim THEI atau isi{' '}
                    <span className="font-semibold">
                      formulir reservasi resmi
                    </span>{' '}
                    di website
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Gift size={20} className="text-yellow-500 flex-shrink-0" />
                  <p>
                    Pilih program (Pembelian / Service / Trade-In / Rental),
                    tentukan lokasi & jadwal
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-green-600 flex-shrink-0"
                  />
                  <p>
                    Dapatkan <span className="font-semibold">kode promo</span>{' '}
                    resmi untuk aktivasi otomatis semua bonus
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Area Layanan */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 sm:p-8 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={24} className="text-blue-600" />
                <h3 className="text-lg sm:text-xl font-bold text-black">
                  Area Layanan
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex items-start gap-2">
                  <CheckCircle2
                    size={18}
                    className="text-green-600 flex-shrink-0 mt-0.5"
                  />
                  <p className="text-gray-700">
                    <span className="font-semibold">Jabodetabek:</span> Free
                    pengiriman, inspeksi & training
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2
                    size={18}
                    className="text-green-600 flex-shrink-0 mt-0.5"
                  />
                  <p className="text-gray-700">
                    <span className="font-semibold">Luar Jabodetabek:</span>{' '}
                    Semua promo tetap berlaku dengan penyesuaian logistik
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="sticky top-24">
            <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[70vh] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/promo/giftpack.webp"
                alt="THEI Promo Gift Pack"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold drop-shadow-lg">
                  Program Promo Eksklusif THEI
                </p>
                <p className="text-sm sm:text-base opacity-90 mt-2">
                  Bonus Lintas Ekosistem TJM Group
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationBenefits;
