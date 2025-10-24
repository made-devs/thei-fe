'use client';

import { useState, useCallback, useEffect } from 'react';
import { MapPin, Briefcase } from 'lucide-react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const OpenPositions = ({ dictionary }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [formData, setFormData] = useState({
    nama: '',
    domisili: '',
    bagian: '',
  });

  const selectedPosition = dictionary?.positions[selectedIndex];
  const images = selectedPosition?.images || [];

  // Auto-update bagian saat selectedIndex berubah
  useEffect(() => {
    if (selectedPosition) {
      setFormData((prev) => ({
        ...prev,
        bagian: selectedPosition.title,
      }));
    }
  }, [selectedIndex, selectedPosition]);

  // Setup Embla Carousel jika ada lebih dari 1 gambar
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: images.length > 1,
      align: 'start',
      slidesToScroll: 1,
    },
    images.length > 1
      ? [Autoplay({ delay: 4000, stopOnInteraction: true })]
      : []
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const message = `Nama: ${formData.nama}\nDomisili: ${formData.domisili}\nBagian yang dilamar: ${formData.bagian}\nSaya ingin melamar posisi ini.`;
    const waUrl = `https://wa.me/6285195886789?text=${encodeURIComponent(
      message
    )}`;
    window.open(waUrl, '_blank');
  };

  if (!dictionary) return null;

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-8 sm:mb-12">
          <p className="font-semibold tracking-widest uppercase text-yellow-400 text-xs sm:text-sm">
            {dictionary.subtitle}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mt-2 text-black">
            {dictionary.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            {dictionary.description}
          </p>
        </div>

        {/* Kolom Daftar Lowongan - Center Horizontal */}
        <div className="mb-12 flex justify-center overflow-x-auto">
          <div className="flex gap-3 pb-4">
            {dictionary.positions.map((pos, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`px-4 sm:px-6 py-3 rounded-lg border-2 transition-all text-left whitespace-nowrap flex-shrink-0 ${
                  selectedIndex === index
                    ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-yellow-300 hover:shadow-md'
                }`}
              >
                <h3
                  className={`font-bold text-sm sm:text-base ${
                    selectedIndex === index ? 'text-black' : 'text-gray-800'
                  }`}
                >
                  {pos.title}
                </h3>
              </button>
            ))}
          </div>
        </div>

        {/* Card: Image + Form */}
        <div className="mx-auto max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Kolom Poster/Gambar - Sisi Kiri */}
            <div className="relative w-full aspect-[4/5] bg-gray-200">
              {images.length > 1 ? (
                <div
                  className="embla overflow-hidden w-full h-full"
                  ref={emblaRef}
                >
                  <div className="embla__container flex h-full">
                    {images.map((img, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="embla__slide min-w-0 w-full relative flex-[0_0_100%]"
                      >
                        <Image
                          src={img}
                          alt={`${selectedPosition?.title} - Image ${
                            imgIndex + 1
                          }`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={imgIndex === 0}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={scrollPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
                  >
                    ‹
                  </button>
                  <button
                    onClick={scrollNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
                  >
                    ›
                  </button>
                </div>
              ) : (
                <Image
                  src={images[0] || '/placeholder.webp'}
                  alt={selectedPosition?.title || 'Position Image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              )}
            </div>

            {/* Form Lamaran - Sisi Kanan */}
            <div className="p-6 sm:p-8 flex flex-col justify-center min-h-[500px]">
              <h3 className="text-lg sm:text-xl font-bold mb-6 text-black">
                {dictionary.form.title}
              </h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dictionary.form.nama_label}
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleFormChange}
                    required
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dictionary.form.domisili_label}
                  </label>
                  <input
                    type="text"
                    name="domisili"
                    value={formData.domisili}
                    onChange={handleFormChange}
                    required
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dictionary.form.bagian_label}
                  </label>
                  <input
                    type="text"
                    name="bagian"
                    value={formData.bagian}
                    readOnly
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 text-sm text-gray-700"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-md transition-colors mt-6"
                >
                  {dictionary.form.submit_button}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenPositions;
