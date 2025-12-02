/**
 * Google Places API Restaurant Fetcher for SLO
 * 
 * Fetches ALL restaurants in San Luis Obispo using multiple search strategies:
 * - Grid-based nearby searches across different areas of SLO
 * - Text searches with various cuisine keywords
 * - Deduplication by place_id
 * 
 * SETUP:
 * 1. Add your Google API key to .env file: GOOGLE_API_KEY=your_key
 * 2. Run: npm run google-export
 * 
 * OUTPUT: data/exports/generated-google.ts (gitignored)
 * Review and manually merge into your category files in data/
 */

import * as fs from 'fs';
import * as path from 'path';

// Load .env file
function loadEnv(): void {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=');
        if (key && value) {
          process.env[key.trim()] = value.trim();
        }
      }
    }
  }
}

loadEnv();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  console.error('❌ Missing GOOGLE_API_KEY');
  console.log('\nSetup:');
  console.log('  1. Create a .env file in the project root');
  console.log('  2. Add: GOOGLE_API_KEY=your_google_api_key');
  console.log('  3. Run: npm run google-export');
  process.exit(1);
}

// ============================================================================
// SEARCH CONFIGURATION
// ============================================================================

// Grid of search locations covering San Luis Obispo
// Each point will search in a 2km radius to ensure overlap and coverage
const SEARCH_LOCATIONS = [
  // Downtown SLO
  { lat: 35.2828, lng: -120.6596, name: 'Downtown' },
  // North SLO / Foothill
  { lat: 35.2950, lng: -120.6650, name: 'North/Foothill' },
  // South SLO / Broad St
  { lat: 35.2650, lng: -120.6550, name: 'South/Broad' },
  // East SLO / Cal Poly area
  { lat: 35.3000, lng: -120.6400, name: 'Cal Poly' },
  // West SLO / Madonna
  { lat: 35.2700, lng: -120.6800, name: 'Madonna/West' },
  // Los Osos Valley Rd area
  { lat: 35.2600, lng: -120.7000, name: 'Los Osos Valley' },
  // Tank Farm area
  { lat: 35.2500, lng: -120.6400, name: 'Tank Farm' },
  // South Higuera
  { lat: 35.2450, lng: -120.6550, name: 'South Higuera' },
];

const SEARCH_RADIUS = 2500; // 2.5km radius for each grid point

// Keywords for text searches to catch places that might be missed
const SEARCH_KEYWORDS = [
  'restaurant San Luis Obispo',
  'pizza San Luis Obispo',
  'Mexican food San Luis Obispo',
  'tacos San Luis Obispo',
  'sushi San Luis Obispo',
  'Thai food San Luis Obispo',
  'Chinese food San Luis Obispo',
  'Indian food San Luis Obispo',
  'Italian restaurant San Luis Obispo',
  'burger San Luis Obispo',
  'BBQ San Luis Obispo',
  'breakfast San Luis Obispo',
  'brunch San Luis Obispo',
  'cafe San Luis Obispo',
  'coffee shop San Luis Obispo',
  'bakery San Luis Obispo',
  'deli San Luis Obispo',
  'sandwich shop San Luis Obispo',
  'seafood San Luis Obispo',
  'vegetarian San Luis Obispo',
  'vegan San Luis Obispo',
  'Mediterranean San Luis Obispo',
  'Greek food San Luis Obispo',
  'fast food San Luis Obispo',
  'food truck San Luis Obispo',
  'brewery San Luis Obispo',
  'bar food San Luis Obispo',
  'wings San Luis Obispo',
  'ramen San Luis Obispo',
  'pho San Luis Obispo',
  'Korean food San Luis Obispo',
];

// ============================================================================
// TYPES
// ============================================================================

interface GooglePlace {
  place_id: string;
  name: string;
  formatted_address?: string;
  vicinity?: string;
  geometry: {
    location: { lat: number; lng: number };
  };
  rating?: number;
  price_level?: number;
  types?: string[];
  opening_hours?: {
    open_now?: boolean;
    weekday_text?: string[];
    periods?: Array<{
      open: { day: number; time: string };
      close?: { day: number; time: string };
    }>;
  };
  website?: string;
  url?: string;
}

