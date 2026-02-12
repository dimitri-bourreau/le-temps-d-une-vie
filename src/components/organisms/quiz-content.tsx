'use client';

import { useState } from 'react';
import { useQueryState } from 'nuqs';
import { QuizQuestion } from '@/components/organisms/quiz-question';
import { QuizSidebar } from '@/components/organisms/quiz-sidebar';
import { createStaticQuizRepository } from '@/features/quiz/api/static.adapter';
import { getAnimals } from '@/features/quiz/services/get-animals.service';
import { QuizAnswer } from '@/features/quiz/types/quiz-answer.type';

const repository = createStaticQuizRepository();
const animals = getAnimals(repository);

export const QuizContent = () => {
  const [step] = useQueryState('step', { defaultValue: '0' });
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const currentStep = parseInt(step, 10);
  const currentAnimal = animals[currentStep];

  const handleAnswerSubmit = (userGuessMonths: number) => {
    setAnswers((prev) => [
      ...prev.filter((answer) => answer.animal.id !== currentAnimal.id),
      { animal: currentAnimal, userGuessMonths },
    ]);
  };

  if (!currentAnimal) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-background">
      <QuizSidebar
        animals={animals}
        answers={answers}
        currentStep={currentStep}
      />
      <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 pb-16">
        <QuizQuestion
          animal={currentAnimal}
          currentStep={currentStep}
          totalSteps={animals.length}
          onAnswerSubmit={handleAnswerSubmit}
        />
      </div>
    </div>
  );
};
