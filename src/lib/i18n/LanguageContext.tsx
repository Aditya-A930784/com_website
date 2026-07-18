'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import en from './dictionaries/en.json';
import mr from './dictionaries/mr.json';

export type Locale = 'mr' | 'en';

type Dictionary = typeof mr;

const dictionaries: Record<Locale, Dictionary> = {
  mr,
  en: en as unknown as Dictionary,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Translates key with dot-notation. Fallbacks to key itself if not found. */
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

/** Helper to resolve nested key paths (e.g., 'home.about.title') */
function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path; // Fallback to key path itself
    }
  }
  return typeof current === 'string' ? current : path;
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('mr');
  const pathname = usePathname();

  // 1. Detect locale from pathname first; fall back to localStorage for
  //    bare-path subpages (e.g. /about, /services) that have no /en prefix.
  //    This ensures the user's chosen language persists on all subpages.
  useEffect(() => {
    if (pathname.startsWith('/en')) {
      setLocaleState('en');
    } else {
      // No locale prefix — respect what the user last explicitly chose
      const saved = (typeof window !== 'undefined'
        ? localStorage.getItem('csmc-locale')
        : null) as Locale | null;
      setLocaleState(saved === 'en' ? 'en' : 'mr');
    }
  }, [pathname]);

  // Keep the document language accurate for assistive technology, browser
  // translation, spell checking, and language-aware typography.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // 2. Update locale state and persist to localStorage.
  // No URL navigation is needed — all subpages (/about, /services, etc.) are
  // locale-neutral bare paths. The useEffect above reads localStorage on every
  // route change, so the correct language is applied everywhere automatically.
  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    setLocaleState(newLocale);
    localStorage.setItem('csmc-locale', newLocale);
  };

  const t = (key: string) => {
    const dict = dictionaries[locale] || dictionaries.mr;
    return getNestedValue(dict, key);
  };

  const value: LanguageContextType = {
    locale,
    setLocale,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
