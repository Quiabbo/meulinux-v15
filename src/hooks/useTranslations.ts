import { useState, useEffect } from 'react';

export const useTranslations = (pageKey: string, defaultTranslations: any) => {
  const [translations, setTranslations] = useState(defaultTranslations);

  useEffect(() => {
    const savedOverrides = localStorage.getItem(`meulinux_translations_${pageKey}`);
    if (savedOverrides) {
      try {
        const overrides = JSON.parse(savedOverrides);
        // Deep merge overrides with defaults
        const merged = JSON.parse(JSON.stringify(defaultTranslations));
        
        Object.keys(overrides).forEach(lang => {
          if (merged[lang]) {
            merged[lang] = { ...merged[lang], ...overrides[lang] };
          }
        });
        
        setTranslations(merged);
      } catch (e) {
        console.error(`Failed to parse translations for ${pageKey}`, e);
      }
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `meulinux_translations_${pageKey}`) {
        if (e.newValue) {
          const overrides = JSON.parse(e.newValue);
          const merged = JSON.parse(JSON.stringify(defaultTranslations));
          Object.keys(overrides).forEach(lang => {
            if (merged[lang]) {
              merged[lang] = { ...merged[lang], ...overrides[lang] };
            }
          });
          setTranslations(merged);
        } else {
          setTranslations(defaultTranslations);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [pageKey, defaultTranslations]);

  return translations;
};
