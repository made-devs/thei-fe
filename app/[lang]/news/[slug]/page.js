// Filepath: app/[lang]/news/[slug]/page.js
import { notFound } from 'next/navigation';
import {
  getDictionary,
  getArticle,
  getAllArticleSlugs,
} from '@/lib/dictionary';
import ArticleHero from '@/components/features/News/ArticleHero';
import ArticleContent from '@/components/features/News/ArticleContent';
import RelatedArticles from '@/components/features/News/RelatedArticles';
import MainCta from '@/components/features/home/MainCta';

// FIX: Filter out Promotion articles from static params
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  // Filter hanya artikel yang bukan kategori Promo/Promotion
  const filteredSlugs = slugs.filter(
    ({ category }) => category !== 'Promo' && category !== 'Promotion'
  );

  return filteredSlugs.map(({ lang, slug }) => ({
    lang,
    slug,
  }));
}

export const dynamic = 'force-static';

export default async function ArticlePage({ params }) {
  const { lang, slug } = await params;

  // 1. Ambil konten artikel spesifik
  const articleData = await getArticle(lang, slug);

  // Jika artikel tidak ditemukan, tampilkan halaman 404
  if (!articleData) {
    notFound();
  }

  const { article } = articleData;

  // 2. Ambil daftar semua artikel untuk "Related Articles" dan terjemahan
  const listDictionary = await getDictionary(lang, 'news/list');
  const allArticles = listDictionary.articles || [];
  const categoryTranslations = listDictionary.news_page?.main_section || {};

  // Data untuk RelatedArticles
  const relatedArticlesData = {
    title: 'Baca Juga Artikel Lainnya',
    read_more: listDictionary.news_page?.main_section?.read_more,
  };

  return (
    <>
      <ArticleHero
        article={article}
        categoryTranslations={categoryTranslations}
      />
      <ArticleContent content={article.content} />
      <RelatedArticles
        articles={allArticles}
        currentSlug={slug}
        lang={lang}
        dictionary={relatedArticlesData}
      />
      <MainCta dictionary={listDictionary.main_cta} />
    </>
  );
}
