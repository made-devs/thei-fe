import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/General/PageHero';
import NewsGrid from '@/components/News/NewsGrid';
import FeaturedVideo from '@/components/News/FeaturedVideo';
import MainCta from '@/components/Home/MainCta';

export default async function NewsPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang, 'news');
  const pageDict = dictionary.news_page || {};
  const commonDict = dictionary || {};

  return (
    <>
      <PageHero dictionary={pageDict.hero} />
      <NewsGrid dictionary={pageDict} />
      <FeaturedVideo dictionary={pageDict.featured_video} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
