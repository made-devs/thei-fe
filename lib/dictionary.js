// /lib/dictionary.js

import 'server-only';
import { i18n } from '../i18n-config';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  id: () => import('../dictionaries/id.json').then((module) => module.default),
};

export const getDictionary = async (locale) => {
  const currentLocale = i18n.locales.includes(locale)
    ? locale
    : i18n.defaultLocale;
  return dictionaries[currentLocale]();
};
