// /app/[lang]/branches/page.js

import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero'; // Ganti import dari BranchesHero ke PageHero
import MapLoader from '@/components/features/Branches/MapLoader'; // Import komponen baru
import VirtualTour from '@/components/features/Branches/VirtualTour';
import FacilityGallery from '@/components/features/Branches/FacilityGallery';
import MainCta from '@/components/features/home/MainCta';

export default async function BranchesPage({ params }) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang, 'branches');
  const branchesDict = dictionary.branches_page || {};

  return (
    <>
      <PageHero dictionary={branchesDict.hero} />
      <FacilityGallery dictionary={branchesDict.facility_gallery} />
      <MapLoader dictionary={branchesDict.interactive_map} />
      <VirtualTour dictionary={branchesDict.virtual_tour} />
      <MainCta dictionary={branchesDict.main_cta} />
    </>
  );
}
