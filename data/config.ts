import { Restaurant } from '../types';
import { coffee } from './curated/coffee';
import { breakfast } from './curated/breakfast';
import { lunch } from './curated/lunch';
import { dinner } from './curated/dinner';
import { drinks } from './curated/drinks';
import { treats } from './curated/treats';

export interface PortalData {
  coffee: Restaurant[];
  breakfast: Restaurant[];
  lunch: Restaurant[];
  dinner: Restaurant[];
  drinks: Restaurant[];
  treats: Restaurant[];
}

export const PORTAL_CRAVINGS = {
  coffee: ['Espresso', 'Cold Brew', 'Pastries', 'Quiet Spots', 'Vegan'],
  breakfast: ['Diner', 'Brunch', 'Pancakes', 'Healthy', 'Vegan'],
  lunch: [
    'American',
    'Asian',
    'BBQ',
    'Bakery',
    'Global',
    'Indian',
    'Italian',
    'Mediterranean',
    'Mexican',
    'Pizza',
    'Sandwiches',
    'Seafood',
    'Vegan'
  ],
  dinner: [
    'American',
    'Asian',
    'BBQ',
    'Casual',
    'Date Night',
    'Fine Dining',
    'Global',
    'Indian',
    'Italian',
    'Mediterranean',
    'Mexican',
    'Pizza',
    'Seafood',
    'Steak',
    'Sushi',
    'Vegan'
  ],
  drinks: ['Cocktails', 'Craft Beer', 'Wine Bar', 'Mocktails'],
  treats: ['Ice Cream', 'Cookies', 'Candy', 'Donuts', 'Chocolates', 'Frozen Yogurt', 'Vegan'],
};

export const portalData: PortalData = {
  coffee,
  breakfast,
  lunch,
  dinner,
  drinks,
  treats,
};
