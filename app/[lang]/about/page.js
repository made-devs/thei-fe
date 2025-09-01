// /app/[lang]/about/page.js
import { getDictionary } from '@/lib/dictionary';

// Impor komponen-komponen untuk halaman About Us
import DirectorIntro from '@/components/About/DirectorIntro';
import VisionMission from '@/components/About/VisionMission';
import CoreValues from '@/components/About/CoreValues';
import HsseCommitment from '@/components/About/HsseCommitment';
import CsrSection from '@/components/About/CsrSection';
import AboutHero from '../../components/About/AboutHero';

export default async function AboutPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang, 'about');
  const aboutDict = dictionary.about_page;

  return (
    <>
      <AboutHero dictionary={aboutDict.hero} />
      <DirectorIntro dictionary={aboutDict.director_intro} />
      <VisionMission dictionary={aboutDict.vision_mission} />
      <CoreValues dictionary={aboutDict.core_values} />
      <HsseCommitment dictionary={aboutDict.hsse} />
      <CsrSection dictionary={aboutDict.csr} />
    </>
  );
}
