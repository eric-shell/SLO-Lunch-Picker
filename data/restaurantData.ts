import { Restaurant } from '../types';
import { coffee } from './coffee';
import { breakfast } from './breakfast';
import { lunch } from './lunch';
import { dinner } from './dinner';
import { drinks } from './drinks';
import { treats } from './treats';

export interface RestaurantData {
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
    'Mediterranean',
    'Mexican',
    'Pizza',
    'Sandwiches',
    'Seafood',
    'Vegan'
  ],
  dinner: ['Fine Dining', 'Date Night', 'Casual', 'Steak', 'Italian', 'Sushi', 'Vegan'],
  drinks: ['Cocktails', 'Craft Beer', 'Wine Bar', 'Mocktails'],
  treats: ['Ice Cream', 'Cookies', 'Candy', 'Donuts', 'Chocolates', 'Frozen Yogurt', 'Vegan'],
};

export const restaurantData: RestaurantData = {
  coffee,
  breakfast,
  lunch,
  dinner,
  drinks,
  treats,
};
