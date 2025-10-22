// lib/product-data.js
import 'server-only';

// Update import paths: ganti ../ jadi @/data/equipment/
import forkliftData from '@/data/equipment/forklift.json';
import miniExcavatorData from '@/data/equipment/mini-excavator.json';
import excavatorData from '@/data/equipment/excavator.json';
import wheelLoaderData from '@/data/equipment/wheel-loader.json';
import bulldozerData from '@/data/equipment/bulldozer.json';
import craneData from '@/data/equipment/crane.json';
import skidSteerLoaderData from '@/data/equipment/skid-steer-loader.json';
import boomLiftData from '@/data/equipment/boom-lift.json';
import telehandlerData from '@/data/equipment/telehandler.json';
import crawlerCraneData from '@/data/equipment/crawler-crane.json';
import telescopicCrawlerCraneData from '@/data/equipment/telescopic-crawler-crane.json';
import concretePumpMixerData from '@/data/equipment/concrete-pump-mixer.json';
import aerialWorkingPlatformData from '@/data/equipment/aerial-working-platform.json';
import vibroRollerData from '@/data/equipment/vibro-roller.json';
import motorGraderData from '@/data/equipment/motor-grader.json';
import dumpTruckData from '@/data/equipment/dump-truck.json';
import backhoeLoaderData from '@/data/equipment/backhoe-loader.json'; // Tambah import
import reachStackerData from '@/data/equipment/reach-staker.json'; // Tambah import

const allProductsData = {
  forklift: forkliftData.forklifts,
  'mini-excavator': miniExcavatorData.mini_excavators,
  excavator: [
    ...excavatorData.medium_excavators,
    ...excavatorData.large_excavators,
  ],
  'wheel-loader': wheelLoaderData.wheel_loaders,
  bulldozer: bulldozerData.bulldozers,
  crane: craneData.cranes,
  'skid-steer-loader': skidSteerLoaderData.skid_steer_loaders,
  'boom-lift': boomLiftData.boom_lifts,
  telehandler: telehandlerData.telehandlers,
  'crawler-crane': crawlerCraneData.crawler_cranes,
  'telescopic-crawler-crane':
    telescopicCrawlerCraneData.telescopic_crawler_cranes,
  'concrete-pump-mixer': concretePumpMixerData.concrete_pump_mixers,
  'aerial-working-platform': aerialWorkingPlatformData.aerial_working_platforms,
  'vibro-roller': vibroRollerData.vibro_rollers,
  'motor-grader': motorGraderData.motor_graders,
  'dump-truck': dumpTruckData.dump_trucks,
  'backhoe-loader': backhoeLoaderData.backhoe_loaders, // Tambah data
  'reach-stacker': reachStackerData.reach_stackers, // Tambah data
};

// Fungsi untuk mendapatkan semua produk dengan kategori
export const getAllProducts = async () => {
  const allProducts = [];
  for (const category in allProductsData) {
    allProductsData[category].forEach((product) => {
      allProducts.push({ ...product, category });
    });
  }
  return allProducts;
};

// Fungsi untuk mendapatkan satu produk berdasarkan kategori dan model
export const getProduct = async (category, model) => {
  const products = allProductsData[category];
  if (!products) {
    return null;
  }
  const product = products.find((p) => p.model === model);
  return product ? { ...product, category } : null;
};
