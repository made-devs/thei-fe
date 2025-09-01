// /lib/dictionary.js
import 'server-only';

// Objek untuk mapping nama file ke dynamic import
const dictionaries = {
  en: {
    common: () =>
      import('../dictionaries/en/common.json').then((module) => module.default),
    homepage: () =>
      import('../dictionaries/en/homepage.json').then(
        (module) => module.default
      ),
    about: () =>
      import('../dictionaries/en/about.json').then((module) => module.default),
  },
  id: {
    common: () =>
      import('../dictionaries/id/common.json').then((module) => module.default),
    homepage: () =>
      import('../dictionaries/id/homepage.json').then(
        (module) => module.default
      ),
    about: () =>
      import('../dictionaries/id/about.json').then((module) => module.default),
  },
};

// Fungsi ini akan mengambil semua kamus yang dibutuhkan untuk sebuah halaman
export const getDictionary = async (locale, page) => {
  // Pastikan locale dan page valid untuk mencegah error
  if (!dictionaries[locale] || !dictionaries[locale][page]) {
    // Fallback ke default atau throw error
    // Untuk sekarang, kita fallback ke homepage jika halaman tidak ditemukan
    const targetPage = dictionaries[locale][page] ? page : 'homepage';
    console.warn(
      `Dictionary for page "${page}" not found, falling back to "homepage".`
    );
    const commonDict = await dictionaries[locale].common();
    const pageDict = await dictionaries[locale][targetPage]();
    return { ...commonDict, ...pageDict };
  }

  const commonDict = await dictionaries[locale].common();
  const pageDict = await dictionaries[locale][page]();

  // Gabungkan kamus umum dengan kamus halaman
  return {
    ...commonDict,
    ...pageDict,
  };
};

// Fungsi terpisah HANYA untuk layout, agar lebih efisien
export const getLayoutDictionary = async (locale) => {
  return dictionaries[locale].common();
};
