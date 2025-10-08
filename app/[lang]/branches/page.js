// /app/[lang]/branches/page.js

import { getDictionary } from "@/lib/dictionary";
import BranchesHero from "@/components/features/Branches/BranchesHero";
import MapLoader from "@/components/features/Branches/MapLoader"; // Import komponen baru
import VirtualTour from "@/components/features/Branches/VirtualTour";
import FacilityGallery from "@/components/features/Branches/FacilityGallery";
import MainCta from "@/components/features/home/MainCta";

export default async function BranchesPage({ params }) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang, "branches");
  const branchesDict = dictionary.branches_page || {};

  return (
    <>
      <BranchesHero dictionary={branchesDict.hero} lang={lang} />
      {/* Panggil MapLoader di sini */}
      <FacilityGallery dictionary={branchesDict.facility_gallery} />
      <MapLoader dictionary={branchesDict.interactive_map} />
      <VirtualTour dictionary={branchesDict.virtual_tour} />
      <MainCta dictionary={branchesDict.main_cta} />
    </>
  );
}
