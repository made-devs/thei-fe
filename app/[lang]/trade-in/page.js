import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero'; // Ganti import dari TradeInHero ke PageHero
import TradeInHighlight from '@/components/features/TradeIn/TradeInHighlight'; // Import komponen baru
import BenefitsSection from '@/components/features/TradeIn/BenefitsSection';
import HowItWorks from '@/components/features/TradeIn/HowItWorks';
import ProofSection from '@/components/features/TradeIn/ProofSection';
import MainCta from '@/components/features/home/MainCta';

export default async function TradeInPage({ params }) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang, 'trade-in');
  const pageDict = dictionary.trade_in_page || {};

  return (
    <>
      <PageHero dictionary={pageDict.hero} />{' '}
      {/* Ganti TradeInHero dengan PageHero, hapus lang */}
      {/* Tempatkan komponen baru di bawah hero */}
      <TradeInHighlight dictionary={pageDict.trade_in_highlight} />
      <BenefitsSection dictionary={pageDict.benefits_section} />
      <HowItWorks dictionary={pageDict.how_it_works_section} />
      <ProofSection dictionary={pageDict.proof_section} />
      <MainCta dictionary={pageDict.main_cta} />
    </>
  );
}
