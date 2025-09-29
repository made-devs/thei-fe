import { getDictionary } from "@/lib/dictionary";
import RepairPackagesHero from "@/components/RepairPackages/RepairPackagesHero";
import PackagesSection from "@/components/RepairPackages/PackagesSection";
// Import komponen baru
import PremiumService from "@/components/RepairPackages/PremiumService";
import CustomerProof from "@/components/RepairPackages/CustomerProof";
import MainCta from "@/components/Home/MainCta";
import RepairPackagesSlider from "@/components/RepairPackages/RepairPackageCard";

export default async function RepairPackagesPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, "repair-packages");
  const pageDict = dictionary.repair_packages_page || {};
  const commonDict = dictionary || {};

  return (
    <>
      <RepairPackagesHero dictionary={pageDict.hero} />
      <PackagesSection dictionary={pageDict.packages} />
      <CustomerProof dictionary={pageDict.testimonial} />
      <RepairPackagesSlider lang={lang} dictionary={pageDict.repair_slider} />
      <PremiumService lang={lang} dictionary={pageDict.premium_service} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
