// Filepath: app/[lang]/page.js

// Ganti import ke getDictionary
import { getDictionary } from '../../lib/dictionary';
import Hero from '../components/Home/Hero';
import HighlightPromo from '../components/Home/HighlightPromo';
import MainCta from '../components/Home/MainCta';
import News from '../components/Home/News';
import NewsTicker from '../components/Home/NewsTicker';
// import PopularEquipment from '../components/Home/PopularEquipment';
import Testimonials from '../components/Home/Testimonials';
import WhyThei from '../components/Home/WhyThei';
// ...impor komponen lainnya

export default async function HomePage({ params }) {
  const { lang } = await params;
  // Panggil fungsi yang baru dengan nama halaman 'homepage'
  const dictionary = await getDictionary(lang, 'homepage');
  const newsListDict = await getDictionary(lang, 'news/list');

  const newsDataForHomePage = {
    ...dictionary.news,
    articles: newsListDict.articles,
  };

  return (
    <>
      <Hero dictionary={dictionary.hero} currentLocale={lang} />
      <NewsTicker dictionary={dictionary.news_ticker} />
      {/* <PopularEquipment dictionary={dictionary.popular_equipment} /> */}
      <HighlightPromo
        dictionary={dictionary.highlight_promo}
        currentLocale={lang}
      />
      <WhyThei dictionary={dictionary.why_thei} />
      <News dictionary={newsDataForHomePage} currentLocale={lang} />
      <Testimonials dictionary={dictionary.testimonials} />
      <MainCta dictionary={dictionary.main_cta} />
    </>
  );
}