interface PlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: { lat: number; lng: number };
  };
  rating?: number;
  price_level?: number;
  types?: string[];
  opening_hours?: {
    weekday_text?: string[];
    periods?: Array<{
      open: { day: number; time: string };
      close?: { day: number; time: string };
    }>;
  };
  website?: string;
  url?: string;
}

interface RestaurantData {
  id: string;
  name: string;
  address: string;
  categories: string[];
  hours: Record<string, string>;
  website?: string;
  mapUrl: string;
  rating: number;
  price: number;
}

// ============================================================================
// CATEGORY MAPPING
// ============================================================================

const CATEGORY_MAP: Record<string, string> = {
  'mexican_restaurant': 'Mexican',
  'italian_restaurant': 'Italian',
  'pizza_restaurant': 'Pizza',
  'chinese_restaurant': 'Asian',
  'japanese_restaurant': 'Asian',
  'thai_restaurant': 'Asian',
  'vietnamese_restaurant': 'Asian',
  'korean_restaurant': 'Asian',
  'sushi_restaurant': 'Asian',
  'ramen_restaurant': 'Asian',
  'indian_restaurant': 'Indian',
  'mediterranean_restaurant': 'Mediterranean',
  'greek_restaurant': 'Mediterranean',
  'american_restaurant': 'American',
  'hamburger_restaurant': 'American',
  'steak_house': 'American',
  'barbecue_restaurant': 'BBQ',
  'seafood_restaurant': 'Seafood',
  'sandwich_shop': 'Sandwiches',
  'deli': 'Sandwiches',
  'bakery': 'Bakery',
  'cafe': 'Cafe',
  'coffee_shop': 'Coffee',
  'vegan_restaurant': 'Vegan',
  'vegetarian_restaurant': 'Vegan',
  'fast_food_restaurant': 'Fast Food',
  'breakfast_restaurant': 'Breakfast',
  'brunch_restaurant': 'Breakfast',
  'bar': 'Bar',
  'meal_takeaway': 'Takeout',
  'meal_delivery': 'Delivery',
};

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ============================================================================
// API FUNCTIONS
// ============================================================================

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function handleApiError(status: string, errorMessage?: string): never {
  console.error('\n' + '═'.repeat(60));
  console.error('❌ GOOGLE PLACES API ERROR');
  console.error('═'.repeat(60));
  console.error(`\nStatus: ${status}`);
  if (errorMessage) {
    console.error(`Message: ${errorMessage}`);
  }
  
  if (status === 'REQUEST_DENIED') {
    console.error('\n🔐 This is likely an IP restriction issue!');
    console.error('\nYour current public IP may have changed. To fix:');
    console.error('  1. Run: curl ifconfig.me');
    console.error('  2. Go to: https://console.cloud.google.com/apis/credentials');
    console.error('  3. Click on your API key');
    console.error('  4. Update the IP address restriction');
    console.error('  5. Save and try again\n');
  } else if (status === 'OVER_QUERY_LIMIT') {
    console.error('\n⚠️  You have exceeded your API quota.');
    console.error('Wait a bit or check your billing at:');
    console.error('https://console.cloud.google.com/billing\n');
  } else if (status === 'INVALID_REQUEST') {
    console.error('\n⚠️  Invalid request. Check your API key configuration.\n');
  }
  
  process.exit(1);
}

async function searchNearby(
  lat: number, 
  lng: number, 
  pageToken?: string
): Promise<{ results: GooglePlace[]; nextPageToken?: string }> {
  const params = new URLSearchParams({
    location: `${lat},${lng}`,
    radius: SEARCH_RADIUS.toString(),
    type: 'restaurant',
    key: GOOGLE_API_KEY!,
  });

  if (pageToken) {
    params.set('pagetoken', pageToken);
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    if (data.status === 'INVALID_REQUEST' && pageToken) {
      // Page token not ready yet, wait and retry
      await sleep(2000);
      return searchNearby(lat, lng, pageToken);
    }
    
    // Fatal errors - stop execution
    if (['REQUEST_DENIED', 'OVER_QUERY_LIMIT'].includes(data.status)) {
      handleApiError(data.status, data.error_message);
    }
    
    console.error('API Error:', data.status, data.error_message);
    return { results: [] };
  }

  return {
    results: data.results || [],
    nextPageToken: data.next_page_token,
  };
}

