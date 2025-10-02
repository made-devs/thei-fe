// lib/product-data.js
import 'server-only';

// Impor semua data JSON produk
import forkliftData from '../app/data/forklift.json';
import miniExcavatorData from '../app/data/mini-excavator.json';
import excavatorData from '../app/data/excavator.json';
import wheelLoaderData from '../app/data/wheel-loader.json';
import bulldozerData from '../app/data/bulldozer.json';
import craneData from '../app/data/crane.json';
import skidSteerLoaderData from '../app/data/skid-steer-loader.json';
import boomLiftData from '../app/data/boom-lift.json';
import telehandlerData from '../app/data/telehandler.json';
import crawlerCraneData from '../app/data/crawler-crane.json';
import telescopicCrawlerCraneData from '../app/data/telescopic-crawler-crane.json';
import concretePumpMixerData from '../app/data/concrete-pump-mixer.json';
import aerialWorkingPlatformData from '../app/data/aerial-working-platform.json';
import vibroRollerData from '../app/data/vibro-roller.json';

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
  'vibro-roller': vibroRollerData.vibro_rollers, // 2. Daftarkan data baru
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
