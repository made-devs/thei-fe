// app/[lang]/equipment/new-machines/[category]/[model]/page.js

import { getDictionary } from "../../../../../../lib/dictionary";
import { getAllProducts, getProduct } from "../../../../../../lib/product-data"; // Fungsi baru untuk ambil data
import ProductDetail from "../../../../../components/Equipment/ProductDetail"; // Komponen baru untuk nampilin detail
import MainCta from "../../../../../components/Home/MainCta";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await getAllProducts();

  const params = products.flatMap((product) =>
    ["id", "en"].map((lang) => ({
      lang,
      category: product.category.toLowerCase().replace(/ /g, "-"),
      model: product.model,
    }))
  );

  return params;
}

export default async function ProductDetailPage({ params }) {
  const { lang, category, model } = params;

  // Ambil data produk berdasarkan parameter
  const product = await getProduct(category, model);

  // Jika produk tidak ditemukan, tampilkan halaman 404
  if (!product) {
    notFound();
  }

  // Ambil dictionary untuk common components
  const dictionary = await getDictionary(lang, "common");

  return (
    <>
      {/* Komponen baru untuk menampilkan detail produk */}
      <ProductDetail product={product} lang={lang} />
      <MainCta dictionary={dictionary.main_cta} />
    </>
  );
}
