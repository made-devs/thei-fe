// /app/[lang]/equipment/rental/page.js

import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero'; // Ganti import dari RentalHero ke PageHero
import RentalFacilities from '@/components/features/Rental/RentalFacilities';
import TechAndPricing from '@/components/features/Rental/TechAndPricing';
import MainCta from '@/components/features/home/MainCta';
import RentalPackages from '@/components/features/Rental/RentalPackages';

export default async function RentalPage({ params }) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang, 'rental');
  const rentalDict = dictionary.rental_page || {};

  return (
    <>
      <PageHero dictionary={rentalDict.hero} />{' '}
      {/* Ganti RentalHero dengan PageHero, hapus lang */}
      <RentalFacilities dictionary={rentalDict.facilities} />
      <RentalPackages lang={lang} dictionary={rentalDict.packages} />
      <TechAndPricing dictionary={rentalDict.tech_and_pricing} />
      <MainCta dictionary={rentalDict.main_cta} />
    </>
  );
}
