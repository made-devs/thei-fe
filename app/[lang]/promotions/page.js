// /app/[lang]/promotions/page.js

import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero'; // Ganti import dari PromoHero ke PageHero
import PromoPackages from '@/components/features/Promotions/PromoPackages';
import CollaborationBenefits from '@/components/features/Promotions/CollaborationBenefits';
import PartnerTestimonial from '@/components/features/Promotions/PartnerTestimonial';
import MainCta from '@/components/features/home/MainCta';

export default async function PromotionsPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, 'promotions');
  const promoDict = dictionary.promotions_page || {};

  return (
    <>
      <PageHero dictionary={promoDict.hero} />{' '}
      {/* Ganti PromoHero dengan PageHero */}
      <CollaborationBenefits dictionary={promoDict.collaboration} />
      <PartnerTestimonial dictionary={promoDict.testimonial} />
      <PromoPackages dictionary={promoDict.packages} />
      <MainCta dictionary={promoDict.main_cta} />
    </>
  );
}
