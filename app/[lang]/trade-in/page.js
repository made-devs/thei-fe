import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero';
import TradeInHighlight from '@/components/features/TradeIn/TradeInHighlight';
import BenefitsSection from '@/components/features/TradeIn/BenefitsSection';
import HowItWorks from '@/components/features/TradeIn/HowItWorks';
import ProofSection from '@/components/features/TradeIn/ProofSection';
import MainCta from '@/components/features/home/MainCta';
import HeroPromos from '@/components/ui/HeroPromos';

export default async function TradeInPage({ params }) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang, 'trade-in');
  const pageDict = dictionary.trade_in_page || {};

  const promotionsDict = await getDictionary(lang, 'promotions');
  const tradeInPromos =
    promotionsDict.promotions_page?.promo_cards?.list?.filter(
      (promo) => promo.id === 'r2'
    ) || [];

  return (
    <>
      <PageHero dictionary={pageDict.hero} />
      <HeroPromos promos={tradeInPromos} />
      <TradeInHighlight dictionary={pageDict.trade_in_highlight} />
      <BenefitsSection dictionary={pageDict.benefits_section} />
      <HowItWorks dictionary={pageDict.how_it_works_section} />
      {/* <ProofSection dictionary={pageDict.proof_section} /> */}
      <MainCta dictionary={pageDict.main_cta} />
    </>
  );
}
