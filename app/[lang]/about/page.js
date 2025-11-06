import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero';
import DirectorIntro from '@/components/features/About/DirectorIntro';
import VisionMission from '@/components/features/About/VisionMission';
import CoreValues from '@/components/features/About/CoreValues';
import HsseCommitment from '@/components/features/About/HsseCommitment';
import CsrSection from '@/components/features/About/CsrSection';
import MainCta from '@/components/features/home/MainCta';

export default async function AboutPage({ params }) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang, 'about');
  const aboutDict = dictionary.about_page;

  return (
    <>
      <PageHero dictionary={aboutDict.hero} />
      <DirectorIntro dictionary={aboutDict.director_intro} />
      <CsrSection dictionary={aboutDict.csr} />
      <VisionMission dictionary={aboutDict.vision_mission} />
      <HsseCommitment dictionary={aboutDict.hsse} />
      <CoreValues dictionary={aboutDict.core_values} />
      <MainCta dictionary={dictionary.main_cta} />
    </>
  );
}
