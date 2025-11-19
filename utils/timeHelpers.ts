import { Restaurant, Hours } from '../types';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const isOpenNow = (hours: Hours): boolean => {
  const now = new Date();
  const currentDay = DAYS[now.getDay()]; // 0 = Sun
  const timeRange = hours[currentDay];

  if (!timeRange || timeRange.toLowerCase() === 'closed') {
    return false;
  }

  // Parse "11:00-21:00"
  const [startStr, endStr] = timeRange.split('-');
  if (!startStr || !endStr) return false;

  const currentTime = now.getHours() * 60 + now.getMinutes();

  const parseTime = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const startTime = parseTime(startStr);
  let endTime = parseTime(endStr);

  // Handle late night closings (e.g. closes at 1 AM)
  if (endTime < startTime) {
    endTime += 24 * 60;
  }

  return currentTime >= startTime && currentTime < endTime;
};

export const getTodaysHours = (hours: Hours): string => {
  const now = new Date();
  const currentDay = DAYS[now.getDay()];
  return hours[currentDay] || 'Closed Today';
};

export const getFilteredRestaurants = (
  restaurants: Restaurant[],
  categories: string[],
  onlyOpen: boolean
): Restaurant[] => {
  return restaurants.filter((r) => {
    const categoryMatch = categories.includes(r.category);
    const openMatch = onlyOpen ? isOpenNow(r.hours) : true;
    return categoryMatch && openMatch;
  });
};