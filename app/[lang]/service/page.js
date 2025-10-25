import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero';
import BeforeAfterSlider from '@/components/features/Service/BeforeAfterSlider';
import ServiceCategoryGrid from '@/components/features/Service/ServiceCategoryGrid';
import QualityGallery from '@/components/features/Service/QualityGallery';
import MainCta from '@/components/features/home/MainCta';
import HeroPromos from '@/components/ui/HeroPromos';

export default async function ServicePage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, 'service');
  const serviceDict = dictionary.service_page || {};
  const commonDict = dictionary || {};

  const promotionsDict = await getDictionary(lang, 'promotions');
  const servicePromos =
    promotionsDict.promotions_page?.promo_cards?.list?.filter(
      (promo) => promo.id === 'r3'
    ) || [];

  return (
    <>
      <PageHero dictionary={serviceDict.hero} />
      <HeroPromos promos={servicePromos} />
      <BeforeAfterSlider
        dictionary={serviceDict.quality_gallery.before_after}
      />
      <ServiceCategoryGrid dictionary={serviceDict.interactive_services} />
      <QualityGallery dictionary={serviceDict.quality_gallery} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
