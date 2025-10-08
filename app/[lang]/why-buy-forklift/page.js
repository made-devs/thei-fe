import { getDictionary } from "@/lib/dictionary";
import MainCta from "@/components/features/home/MainCta";
import ForkliftHero from "@/components/features/WhyBuyForklift/ForkliftHero";
import BenefitsCarousel from "@/components/features/WhyBuyForklift/BenefitsCarousel";
import BonusGallery from "@/components/features/WhyBuyForklift/BonusGallery";
import TestimonialVideo from "@/components/features/WhyBuyForklift/TestimonialVideo";

export default async function WhyBuyForkliftPage({ params }) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang, "why-buy-forklift");
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
