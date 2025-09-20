// /app/[lang]/equipment/rental/page.js

import { getDictionary } from '@/lib/dictionary';
import RentalHero from '@/components/Rental/RentalHero';
import RentalCategoryGrid from '@/components/Rental/RentalCategoryGrid';
import RentalFacilities from '@/components/Rental/RentalFacilities';
import TechAndPricing from '@/components/Rental/TechAndPricing';
import MainCta from '@/components/Home/MainCta';

export default async function RentalPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang, 'rental');
  const rentalDict = dictionary.rental_page || {};

  return (
    <>
      {/* FIX: Mengirim prop 'lang' ke komponen Hero */}
      <RentalHero dictionary={rentalDict.hero} lang={lang} />
      <RentalFacilities dictionary={rentalDict.facilities} />
      <RentalCategoryGrid dictionary={rentalDict.categories} />
      <TechAndPricing dictionary={rentalDict.tech_and_pricing} />
      <MainCta dictionary={rentalDict.main_cta} />
    </>
  );
}
