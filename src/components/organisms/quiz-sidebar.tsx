'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Animal } from '@/features/quiz/types/animal.type';
import { QuizAnswer } from '@/features/quiz/types/quiz-answer.type';

interface QuizSidebarProps {
  animals: Animal[];
  answers: QuizAnswer[];
  currentStep: number;
}

const ANIMAL_KEYS: Record<string, string> = {
  pig: 'pig',
  'breeding-sow': 'breedingSow',
  'dairy-calf': 'dairyCalf',
  'beef-cow': 'beefCow',
  'male-chick': 'maleChick',
  'broiler-chicken': 'broilerChicken',
  lamb: 'lamb',
  rabbit: 'rabbit',
  'egg-hen': 'eggHen',
  turkey: 'turkey',
  'dairy-goat': 'dairyGoat',
  'quail-eggs': 'quailEggs',
  'quail-meat': 'quailMeat',
  trout: 'trout',
};

export const QuizSidebar = ({
  animals,
  answers,
  currentStep,
}: QuizSidebarProps) => {
  const t = useTranslations('quiz');
  const tHeader = useTranslations('header');
  const tAnimals = useTranslations('animals');
  const tTime = useTranslations('time');

  const formatAge = (months: number) => {
    if (months < 1) return tTime('day');
    if (months < 12) return tTime('months', { count: months });
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
      return years === 1
        ? tTime('year', { count: years })
        : tTime('years', { count: years });
    }
    return years === 1
      ? tTime('yearsAndMonths', { years, months: remainingMonths })
      : tTime('yearsAndMonthsPlural', { years, months: remainingMonths });
  };

  const getAnswer = (animalId: string) =>
    answers.find((a) => a.animal.id === animalId);

  return (
    <aside className="fixed left-0 top-0 z-[60] hidden h-screen w-72 flex-col border-r border-border bg-background lg:flex">
      <div className="px-4 py-3">
        <Link
          href="/"
          className="cursor-pointer font-(family-name:--font-inter) text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; {tHeader('home')}
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-4">
        {animals.map((animal, index) => {
          const answer = getAnswer(animal.id);
          const isAnswered = !!answer;
          const isCurrent = index === currentStep;
          const animalKey = ANIMAL_KEYS[animal.id] || animal.id;
          const animalName = tAnimals(animalKey);
          const lifePercentage = Math.round(
            (animal.slaughterAgeMonths / (animal.naturalLifespanYears * 12)) *
              100
          );

          return (
            <Link
              key={animal.id}
              href={`/quiz?step=${index}`}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
                isCurrent
                  ? 'border-primary bg-primary/10 shadow-sm'
                  : isAnswered
                    ? 'border-border bg-card hover:bg-muted'
                    : 'border-border/50 bg-muted/30 opacity-60 hover:opacity-100'
              }`}
            >
              <div
                className={`relative h-10 w-10 shrink-0 overflow-hidden rounded ${
                  !isAnswered && !isCurrent ? 'grayscale' : ''
                }`}
              >
                <Image
                  src={animal.imagePath}
                  alt={animalName}
                  fill
                  className="mix-blend-multiply object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`font-(family-name:--font-lora) truncate text-sm font-medium ${
                    isCurrent ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {animalName}
                </p>
                {isAnswered ? (
                  <p className="font-(family-name:--font-inter) text-xs text-muted-foreground">
                    {formatAge(animal.slaughterAgeMonths)} ({lifePercentage}%)
                  </p>
                ) : (
                  <p className="font-(family-name:--font-inter) text-xs text-muted-foreground/50">
                    —
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="border-t border-border p-4">
        <Link
          href="/answers"
          className="!cursor-pointer font-(family-name:--font-inter) text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {t('seeAllAnswers')} →
        </Link>
      </div>
    </aside>
  );
};
