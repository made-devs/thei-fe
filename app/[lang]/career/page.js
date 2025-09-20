// Filepath: app/[lang]/career/page.js
import { getDictionary } from '@/lib/dictionary';
import MainCta from '@/components/Home/MainCta';
import CareerHero from '@/components/Career/CareerHero';
import WhyJoin from '@/components/Career/WhyJoin';
import OpenPositions from '@/components/Career/OpenPositions';
import TrainingPrograms from '@/components/Career/TrainingPrograms';

export default async function CareerPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang, 'career');
  const pageDict = dictionary.career_page || {};
  const commonDict = dictionary || {};

  return (
    <>
      <CareerHero dictionary={pageDict.hero} lang={lang} />
      <TrainingPrograms dictionary={pageDict.training_programs} />
      <OpenPositions dictionary={pageDict.open_positions} />
      <WhyJoin dictionary={pageDict.why_join} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
