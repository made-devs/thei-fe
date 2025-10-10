import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero'; // Ganti import dari EquipmentHero ke PageHero
import HeroPromos from '@/components/ui/HeroPromos'; // Import komponen baru
import EquipmentIntro from '@/components/features/Equipment/EquipmentIntro';
import MainCta from '@/components/features/home/MainCta';
import InteractiveEquipmentView from '@/components/features/Equipment/InteractiveEquipmentView';
import { Suspense } from 'react';

// Import data produk dari berbagai kategori alat berat
import forkliftData from '@/data/equipment/forklift.json';
import miniExcavatorData from '@/data/equipment/mini-excavator.json';
import excavatorData from '@/data/equipment/excavator.json';
import aerialWorkingPlatformData from '@/data/equipment/aerial-working-platform.json';
import wheelLoaderData from '@/data/equipment/wheel-loader.json';
import vibroRollerData from '@/data/equipment/vibro-roller.json';
import bulldozerData from '@/data/equipment/bulldozer.json';
import craneData from '@/data/equipment/crane.json';
import skidSteerLoaderData from '@/data/equipment/skid-steer-loader.json';
import boomLiftData from '@/data/equipment/boom-lift.json';
import telehandlerData from '@/data/equipment/telehandler.json';
import crawlerCraneData from '@/data/equipment/crawler-crane.json';
import telescopicCrawlerCraneData from '@/data/equipment/telescopic-crawler-crane.json';
import concretePumpMixerData from '@/data/equipment/concrete-pump-mixer.json';
import motorGraderData from '@/data/equipment/motor-grader.json';
import dumpTruckData from '@/data/equipment/dump-truck.json';

// Komponen utama halaman "New Machines"
export default async function NewMachinesPage({ params }) {
  // Ambil parameter bahasa dari URL
  const { lang } = await params;

  // Ambil dictionary untuk halaman new machines sesuai bahasa
  const dictionary = await getDictionary(lang, 'new-machines');
  const newMachinesDict = dictionary.new_machines_page || {};

  // Ambil dictionary untuk homepage (untuk CTA di bawah)
  const homeDictionary = await getDictionary(lang, 'homepage');

  // Data promo dummy untuk equipment (bisa diambil dari dictionary atau API)
  const equipmentPromos = [
    {
      id: 'p1',
      title: 'Promo Grand Opening',
      tagline: 'Pembelian Alat Berat (All Type) S/D Rp 250.000.000,-',
      discount: '30%',
      image: '/promo/promo-products.webp', // Ganti dengan path gambar yang sesuai
      description:
        'Promo Grand Opening THEI! Hemat puluhan juta dengan diskon alat berat hingga 30%. Dapatkan juga bonus lengkap: gratis training operator, bebas ongkir Jabodetabek, paket hadiah eksklusif, dan layanan purna jual VIP. Penawaran paling menguntungkan untuk bisnis Anda!',
      imageDetail: '/promo/promo1.webp',
      expiry: '7 hari lagi',
      views: 2450,
    },
  ];

  // Ambil daftar kategori alat berat dari dictionary
  const equipmentCategories = newMachinesDict.types || [];

  // Gabungkan semua data produk ke dalam satu objek berdasarkan kategori
  const productData = {
    'Motor Grader': motorGraderData.motor_graders,
    Forklift: forkliftData.forklifts,
    'Mini Excavator': miniExcavatorData.mini_excavators,
    Excavator: [
      ...excavatorData.medium_excavators,
      ...excavatorData.large_excavators,
    ],
    'Aerial Working Platform':
      aerialWorkingPlatformData.aerial_working_platforms,
    'Wheel Loader': wheelLoaderData.wheel_loaders,
    'Vibro Roller': vibroRollerData.vibro_rollers,
    Bulldozer: bulldozerData.bulldozers,
    Crane: craneData.cranes,
    'Skid Steer Loader': skidSteerLoaderData.skid_steer_loaders,
    'Boom Lift': boomLiftData.boom_lifts,
    Telehandler: telehandlerData.telehandlers,
    'Crawler Crane': crawlerCraneData.crawler_cranes,
    'Telescopic Crawler Crane':
      telescopicCrawlerCraneData.telescopic_crawler_cranes,
    'Concrete Pump & Mixer': concretePumpMixerData.concrete_pump_mixers,
    'Dump Truck': dumpTruckData.dump_trucks, // Tambahkan ini
  };

  return (
    <>
      {newMachinesDict.hero && (
        <PageHero dictionary={newMachinesDict.hero} /> // Ganti EquipmentHero dengan PageHero
      )}

      <HeroPromos promos={equipmentPromos} />

      {newMachinesDict.intro && (
        <EquipmentIntro dictionary={newMachinesDict.intro} />
      )}

      {/* Kirim semua data produk ke komponen */}
      <Suspense fallback={<div>Loading...</div>}>
        <InteractiveEquipmentView
          categories={equipmentCategories}
          productData={productData}
          lang={lang}
        />
      </Suspense>

      {homeDictionary.main_cta && (
        <MainCta dictionary={homeDictionary.main_cta} />
      )}
    </>
  );
}
