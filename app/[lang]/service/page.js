import { getDictionary } from '@/lib/dictionary';
import ServiceHero from '@/components/Service/ServiceHero';
import BeforeAfterSlider from '@/components/Service/BeforeAfterSlider'; // <-- Import komponen baru
import ServiceCategoryGrid from '@/components/Service/ServiceCategoryGrid';
import QualityGallery from '@/components/Service/QualityGallery';
import MainCta from '@/components/Home/MainCta';

export default async function ServicePage({ params: { lang } }) {
  const dictionary = await getDictionary(lang, 'service');
  const serviceDict = dictionary.service_page || {};
  const commonDict = dictionary || {};

  return (
    <>
      <ServiceHero dictionary={serviceDict.hero} />
      {/* Panggil komponen baru di sini */}
      <BeforeAfterSlider
        dictionary={serviceDict.quality_gallery.before_after}
      />
      <ServiceCategoryGrid dictionary={serviceDict.interactive_services} />
      <QualityGallery dictionary={serviceDict.quality_gallery} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
