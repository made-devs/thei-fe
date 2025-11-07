// /app/[lang]/promotions/page.js

import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero';
import PromoPackages from '@/components/features/Promotions/PromoPackages';
import CollaborationBenefits from '@/components/features/Promotions/CollaborationBenefits';
import PartnerTestimonial from '@/components/features/Promotions/PartnerTestimonial';
import MainCta from '@/components/features/home/MainCta';

export default async function PromotionsPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, 'promotions');
  const homepageDict = await getDictionary(lang, 'homepage'); // Ambil dari homepage
  const promoDict = dictionary.promotions_page || {};

  return (
    <>
      <PageHero dictionary={promoDict.hero} />
      <PromoPackages dictionary={promoDict.promo_cards} lang={lang} />
      <CollaborationBenefits dictionary={promoDict.collaboration} />
      {/* Pass video_testimonials dari homepage */}
      <PartnerTestimonial
        dictionary={{
          ...promoDict.testimonial,
          video_testimonials: homepageDict.testimonials.video_testimonials, // Ambil dari homepage
        }}
        currentLocale={lang}
      />
      <MainCta dictionary={promoDict.main_cta} />
    </>
  );
}
