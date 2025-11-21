import { Restaurant } from '../types';

export const dinner: Restaurant[] = [
    {
      id: 'd1',
      name: 'Novo Restaurant & Lounge',
      address: '726 Higuera St, San Luis Obispo',
      category: 'Date Night',
      hours: { Mon: '11:00-21:00', Tue: '11:00-21:00', Wed: '11:00-21:00', Thu: '11:00-21:00', Fri: '11:00-22:00', Sat: '10:00-22:00', Sun: '10:00-21:00' },
      mapUrl: 'https://goo.gl/maps/example',
      rating: 4.6,
      price: 3,
    },
    {
      id: 'd2',
      name: 'Giuseppe\'s Cucina Rustica',
      address: '849 Monterey St, San Luis Obispo',
      category: 'Italian',
      hours: { Mon: '11:30-22:00', Tue: '11:30-22:00', Wed: '11:30-22:00', Thu: '11:30-22:00', Fri: '11:30-23:00', Sat: '11:30-23:00', Sun: '11:30-22:00' },
      mapUrl: 'https://goo.gl/maps/example',
      rating: 4.7,
      price: 3,
    },
    {
      id: 'd3',
      name: 'Ox + Anchor',
      address: '877 Palm St, San Luis Obispo',
      category: 'Steak',
      hours: { Mon: '17:00-21:00', Tue: '17:00-21:00', Wed: '17:00-21:00', Thu: '17:00-21:00', Fri: '17:00-22:00', Sat: '17:00-22:00', Sun: '17:00-21:00' },
      mapUrl: 'https://goo.gl/maps/example',
      rating: 4.6,
      price: 4,
    },
    {
        id: 'd4',
        name: 'Goshi Japanese Restaurant',
        address: '570 Higuera St, San Luis Obispo',
        category: 'Sushi',
        hours: { Mon: '11:30-14:00', Tue: '11:30-14:00', Wed: '11:30-14:00', Thu: '11:30-14:00', Fri: '11:30-14:00', Sat: '17:00-21:00', Sun: 'Closed' },
        mapUrl: 'https://goo.gl/maps/example',
        rating: 4.6,
        price: 3,
    },
    {
        id: 'd5',
        name: 'Finney\'s Crafthouse',
        address: '857 Monterey St, San Luis Obispo',
        category: 'Casual',
        hours: { Mon: '11:00-22:00', Tue: '11:00-22:00', Wed: '11:00-22:00', Thu: '11:00-22:00', Fri: '11:00-23:00', Sat: '11:00-23:00', Sun: '10:00-22:00' },
        mapUrl: 'https://goo.gl/maps/example',
        rating: 4.6,
        price: 2,
    }
];

