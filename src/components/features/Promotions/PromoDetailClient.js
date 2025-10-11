'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Wrench } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function PromoDetailClient({ promo }) {
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const mainRef = useRef(null);

  // Animasi saat komponen pertama kali dimuat
  useGSAP(
    () => {
      gsap.from('.page-element', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
      });
    },
    { scope: mainRef }
  );

  useEffect(() => {
    setIsLoadingImage(true);
  }, [promo]);

  return (
    <main ref={mainRef} className="bg-black text-white">
      {/* Konten Detail Promo */}
      <section className="page-element py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Kolom Kiri: Gambar Promo */}
              <div className="relative">
                <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover"
                    onLoad={() => setIsLoadingImage(false)}
                  />
                </div>
              </div>

              {/* Kolom Kanan: Detail Promo */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Wrench size={16} className="text-yellow-400" />
                  <p className="font-jakarta text-sm font-bold uppercase tracking-widest text-yellow-400">
                    PROMO DETAILS
                  </p>
                </div>

                <h2 className="font-teko text-3xl lg:text-4xl font-medium uppercase text-white leading-tight mb-6">
                  What You Get
                </h2>

                <p className="font-jakarta text-gray-400 leading-relaxed mb-8">
                  {promo.description}
                </p>

                {/* Details List */}
                {promo.details && promo.details.length > 0 && (
                  <div className="space-y-4 mb-8">
                    {promo.details.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-[#111] border border-gray-800 rounded-lg hover:border-yellow-400 transition-colors duration-300"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="bg-yellow-400 p-2 rounded-full">
                            <Star
                              size={18}
                              className="text-black"
                              fill="currentColor"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-jakarta font-bold text-white text-sm mb-1">
                            {item.title}
                          </h3>
                          <p className="font-jakarta text-gray-400 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <Link
                  href={`/kontak?promo=${promo.slug}`}
                  className="block w-full text-center bg-yellow-400 text-black font-jakarta font-bold text-base px-10 py-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-yellow-600 hover:-translate-y-1 hover:shadow-lg"
                >
                  Claim This Promo Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
