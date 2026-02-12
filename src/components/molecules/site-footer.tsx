'use client';

import { useTranslations } from 'next-intl';

export const SiteFooter = () => {
  const t = useTranslations('footer');

  return (
    <footer className="px-4 py-3 text-center">
      <p className="font-(family-name:--font-inter) text-xs text-muted-foreground">
        {t('createdBy')}{' '}
        <a
          href="https://dimitribourreau.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-colors hover:text-foreground"
        >
          Dimitri Bourreau
        </a>
      </p>
    </footer>
  );
};
