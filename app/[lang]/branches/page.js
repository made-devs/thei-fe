// /app/[lang]/branches/page.js

import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero';
import MapLoader from '@/components/features/Branches/MapLoader';
import FacilityGallery from '@/components/features/Branches/FacilityGallery';
import MainCta from '@/components/features/home/MainCta';
import BranchesVideos from '../../../src/components/features/Branches/BranchesVideos';

export default async function BranchesPage({ params }) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang, 'branches');
  const branchesDict = dictionary.branches_page || {};

  return (
    <>
      <PageHero dictionary={branchesDict.hero} />
      <FacilityGallery dictionary={branchesDict.facility_gallery} />
      <MapLoader dictionary={branchesDict.interactive_map} />
      <BranchesVideos dictionary={branchesDict.brand_videos} />
      <MainCta dictionary={branchesDict.main_cta} />
    </>
  );
}
