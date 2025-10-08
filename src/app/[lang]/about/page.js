import { getDictionary } from "@/lib/dictionary";
import PageHero from "@/components/General/PageHero";
import DirectorIntro from "@/components/About/DirectorIntro";
import VisionMission from "@/components/About/VisionMission";
import CoreValues from "@/components/About/CoreValues";
import HsseCommitment from "@/components/About/HsseCommitment";
import CsrSection from "@/components/About/CsrSection";
import MainCta from "@/components/Home/MainCta";

export default async function AboutPage({ params }) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang, "about");
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
