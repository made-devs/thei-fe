// Filepath: app/[lang]/page.js

import { getDictionary } from '@/lib/dictionary';
import Hero from '@/components/features/home/Hero';
import HeroHeader from '@/components/features/home/HeroHeader';
import HighlightPromo from '@/components/features/home/HighlightPromo';
import MainCta from '@/components/features/home/MainCta';
import News from '@/components/features/home/News';
import NewsTicker from '@/components/features/home/NewsTicker';
import Testimonials from '@/components/features/home/Testimonials';
import WhyThei from '@/components/features/home/WhyThei';
import ContentCarousel from '@/components/features/home/ContentCarousel';

export default async function HomePage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, 'homepage');
  const newsListDict = await getDictionary(lang, 'news/list');
  const promoDict = await getDictionary(lang, 'promotions');

  const newsDataForHomePage = {
    ...dictionary.news,
    articles: newsListDict.articles,
  };

  const serviceData = dictionary['our-service'] || {};
  const promoData = dictionary['our-promo'] || {};
  const brandProductData = dictionary['our-brand-product'] || {};

  return (
    <>
      <HeroHeader dictionary={dictionary.header} />
      <NewsTicker dictionary={dictionary.news_ticker} />
      <Hero dictionary={dictionary.hero} currentLocale={lang} />
      <ContentCarousel
        subtitle={serviceData.subtitle}
        title={serviceData.title}
        description={serviceData.description}
        items={serviceData.slides}
        currentLocale={lang}
        hoverText={serviceData.hover_text}
      />
      <ContentCarousel
        subtitle={promoData.subtitle}
        title={promoData.title}
        description={promoData.description}
        items={promoData.slides}
        currentLocale={lang}
        aspect="square"
        hoverText={promoData.hover_text}
      />
      <ContentCarousel
        subtitle={brandProductData.subtitle}
        title={brandProductData.title}
        description={brandProductData.description}
        items={brandProductData.slides}
        currentLocale={lang}
        aspect="video"
        hoverText={brandProductData.hover_text}
        cta_text={brandProductData.cta_text}
        cta_link={brandProductData.cta_link}
      />
      <WhyThei dictionary={dictionary.why_thei} />
      <Testimonials dictionary={dictionary.testimonials} />
      <News dictionary={newsDataForHomePage} currentLocale={lang} />
      <MainCta dictionary={dictionary.main_cta} />
    </>
  );
}
