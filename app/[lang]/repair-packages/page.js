import { getDictionary } from '@/lib/dictionary';
import RepairPackagesHero from '@/components/RepairPackages/RepairPackagesHero';
// Import komponen baru
import PremiumService from '@/components/RepairPackages/PremiumService';
import CustomerProof from '@/components/RepairPackages/CustomerProof';
import MainCta from '@/components/Home/MainCta';
import RepairPackagesSlider from '@/components/RepairPackages/RepairPackageCard';
import RetailPackagesSlider from '@/components/RetailPackages/RetailPackageCard';

export default async function RepairPackagesPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, 'repair-packages');
  const pageDict = dictionary.repair_packages_page || {};
  const commonDict = dictionary || {};

  return (
    <>
      <RepairPackagesHero dictionary={pageDict.hero} />
      <PremiumService lang={lang} dictionary={pageDict.premium_service} />
      <RepairPackagesSlider lang={lang} dictionary={pageDict.repair_slider} />
      <RetailPackagesSlider />
      <CustomerProof dictionary={pageDict.testimonial} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
