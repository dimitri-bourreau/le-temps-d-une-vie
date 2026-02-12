'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/molecules/language-switcher';

export const SiteHeader = () => {
  const pathname = usePathname();
  const t = useTranslations('header');
  const isHome = pathname === '/';

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-3 lg:left-72">
      {!isHome ? (
        <Link
          href="/"
          className="font-(family-name:--font-inter) text-sm text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          &larr; {t('home')}
        </Link>
      ) : (
        <div />
      )}
      <div className="hidden lg:block" />
      <LanguageSwitcher />
    </header>
  );
};
