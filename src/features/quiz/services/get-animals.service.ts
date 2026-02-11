import { QuizRepository } from '../api/quiz.port';

export const getAnimals = (repository: QuizRepository) => {
  return repository.getAnimals();
};
