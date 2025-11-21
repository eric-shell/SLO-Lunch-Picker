import { Restaurant } from '../types';

export const breakfast: Restaurant[] = [
    {
      id: 'b1',
      name: 'Louisa’s Place',
      address: '964 Higuera St, San Luis Obispo',
      category: 'Diner',
      hours: { Mon: '06:00-15:00', Tue: '06:00-15:00', Wed: '06:00-15:00', Thu: '06:00-15:00', Fri: '06:00-15:00', Sat: '06:00-15:00', Sun: '06:00-15:00' },
      mapUrl: 'https://goo.gl/maps/example',
      rating: 4.6,
      price: 2,
    },
    {
      id: 'b2',
      name: 'Sally Loo\'s Wholesome Cafe',
      address: '1804 Osos St, San Luis Obispo',
      category: 'Healthy',
      hours: { Mon: '07:00-14:00', Tue: '07:00-14:00', Wed: '07:00-14:00', Thu: '07:00-14:00', Fri: '07:00-14:00', Sat: '08:00-14:00', Sun: '08:00-14:00' },
      mapUrl: 'https://goo.gl/maps/example',
      rating: 4.5,
      price: 2,
    },
    {
      id: 'b3',
      name: 'Breakfast Buzz',
      address: '295 Santa Rosa St, San Luis Obispo',
      category: 'Pancakes',
      hours: { Mon: '06:00-14:00', Tue: '06:00-14:00', Wed: '06:00-14:00', Thu: '06:00-14:00', Fri: '06:00-14:00', Sat: '07:00-14:00', Sun: '07:00-14:00' },
      mapUrl: 'https://goo.gl/maps/example',
      rating: 4.3,
      price: 1,
    },
    {
        id: 'b4',
        name: 'Del Monte Cafe',
        address: '1901 Santa Ynez Ave, San Luis Obispo',
        category: 'Brunch',
        hours: { Mon: '07:00-14:00', Tue: '07:00-14:00', Wed: '07:00-14:00', Thu: '07:00-14:00', Fri: '07:00-14:00', Sat: '07:00-14:00', Sun: '07:00-14:00' },
        mapUrl: 'https://goo.gl/maps/example',
        rating: 4.5,
        price: 2,
    },
    {
        id: 'b5',
        name: 'Mint + Craft',
        address: '848 Monterey St, San Luis Obispo',
        category: 'Healthy',
        hours: { Mon: '08:00-15:00', Tue: '08:00-15:00', Wed: '08:00-15:00', Thu: '08:00-15:00', Fri: '08:00-15:00', Sat: '08:00-15:00', Sun: '08:00-15:00' },
        mapUrl: 'https://goo.gl/maps/example',
        rating: 4.4,
        price: 2,
    }
];

