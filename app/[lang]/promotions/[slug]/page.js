import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/dictionary';
import PromoHero from '@/components/features/Promotions/PromoHero';
import PromoChatButton from '@/components/features/Promotions/PromoChatButton'; // NEW CLIENT COMPONENT
import { MapPin, Eye, Clock, Tag } from 'lucide-react';
import PromoDetailClient from '../../../../src/components/features/Promotions/PromoDetailClient';

export async function generateStaticParams() {
  // Asumsikan lang 'en' untuk sekarang, bisa di-expand untuk multi-lang
  const dictionary = await getDictionary('en', 'promotions');
  const promos = dictionary?.promotions_page?.promo_cards?.list || [];

  return promos.map((promo) => ({
    lang: 'en',
    slug: promo.slug,
  }));
}

export default async function PromoDetailPage({ params }) {
  const { lang, slug } = params;
  const dictionary = await getDictionary(lang, 'promotions');
  const promos = dictionary?.promotions_page?.promo_cards?.list || [];
  const promo = promos.find((p) => p.slug === slug);

  if (!promo) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PromoHero dictionary={dictionary.promotions_page.hero} promo={promo} />
      <PromoDetailClient promo={promo} />

      {/* Detail Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          {/* Meta Info Detail */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Tag size={18} />
              <span>Category: {promo.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>Expires: {promo.expiry}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>Location: {promo.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={18} />
              <span>Views: {promo.views}</span>
            </div>
          </div>

          {/* Description */}
          {promo.description && (
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">
                {promo.description}
              </p>
            </div>
          )}

          {/* Price Info */}
          {promo.price && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pricing</h3>
              <div className="flex items-center gap-4">
                {promo.originalPrice && (
                  <span className="text-lg line-through text-gray-500">
                    {promo.originalPrice}
                  </span>
                )}
                <span className="text-3xl font-bold text-yellow-600">
                  {promo.price}
                </span>
              </div>
            </div>
          )}

          {/* CTA Button */}
          <div className="text-center">
            <PromoChatButton promo={promo} />
          </div>
        </div>
      </section>
    </div>
  );
}
