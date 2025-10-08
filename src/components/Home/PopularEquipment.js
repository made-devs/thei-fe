'use client';
import React, {
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import Image from 'next/image';
import { Search, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import useEmblaCarousel from 'embla-carousel-react';

const PopularEquipment = ({ dictionary }) => {
  const [activeTab, setActiveTab] = useState(dictionary.tabs[0].id);
  const tabsRef = useRef([]);
  const indicatorRef = useRef(null);
  const productsGridRef = useRef(null);

  // --- Carousel setup ---
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect); // Re-run on re-initialization
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);
  // --- End Carousel setup ---

  const activeTabLabel =
    dictionary.tabs.find((tab) => tab.id === activeTab)?.label || '';

  // Animasi untuk indikator tab dan kartu produk
  useLayoutEffect(() => {
    const activeTabElement =
      tabsRef.current[dictionary.tabs.findIndex((tab) => tab.id === activeTab)];

    // Animasi sliding indicator
    if (activeTabElement && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
        duration: 0.3,
        ease: 'power3.inOut',
      });
    }

    // Animasi fade-in untuk kartu produk (Grid & Carousel)
    const targets = emblaApi
      ? emblaApi.slideNodes()
      : productsGridRef.current?.children;
    if (targets) {
      gsap.fromTo(
        targets,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }
  }, [activeTab, dictionary.tabs, emblaApi]);

  const products = dictionary.products[activeTab] || [];

  // Helper function to render a product card - moved here
  const renderProductCard = (product, index, keyPrefix) => (
    <div key={`${keyPrefix}-${index}`} className="relative group h-full">
      <div
        className={`relative bg-white rounded-2xl p-3 ${
          product.promo
            ? 'border-2 border-yellow-400'
            : 'border border-gray-200'
        } shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full`}
      >
        {product.promo && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black text-xs font-bold px-3 py-1.5 rounded-full z-20 flex items-center gap-1">
            <CheckCircle size={14} />
            <span>{dictionary.best_value_badge}</span>
          </div>
        )}
        <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-4">
          <Image
            src={product.image}
            alt={`${product.name} ${product.model}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 rounded-xl border border-gray-200 text-left mt-auto">
          <h3 className="font-bold text-lg text-black">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.model}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-gray-50 py-20 overflow-x-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black">{dictionary.title}</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            {dictionary.description}
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder={dictionary.search_placeholder}
              className="w-full py-4 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="text-gray-400" size={20} />
            </div>
          </div>
        </div>

        {/* Tab Navigasi dengan wrapper relatif */}
        <div className="relative border-b border-gray-200 mb-12">
          {/* Scrollable container for tabs */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="relative flex justify-start md:justify-center whitespace-nowrap">
              {dictionary.tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  ref={(el) => (tabsRef.current[index] = el)}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-bold transition-colors relative z-10 shrink-0 ${
                    activeTab === tab.id
                      ? 'text-black'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              {/* Elemen indikator absolut */}
              <div
                ref={indicatorRef}
                className="absolute bottom-0 h-1 bg-yellow-400"
                style={{ transition: 'left 0.3s, width 0.3s' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Desktop Grid (Hidden on smaller screens) */}
        <div
          ref={productsGridRef}
          className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[450px]"
        >
          {products.length > 0 ? (
            products.map((product, index) =>
              renderProductCard(product, index, `${activeTab}-desktop`)
            )
          ) : (
            <div className="col-span-full flex items-center justify-center">
              <p className="text-center text-gray-500">
                {dictionary.empty_category_message}
              </p>
            </div>
          )}
        </div>

        {/* Mobile & Tablet Carousel (Hidden on larger screens) */}
        <div className="lg:hidden min-h-[450px]">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div
                    key={`${activeTab}-mobile-${index}`}
                    className="flex-[0_0_80%] sm:flex-[0_0_50%] pl-4 py-4"
                  >
                    {renderProductCard(product, index, `${activeTab}-mobile`)}
                  </div>
                ))
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-center text-gray-500">
                    {dictionary.empty_category_message}
                  </p>
                </div>
              )}
            </div>
          </div>
          {products.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {emblaApi?.scrollSnapList().map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === selectedIndex
                      ? 'w-6 bg-yellow-400'
                      : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-16">
          <a
            href="#"
            className="text-blue-600 font-bold text-sm hover:underline"
          >
            {`${dictionary.view_all_cta} ${activeTabLabel.toUpperCase()} >`}
          </a>
        </div>
      </div>
    </section>
  );
};

export default PopularEquipment;
