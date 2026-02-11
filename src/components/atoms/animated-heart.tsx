'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

interface AnimatedHeartProps {
  naturalLifespanYears: number;
  slaughterAgeMonths: number;
  userGuessMonths: number;
  isRevealed: boolean;
}

export const AnimatedHeart = ({
  naturalLifespanYears,
  slaughterAgeMonths,
  userGuessMonths,
  isRevealed,
}: AnimatedHeartProps) => {
  const t = useTranslations('quiz');
  const tTime = useTranslations('time');

  const naturalLifespanMonths = naturalLifespanYears * 12;
  const slaughterPercentage =
    (slaughterAgeMonths / naturalLifespanMonths) * 100;

  const heartPathLength = 280;

  const [currentPercentage, setCurrentPercentage] = useState(100);
  const animationRef = useRef<number | null>(null);
  const wasRevealedRef = useRef(false);

  useEffect(() => {
    if (!isRevealed) {
      wasRevealedRef.current = false;
      return;
    }

    if (wasRevealedRef.current) {
      return;
    }

    wasRevealedRef.current = true;
    const animationDuration = 4000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      const easeInOut =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const newPercentage = 100 - (100 - slaughterPercentage) * easeInOut;

      setCurrentPercentage(newPercentage);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRevealed, slaughterPercentage]);

  const strokeDashoffset =
    heartPathLength - (currentPercentage / 100) * heartPathLength;

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

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        <svg viewBox="0 0 100 100" className="h-48 w-48">
          <path
            d="M50 91 C25 70, 5 50, 5 30 C5 15, 17 5, 30 5 C40 5, 47 12, 50 18 C53 12, 60 5, 70 5 C83 5, 95 15, 95 30 C95 50, 75 70, 50 91 Z"
            fill="none"
            stroke="#E5E5E5"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M50 91 C25 70, 5 50, 5 30 C5 15, 17 5, 30 5 C40 5, 47 12, 50 18 C53 12, 60 5, 70 5 C83 5, 95 15, 95 30 C95 50, 75 70, 50 91 Z"
            fill="none"
            stroke="#E07A7A"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray={heartPathLength}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        {isRevealed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-(family-name:--font-lora) text-3xl font-medium text-foreground">
              {Math.round(currentPercentage)}%
            </span>
            <span className="font-(family-name:--font-inter) text-xs text-muted-foreground">
              {t('lifePercentage')}
            </span>
          </div>
        )}
      </div>

      {isRevealed && (
        <div className="flex flex-col gap-4 text-center">
          <div className="flex flex-col gap-1">
            <p className="font-(family-name:--font-inter) text-sm text-muted-foreground">
              {t('naturalLifespan')}
            </p>
            <p className="font-(family-name:--font-lora) text-xl font-medium text-primary">
              {naturalLifespanYears} ans
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-(family-name:--font-inter) text-sm text-muted-foreground">
              {t('reality')}
            </p>
            <p className="font-(family-name:--font-lora) text-xl font-medium text-foreground">
              {formatAge(slaughterAgeMonths)}
            </p>
          </div>
          <p className="font-(family-name:--font-inter) mt-2 text-xs text-muted-foreground">
            {t('yourAnswer')} {formatAge(userGuessMonths)}
          </p>
        </div>
      )}
    </div>
  );
};
