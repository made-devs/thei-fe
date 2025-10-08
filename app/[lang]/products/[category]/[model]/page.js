// app/[lang]/equipment/new-machines/[category]/[model]/page.js

import { getDictionary } from "@/lib/dictionary";
import { getAllProducts, getProduct } from "@/lib/product-data";
import ProductHero from "@/components/features/Equipment/ProductHero";
import MainCta from "@/components/features/home/MainCta";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await getAllProducts();

  const params = products.flatMap((product) =>
    ["id", "en"].map((lang) => ({
      lang,
      category: product.category.toLowerCase().replace(/ /g, "-"),
      model: encodeURIComponent(product.model), // <-- PERBAIKAN DI SINI
    }))
  );

  return params;
}

export default async function ProductDetailPage({ params }) {
  const { lang, category, model } = await params;

  const originalModel = decodeURIComponent(model); // <-- PERBAIKAN DI SINI
  const product = await getProduct(category, originalModel);

  if (!product) {
    notFound();
  }

  const dictionary = await getDictionary(lang, "common");

  return (
    <>
      <ProductHero product={product} lang={lang} />
      <MainCta dictionary={dictionary.main_cta} />
    </>
  );
}
