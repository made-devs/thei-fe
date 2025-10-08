// lib/product-data.js
import "server-only";

// Update import paths: ganti ../ jadi @/data/
import forkliftData from "@/data/forklift.json";
import miniExcavatorData from "@/data/mini-excavator.json";
import excavatorData from "@/data/excavator.json";
import wheelLoaderData from "@/data/wheel-loader.json";
import bulldozerData from "@/data/bulldozer.json";
import craneData from "@/data/crane.json";
import skidSteerLoaderData from "@/data/skid-steer-loader.json";
import boomLiftData from "@/data/boom-lift.json";
import telehandlerData from "@/data/telehandler.json";
import crawlerCraneData from "@/data/crawler-crane.json";
import telescopicCrawlerCraneData from "@/data/telescopic-crawler-crane.json";
import concretePumpMixerData from "@/data/concrete-pump-mixer.json";
import aerialWorkingPlatformData from "@/data/aerial-working-platform.json";
import vibroRollerData from "@/data/vibro-roller.json";
import motorGraderData from "@/data/motor-grader.json";
import dumpTruckData from "@/data/dump-truck.json";

const allProductsData = {
  forklift: forkliftData.forklifts,
  "mini-excavator": miniExcavatorData.mini_excavators,
  excavator: [
    ...excavatorData.medium_excavators,
    ...excavatorData.large_excavators,
  ],
  "wheel-loader": wheelLoaderData.wheel_loaders,
  bulldozer: bulldozerData.bulldozers,
  crane: craneData.cranes,
  "skid-steer-loader": skidSteerLoaderData.skid_steer_loaders,
  "boom-lift": boomLiftData.boom_lifts,
  telehandler: telehandlerData.telehandlers,
  "crawler-crane": crawlerCraneData.crawler_cranes,
  "telescopic-crawler-crane":
    telescopicCrawlerCraneData.telescopic_crawler_cranes,
  "concrete-pump-mixer": concretePumpMixerData.concrete_pump_mixers,
  "aerial-working-platform": aerialWorkingPlatformData.aerial_working_platforms,
  "vibro-roller": vibroRollerData.vibro_rollers,
  "motor-grader": motorGraderData.motor_graders,
  "dump-truck": dumpTruckData.dump_trucks,
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
