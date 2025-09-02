// /app/[lang]/promotions/page.js

import { getDictionary } from '@/lib/dictionary';
import PromoHero from '@/components/Promotions/PromoHero';
import PromoPackages from '@/components/Promotions/PromoPackages';
import CollaborationBenefits from '@/components/Promotions/CollaborationBenefits';
import PartnerTestimonial from '@/components/Promotions/PartnerTestimonial';
import MainCta from '@/components/Home/MainCta';

export default async function PromotionsPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang, 'promotions');
  const promoDict = dictionary.promotions_page || {};

  return (
    <>
      <PromoHero dictionary={promoDict.hero} />
      <PromoPackages dictionary={promoDict.packages} />
      <CollaborationBenefits dictionary={promoDict.collaboration} />
      <PartnerTestimonial dictionary={promoDict.testimonial} />
      <MainCta dictionary={promoDict.main_cta} />
    </>
  );
}