async function textSearch(
  query: string,
  pageToken?: string
): Promise<{ results: GooglePlace[]; nextPageToken?: string }> {
  const params = new URLSearchParams({
    query,
    key: GOOGLE_API_KEY!,
  });

  if (pageToken) {
    params.set('pagetoken', pageToken);
  }

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?${params}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    if (data.status === 'INVALID_REQUEST' && pageToken) {
      await sleep(2000);
      return textSearch(query, pageToken);
    }
    
    // Fatal errors - stop execution
    if (['REQUEST_DENIED', 'OVER_QUERY_LIMIT'].includes(data.status)) {
      handleApiError(data.status, data.error_message);
    }
    
    console.error('API Error for query:', query, data.status);
    return { results: [] };
  }

  return {
    results: data.results || [],
    nextPageToken: data.next_page_token,
  };
}

async function getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  const fields = [
    'place_id',
    'name',
    'formatted_address',
    'geometry',
    'rating',
    'price_level',
    'types',
    'opening_hours',
    'website',
    'url',
  ].join(',');

  const params = new URLSearchParams({
    place_id: placeId,
    fields,
    key: GOOGLE_API_KEY!,
  });

  const url = `https://maps.googleapis.com/maps/api/place/details/json?${params}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== 'OK') {
    // Fatal errors - stop execution
    if (['REQUEST_DENIED', 'OVER_QUERY_LIMIT'].includes(data.status)) {
      handleApiError(data.status, data.error_message);
    }
    return null;
  }

  return data.result;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function mapCategories(types: string[] = []): string[] {
  const categories = new Set<string>();
  
  for (const type of types) {
    if (CATEGORY_MAP[type]) {
      categories.add(CATEGORY_MAP[type]);
    }
  }

  if (categories.size === 0) {
    categories.add('Restaurant');
  }

  return Array.from(categories);
}

function parseHours(openingHours?: PlaceDetails['opening_hours']): Record<string, string> {
  const hours: Record<string, string> = {
    Mon: 'Closed',
    Tue: 'Closed',
    Wed: 'Closed',
    Thu: 'Closed',
    Fri: 'Closed',
    Sat: 'Closed',
    Sun: 'Closed',
  };

  if (!openingHours?.periods) return hours;

  for (const period of openingHours.periods) {
    const dayName = DAY_NAMES[period.open.day];
    const openTime = period.open.time.slice(0, 2) + ':' + period.open.time.slice(2);
    
    if (period.close) {
      const closeTime = period.close.time.slice(0, 2) + ':' + period.close.time.slice(2);
      hours[dayName] = `${openTime}-${closeTime}`;
    } else {
      hours[dayName] = '00:00-23:59';
    }
  }

  return hours;
}

function isInSLO(address: string): boolean {
  const lowerAddr = address.toLowerCase();
  return (
    lowerAddr.includes('san luis obispo') ||
    address.includes('93401') ||
    address.includes('93405') ||
    address.includes('93407') ||
    address.includes('93410')
  );
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('🍽️  Comprehensive Restaurant Fetcher for San Luis Obispo');
  console.log('═'.repeat(60));
  console.log('');

  const placeMap = new Map<string, GooglePlace>();

  // Step 1: Grid-based nearby searches
  console.log('📍 Phase 1: Grid-based nearby searches...\n');
  
  for (const location of SEARCH_LOCATIONS) {
    console.log(`   Searching ${location.name}...`);
    let pageToken: string | undefined;
    let locationTotal = 0;

    do {
      const { results, nextPageToken } = await searchNearby(location.lat, location.lng, pageToken);
      
      for (const place of results) {
        if (!placeMap.has(place.place_id)) {
          placeMap.set(place.place_id, place);
          locationTotal++;
        }
      }

      pageToken = nextPageToken;
      if (pageToken) await sleep(2000);
    } while (pageToken);

    console.log(`      → Found ${locationTotal} new places (total unique: ${placeMap.size})`);
    await sleep(200);
  }

  console.log(`\n   ✓ Grid search complete: ${placeMap.size} unique places\n`);

  // Step 2: Keyword text searches
  console.log('🔍 Phase 2: Keyword text searches...\n');
  
  for (const keyword of SEARCH_KEYWORDS) {
    process.stdout.write(`   "${keyword}"... `);
    let pageToken: string | undefined;
    let keywordNew = 0;

    do {
      const { results, nextPageToken } = await textSearch(keyword, pageToken);
      
      for (const place of results) {
        if (!placeMap.has(place.place_id)) {
          placeMap.set(place.place_id, place);
          keywordNew++;
        }
      }

      pageToken = nextPageToken;
      if (pageToken) await sleep(2000);
    } while (pageToken);

    console.log(`+${keywordNew} new (total: ${placeMap.size})`);
    await sleep(200);
  }

  console.log(`\n   ✓ Text search complete: ${placeMap.size} unique places\n`);
  console.log('═'.repeat(60));
  console.log(`\n📋 Phase 3: Fetching details for ${placeMap.size} places...\n`);

  // Step 3: Get detailed info for each place
  const restaurants: RestaurantData[] = [];
  const allPlaces = Array.from(placeMap.values());
  let idCounter = 1000;
  let skipped = 0;

  for (let i = 0; i < allPlaces.length; i++) {
    const place = allPlaces[i];
    const progress = `[${i + 1}/${allPlaces.length}]`;
    
    process.stdout.write(`   ${progress} ${place.name.substring(0, 40).padEnd(40)}... `);

    const details = await getPlaceDetails(place.place_id);
    
    if (!details) {
      console.log('⚠️  No details');
      skipped++;
      continue;
    }

    const address = details.formatted_address || '';
    if (!isInSLO(address)) {
      console.log('⏭️  Not in SLO');
      skipped++;
      continue;
    }

    const restaurant: RestaurantData = {
      id: String(idCounter++),
      name: details.name,
      address: details.formatted_address,
      categories: mapCategories(details.types),
      hours: parseHours(details.opening_hours),
      mapUrl: details.url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.name + ', ' + address)}`,
      rating: details.rating || 4.0,
      price: details.price_level || 2,
    };

    if (details.website) {
      restaurant.website = details.website;
    }

    restaurants.push(restaurant);
    console.log('✅');

    // Rate limit
    await sleep(50);
  }

  // Step 4: Sort and output
  restaurants.sort((a, b) => a.name.localeCompare(b.name));

  console.log('\n' + '═'.repeat(60));
  console.log('\n📊 Summary:');
  console.log(`   • Total places found: ${placeMap.size}`);
  console.log(`   • Restaurants in SLO: ${restaurants.length}`);
  console.log(`   • Skipped: ${skipped}`);

  // Generate output
  const dateStr = new Date().toISOString().split('T')[0];
  const output = `import { Restaurant } from '../../types';

/**
 * Restaurants fetched from Google Places API
 * Generated on: ${dateStr}
 * Total: ${restaurants.length} restaurants
 * 
 * ⚠️  DO NOT EDIT THIS FILE DIRECTLY
 * This file is auto-generated. To update, run: npm run google-export
 * 
 * To add restaurants to your app:
 * 1. Review this file for new/updated restaurants
 * 2. Copy desired entries to the appropriate file in data/
 *    (lunch.ts, breakfast.ts, coffee.ts, etc.)
 * 3. Adjust categories as needed
 */

export const masterExport: Restaurant[] = ${JSON.stringify(restaurants, null, 2)};
`;

  // Ensure output directory exists
  const outputDir = './data/exports';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = './data/exports/master-export.ts';
  fs.writeFileSync(outputPath, output);

  console.log(`\n📁 Output: ${outputPath}`);
  console.log(`\n💡 Next: Run "npm run categorize" to sort into categories`);
  console.log('\n📝 Next steps:');
  console.log('   1. Review data/exports/generated-google.ts');
  console.log('   2. Copy new restaurants to data/lunch.ts (or other category files)');
  console.log('   3. Adjust categories as needed');
  console.log('\n🎉 Done!\n');
}

main().catch(console.error);
