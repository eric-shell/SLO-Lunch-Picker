import { Restaurant } from '../types';

export const drinks: Restaurant[] = [
    {
      id: 'dr1',
      name: 'Sidecar Cocktail Co.',
      address: '1040 Broad St, San Luis Obispo',
      categories: ['Cocktails'],
      hours: { Mon: '16:00-23:00', Tue: '16:00-23:00', Wed: '16:00-23:00', Thu: '16:00-00:00', Fri: '16:00-01:00', Sat: '14:00-01:00', Sun: '14:00-23:00' },
      mapUrl: 'https://goo.gl/maps/example',
      rating: 4.5,
      price: 2,
    },
    {
      id: 'dr2',
      name: 'Antigua Brewing Company',
      address: '1009 Monterey St, San Luis Obispo',
      categories: ['Craft Beer'],
      hours: { Mon: '11:00-21:00', Tue: '11:00-21:00', Wed: '11:00-21:00', Thu: '11:00-22:00', Fri: '11:00-23:00', Sat: '11:00-23:00', Sun: '11:00-21:00' },
      mapUrl: 'https://goo.gl/maps/example',
      rating: 4.4,
      price: 2,
    },
    {
      id: 'dr3',
      name: 'Luis Wine Bar',
      address: '1021 Higuera St, San Luis Obispo',
      categories: ['Wine Bar'],
      hours: { Mon: '16:00-22:00', Tue: '16:00-22:00', Wed: '16:00-22:00', Thu: '16:00-23:00', Fri: '15:00-00:00', Sat: '14:00-00:00', Sun: '14:00-21:00' },
      mapUrl: 'https://goo.gl/maps/example',
      rating: 4.7,
      price: 2,
    },
    {
        id: 'dr4',
        name: 'Nightcap',
        address: 'Hotel Granada, 1130 Morro St, San Luis Obispo',
        categories: ['Cocktails'],
        hours: { Mon: '17:00-22:00', Tue: '17:00-22:00', Wed: '17:00-22:00', Thu: '17:00-22:00', Fri: '17:00-23:00', Sat: '17:00-23:00', Sun: '17:00-22:00' },
        mapUrl: 'https://goo.gl/maps/example',
        rating: 4.6,
        price: 3,
    },
    {
        id: 'dr5',
        name: 'BA Start Arcade Bar',
        address: '647 Higuera St, San Luis Obispo',
        categories: ['Craft Beer'],
        hours: { Mon: '16:00-00:00', Tue: '16:00-00:00', Wed: '16:00-00:00', Thu: '16:00-02:00', Fri: '16:00-02:00', Sat: '14:00-02:00', Sun: '14:00-00:00' },
        mapUrl: 'https://goo.gl/maps/example',
        rating: 4.5,
        price: 2,
    }
];

