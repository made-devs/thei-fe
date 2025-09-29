import { getDictionary } from "@/lib/dictionary";
import EquipmentHero from "@/components/Equipment/EquipmentHero";
import EquipmentIntro from "@/components/Equipment/EquipmentIntro";
import MainCta from "@/components/Home/MainCta";
import InteractiveEquipmentView from "@/components/Equipment/InteractiveEquipmentView";
// Impor semua data produk yang ada
import forkliftData from "../../../data/forklift.json";
import miniExcavatorData from "../../../data/mini-excavator.json";
import excavatorData from "../../../data/excavator.json";
import wheelLoaderData from "../../../data/wheel-loader.json";
import bulldozerData from "../../../data/bulldozer.json";
import craneData from "../../../data/crane.json";
import skidSteerLoaderData from "../../../data/skid-steer-loader.json";
import boomLiftData from "../../../data/boom-lift.json";
import telehandlerData from "../../../data/telehandler.json";
import crawlerCraneData from "../../../data/crawler-crane.json";
import telescopicCrawlerCraneData from "../../../data/telescopic-crawler-crane.json";
// Impor data concrete yang sudah digabung
import concretePumpMixerData from "../../../data/concrete-pump-mixer.json";

export default async function NewMachinesPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, "new-machines");
  const newMachinesDict = dictionary.new_machines_page || {};

  const homeDictionary = await getDictionary(lang, "homepage");

  const equipmentCategories = newMachinesDict.types || [];

  // Gabungkan semua data produk ke dalam satu objek
  const productData = {
    Forklift: forkliftData.forklifts,
    "Mini Excavator": miniExcavatorData.mini_excavators,
    Excavator: [
      ...excavatorData.medium_excavators,
      ...excavatorData.large_excavators,
    ],
    "Wheel Loader": wheelLoaderData.wheel_loaders,
    Bulldozer: bulldozerData.bulldozers,
    Crane: craneData.cranes,
    "Skid Steer Loader": skidSteerLoaderData.skid_steer_loaders,
    "Boom Lift": boomLiftData.boom_lifts,
    Telehandler: telehandlerData.telehandlers,
    "Crawler Crane": crawlerCraneData.crawler_cranes,
    "Telescopic Crawler Crane":
      telescopicCrawlerCraneData.telescopic_crawler_cranes,
    // Gunakan satu sumber data untuk semua concrete machinery
    "Concrete Pump & Mixer": concretePumpMixerData.concrete_pump_mixers,
  };

  return (
    <>
      {newMachinesDict.hero && (
        <EquipmentHero dictionary={newMachinesDict.hero} />
      )}
      {newMachinesDict.intro && (
        <EquipmentIntro dictionary={newMachinesDict.intro} />
      )}

      {/* Kirim semua data produk ke komponen */}
      <InteractiveEquipmentView
        categories={equipmentCategories}
        productData={productData}
        lang={lang}
      />

      {homeDictionary.main_cta && (
        <MainCta dictionary={homeDictionary.main_cta} />
      )}
    </>
  );
}
