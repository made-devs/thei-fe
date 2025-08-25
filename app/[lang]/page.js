// /app/[lang]/page.js

import { getDictionary } from '../../lib/dictionary';
import CallToAction from '../components/Home/CalltoAction';
import Hero from '../components/Home/Hero';
import PopularEquipment from '../components/Home/PopularEquipment';
import Promotions from '../components/Home/Promotions';
import Services from '../components/Home/Services';
import Technology from '../components/Home/Technology';
import Commitment from '../components/Home/Commitment';
import TestimonialsAndNews from '../components/Home/TestimonialsAndNews';
import Career from '../components/Home/Career';
import ContactUs from '../components/Home/ContactUs';
import FastCommitment from '../components/Home/FastCommitment';

export default async function HomePage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Hero dictionary={dictionary.hero} />
      <PopularEquipment dictionary={dictionary.popular_equipment} />
      <CallToAction dictionary={dictionary.call_to_action} />
      <Promotions dictionary={dictionary.promotions} />
      <Services dictionary={dictionary.services} />
      <Technology dictionary={dictionary.technology} />
      <Commitment dictionary={dictionary.commitment} />
      <TestimonialsAndNews dictionary={dictionary.testimonials_and_news} />
      <Career dictionary={dictionary.career} />
      <ContactUs dictionary={dictionary.contact_us} />
      <FastCommitment dictionary={dictionary.fast_commitment} />
    </>
  );
}

