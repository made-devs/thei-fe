import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero'; // Ganti import dari EquipmentHero ke PageHero
import EquipmentIntro from '@/components/features/Equipment/EquipmentIntro';
import MainCta from '@/components/features/home/MainCta';
import InteractiveEquipmentView from '@/components/features/Equipment/InteractiveEquipmentView';
import { Suspense } from 'react';

// Import data produk dari berbagai kategori alat berat
import forkliftData from '@/data/forklift.json';
import miniExcavatorData from '@/data/mini-excavator.json';
import excavatorData from '@/data/excavator.json';
import aerialWorkingPlatformData from '@/data/aerial-working-platform.json';
import wheelLoaderData from '@/data/wheel-loader.json';
import vibroRollerData from '@/data/vibro-roller.json';
import bulldozerData from '@/data/bulldozer.json';
import craneData from '@/data/crane.json';
import skidSteerLoaderData from '@/data/skid-steer-loader.json';
import boomLiftData from '@/data/boom-lift.json';
import telehandlerData from '@/data/telehandler.json';
import crawlerCraneData from '@/data/crawler-crane.json';
import telescopicCrawlerCraneData from '@/data/telescopic-crawler-crane.json';
import concretePumpMixerData from '@/data/concrete-pump-mixer.json';
import motorGraderData from '@/data/motor-grader.json';
import dumpTruckData from '@/data/dump-truck.json';

// Komponen utama halaman "New Machines"
export default async function NewMachinesPage({ params }) {
  // Ambil parameter bahasa dari URL
  const { lang } = await params;

  // Ambil dictionary untuk halaman new machines sesuai bahasa
  const dictionary = await getDictionary(lang, 'new-machines');
  const newMachinesDict = dictionary.new_machines_page || {};

  // Ambil dictionary untuk homepage (untuk CTA di bawah)
  const homeDictionary = await getDictionary(lang, 'homepage');

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
