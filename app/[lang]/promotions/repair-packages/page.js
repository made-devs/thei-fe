// /app/[lang]/promotions/repair-packages/page.js

import { getDictionary } from '@/lib/dictionary';
import RepairPackagesHero from '@/components/RepairPackages/RepairPackagesHero';
import PackagesSection from '@/components/RepairPackages/PackagesSection';
import PremiumTable from '@/components/RepairPackages/PremiumTable';
import CustomerProof from '@/components/RepairPackages/CustomerProof';
import MainCta from '@/components/Home/MainCta';

export default async function RepairPackagesPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang, 'repair-packages');
  const pageDict = dictionary.repair_packages_page || {};
  const commonDict = dictionary || {};

  return (
    <>
      <RepairPackagesHero dictionary={pageDict.hero} />
      <PackagesSection dictionary={pageDict.packages} />
      <CustomerProof dictionary={pageDict.testimonial} />
      <PremiumTable dictionary={pageDict.premium_table} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
