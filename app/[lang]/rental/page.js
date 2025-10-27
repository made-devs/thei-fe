// /app/[lang]/equipment/rental/page.js

import { getDictionary } from "@/lib/dictionary";
import PageHero from "@/components/ui/PageHero"; // Ganti import dari RentalHero ke PageHero
import HeroPromos from "@/components/ui/HeroPromos"; // Tambahkan import HeroPromos
import RentalFacilities from "@/components/features/Rental/RentalFacilities";
import TechAndPricing from "@/components/features/Rental/TechAndPricing";
import MainCta from "@/components/features/home/MainCta";
import RentalPackages from "@/components/features/Rental/RentalPackages";

export default async function RentalPage({ params }) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang, "rental");
  const rentalDict = dictionary.rental_page || {};

  // Ambil data promo dari promotions.json, filter berdasarkan ID spesifik (misalnya 'r1' untuk rental promo)
  const promotionsDict = await getDictionary(lang, "promotions");
  const rentalPromos =
    promotionsDict.promotions_page?.promo_cards?.list?.filter(
      (promo) => promo.id === "r1"
    ) || [];

  return (
    <>
      <PageHero dictionary={rentalDict.hero} />{" "}
      {/* Ganti RentalHero dengan PageHero, hapus lang */}
      <HeroPromos promos={rentalPromos} />{" "}
      {/* Tambahkan HeroPromos setelah PageHero */}
      <RentalFacilities dictionary={rentalDict.facilities} />
      <RentalPackages lang={lang} dictionary={rentalDict.packages} />
      <TechAndPricing dictionary={rentalDict.tech_and_pricing} />
      <MainCta dictionary={rentalDict.main_cta} />
    </>
  );
}
