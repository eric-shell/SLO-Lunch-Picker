export interface Hours {
  [key: string]: string; // e.g., "Mon": "11:00-21:00"
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  category: string;
  hours: Hours;
  website?: string;
  mapUrl: string;
  notes?: string;
  image?: string;
  rating: number; // 1.0 to 5.0
  price: number; // 1 to 3 ($ to $$$)
}

export interface FilterState {
  categories: string[];
  openNow: boolean;
  useRatingWeight: boolean; // True = Higher rating gets bigger slice
  cheapEatsOnly: boolean; // True = Price level 1 only
}

export enum ViewState {
  IDLE = 'IDLE',
  SPINNING = 'SPINNING',
  RESULT = 'RESULT'
}