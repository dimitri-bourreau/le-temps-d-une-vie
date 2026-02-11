'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export const LanguageSwitcher = () => {
  const router = useRouter();

  const switchLocale = (locale: string) => {
    document.cookie = `locale=${locale};path=/;max-age=31536000`;
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm" onClick={() => switchLocale('fr')}>
        FR
      </Button>
      <Button variant="ghost" size="sm" onClick={() => switchLocale('en')}>
        EN
      </Button>
    </div>
  );
};
