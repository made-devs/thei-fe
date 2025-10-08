// app/components/language-switcher.js

'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '../../i18n-config';
import { ChevronDown } from 'lucide-react';

export default function LanguageSwitcher({ currentLocale }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const switcherRef = useRef(null);

  const redirectedPathName = (locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [switcherRef]);

  return (
    <div ref={switcherRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center text-sm font-semibold transition-colors text-yellow-400 hover:opacity-80"
      >
        <span>{currentLocale.toUpperCase()}</span>
        <ChevronDown
          size={16}
          className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-16 bg-black border border-yellow-400/50 rounded-md shadow-lg z-40">
          <ul className="py-1">
            {i18n.locales.map((locale) => {
              if (locale === currentLocale) return null;
              return (
                <li key={locale}>
                  <Link
                    href={redirectedPathName(locale)}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-sm text-yellow-400 hover:bg-yellow-400 hover:text-black text-center transition-colors"
                  >
                    {locale.toUpperCase()}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
