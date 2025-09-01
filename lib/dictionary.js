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
  },
  id: {
    common: () =>
      import('../dictionaries/id/common.json').then((module) => module.default),
    homepage: () =>
      import('../dictionaries/id/homepage.json').then(
        (module) => module.default
      ),
  },
};

// Fungsi ini akan mengambil semua kamus yang dibutuhkan untuk sebuah halaman
export const getDictionary = async (locale, page) => {
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
