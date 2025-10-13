import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/dictionary';
import PromoHero from '@/components/features/Promotions/PromoHero';
import PromoDetailClient from '@/components/features/Promotions/PromoDetailClient';

export async function generateStaticParams() {
  const dictionary = await getDictionary('en', 'promotions');
  const promos = dictionary?.promotions_page?.promo_cards?.list || [];

  return promos.map((promo) => ({
    lang: 'en',
    slug: promo.slug,
  }));
}

export default async function PromoDetailPage({ params }) {
  const { lang, slug } = await params;
  const dictionary = await getDictionary(lang, 'promotions');
  const promos = dictionary?.promotions_page?.promo_cards?.list || [];
  const promo = promos.find((p) => p.slug === slug);

  if (!promo) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section dengan Judul Promo */}
      <PromoHero promo={promo} />

      {/* Detail Content */}
      <PromoDetailClient promo={promo} lang={lang} />
    </div>
  );
}
