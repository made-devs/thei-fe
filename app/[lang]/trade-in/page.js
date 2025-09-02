import { getDictionary } from '@/lib/dictionary';
import TradeInHero from '@/components/TradeIn/TradeInHero';
import BenefitsSection from '@/components/TradeIn/BenefitsSection';
import HowItWorks from '@/components/TradeIn/HowItWorks';
import ProofSection from '@/components/TradeIn/ProofSection';
import MainCta from '@/components/Home/MainCta';

export default async function TradeInPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang, 'trade-in');
  const pageDict = dictionary.trade_in_page || {};

  return (
    <>
      <TradeInHero dictionary={pageDict.hero} lang={lang} />
      <BenefitsSection dictionary={pageDict.benefits_section} />
      <HowItWorks dictionary={pageDict.how_it_works} />
      <ProofSection dictionary={pageDict.proof_section} />
      <MainCta dictionary={pageDict.main_cta} />
    </>
  );
}
