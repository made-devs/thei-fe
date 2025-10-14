'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image'; // Tambah import Image
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Eye,
  Clock,
  X,
} from 'lucide-react';

const HeroPromos = ({ promos, dictionary, lang, title, description }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [savedPromos, setSavedPromos] = useState([]);
  const [selectedPromo, setSelectedPromo] = useState(null); // State untuk modal detail

  // Auto-slide setiap 5 detik - hanya jika lebih dari 1 promo
  useEffect(() => {
    if (promos.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % promos.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [promos.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promos.length) % promos.length);
  };

  const toggleSave = (id) => {
    setSavedPromos((prev) =>
      prev.includes(id)
        ? prev.filter((promoId) => promoId !== id)
        : [...prev, id]
    );
  };

  const sendWhatsApp = (promo) => {
    const messages = {
      Makanan: `Halo, mau order promo ${
        promo.title || 'ini'
      }. Untuk berapa orang dan jam berapa tersedia?`,
      Fashion: `Halo, saya tertarik promo ${
        promo.title || 'ini'
      }. Masih ready stock? Bisa COD?`,
      Elektronik: `Halo, saya mau beli promo ${
        promo.title || 'ini'
      }. Garansi resmi kan? Bisa cicilan?`,
      Service: `Halo, mau booking promo ${
        promo.title || 'ini'
      }. Kapan slot terdekat yang available?`,
    };

    const message =
      messages[promo.category] ||
      `Halo, saya tertarik dengan promo ini. Bisa info lebih lanjut?`;
    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
      message
    )}`;
    window.open(waUrl, '_blank');
  };

  const openDetail = (promo) => {
    setSelectedPromo(promo);
  };

  const closeDetail = () => {
    setSelectedPromo(null);
  };

  if (!promos || promos.length === 0) return null;

  return (
    <>
      <section className="bg-white py-6 mt-[3rem]">
        <div className="max-w-7xl mx-auto px-4 relative">
          {/* Judul dan Deskripsi - Sesuaikan ukuran font dengan EquipmentIntro */}
          {title && (
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                {title}
              </h2>
              {description && (
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Slider */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl mx-8 md:mx-12">
            <div className="relative h-80 md:h-96">
              {promos.map((promo, index) => (
                <div
                  key={promo.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover"
                  />
                  {/* Gradasi lebih pekat di bawah untuk readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 text-yellow-300 drop-shadow-lg">
                      {promo.title}
                    </h2>
                    <p className="text-lg md:text-xl mb-4 text-gray-200 drop-shadow-md">
                      {promo.tagline}
                    </p>

                    {/* Kondisi: Jika ada price, tampilkan harga; jika tidak, tampilkan description */}
                    {promo.price ? (
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          {promo.originalPrice && (
                            <span className="text-sm line-through text-gray-400 drop-shadow-sm">
                              {promo.originalPrice}
                            </span>
                          )}
                          <div className="text-3xl font-bold drop-shadow-lg">
                            {promo.price}
                          </div>
                        </div>
                      </div>
                    ) : (
                      promo.description && (
                        <p className="text-base md:text-base md:pr-[7rem] mb-4 text-gray-200 drop-shadow-md">
                          {promo.description}
                        </p>
                      )
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => sendWhatsApp(promo)}
                        className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition drop-shadow-lg"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Chat WhatsApp
                      </button>
                      <button
                        onClick={() => openDetail(promo)}
                        className="px-6 py-3 bg-black/30 backdrop-blur-sm hover:bg-black/40 rounded-lg font-semibold transition drop-shadow-lg"
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots - Sembunyikan jika hanya 1 promo */}
            {promos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {promos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition drop-shadow-sm ${
                      index === currentSlide
                        ? 'bg-yellow-400 w-8'
                        : 'bg-black/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Slider Controls - Sembunyikan jika hanya 1 promo */}
          {promos.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-yellow-400/80 backdrop-blur-sm rounded-full hover:bg-yellow-400 transition drop-shadow-lg"
              >
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-yellow-400/80 backdrop-blur-sm rounded-full hover:bg-yellow-400 transition drop-shadow-lg"
              >
                <ChevronRight className="w-6 h-6 text-black" />
              </button>
            </>
          )}
        </div>
      </section>

      {/* Modal Detail - Hanya gambar */}
      {selectedPromo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl">
            <button
              onClick={closeDetail}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={selectedPromo.imageDetail || selectedPromo.image}
              alt={selectedPromo.title}
              width={700}
              height={500}
              className="object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HeroPromos;
