'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { VegetalSlider } from '@/components/atoms/vegetal-slider';
import { AnimatedHeart } from '@/components/atoms/animated-heart';
import { Button } from '@/components/ui/button';
import { Animal } from '@/features/quiz/types/animal.type';

interface QuizQuestionProps {
  animal: Animal;
  currentStep: number;
  totalSteps: number;
  onAnswerSubmit: (userGuessMonths: number) => void;
}

const ANIMAL_KEYS: Record<string, string> = {
  pig: 'pig',
  'dairy-calf': 'dairyCalf',
  'beef-cow': 'beefCow',
  'male-chick': 'maleChick',
  lamb: 'lamb',
  'egg-hen': 'eggHen',
  turkey: 'turkey',
};

const QuizQuestionInner = ({
  animal,
  currentStep,
  totalSteps,
  onAnswerSubmit,
}: QuizQuestionProps) => {
  const router = useRouter();
  const [, setStep] = useQueryState('step');
  const t = useTranslations('quiz');
  const tAnimals = useTranslations('animals');

  const maxSliderMonths = animal.naturalLifespanYears * 12;

  const [guessMonths, setGuessMonths] = useState(
    Math.floor(maxSliderMonths / 2)
  );
  const [isRevealed, setIsRevealed] = useState(false);

  const handleValidate = () => {
    setIsRevealed(true);
    onAnswerSubmit(guessMonths);
  };

  const handleNext = () => {
    if (currentStep + 1 >= totalSteps) {
      router.push('/result');
    } else {
      setStep(String(currentStep + 1));
    }
  };

  const formatSliderValue = (months: number) => {
    if (months < 12) {
      return `${months} mois`;
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
      return `${years} an${years > 1 ? 's' : ''}`;
    }
    return `${years}a ${remainingMonths}m`;
  };

  const animalKey = ANIMAL_KEYS[animal.id] || animal.id;
  const animalName = tAnimals(animalKey);

  return (
    <main className="flex w-full max-w-md flex-col items-center gap-6">
      <div className="font-(family-name:--font-inter) text-sm text-muted-foreground">
        {currentStep + 1} / {totalSteps}
      </div>

      <h2 className="font-(family-name:--font-lora) text-2xl font-medium text-foreground">
        {animalName}
      </h2>

      {!isRevealed ? (
        <>
          <div className="relative h-48 w-48 overflow-hidden rounded-lg">
            <Image
              src={animal.imagePath}
              alt={animalName}
              fill
              className="mix-blend-multiply object-contain"
              priority
            />
          </div>

          <p className="font-(family-name:--font-inter) text-center text-muted-foreground">
            {t('question')}
          </p>

          <div className="w-full">
            <VegetalSlider
              min={0}
              max={maxSliderMonths}
              value={guessMonths}
              onChange={setGuessMonths}
            />
            <div className="mt-2 text-center font-(family-name:--font-inter) text-lg font-medium text-foreground">
              {formatSliderValue(guessMonths)}
            </div>
          </div>

          <Button onClick={handleValidate} size="lg" className="mt-4">
            {t('validate')}
          </Button>
        </>
      ) : (
        <>
          <AnimatedHeart
            naturalLifespanYears={animal.naturalLifespanYears}
            slaughterAgeMonths={animal.slaughterAgeMonths}
            userGuessMonths={guessMonths}
            isRevealed={isRevealed}
          />

          <Button onClick={handleNext} size="lg" className="mt-4">
            {currentStep + 1 >= totalSteps ? t('seeResults') : t('next')}
          </Button>
        </>
      )}
    </main>
  );
};

export const QuizQuestion = (props: QuizQuestionProps) => {
  return <QuizQuestionInner key={props.animal.id} {...props} />;
};
