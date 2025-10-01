// app/[lang]/equipment/new-machines/[category]/[model]/page.js

import { getDictionary } from '../../../../../../lib/dictionary';
import { getAllProducts, getProduct } from '../../../../../../lib/product-data';
import ProductHero from '../../../../../components/Equipment/ProductHero'; // 1. Impor komponen Hero baru
import ProductSpecifications from '../../../../../components/Equipment/ProductSpecifications'; // 2. Impor komponen Spesifikasi baru
import MainCta from '../../../../../components/Home/MainCta';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const products = await getAllProducts();

  const params = products.flatMap((product) =>
    ['id', 'en'].map((lang) => ({
      lang,
      category: product.category.toLowerCase().replace(/ /g, '-'),
      // Mengubah model agar ramah-URL (misal: 'FB15/Z' menjadi 'FB15-Z')
      model: product.model.replace(/\//g, '-'),
    }))
  );

  return params;
}

export default async function ProductDetailPage({ params }) {
  const { lang, category, model } = await params;

  // Mengembalikan model ke format asli sebelum mencari data
  const originalModel = model.replace(/-/g, '/');
  const product = await getProduct(category, originalModel);

  // Jika produk tidak ditemukan, tampilkan halaman 404
  if (!product) {
    notFound();
  }

  // Ambil dictionary untuk common components
  const dictionary = await getDictionary(lang, 'common');

  return (
    <>
      {/* 3. Gunakan komponen Hero baru */}
      <ProductHero product={product} lang={lang} />

      {/* 4. Gunakan komponen Spesifikasi baru */}
      <ProductSpecifications product={product} />

      <MainCta dictionary={dictionary.main_cta} />
    </>
  );
}
