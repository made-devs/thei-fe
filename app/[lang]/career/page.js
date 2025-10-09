// Filepath: app/[lang]/career/page.js
import { getDictionary } from '@/lib/dictionary';
import MainCta from '@/components/features/home/MainCta';
import PageHero from '@/components/ui/PageHero'; // Ganti import dari CareerHero ke PageHero
import WhyJoin from '@/components/features/Career/WhyJoin';
import OpenPositions from '@/components/features/Career/OpenPositions';
import TrainingPrograms from '@/components/features/Career/TrainingPrograms';

export default async function CareerPage({ params }) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang, 'career');
  const pageDict = dictionary.career_page || {};
  const commonDict = dictionary || {};

  return (
    <>
      <PageHero dictionary={pageDict.hero} />{' '}
      {/* Ganti CareerHero dengan PageHero, hapus lang */}
      <TrainingPrograms dictionary={pageDict.training_programs} />
      <OpenPositions dictionary={pageDict.open_positions} />
      <WhyJoin dictionary={pageDict.why_join} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
