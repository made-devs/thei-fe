import { getDictionary } from '@/lib/dictionary';
import MainCta from '@/components/Home/MainCta';
import ForkliftHero from '@/components/WhyBuyForklift/ForkliftHero';
import BenefitsCarousel from '@/components/WhyBuyForklift/BenefitsCarousel';
import BonusGallery from '@/components/WhyBuyForklift/BonusGallery';
import TestimonialVideo from '@/components/WhyBuyForklift/TestimonialVideo';

export default async function WhyBuyForkliftPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang, 'why-buy-forklift');
  const pageDict = dictionary.forklift_page || {};
  const commonDict = dictionary || {};

  return (
    <>
      <ForkliftHero dictionary={pageDict.hero} />
      <BenefitsCarousel dictionary={pageDict.benefits} />
      <BonusGallery dictionary={pageDict.bonus_gallery} />
      <TestimonialVideo dictionary={pageDict.testimonial} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
