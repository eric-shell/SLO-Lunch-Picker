import { Restaurant } from '../types';

export const coffee: Restaurant[] = [
    {
      id: 'c1',
      name: 'Scout Coffee',
      address: '1130 Garden St, San Luis Obispo',
      category: 'Espresso',
      hours: { Mon: '06:30-18:30', Tue: '06:30-18:30', Wed: '06:30-18:30', Thu: '06:30-18:30', Fri: '06:30-18:30', Sat: '06:30-18:30', Sun: '06:30-18:30' },
      mapUrl: 'https://goo.gl/maps/example',
      rating: 4.8,
      price: 1,
    },
    {
      id: 'c2',
      name: 'Kreuzberg California',
      address: '685 Higuera St, San Luis Obispo',
      category: 'Quiet Spots',
      hours: { Mon: '07:00-22:00', Tue: '07:00-22:00', Wed: '07:00-22:00', Thu: '07:00-22:00', Fri: '07:00-22:00', Sat: '07:00-22:00', Sun: '07:00-22:00' },
      mapUrl: 'https://goo.gl/maps/example',
      rating: 4.5,
      price: 2,
    },
    {
      id: 'c3',
      name: 'Linnaea\'s Cafe',
      address: '1110 Garden St, San Luis Obispo',
      category: 'Pastries',
      hours: { Mon: '07:00-22:00', Tue: '07:00-22:00', Wed: '07:00-22:00', Thu: '07:00-22:00', Fri: '07:00-22:00', Sat: '07:00-22:00', Sun: '07:00-22:00' },
      mapUrl: 'https://goo.gl/maps/example',
      rating: 4.7,
      price: 1,
    },
    {
        id: 'c4',
        name: 'Ascendo Coffee',
        address: '311 Higuera St, San Luis Obispo',
        category: 'Cold Brew',
        hours: { Mon: '07:00-16:00', Tue: '07:00-16:00', Wed: '07:00-16:00', Thu: '07:00-16:00', Fri: '07:00-16:00', Sat: '08:00-16:00', Sun: '08:00-16:00' },
        mapUrl: 'https://goo.gl/maps/example',
        rating: 4.6,
        price: 1,
    },
    {
        id: 'c5',
        name: 'Coastal Peaks Coffee',
        address: '3566 S Higuera St #100, San Luis Obispo',
        category: 'Espresso',
        hours: { Mon: '06:00-17:00', Tue: '06:00-17:00', Wed: '06:00-17:00', Thu: '06:00-17:00', Fri: '06:00-17:00', Sat: '07:00-14:00', Sun: 'Closed' },
        mapUrl: 'https://goo.gl/maps/example',
        rating: 4.8,
        price: 1,
    }
];

