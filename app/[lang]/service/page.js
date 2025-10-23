import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero'; // Ganti import dari ServiceHero ke PageHero
import BeforeAfterSlider from '@/components/features/Service/BeforeAfterSlider';
import ServiceCategoryGrid from '@/components/features/Service/ServiceCategoryGrid';
import QualityGallery from '@/components/features/Service/QualityGallery';
import MainCta from '@/components/features/home/MainCta';

export default async function ServicePage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, 'service');
  const serviceDict = dictionary.service_page || {};
  const commonDict = dictionary || {};

  return (
    <>
      <PageHero dictionary={serviceDict.hero} />{' '}
      <BeforeAfterSlider
        dictionary={serviceDict.quality_gallery.before_after}
      />
      <ServiceCategoryGrid dictionary={serviceDict.interactive_services} />
      <QualityGallery dictionary={serviceDict.quality_gallery} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
