import { getDictionary } from "@/lib/dictionary";
import RepairPackagesHero from "@/components/features/RepairPackages/RepairPackagesHero";
// Import komponen baru
import PremiumService from "@/components/features/RepairPackages/PremiumService";
import CustomerProof from "@/components/features/RepairPackages/CustomerProof";
import MainCta from "@/components/features/home/MainCta";
import RepairPackagesSlider from "@/components/features/RepairPackages/RepairPackageCard";
import RetailPackagesSlider from "@/components/features/RetailPackages/RetailPackageCard";
import retailPackagesData from "@/data/retail-packages.json";

export default async function RepairPackagesPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, "repair-packages");
  const pageDict = dictionary.repair_packages_page || {};
  const commonDict = dictionary || {};
  const retailPackages = retailPackagesData[lang].retail_packages;

  return (
    <>
      <RepairPackagesHero dictionary={pageDict.hero} />
      <PremiumService lang={lang} dictionary={pageDict.premium_service} />
      <RepairPackagesSlider lang={lang} dictionary={pageDict.repair_slider} />
      <RetailPackagesSlider
        dictionary={pageDict.retail_slider}
        packages={retailPackages}
      />
      <CustomerProof dictionary={pageDict.testimonial} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
