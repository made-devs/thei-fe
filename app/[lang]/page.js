// Filepath: app/[lang]/page.js

import { getDictionary } from "@/lib/dictionary";
import Hero from "@/components/features/home/Hero";
import HeroHeader from "@/components/features/home/HeroHeader";
import HighlightPromo from "@/components/features/home/HighlightPromo";
import MainCta from "@/components/features/home/MainCta";
import News from "@/components/features/home/News";
import NewsTicker from "@/components/features/home/NewsTicker";
import Testimonials from "@/components/features/home/Testimonials";
import WhyThei from "@/components/features/home/WhyThei";

export default async function HomePage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, "homepage");
  const newsListDict = await getDictionary(lang, "news/list");
  const promoDict = await getDictionary(lang, "promotions");

  const newsDataForHomePage = {
    ...dictionary.news,
    articles: newsListDict.articles,
  };

  return (
    <>
      {/* <div
        className="bg-cover bg-center bg-no-repeat relative" // Tambahkan relative untuk overlay
        style={{ backgroundImage: "url(/banner-highlight.webp)" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>{" "}
        <div className="relative z-10">
          <HighlightPromo
            dictionary={dictionary.highlight_promo}
            promos={promoDict.promotions_page?.promo_cards?.list || []}
            currentLocale={lang}
            header={dictionary.header}
          />
        </div>
      </div> */}
      <HeroHeader dictionary={dictionary.header} />
      <NewsTicker dictionary={dictionary.news_ticker} />
      <Hero dictionary={dictionary.hero} currentLocale={lang} />

      <WhyThei dictionary={dictionary.why_thei} />
      <News dictionary={newsDataForHomePage} currentLocale={lang} />
      <Testimonials dictionary={dictionary.testimonials} />
      <MainCta dictionary={dictionary.main_cta} />
    </>
  );
}
564 + 868;
