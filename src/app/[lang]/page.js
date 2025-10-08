// Filepath: app/[lang]/page.js

// Ganti import ke getDictionary
import { getDictionary } from "../../lib/dictionary";
import Hero from "@/components/Home/Hero";
import HighlightPromo from "@/components/Home/HighlightPromo";
import MainCta from "@/components/Home/MainCta";
import News from "@/components/Home/News";
import NewsTicker from "@/components/Home/NewsTicker";
// import PopularEquipment from '../components/Home/PopularEquipment';
import Testimonials from "@/components/Home/Testimonials";
import WhyThei from "@/components/Home/WhyThei";
// ...impor komponen lainnya

export default async function HomePage({ params }) {
  const { lang } = await params;
  // Panggil fungsi yang baru dengan nama halaman 'homepage'
  const dictionary = await getDictionary(lang, "homepage");
  const newsListDict = await getDictionary(lang, "news/list");

  const newsDataForHomePage = {
    ...dictionary.news,
    articles: newsListDict.articles,
  };

  return (
    <>
      <div className="bg-black">
        <div className="text-center pt-10 sm:pt-24 pb-6 sm:pb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-yellow-400 tracking-wider">
            THEI - TJM Heavy Equipment Indonesia
          </h1>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-300 tracking-wide px-4">
            Indonesia's One-Stop Solution for Heavy Equipment Rental, Service &
            Sales
          </p>
        </div>
        <div className="h-px w-1/3 mx-auto bg-yellow-400 opacity-60 rounded" />
        <HighlightPromo
          dictionary={dictionary.highlight_promo}
          currentLocale={lang}
        />
      </div>

      <Hero dictionary={dictionary.hero} currentLocale={lang} />
      <NewsTicker dictionary={dictionary.news_ticker} />
      {/* <PopularEquipment dictionary={dictionary.popular_equipment} /> */}

      <WhyThei dictionary={dictionary.why_thei} />
      <News dictionary={newsDataForHomePage} currentLocale={lang} />
      <Testimonials dictionary={dictionary.testimonials} />
      <MainCta dictionary={dictionary.main_cta} />
    </>
  );
}
