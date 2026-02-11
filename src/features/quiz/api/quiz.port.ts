import { Animal } from '../types/animal.type';

export interface QuizRepository {
  getAnimals: () => Animal[];
}
