import { getDictionary } from "@/lib/dictionary";
import MainCta from "@/components/Home/MainCta";
import PartsHero from "@/components/Parts/PartsHero";
import KeyFeatures from "@/components/Parts/KeyFeatures";
import PartsCategoryGrid from "@/components/Parts/PartsCategoryGrid";
import PartsPromo from "@/components/Parts/PartsPromo";
import FastMovers from "@/components/Parts/FastMovers";

// Terima 'params' sebagai objek utuh
export default async function PartsPage({ params }) {
  // Await params untuk mendapatkan nilainya, baru destructure 'lang'
  const { lang } = await params;

  const dictionary = await getDictionary(lang, "parts");
  const partsDict = dictionary.parts_page || {};
  const commonDict = dictionary || {};

  return (
    <>
      <PartsHero dictionary={partsDict.hero} />
      <PartsPromo dictionary={partsDict.promo_section} />
      <PartsCategoryGrid dictionary={partsDict.category_section} />
      <KeyFeatures dictionary={partsDict.features_section} />
      <FastMovers dictionary={partsDict.fast_movers_section} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
