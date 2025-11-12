import React from 'react';
import { getDictionary } from '@/lib/dictionary';
import PageHero from '@/components/ui/PageHero';
import MainCta from '@/components/features/home/MainCta';
import ContentCarousel from '@/components/features/home/ContentCarousel';
import IntroSection from '@/components/features/ContractService/IntroSection';
import PackagesSection from '@/components/features/ContractService/PackagesSection';
import AdvantagesSection from '@/components/features/ContractService/AdvantagesSection';
import SchemesSection from '@/components/features/ContractService/SchemesSection';
import HeroPromos from '@/components/ui/HeroPromos';

export default async function ContractServicePage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'contractService');

  const promotionsDict = await getDictionary(lang, 'promotions');
  const servicePromos =
    promotionsDict.promotions_page?.promo_cards?.list?.filter(
      (promo) => promo.id === 'r2'
    ) || [];

  return (
    <main>
      <PageHero dictionary={dict.hero} />
      <HeroPromos promos={servicePromos} />
      <IntroSection dictionary={dict.intro} />
      <PackagesSection dictionary={dict.packages} />
      <AdvantagesSection dictionary={dict.advantages} />

      {/* Promo Section using ContentCarousel */}
      <ContentCarousel
        items={dict.promos.items}
        subtitle={dict.promos.subtitle}
        title={dict.promos.title}
        description={dict.promos.description}
        currentLocale={lang}
        aspect="square"
        hoverText="Lihat Detail Promo"
        cta_text={dict.promos.cta_text}
        cta_link={dict.promos.cta_link}
      />

      <SchemesSection dictionary={dict.schemes} />
      <MainCta dictionary={dict.main_cta} />
    </main>
  );
}
