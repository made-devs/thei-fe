import React from 'react';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero';
import MainCta from '@/components/features/home/MainCta';
import {
  CheckIcon,
  Wrench,
  ShieldCheck,
  TrendingUp,
  Users,
  Clock,
} from 'lucide-react'; // Asumsi pake lucide-react
import Image from 'next/image';

// Helper untuk memilih ikon
const advantageIcons = {
  'Biaya Ekonomis': <Wrench className="w-8 h-8 text-yellow-400" />,
  'Minim Downtime': <Clock className="w-8 h-8 text-yellow-400" />,
  'Teknisi Bersertifikat': <Users className="w-8 h-8 text-yellow-400" />,
  'Digital Maintenance System': (
    <TrendingUp className="w-8 h-8 text-yellow-400" />
  ),
  'Garansi Performa Unit': <ShieldCheck className="w-8 h-8 text-yellow-400" />,
};

// Helper komponen untuk kartu paket
const PackageCard = ({ title, features }) => (
  <div className="flex flex-col rounded-lg border border-black bg-white shadow-lg overflow-hidden h-full">
    <div className="bg-yellow-400 p-4">
      <h3 className="text-xl font-bold text-black text-center uppercase">
        {title}
      </h3>
    </div>
    <ul className="p-6 space-y-3 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start">
          <CheckIcon className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-1" />
          <span className="text-black">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Helper komponen untuk kartu keunggulan
const AdvantageCard = ({ title, desc, icon }) => (
  <div className="bg-yellow-50 p-6 rounded-lg shadow-md text-center h-full border border-black">
    <div className="flex justify-center mb-4">{icon}</div>
    <h4 className="text-lg font-bold text-black mb-2">{title}</h4>
    <p className="text-gray-700 text-sm">{desc}</p>
  </div>
);

export default async function ContractServicePage({ params }) {
  const { lang } = await params; // <-- wajib di-await!
  const dict = await getDictionary(lang, 'contractService');
  const packages = [
    dict.packages.threeMonth,
    dict.packages.sixMonth,
    dict.packages.oneYear,
  ];

  return (
    <main>
      {/* 1. Hero Section */}
      <PageHero dictionary={dict.hero} />

      {/* 2. Intro Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Content Grid: Image (Left) + Text (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Image - Aspect 4:5 */}
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={dict.intro.image || '/contract-service/image1.webp'}
                alt="Contract Service"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Text Content - Rata Kiri */}
            <div className="text-left space-y-6">
              <h2 className="text-3xl font-bold text-black">
                {dict.intro.title}
              </h2>
              <p className="text-lg text-yellow-400 font-semibold">
                {dict.intro.subtitle}
              </p>
              <div className="text-gray-700 space-y-4 whitespace-pre-line">
                <p>{dict.intro.description}</p>
              </div>

              {/* What Is Section - Pindah ke kolom kanan */}
              <div className=" pt-7 rounded-lg  mt-6">
                <h3 className="text-xl font-bold text-black mb-3">
                  {dict.intro.whatIsTitle}
                </h3>
                <p className="text-gray-700">{dict.intro.whatIsDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Packages Section */}
      <section className="py-20 bg-yellow-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            {dict.packages.title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.title}
                title={pkg.title}
                features={pkg.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Advantages Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            {dict.advantages.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {dict.advantages.items.map((item) => (
              <AdvantageCard
                key={item.title}
                title={item.title}
                desc={item.desc}
                icon={
                  advantageIcons[item.title] || (
                    <Wrench className="w-8 h-8 text-yellow-400" />
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Schemes Section */}
      <section className="py-20 bg-yellow-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            {dict.schemes.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {dict.schemes.items.map((item) => (
              <div
                key={item.title}
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

      {/* Ganti CTA Section manual dengan MainCta */}
      <MainCta dictionary={dict.main_cta} />
    </main>
  );
}
