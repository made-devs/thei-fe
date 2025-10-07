// /app/[lang]/equipment/rental/page.js

import { getDictionary } from "@/lib/dictionary";
import RentalHero from "@/components/Rental/RentalHero";
import RentalCategoryGrid from "@/components/Rental/RentalCategoryGrid";
import RentalFacilities from "@/components/Rental/RentalFacilities";
import TechAndPricing from "@/components/Rental/TechAndPricing";
import MainCta from "@/components/Home/MainCta";
import RentalPackages from "../../components/Rental/RentalPackages";

export default async function RentalPage({ params }) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang, "rental");
  const rentalDict = dictionary.rental_page || {};

  return (
    <>
      <RentalHero dictionary={rentalDict.hero} lang={lang} />
      <RentalFacilities dictionary={rentalDict.facilities} />
      <RentalPackages lang={lang} dictionary={rentalDict.packages} />
      <TechAndPricing dictionary={rentalDict.tech_and_pricing} />
      <MainCta dictionary={rentalDict.main_cta} />
    </>
  );
}
