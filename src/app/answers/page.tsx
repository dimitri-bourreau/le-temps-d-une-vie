import { getTranslations } from 'next-intl/server';
import { createStaticQuizRepository } from '@/features/quiz/api/static.adapter';
import { getAnimals } from '@/features/quiz/services/get-animals.service';
import { AnswerCard } from '@/components/molecules/answer-card';

const repository = createStaticQuizRepository();
const animals = getAnimals(repository);

const AnswersPage = async () => {
  const t = await getTranslations('answers');

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-6 pb-16 pt-20">
      <main className="w-full max-w-4xl">
        <h1 className="font-(family-name:--font-lora) mb-2 text-center text-3xl font-medium text-foreground">
          {t('title')}
        </h1>
        <p className="font-(family-name:--font-inter) mb-8 text-center text-sm text-muted-foreground">
          {t('source')}{' '}
          <a
            href="https://www.l214.com/animaux/esperance-vie-animaux-viande-lait-oeufs/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors hover:text-foreground"
          >
            L214
          </a>
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {animals.map((animal) => (
            <AnswerCard key={animal.id} animal={animal} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AnswersPage;
