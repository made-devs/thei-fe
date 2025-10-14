import { Suspense } from 'react'; // Tambah import Suspense
import { getDictionary } from '@/lib/dictionary';
import MainCta from '@/components/features/home/MainCta';
import PageHero from '@/components/ui/PageHero'; // Ganti import dari PartsHero ke PageHero
import InteractivePartsView from '@/components/features/Parts/InteractivePartsView'; // Tambahkan import InteractivePartsView
import KeyFeatures from '@/components/features/Parts/KeyFeatures';
import PartsCategoryGrid from '@/components/features/Parts/PartsCategoryGrid';
import FastMovers from '@/components/features/Parts/FastMovers';

// Import data parts
import forkliftData from '@/data/parts/forklift-parts.json';
import miniExcavatorData from '@/data/parts/mini-excavator-parts.json';
import excavatorData from '@/data/parts/excavator-parts.json';
import wheelLoaderData from '@/data/parts/wheel-loader-parts.json';
import bulldozerData from '@/data/parts/bulldozer-parts.json';
import dumpTruckData from '@/data/parts/dump-truck-parts.json';
import motorGraderData from '@/data/parts/motor-grader-parts.json';
import vibroRollerData from '@/data/parts/vibro-roller-parts.json';
import craneData from '@/data/parts/crane-parts.json';
import concretePumpData from '@/data/parts/concrete-pump-parts.json';
import backhoeLoaderData from '@/data/parts/backhoe-loader-parts.json';
import telehandlerData from '@/data/parts/telehandler-parts.json';
import boomLiftData from '@/data/parts/boom-lift-parts.json';
import reachStackerData from '@/data/parts/reach-stacker-parts.json'; // Tambah import reach stacker

export default async function PartsPage({ params }) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang, 'parts');
  const partsDict = dictionary.parts_page || {};
  const commonDict = dictionary || {};

  // Hardcode categories sementara sampai dictionary parts.json diupdate
  const categories = [
    { name: 'Forklift' },
    { name: 'Mini Excavator' },
    { name: 'Excavator' },
    { name: 'Bulldozer' },
    { name: 'Crane' },
    { name: 'Wheel Loader' },
    { name: 'Dump Truck' },
    { name: 'Motor Grader' },
    { name: 'Vibro Roller' },
    { name: 'Concrete Pump' },
    { name: 'Backhoe Loader' },
    { name: 'Telehandler' },
    { name: 'Boom Lift' },
    { name: 'Reach Stacker' }, // Tambah kategori Reach Stacker
  ];

  // Gabungkan data parts ke dalam objek berdasarkan kategori
  const partsData = {
    Forklift: forkliftData.forklifts || forkliftData,
    'Mini Excavator': miniExcavatorData.miniExcavators || miniExcavatorData,
    Excavator: excavatorData.excavatators || excavatorData,
    'Wheel Loader': wheelLoaderData.wheelLoaders || wheelLoaderData,
    Bulldozer: bulldozerData.bulldozers || bulldozerData,
    'Dump Truck': dumpTruckData.dumpTrucks || dumpTruckData,
    'Motor Grader': motorGraderData.motorGraders || motorGraderData,
    'Vibro Roller': vibroRollerData.vibroRollers || vibroRollerData,
    Crane: craneData.cranes || craneData,
    'Concrete Pump': concretePumpData.concretePumps || concretePumpData,
    'Backhoe Loader': backhoeLoaderData.backhoeLoaders || backhoeLoaderData,
    Telehandler: telehandlerData.telehandlers || telehandlerData,
    'Boom Lift': boomLiftData.boomLifts || boomLiftData,
    'Reach Stacker': reachStackerData.reachStackers || reachStackerData, // Tambah data reach stacker
  };

  return (
    <>
      <PageHero dictionary={partsDict.hero} />{' '}
      {/* Ganti PartsHero dengan PageHero */}
      <Suspense
        fallback={
          <div className="container mx-auto px-6 py-12 text-center">
            Loading...
          </div>
        }
      >
        <InteractivePartsView
          categories={categories}
          partsData={partsData}
          lang={lang}
        />{' '}
      </Suspense>
      {/* Tambahkan InteractivePartsView setelah PageHero */}
      <PartsCategoryGrid dictionary={partsDict.category_section} />
      <KeyFeatures dictionary={partsDict.features_section} />
      <FastMovers dictionary={partsDict.fast_movers_section} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
