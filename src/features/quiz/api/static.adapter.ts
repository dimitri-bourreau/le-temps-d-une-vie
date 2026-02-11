import { QuizRepository } from './quiz.port';
import { Animal } from '../types/animal.type';

const animals: Animal[] = [
  {
    id: 'pig',
    nameKey: 'animals.pig',
    slaughterAgeMonths: 6,
    naturalLifespanYears: 18,
    imagePath: '/images/pig.jpg',
  },
  {
    id: 'dairy-calf',
    nameKey: 'animals.dairyCalf',
    slaughterAgeMonths: 6,
    naturalLifespanYears: 20,
    imagePath: '/images/dairy-calf.jpg',
  },
  {
    id: 'beef-cow',
    nameKey: 'animals.beefCow',
    slaughterAgeMonths: 96,
    naturalLifespanYears: 20,
    imagePath: '/images/beef-cow.jpg',
  },
  {
    id: 'male-chick',
    nameKey: 'animals.maleChick',
    slaughterAgeMonths: 0,
    naturalLifespanYears: 8,
    imagePath: '/images/male-chick.jpg',
  },
  {
    id: 'lamb',
    nameKey: 'animals.lamb',
    slaughterAgeMonths: 5,
    naturalLifespanYears: 12,
    imagePath: '/images/lamb.jpg',
  },
  {
    id: 'egg-hen',
    nameKey: 'animals.eggHen',
    slaughterAgeMonths: 17,
    naturalLifespanYears: 8,
    imagePath: '/images/egg-hen.jpg',
  },
  {
    id: 'turkey',
    nameKey: 'animals.turkey',
    slaughterAgeMonths: 4,
    naturalLifespanYears: 10,
    imagePath: '/images/turkey.jpg',
  },
];

export const createStaticQuizRepository = (): QuizRepository => ({
  getAnimals: () => animals,
});
