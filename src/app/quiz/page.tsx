import { Suspense } from 'react';
import { QuizContent } from '@/components/organisms/quiz-content';

const QuizPage = () => {
  return (
    <Suspense fallback={null}>
      <QuizContent />
    </Suspense>
  );
};

export default QuizPage;
