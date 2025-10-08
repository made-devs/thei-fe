// Filepath: src/lib/dictionary.js
import "server-only";
import { i18n } from "../../i18n-config"; // Update path: tambah ../

const dictionaries = {
  en: {
    // Update semua import paths: tambah ../ di depan
    common: () =>
      import("../../dictionaries/en/common.json").then((m) => m.default),
    homepage: () =>
      import("../../dictionaries/en/homepage.json").then((m) => m.default),
    about: () =>
      import("../../dictionaries/en/about.json").then((m) => m.default),
    equipment: () =>
      import("../../dictionaries/en/equipment.json").then((m) => m.default),
    "new-machines": () =>
      import("../../dictionaries/en/new-machines.json").then((m) => m.default),
    parts: () =>
      import("../../dictionaries/en/parts.json").then((m) => m.default),
    promotions: () =>
      import("../../dictionaries/en/promotions.json").then((m) => m.default),
    "repair-packages": () =>
      import("../../dictionaries/en/repair-packages.json").then(
        (m) => m.default
      ),
    rental: () =>
      import("../../dictionaries/en/rental.json").then((m) => m.default),
    branches: () =>
      import("../../dictionaries/en/branches.json").then((m) => m.default),
    service: () =>
      import("../../dictionaries/en/service.json").then((m) => m.default),
    "trade-in": () =>
      import("../../dictionaries/en/trade-in.json").then((m) => m.default),
    "why-buy-forklift": () =>
      import("../../dictionaries/en/why-buy-forklift.json").then(
        (m) => m.default
      ),
    career: () =>
      import("../../dictionaries/en/career.json").then((m) => m.default),
    contact: () =>
      import("../../dictionaries/en/contact.json").then((m) => m.default),
    "news/list": () =>
      import("../../dictionaries/en/news/list.json").then((m) => m.default),
  },
  id: {
    // Update semua import paths: tambah ../ di depan
    common: () =>
      import("../../dictionaries/id/common.json").then((m) => m.default),
    homepage: () =>
      import("../../dictionaries/id/homepage.json").then((m) => m.default),
    about: () =>
      import("../../dictionaries/id/about.json").then((m) => m.default),
    equipment: () =>
      import("../../dictionaries/id/equipment.json").then((m) => m.default),
    "new-machines": () =>
      import("../../dictionaries/id/new-machines.json").then((m) => m.default),
    parts: () =>
      import("../../dictionaries/id/parts.json").then((m) => m.default),
    promotions: () =>
      import("../../dictionaries/id/promotions.json").then((m) => m.default),
    "repair-packages": () =>
      import("../../dictionaries/id/repair-packages.json").then(
        (m) => m.default
      ),
    rental: () =>
      import("../../dictionaries/id/rental.json").then((m) => m.default),
    branches: () =>
      import("../../dictionaries/id/branches.json").then((m) => m.default),
    service: () =>
      import("../../dictionaries/id/service.json").then((m) => m.default),
    "trade-in": () =>
      import("../../dictionaries/id/trade-in.json").then((m) => m.default),
    "why-buy-forklift": () =>
      import("../../dictionaries/id/why-buy-forklift.json").then(
        (m) => m.default
      ),
    career: () =>
      import("../../dictionaries/id/career.json").then((m) => m.default),
    contact: () =>
      import("../../dictionaries/id/contact.json").then((m) => m.default),
    "news/list": () =>
      import("../../dictionaries/id/news/list.json").then((m) => m.default),
  },
};

// --- Fungsi untuk mengambil satu artikel ---
export const getArticle = async (locale, slug) => {
  try {
    // Update path: tambah ../
    const articleModule = await import(
      `../../dictionaries/${locale}/news/${slug}.json`
    );
    return articleModule.default;
  } catch (error) {
    console.error(
      `Article not found for locale "${locale}" and slug "${slug}"`,
      error
    );
    return null;
  }
};

// --- Fungsi untuk mendapatkan semua slug artikel (untuk generateStaticParams) ---
export const getAllArticleSlugs = async () => {
  const slugs = [];
  const locale = i18n.defaultLocale;
  try {
    // Update path: tambah ../
    const listModule = await import(
      `../../dictionaries/${locale}/news/list.json`
    );
    const articles = listModule.default.articles || [];
    articles.forEach((article) => {
      i18n.locales.forEach((loc) => {
        slugs.push({ lang: loc, slug: article.slug });
      });
    });
  } catch (error) {
    console.error(`Could not load article list for locale "${locale}"`, error);
  }
  return slugs;
};

export const getDictionary = async (locale, page) => {
  const pageLoader = dictionaries[locale]?.[page];

  if (!pageLoader) {
    const targetPage = "homepage";
    console.warn(
      `Dictionary for page "${page}" not found for locale "${locale}", falling back to "${targetPage}".`
    );
    const commonDict = await dictionaries[locale].common();
    const pageDict = await dictionaries[locale][targetPage]();
    return { ...commonDict, ...pageDict };
  }

  const commonDict = await dictionaries[locale].common();
  const pageDict = await pageLoader();

  return { ...commonDict, ...pageDict };
};

export const getLayoutDictionary = async (locale) => {
  const commonDict = await dictionaries[locale].common();
  const homepageDict = await dictionaries[locale].homepage();
  return { ...commonDict, ...homepageDict };
};
