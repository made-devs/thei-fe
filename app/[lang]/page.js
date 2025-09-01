// /app/[lang]/page.js

// Ganti import ke getDictionary
import { getDictionary } from '../../lib/dictionary';
import Hero from '../components/Home/Hero';
import HighlightPromo from '../components/Home/HighlightPromo';
import News from '../components/Home/News';
import Testimonials from '../components/Home/Testimonials';
import WhyThei from '../components/Home/WhyThei';
// ...impor komponen lainnya

export default async function HomePage({ params }) {
  const { lang } = await params;
  // Panggil fungsi yang baru dengan nama halaman 'homepage'
  const dictionary = await getDictionary(lang, 'homepage');

  return (
    <>
      <Hero dictionary={dictionary.hero} />
      <HighlightPromo dictionary={dictionary.highlight_promo} />
      <WhyThei dictionary={dictionary.why_thei} />
      <News dictionary={dictionary.news} />
      <Testimonials dictionary={dictionary.testimonials} />
    </>
  );
}

