// Filepath: app/[lang]/page.js

import { getDictionary } from '@/lib/dictionary';
import Hero from '@/components/features/home/Hero';
import HighlightPromo from '@/components/features/home/HighlightPromo';
import MainCta from '@/components/features/home/MainCta';
import News from '@/components/features/home/News';
import NewsTicker from '@/components/features/home/NewsTicker';
import Testimonials from '@/components/features/home/Testimonials';
import WhyThei from '@/components/features/home/WhyThei';

export default async function HomePage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, 'homepage');
  const newsListDict = await getDictionary(lang, 'news/list');
  const promoDict = await getDictionary(lang, 'promotions');

  const newsDataForHomePage = {
    ...dictionary.news,
    articles: newsListDict.articles,
  };

  return (
    <>
      <div className="bg-black">
        <div className="text-center pt-10 sm:pt-24 pb-6 sm:pb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-yellow-400 tracking-wider">
            {dictionary.header?.title || 'THEI - TJM Heavy Equipment Indonesia'}
          </h1>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-300 tracking-wide px-4">
            {dictionary.header?.subtitle ||
              "Indonesia's One-Stop Solution for Heavy Equipment Rental, Service & Sales"}
          </p>
        </div>
        <div className="h-px w-1/3 mx-auto bg-yellow-400 opacity-60 rounded" />

        {/* PENTING: Pass props dengan benar */}
        <HighlightPromo
          dictionary={dictionary.highlight_promo} // ✅ Ambil dari homepage.highlight_promo
          promos={promoDict.promotions_page?.promo_cards?.list || []} // ✅ Ambil dari promotions
          currentLocale={lang}
        />
      </div>

      <Hero dictionary={dictionary.hero} currentLocale={lang} />
      <NewsTicker dictionary={dictionary.news_ticker} />

      <WhyThei dictionary={dictionary.why_thei} />
      <News dictionary={newsDataForHomePage} currentLocale={lang} />
      <Testimonials dictionary={dictionary.testimonials} />
      <MainCta dictionary={dictionary.main_cta} />
    </>
  );
}
