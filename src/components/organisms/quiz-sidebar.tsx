'use client';

import { useTranslations } from 'next-intl';
import { AnswerCard } from '@/components/molecules/answer-card';
import { QuizAnswer } from '@/features/quiz/types/quiz-answer.type';

interface QuizSidebarProps {
  answers: QuizAnswer[];
}

export const QuizSidebar = ({ answers }: QuizSidebarProps) => {
  const t = useTranslations('quiz');

  if (answers.length === 0) {
    return null;
  }

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col gap-4 border-r border-border bg-background p-6 pt-20 lg:flex">
      <h3 className="font-(family-name:--font-inter) text-sm font-medium text-muted-foreground">
        {t('previousAnswers')}
      </h3>
      <div className="flex flex-col gap-3">
        {answers.map((answer) => (
          <AnswerCard
            key={answer.animal.id}
            animal={answer.animal}
            userGuessMonths={answer.userGuessMonths}
            compact
          />
        ))}
      </div>
    </aside>
  );
};
