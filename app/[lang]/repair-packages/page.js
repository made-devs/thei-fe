import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero';
import CustomerProof from '@/components/features/RepairPackages/CustomerProof';
import MainCta from '@/components/features/home/MainCta';
import HeroPromos from '@/components/ui/HeroPromos';
// Import komponen baru
import PremiumServices from '@/components/features/RepairPackages/PremiumServices';
import EconomisServices from '../../../src/components/features/RepairPackages/EconomisServices';
import RepairSection from '../../../src/components/features/RepairPackages/RepairSection';

export default async function RepairPackagesPage({ params }) {
  // Await params karena di Next.js terbaru params adalah promise
  const { lang } = await params;

  const dictionary = await getDictionary(lang, 'repair-packages');
  const pageDict = dictionary.repair_packages_page || {};
  const commonDict = dictionary || {};

  const promotionsDict = await getDictionary(lang, 'promotions');
  const servicePromos =
    promotionsDict.promotions_page?.promo_cards?.list?.filter(
      (promo) => promo.id === 'r2'
    ) || [];

  return (
    <>
      <PageHero dictionary={pageDict.hero} />

      <HeroPromos promos={servicePromos} />

      {/* Insert Premium Services Section Here */}
      <PremiumServices />
      <EconomisServices />
      <RepairSection />

      <CustomerProof dictionary={pageDict.testimonial} />

      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
