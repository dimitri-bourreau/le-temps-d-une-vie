'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Animal } from '@/features/quiz/types/animal.type';

interface AnswerCardProps {
  animal: Animal;
  userGuessMonths?: number;
  compact?: boolean;
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

export const AnswerCard = ({
  animal,
  userGuessMonths,
  compact = false,
}: AnswerCardProps) => {
  const tAnimals = useTranslations('animals');
  const tTime = useTranslations('time');
  const t = useTranslations('quiz');

  const animalKey = ANIMAL_KEYS[animal.id] || animal.id;
  const animalName = tAnimals(animalKey);

  const naturalLifespanMonths = animal.naturalLifespanYears * 12;
  const lifePercentage = Math.round(
    (animal.slaughterAgeMonths / naturalLifespanMonths) * 100
  );

  const formatAge = (months: number) => {
    if (months < 1) return tTime('day');
    if (months < 12) {
      return tTime('months', { count: months });
    }
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

  if (compact) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded">
          <Image
            src={animal.imagePath}
            alt={animalName}
            fill
            className="mix-blend-multiply object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-(family-name:--font-lora) text-sm font-medium text-foreground truncate">
            {animalName}
          </p>
          <p className="font-(family-name:--font-inter) text-xs text-muted-foreground">
            {formatAge(animal.slaughterAgeMonths)} ({lifePercentage}%)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative h-32 w-full">
        <Image
          src={animal.imagePath}
          alt={animalName}
          fill
          className="mix-blend-multiply object-contain"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-(family-name:--font-lora) text-lg font-medium text-foreground">
          {animalName}
        </h3>
        <div className="flex justify-between text-sm">
          <span className="font-(family-name:--font-inter) text-muted-foreground">
            {t('naturalLifespan')}
          </span>
          <span className="font-(family-name:--font-inter) font-medium text-primary">
            {animal.naturalLifespanYears} ans
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-(family-name:--font-inter) text-muted-foreground">
            {t('reality')}
          </span>
          <span className="font-(family-name:--font-inter) font-medium text-foreground">
            {formatAge(animal.slaughterAgeMonths)}
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-[#E07A7A]"
            style={{ width: `${lifePercentage}%` }}
          />
        </div>
        <p className="font-(family-name:--font-inter) text-center text-xs text-muted-foreground">
          {lifePercentage}% {t('lifePercentage')}
        </p>
        {userGuessMonths !== undefined && (
          <p className="font-(family-name:--font-inter) mt-1 text-center text-xs text-muted-foreground">
            {t('yourAnswer')} {formatAge(userGuessMonths)}
          </p>
        )}
      </div>
    </div>
  );
};
