import { getDictionary } from '@/lib/dictionary';
import MainCta from '@/components/Home/MainCta';
import PartsHero from '@/components/Parts/PartsHero';
import KeyFeatures from '@/components/Parts/KeyFeatures';
import PartsCategoryGrid from '@/components/Parts/PartsCategoryGrid';
import PartsPromo from '@/components/Parts/PartsPromo';
import FastMovers from '@/components/Parts/FastMovers';

export default async function PartsPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang, 'parts');
  const partsDict = dictionary.parts_page || {};
  const commonDict = dictionary || {};

  return (
    <>
      <PartsHero dictionary={partsDict.hero} />
      <KeyFeatures dictionary={partsDict.features_section} />
      <PartsCategoryGrid dictionary={partsDict.category_section} />
      <PartsPromo dictionary={partsDict.promo_section} />
      <FastMovers dictionary={partsDict.fast_movers_section} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
