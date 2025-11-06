// Filepath: app/[lang]/news/page.js
import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero';
import NewsGrid from '@/components/features/News/NewsGrid';
import FeaturedVideo from '@/components/features/News/FeaturedVideo';
import MainCta from '@/components/features/home/MainCta';

export default async function NewsPage({ params }) {
  const { lang } = await params;

  // Memuat daftar berita dari path yang baru
  const dictionary = await getDictionary(lang, 'news/list');
  const pageDict = dictionary.news_page || {};
  const articles = dictionary.articles || [];
  const commonDict = dictionary || {};

  return (
    <>
      <PageHero dictionary={pageDict.hero} />
      {/* Mengirim data yang sudah difilter dan lang ke NewsGrid */}
      <FeaturedVideo dictionary={pageDict.featured_video} />
      <NewsGrid dictionary={{ ...pageDict, articles }} lang={lang} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
