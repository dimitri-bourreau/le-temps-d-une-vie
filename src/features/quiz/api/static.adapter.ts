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
    id: 'breeding-sow',
    nameKey: 'animals.breedingSow',
    slaughterAgeMonths: 36,
    naturalLifespanYears: 18,
    imagePath: '/images/breeding-sow.jpg',
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
    id: 'broiler-chicken',
    nameKey: 'animals.broilerChicken',
    slaughterAgeMonths: 1,
    naturalLifespanYears: 8,
    imagePath: '/images/broiler-chicken.jpg',
  },
  {
    id: 'lamb',
    nameKey: 'animals.lamb',
    slaughterAgeMonths: 5,
    naturalLifespanYears: 12,
    imagePath: '/images/lamb.jpg',
  },
  {
    id: 'rabbit',
    nameKey: 'animals.rabbit',
    slaughterAgeMonths: 2,
    naturalLifespanYears: 9,
    imagePath: '/images/rabbit.jpg',
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
  {
    id: 'dairy-goat',
    nameKey: 'animals.dairyGoat',
    slaughterAgeMonths: 48,
    naturalLifespanYears: 16,
    imagePath: '/images/dairy-goat.jpg',
  },
  {
    id: 'quail-eggs',
    nameKey: 'animals.quailEggs',
    slaughterAgeMonths: 6,
    naturalLifespanYears: 5,
    imagePath: '/images/quail-eggs.jpg',
  },
  {
    id: 'quail-meat',
    nameKey: 'animals.quailMeat',
    slaughterAgeMonths: 1,
    naturalLifespanYears: 5,
    imagePath: '/images/quail-meat.jpg',
  },
  {
    id: 'trout',
    nameKey: 'animals.trout',
    slaughterAgeMonths: 20,
    naturalLifespanYears: 14,
    imagePath: '/images/trout.jpg',
  },
];

export const createStaticQuizRepository = (): QuizRepository => ({
  getAnimals: () => animals,
});
