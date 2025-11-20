import { Restaurant } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Firestone Grill",
    address: "1001 Higuera St, San Luis Obispo, CA 93401",
    category: "BBQ",
    hours: {
      "Mon": "11:00-22:00",
      "Tue": "11:00-22:00",
      "Wed": "11:00-22:00",
      "Thu": "11:00-22:00",
      "Fri": "11:00-22:00",
      "Sat": "11:00-22:00",
      "Sun": "11:00-22:00"
    },
    website: "https://www.firestonegrill.com",
    mapUrl: "https://goo.gl/maps/example1",
    notes: "Famous for Tri-Tip sandwiches.",
    rating: 4.7,
    price: 2
  },
  {
    id: "2",
    name: "Woodstock's Pizza",
    address: "1000 Higuera St, San Luis Obispo, CA 93401",
    category: "Pizza",
    hours: {
      "Mon": "11:00-00:00",
      "Tue": "11:00-00:00",
      "Wed": "11:00-01:00",
      "Thu": "11:00-01:00",
      "Fri": "11:00-02:00",
      "Sat": "11:00-02:00",
      "Sun": "11:00-00:00"
    },
    website: "https://woodstocksslo.com",
    mapUrl: "https://goo.gl/maps/example2",
    rating: 4.5,
    price: 2
  },
  {
    id: "3",
    name: "High Street Market & Deli",
    address: "350 High St, San Luis Obispo, CA 93401",
    category: "Sandwiches",
    hours: {
      "Mon": "09:00-17:30",
      "Tue": "09:00-17:30",
      "Wed": "09:00-17:30",
      "Thu": "09:00-17:30",
      "Fri": "09:00-17:30",
      "Sat": "09:00-17:30",
      "Sun": "09:00-17:30"
    },
    website: "https://www.highstdeli.com",
    mapUrl: "https://goo.gl/maps/example3",
    notes: "Get the Dutch Punch after 4:20!",
    rating: 4.8,
    price: 2
  },
  {
    id: "4",
    name: "Splash Café",
    address: "1491 Monterey St, San Luis Obispo, CA 93401",
    category: "Seafood",
    hours: {
      "Mon": "08:00-20:00",
      "Tue": "08:00-20:00",
      "Wed": "08:00-20:00",
      "Thu": "08:00-20:00",
      "Fri": "08:00-20:00",
      "Sat": "08:00-20:00",
      "Sun": "08:00-20:00"
    },
    website: "https://www.splashcafe.com",
    mapUrl: "https://goo.gl/maps/example4",
    rating: 4.4,
    price: 2
  },
  {
    id: "5",
    name: "Novo Restaurant & Lounge",
    address: "726 Higuera St, San Luis Obispo, CA 93401",
    category: "Global",
    hours: {
      "Mon": "11:00-21:00",
      "Tue": "11:00-21:00",
      "Wed": "11:00-21:00",
      "Thu": "11:00-21:00",
      "Fri": "11:00-22:00",
      "Sat": "10:00-22:00",
      "Sun": "10:00-21:00"
    },
    website: "https://www.novorestaurant.com",
    mapUrl: "https://goo.gl/maps/example5",
    notes: "Great creekside patio.",
    rating: 4.6,
    price: 3
  },
  {
    id: "6",
    name: "Taqueria Santa Cruz Express",
    address: "1308 Monterey St, San Luis Obispo, CA 93401",
    category: "Mexican",
    hours: {
      "Mon": "08:00-22:00",
      "Tue": "08:00-22:00",
      "Wed": "08:00-22:00",
      "Thu": "08:00-22:00",
      "Fri": "08:00-22:00",
      "Sat": "08:00-22:00",
      "Sun": "08:00-22:00"
    },
    mapUrl: "https://goo.gl/maps/example6",
    rating: 4.3,
    price: 1
  },
  {
    id: "7",
    name: "Petra Mediterranean Pizza & Grill",
    address: "1210 Higuera St, San Luis Obispo, CA 93401",
    category: "Mediterranean",
    hours: {
      "Mon": "10:30-22:00",
      "Tue": "10:30-22:00",
      "Wed": "10:30-22:00",
      "Thu": "10:30-22:00",
      "Fri": "10:30-22:00",
      "Sat": "10:30-22:00",
      "Sun": "10:30-22:00"
    },
    website: "http://petraslo.com",
    mapUrl: "https://goo.gl/maps/example7",
    rating: 4.2,
    price: 2
  },
  {
    id: "8",
    name: "Old San Luis BBQ Company",
    address: "670 Higuera St, San Luis Obispo, CA 93401",
    category: "BBQ",
    hours: {
      "Mon": "11:00-21:00",
      "Tue": "11:00-21:00",
      "Wed": "11:00-21:00",
      "Thu": "11:00-22:00",
      "Fri": "11:00-22:00",
      "Sat": "11:00-22:00",
      "Sun": "11:00-21:00"
    },
    website: "https://www.oldsanluisbbq.com",
    mapUrl: "https://goo.gl/maps/example8",
    rating: 4.5,
    price: 2
  },
  {
    id: "9",
    name: "SloDoCo Donuts",
    address: "793F Foothill Blvd, San Luis Obispo, CA 93405",
    category: "Bakery",
    hours: {
      "Mon": "00:00-23:59",
      "Tue": "00:00-23:59",
      "Wed": "00:00-23:59",
      "Thu": "00:00-23:59",
      "Fri": "00:00-23:59",
      "Sat": "00:00-23:59",
      "Sun": "00:00-23:59"
    },
    website: "https://slodoco.com",
    mapUrl: "https://goo.gl/maps/example9",
    notes: "Open 24 hours!",
    rating: 4.9,
    price: 1
  },
  {
    id: "10",
    name: "Goshi Japanese Restaurant",
    address: "570 Higuera St, San Luis Obispo, CA 93401",
    category: "Asian",
    hours: {
      "Mon": "11:30-14:00",
      "Tue": "11:30-14:00",
      "Wed": "11:30-14:00",
      "Thu": "11:30-14:00",
      "Fri": "11:30-14:00",
      "Sat": "17:00-21:00",
      "Sun": "Closed"
    },
    website: "https://goshislo.com",
    mapUrl: "https://goo.gl/maps/example10",
    rating: 4.6,
    price: 3
  },
  {
    id: "11",
    name: "Luna Red",
    address: "1023 Chorro St, San Luis Obispo, CA 93401",
    category: "Global",
    hours: {
      "Mon": "11:30-21:00",
      "Tue": "11:30-21:00",
      "Wed": "11:30-21:00",
      "Thu": "11:30-21:00",
      "Fri": "11:30-22:00",
      "Sat": "11:00-22:00",
      "Sun": "11:00-21:00"
    },
    website: "https://www.lunaredslo.com",
    mapUrl: "https://goo.gl/maps/example11",
    rating: 4.5,
    price: 3
  },
  {
    id: "12",
    name: "Giuseppe's Cucina Rustica",
    address: "849 Monterey St, San Luis Obispo, CA 93401",
    category: "Global",
    hours: {
      "Mon": "11:30-22:00",
      "Tue": "11:30-22:00",
      "Wed": "11:30-22:00",
      "Thu": "11:30-22:00",
      "Fri": "11:30-23:00",
      "Sat": "11:30-23:00",
      "Sun": "11:30-22:00"
    },
    website: "https://www.giuseppesrestaurant.com",
    mapUrl: "https://goo.gl/maps/example12",
    notes: "Authentic Italian in downtown.",
    rating: 4.7,
    price: 3
  },
  {
    id: "13",
    name: "Eureka!",
    address: "1141 Chorro St, San Luis Obispo, CA 93401",
    category: "American",
    hours: {
      "Mon": "11:00-23:00",
      "Tue": "11:00-23:00",
      "Wed": "11:00-23:00",
      "Thu": "11:00-23:00",
      "Fri": "11:00-00:00",
      "Sat": "11:00-00:00",
      "Sun": "11:00-23:00"
    },
    website: "https://eurekarestaurantgroup.com",
    mapUrl: "https://goo.gl/maps/example13",
    rating: 4.4,
    price: 2
  },
  {
    id: "14",
    name: "Thai Boat",
    address: "3212 Broad St, San Luis Obispo, CA 93401",
    category: "Asian",
    hours: {
      "Mon": "11:00-21:00",
      "Tue": "11:00-21:00",
      "Wed": "11:00-21:00",
      "Thu": "11:00-21:00",
      "Fri": "11:00-21:30",
      "Sat": "12:00-21:30",
      "Sun": "12:00-21:00"
    },
    mapUrl: "https://goo.gl/maps/example14",
    rating: 4.5,
    price: 2
  },
  {
    id: "15",
    name: "Lincoln Market & Deli",
    address: "496 Broad St, San Luis Obispo, CA 93405",
    category: "Sandwiches",
    hours: {
      "Mon": "08:00-20:00",
      "Tue": "08:00-20:00",
      "Wed": "08:00-20:00",
      "Thu": "08:00-20:00",
      "Fri": "08:00-20:00",
      "Sat": "08:00-20:00",
      "Sun": "08:00-20:00"
    },
    website: "http://www.lincolnmarketanddeli.com",
    mapUrl: "https://goo.gl/maps/example15",
    notes: "Classic neighborhood deli.",
    rating: 4.8,
    price: 2
  },
  {
    id: "16",
    name: "Taste! Craft Eatery",
    address: "2550 Broad St, San Luis Obispo, CA 93401",
    category: "American",
    hours: {
      "Mon": "11:00-21:00",
      "Tue": "11:00-21:00",
      "Wed": "11:00-21:00",
      "Thu": "11:00-21:00",
      "Fri": "11:00-21:00",
      "Sat": "11:00-21:00",
      "Sun": "11:00-21:00"
    },
    website: "https://tastecrafteatery.com",
    mapUrl: "https://goo.gl/maps/example16",
    rating: 4.6,
    price: 2
  },
  {
    id: "17",
    name: "Scout Coffee",
    address: "1130 Garden St, San Luis Obispo, CA 93401",
    category: "Bakery",
    hours: {
      "Mon": "06:30-18:30",
      "Tue": "06:30-18:30",
      "Wed": "06:30-18:30",
      "Thu": "06:30-18:30",
      "Fri": "06:30-18:30",
      "Sat": "06:30-18:30",
      "Sun": "06:30-18:30"
    },
    website: "https://scoutcoffeeco.com",
    mapUrl: "https://goo.gl/maps/example17",
    rating: 4.8,
    price: 1
  },
  {
    id: "18",
    name: "Madonna Inn Copper Cafe",
    address: "100 Madonna Rd, San Luis Obispo, CA 93405",
    category: "American",
    hours: {
      "Mon": "07:00-22:00",
      "Tue": "07:00-22:00",
      "Wed": "07:00-22:00",
      "Thu": "07:00-22:00",
      "Fri": "07:00-22:00",
      "Sat": "07:00-22:00",
      "Sun": "07:00-22:00"
    },
    website: "https://www.madonnainn.com",
    mapUrl: "https://goo.gl/maps/example18",
    notes: "Historic and kitschy.",
    rating: 4.4,
    price: 2
  },
  {
    id: "19",
    name: "Finney's Crafthouse",
    address: "857 Monterey St, San Luis Obispo, CA 93401",
    category: "American",
    hours: {
      "Mon": "11:00-22:00",
      "Tue": "11:00-22:00",
      "Wed": "11:00-22:00",
      "Thu": "11:00-22:00",
      "Fri": "11:00-23:00",
      "Sat": "11:00-23:00",
      "Sun": "10:00-22:00"
    },
    website: "https://www.finneyscrafthouse.com",
    mapUrl: "https://goo.gl/maps/example19",
    rating: 4.6,
    price: 2
  },
  {
    id: "20",
    name: "Ziggy's",
    address: "594 California Blvd, San Luis Obispo, CA 93405",
    category: "American",
    hours: {
      "Mon": "11:00-21:00",
      "Tue": "11:00-21:00",
      "Wed": "11:00-21:00",
      "Thu": "11:00-21:00",
      "Fri": "11:00-21:00",
      "Sat": "11:00-21:00",
      "Sun": "11:00-21:00"
    },
    website: "https://ziggysslo.com",
    mapUrl: "https://goo.gl/maps/example20",
    notes: "Vegan junk food!",
    rating: 4.7,
    price: 2
  }
];