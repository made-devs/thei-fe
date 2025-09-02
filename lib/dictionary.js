import 'server-only';

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
    equipment: () =>
      import('../dictionaries/en/equipment.json').then(
        (module) => module.default
      ),
    'new-machines': () =>
      import('../dictionaries/en/new-machines.json').then(
        (module) => module.default
      ),
    parts: () =>
      import('../dictionaries/en/parts.json').then((module) => module.default),
    promotions: () =>
      import('../dictionaries/en/promotions.json').then(
        (module) => module.default
      ),
    'repair-packages': () =>
      import('../dictionaries/en/repair-packages.json').then(
        (module) => module.default
      ),
    rental: () =>
      import('../dictionaries/en/rental.json').then((module) => module.default),
    branches: () =>
      import('../dictionaries/en/branches.json').then(
        (module) => module.default
      ),
    service: () =>
      import('../dictionaries/en/service.json').then(
        (module) => module.default
      ),
    'trade-in': () =>
      import('../dictionaries/en/trade-in.json').then(
        (module) => module.default
      ),
    // Daftarkan dictionary baru
    'why-buy-forklift': () =>
      import('../dictionaries/en/why-buy-forklift.json').then(
        (module) => module.default
      ),
    // Daftarkan dictionary baru
    news: () =>
      import('../dictionaries/en/news.json').then((module) => module.default),
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
    equipment: () =>
      import('../dictionaries/id/equipment.json').then(
        (module) => module.default
      ),
    'new-machines': () =>
      import('../dictionaries/id/new-machines.json').then(
        (module) => module.default
      ),
    parts: () =>
      import('../dictionaries/id/parts.json').then((module) => module.default),
    promotions: () =>
      import('../dictionaries/id/promotions.json').then(
        (module) => module.default
      ),
    'repair-packages': () =>
      import('../dictionaries/id/repair-packages.json').then(
        (module) => module.default
      ),
    rental: () =>
      import('../dictionaries/id/rental.json').then((module) => module.default),
    branches: () =>
      import('../dictionaries/id/branches.json').then(
        (module) => module.default
      ),
    service: () =>
      import('../dictionaries/id/service.json').then(
        (module) => module.default
      ),
    'trade-in': () =>
      import('../dictionaries/id/trade-in.json').then(
        (module) => module.default
      ),
    // Daftarkan dictionary baru
    'why-buy-forklift': () =>
      import('../dictionaries/id/why-buy-forklift.json').then(
        (module) => module.default
      ),
    // Daftarkan dictionary baru
    news: () =>
      import('../dictionaries/id/news.json').then((module) => module.default),
  },
};

export const getDictionary = async (locale, page) => {
  if (!dictionaries[locale] || !dictionaries[locale][page]) {
    const targetPage = dictionaries[locale][page] ? page : 'homepage';
    console.warn(
      `Dictionary for page "${page}" not found for locale "${locale}", falling back to "homepage".`
    );
    const commonDict = await dictionaries[locale].common();
    const pageDict = await dictionaries[locale][targetPage]();
    return { ...commonDict, ...pageDict };
  }

  const commonDict = await dictionaries[locale].common();
  const pageDict = await dictionaries[locale][page]();

  return { ...commonDict, ...pageDict };
};

export const getLayoutDictionary = async (locale) => {
  return dictionaries[locale].common();
};
