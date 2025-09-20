// Filepath: app/[lang]/news/page.js
import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/General/PageHero';
import NewsGrid from '@/components/News/NewsGrid';
import FeaturedVideo from '@/components/News/FeaturedVideo';
import DocumentationGallery from '@/components/News/DocumentationGallery'; // Impor komponen baru
import MainCta from '@/components/Home/MainCta';

export default async function NewsPage({ params: { lang } }) {
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
      {/* Tambahkan komponen baru di sini */}
      <DocumentationGallery dictionary={pageDict.documentation_gallery} />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
