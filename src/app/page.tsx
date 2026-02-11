import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const t = useTranslations('home');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <main className="flex max-w-md flex-col items-center gap-6 text-center">
        <div className="relative h-32 w-32">
          <Image
            src="/images/male-chick.jpg"
            alt=""
            fill
            className="mix-blend-multiply object-contain"
            priority
          />
        </div>
        <h1 className="font-(family-name:--font-lora) text-4xl font-medium tracking-tight text-foreground">
          {t('title')}
        </h1>
        <p className="font-(family-name:--font-inter) text-lg leading-relaxed text-muted-foreground">
          {t('description')}
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <Button asChild size="lg">
            <Link href="/quiz">{t('startQuiz')}</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/answers">{t('seeAnswers')}</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
