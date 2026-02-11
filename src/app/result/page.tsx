'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

const ResultPage = () => {
  const t = useTranslations('result');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <main className="flex max-w-md flex-col items-center gap-8 text-center">
        <h1 className="font-(family-name:--font-lora) text-3xl font-medium tracking-tight text-foreground">
          {t('title')}
        </h1>
        <p className="font-(family-name:--font-inter) text-lg leading-relaxed text-muted-foreground">
          {t('message')}
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <Button asChild>
            <Link href="/answers">{t('seeAllAnswers')}</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">{t('restart')}</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
