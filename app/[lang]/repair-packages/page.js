import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero';
import PremiumService from '@/components/features/RepairPackages/PremiumService';
import CustomerProof from '@/components/features/RepairPackages/CustomerProof';
import MainCta from '@/components/features/home/MainCta';
import RepairPackagesSlider from '@/components/features/RepairPackages/RepairPackageCard';
import RetailPackagesSlider from '@/components/features/RetailPackages/RetailPackageCard';
import retailPackagesData from '@/data/retail-packages.json';
// Tambahkan import untuk data dan komponen Care Protection
import carePackagesData from '@/data/care-packages.json';
import CareProtectionSlider from '@/components/features/RepairPackages/CareProtectionCard';
import HeroPromos from '@/components/ui/HeroPromos';

export default async function RepairPackagesPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, 'repair-packages');
  const pageDict = dictionary.repair_packages_page || {};
  const commonDict = dictionary || {};
  const retailPackages = retailPackagesData[lang].retail_packages;

  const promotionsDict = await getDictionary(lang, 'promotions');
  const servicePromos =
    promotionsDict.promotions_page?.promo_cards?.list?.filter(
      (promo) => promo.id === 'r2'
    ) || [];

  return (
    <>
      <PageHero dictionary={pageDict.hero} />
      <HeroPromos promos={servicePromos} />
      <PremiumService lang={lang} dictionary={pageDict.premium_service} />
      <RepairPackagesSlider lang={lang} dictionary={pageDict.repair_slider} />
      {/* Tambahkan slider Care Protection di bawah RepairPackagesSlider */}
      <CareProtectionSlider
        lang={lang}
        dictionary={pageDict.care_protection_slider}
        carePackagesData={carePackagesData}
      />
      <RetailPackagesSlider
        dictionary={pageDict.retail_slider}
        packages={retailPackages}
      />
      <CustomerProof dictionary={pageDict.testimonial} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
