// /app/[lang]/branches/page.js

import { getDictionary } from '@/lib/dictionary';
import BranchesHero from '@/components/Branches/BranchesHero';
import MapLoader from '@/components/Branches/MapLoader'; // Import komponen baru
import VirtualTour from '@/components/Branches/VirtualTour';
import FacilityGallery from '@/components/Branches/FacilityGallery';
import MainCta from '@/components/Home/MainCta';

export default async function BranchesPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang, 'branches');
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
