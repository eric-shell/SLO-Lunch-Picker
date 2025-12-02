/**
 * Restaurant Categorization Script
 * 
 * Reads data/exports/master-export.ts and categorizes restaurants
 * into separate files in data/categorized/ for manual review.
 * 
 * NOTE: Restaurants can appear in MULTIPLE categories!
 * - A restaurant open for lunch AND dinner will be in both files
 * - Coffee shops with pastries may appear in coffee AND treats
 * 
 * Chain restaurants are commented out to prioritize local businesses.
 * 
 * Usage: npm run categorize
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// CHAIN RESTAURANTS TO COMMENT OUT (prioritize local!)
// ============================================================================

const CHAIN_RESTAURANTS = [
  // Fast Food
  "McDonald's",
  "Burger King",
  "Wendy's",
  "Taco Bell",
  "Jack in the Box",
  "Carl's Jr",
  "Hardee's",
  "Arby's",
  "Sonic",
  "Dairy Queen",
  "Five Guys",
  "In-N-Out",
  "Shake Shack",
  "Whataburger",
  "White Castle",
  "Culver's",
  "Checkers",
  "Rally's",
  "Wingstop",
  "Raising Cane's",
  "MrBeast Burger",
  "Carl’s Jr.",
  "7-Eleven",
  
  // Chicken
  "KFC",
  "Popeyes",
  "Chick-fil-A",
  "Church's Chicken",
  "Zaxby's",
  "El Pollo Loco",
  "Boston Market",
  "Krispy Krunchy Chicken",
  
  // Pizza Chains
  "Domino's",
  "Pizza Hut",
  "Papa John's",
  "Little Caesars",
  "Papa Murphy's",
  "Blaze Pizza",
  "MOD Pizza",
  
  // Sandwich Chains
  "Subway",
  "Jimmy John's",
  "Jersey Mike's",
  "Firehouse Subs",
  "Quiznos",
  "Potbelly",
  "Which Wich",
  "Penn Station",
  "Jason's Deli",
  "McAlister's",
  
  // Mexican Chains
  "Chipotle",
  "Qdoba",
  "Del Taco",
  "Taco Cabana",
  "Moe's Southwest",
  
  // Coffee Chains
  "Starbucks",
  "Dunkin'",
  "Dunkin' Donuts",
  "Peet's Coffee",
  "The Coffee Bean",
  "Tim Hortons",
  "Dutch Bros",
  
  // Breakfast Chains
  "IHOP",
  "Denny's",
  "Waffle House",
  "Cracker Barrel",
  "Perkins",
  "Bob Evans",
  "First Watch",
  
  // Casual Dining Chains
  "Applebee's",
  "Chili's",
  "TGI Friday's",
  "Olive Garden",
  "Red Lobster",
  "Outback Steakhouse",
  "Texas Roadhouse",
  "LongHorn Steakhouse",
  "Ruby Tuesday",
  "Buffalo Wild Wings",
  "BJ's Restaurant",
  "Cheesecake Factory",
  "PF Chang's",
  "Red Robin",
  "Hooters",
  "TGI Fridays",
  "Yard House",
  "Maggiano's",
  
  // Asian Chains
  "Panda Express",
  "Benihana",
  "P.F. Chang's",
  
  // Bakery/Dessert Chains
  "Cinnabon",
  "Auntie Anne's",
  "Krispy Kreme",
  "Baskin-Robbins",
  "Cold Stone",
  "Dairy Queen",
  "Yogurtland",
  "Jamba",
  "Jamba Juice",
  "Crumbl Cookies",
  "Nothing Bundt Cakes",
  
  // Bagel Chains
  "Einstein Bros",
  "Panera",
  "Panera Bread",
  "Corner Bakery",
  
  // Campus/Generic
  "Campus Dining",
  "Poly Choice",
  "What's Cookin' Mobile",
  "Central Coaster",
];

// ============================================================================
// TYPES
// ============================================================================

interface Restaurant {
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

type CategoryType = 'coffee' | 'breakfast' | 'lunch' | 'dinner' | 'drinks' | 'treats';

// ============================================================================
// CATEGORY DETECTION
// ============================================================================

// Patterns that indicate a category
const CATEGORY_INDICATORS: Record<CategoryType, { 
  namePatterns: RegExp[]; 
  googleCategories: string[];
}> = {
  coffee: {
    namePatterns: [/coffee/i, /espresso/i, /cafe(?!teria)/i, /café/i, /roast/i],
    googleCategories: ['Coffee', 'Cafe', 'Espresso'],
  },
  breakfast: {
    namePatterns: [/breakfast/i, /brunch/i, /pancake/i, /waffle/i, /bagel/i, /diner/i],
    googleCategories: ['Breakfast', 'Brunch', 'Diner'],
  },
  lunch: {
    namePatterns: [], // Will be determined by hours
    googleCategories: ['American', 'Mexican', 'Asian', 'Italian', 'Mediterranean', 'Indian', 'BBQ', 'Seafood', 'Pizza', 'Sandwiches', 'Fast Food', 'Restaurant'],
  },
  dinner: {
    namePatterns: [/steakhouse/i, /fine dining/i, /bistro/i, /cucina/i, /ristorante/i, /trattoria/i],
    googleCategories: ['Steak', 'Fine Dining', 'Italian', 'Sushi'],
  },
  drinks: {
    namePatterns: [/bar(?!becue|bq|ista)/i, /brew/i, /pub/i, /tavern/i, /saloon/i, /winery/i, /wine(?!gar)/i, /cocktail/i, /lounge/i, /biergarten/i, /taproom/i, /alehouse/i],
    googleCategories: ['Bar', 'Brewery', 'Pub', 'Wine', 'Cocktails'],
  },
  treats: {
    namePatterns: [/ice cream/i, /frozen yogurt/i, /froyo/i, /donut/i, /doughnut/i, /candy/i, /chocolate/i, /cookie/i, /bakery/i, /dessert/i, /creamery/i, /yogurt/i, /gelato/i, /sweet/i],
    googleCategories: ['Ice Cream', 'Donuts', 'Candy', 'Chocolates', 'Cookies', 'Frozen Yogurt', 'Bakery', 'Dessert'],
  },
};

// Portal cravings for category mapping (must match data/config.ts!)
const PORTAL_CRAVINGS: Record<CategoryType, string[]> = {
  coffee: ['Espresso', 'Cold Brew', 'Pastries', 'Quiet Spots', 'Vegan'],
  breakfast: ['Diner', 'Brunch', 'Pancakes', 'Healthy', 'Vegan'],
  lunch: ['American', 'Asian', 'BBQ', 'Bakery', 'Global', 'Indian', 'Italian', 'Mediterranean', 'Mexican', 'Pizza', 'Sandwiches', 'Seafood', 'Vegan'],
  dinner: ['American', 'Asian', 'BBQ', 'Casual', 'Date Night', 'Fine Dining', 'Global', 'Indian', 'Italian', 'Mediterranean', 'Mexican', 'Pizza', 'Seafood', 'Steak', 'Sushi', 'Vegan'],
  drinks: ['Cocktails', 'Craft Beer', 'Wine Bar', 'Mocktails'],
  treats: ['Ice Cream', 'Cookies', 'Candy', 'Donuts', 'Chocolates', 'Frozen Yogurt', 'Vegan'],
};

// ============================================================================
// CUISINE DETECTION FROM RESTAURANT NAME
// ============================================================================

// Cuisine detection patterns - maps regex patterns to cuisine categories
const CUISINE_PATTERNS: { pattern: RegExp; cuisines: string[] }[] = [
  // Mexican
  { pattern: /taqueria|tacos?|burrito|mexican|efren|chicho|la esquina|la botana|zacatecas|tonita/i, cuisines: ['Mexican'] },
  
  // Italian
  { pattern: /pizza|pizzeria|italian|italia|ristorante|trattoria|cucina|roma|giuseppe|piadina|buona|antonia|nucci|fatte|gino|pasta|meatball/i, cuisines: ['Italian', 'Pizza'] },
  { pattern: /pizza/i, cuisines: ['Pizza'] },
  
  // Asian (broad)
  { pattern: /thai|ramen|pho|noodle|asian|chinese|vietnamese|korean/i, cuisines: ['Asian'] },
  { pattern: /thai/i, cuisines: ['Asian'] },
  
  // Japanese/Sushi
  { pattern: /sushi|ramen|japanese|japan|yanagi|arigato|goshi|shin|haha/i, cuisines: ['Asian', 'Seafood'] },
  { pattern: /sushi/i, cuisines: ['Seafood'] },
  
  // Indian
  { pattern: /indian|india|taj|curry|masala|jewel of india|shalimar/i, cuisines: ['Indian'] },
  
  // Mediterranean/Middle Eastern
  { pattern: /mediterranean|greek|falafel|hummus|kebab|shawarma|turkish|lokum|persian|shekamoo|ebony|ethiopian/i, cuisines: ['Mediterranean', 'Global'] },
  { pattern: /greek|nick the greek/i, cuisines: ['Mediterranean'] },
  
  // BBQ
  { pattern: /bbq|barbeque|barbecue|smokehouse|smoked|ribs|rib line|gold land|cj'?s/i, cuisines: ['BBQ', 'American'] },
  
  // Seafood
  { pattern: /fish|seafood|oyster|crab|lobster|shrimp|poke|lure|anchor/i, cuisines: ['Seafood'] },
  { pattern: /poke|poké|poki/i, cuisines: ['Asian', 'Seafood'] },
  
  // American/Burgers
  { pattern: /burger|grill|american|diner|steak|fries|hot dog|sylvester|firestone|eureka|habit/i, cuisines: ['American'] },
  { pattern: /steakhouse|steak house/i, cuisines: ['American', 'Steak'] },
  
  // Sandwiches/Deli
  { pattern: /sandwich|deli|sub|hoagie|capriotti/i, cuisines: ['Sandwiches', 'American'] },
  
  // Brewery/Bar
  { pattern: /brew|brewery|craft|tap|ale|beer|pub/i, cuisines: ['American'] },
  
  // Bakery
  { pattern: /bakery|bread|flour|pastry|croissant/i, cuisines: ['Bakery'] },
  
  // Hawaiian/Polynesian
  { pattern: /hawaiian|poke|aloha|tiki|j&l/i, cuisines: ['American', 'Seafood'] },
  
  // Peruvian/Latin
  { pattern: /peruvian|peru|ceviche|coya|mistura/i, cuisines: ['Global', 'Seafood'] },
  
  // Chinese
  { pattern: /chinese|china|wok|dim sum|golden gong|sichuan/i, cuisines: ['Asian'] },
  
  // Cafe/Brunch
  { pattern: /cafe|café|bistro|kitchen|brunch/i, cuisines: ['American'] },
  
  // Vegan/Health
  { pattern: /vegan|vegetarian|plant.based|organic|health/i, cuisines: ['Vegan', 'Healthy'] },
  
  // Quesadilla/Tex-Mex
  { pattern: /quesadilla|gorilla|press qg/i, cuisines: ['Mexican', 'American'] },
];

// Detect cuisines from restaurant name
function detectCuisinesFromName(name: string): string[] {
  const cuisines: Set<string> = new Set();
  
  for (const { pattern, cuisines: matchedCuisines } of CUISINE_PATTERNS) {
    if (pattern.test(name)) {
      matchedCuisines.forEach(c => cuisines.add(c));
    }
  }
  
  return Array.from(cuisines);
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function isChainRestaurant(name: string): boolean {
  const normalizedName = name.toLowerCase().trim();
  return CHAIN_RESTAURANTS.some(chain => {
    const normalizedChain = chain.toLowerCase();
    return normalizedName === normalizedChain || 
           normalizedName.startsWith(normalizedChain + ' ') ||
           normalizedName.startsWith(normalizedChain + "'") ||
           normalizedName.includes(normalizedChain);
  });
}

function parseHours(hoursStr: string): { open: number; close: number } | null {
  if (hoursStr === 'Closed') return null;
  const match = hoursStr.match(/(\d{2}):(\d{2})-(\d{2}):(\d{2})/);
  if (!match) return null;
  
  const open = parseInt(match[1]) + parseInt(match[2]) / 60;
  let close = parseInt(match[3]) + parseInt(match[4]) / 60;
  
  // Handle closing after midnight
  if (close < open) close += 24;
  
  return { open, close };
}

function getAverageHours(restaurant: Restaurant): { avgOpen: number; avgClose: number } | null {
  const parsed = Object.values(restaurant.hours)
    .map(parseHours)
    .filter((h): h is { open: number; close: number } => h !== null);
  
  if (parsed.length === 0) return null;
  
  const avgOpen = parsed.reduce((sum, h) => sum + h.open, 0) / parsed.length;
  const avgClose = parsed.reduce((sum, h) => sum + h.close, 0) / parsed.length;
  
  return { avgOpen, avgClose };
}

function matchesCategory(restaurant: Restaurant, category: CategoryType): boolean {
  const name = restaurant.name.toLowerCase();
  const cats = restaurant.categories.map(c => c.toLowerCase());
  const indicators = CATEGORY_INDICATORS[category];
  
  // Check name patterns
  for (const pattern of indicators.namePatterns) {
    if (pattern.test(name)) return true;
  }
  
  // Check Google categories
  for (const googleCat of indicators.googleCategories) {
    if (cats.includes(googleCat.toLowerCase())) return true;
  }
  
  return false;
}

function detectCategories(restaurant: Restaurant): CategoryType[] {
  const categories: CategoryType[] = [];
  const hours = getAverageHours(restaurant);
  
  // Check drinks first (bars, breweries) - these are special
  if (matchesCategory(restaurant, 'drinks')) {
    categories.push('drinks');
  }
  
  // Check treats (ice cream, donuts, etc.)
  if (matchesCategory(restaurant, 'treats')) {
    categories.push('treats');
  }
  
  // Check coffee
  if (matchesCategory(restaurant, 'coffee')) {
    categories.push('coffee');
  }
  
  // Check breakfast by name/category
  if (matchesCategory(restaurant, 'breakfast')) {
    categories.push('breakfast');
  }
  
  // Check dinner by name/category  
  if (matchesCategory(restaurant, 'dinner')) {
    categories.push('dinner');
  }
  
  // Use hours to determine lunch vs dinner for general restaurants
  if (hours) {
    // Breakfast: Opens early (before 10am) and closes by 3pm
    if (hours.avgOpen <= 10 && hours.avgClose <= 15 && !categories.includes('breakfast')) {
      categories.push('breakfast');
    }
    
    // Lunch: Open during lunch hours (11am-2pm range)
    if (hours.avgOpen <= 12 && hours.avgClose >= 14) {
      if (!categories.includes('lunch') && !categories.includes('drinks') && !categories.includes('treats')) {
        categories.push('lunch');
      }
    }
    
    // Dinner: Open past 5pm and closes after 8pm
    if (hours.avgClose >= 20) {
      if (!categories.includes('dinner') && !categories.includes('drinks') && !categories.includes('treats')) {
        categories.push('dinner');
      }
    }
    
    // Special case: Fine dining/higher price usually dinner
    if (restaurant.price >= 3 && !categories.includes('dinner') && !categories.includes('drinks') && !categories.includes('treats') && !categories.includes('coffee')) {
      categories.push('dinner');
    }
  }
  
  // Default: if no category matched and it's a restaurant, put in lunch
  if (categories.length === 0) {
    categories.push('lunch');
  }
  
  return categories;
}

function mapToPortalCategories(restaurant: Restaurant, targetCategory: CategoryType): string[] {
  const validCategories = PORTAL_CRAVINGS[targetCategory];
  const mapped: string[] = [];
  
  // First, detect cuisines from the restaurant name
  const detectedCuisines = detectCuisinesFromName(restaurant.name);
  
  // Category mappings - maps cuisine types to portal categories per portal type
  const cuisineToPortal: Record<string, Record<CategoryType, string[]>> = {
    'Mexican': { 
      lunch: ['Mexican'], 
      dinner: ['Mexican', 'Casual'], 
      breakfast: ['Brunch'], 
      coffee: ['Pastries'], 
      drinks: ['Cocktails'], 
      treats: ['Ice Cream'] 
    },
    'Italian': { 
      lunch: ['Italian'], 
      dinner: ['Italian', 'Date Night'], 
      breakfast: ['Brunch'], 
      coffee: ['Pastries'], 
      drinks: ['Wine Bar'], 
      treats: ['Cookies'] 
    },
    'Pizza': { 
      lunch: ['Pizza', 'Italian'], 
      dinner: ['Pizza', 'Italian', 'Casual'], 
      breakfast: ['Brunch'], 
      coffee: ['Pastries'], 
      drinks: ['Craft Beer'], 
      treats: ['Cookies'] 
    },
    'Asian': { 
      lunch: ['Asian'], 
      dinner: ['Asian', 'Sushi'], 
      breakfast: ['Brunch'], 
      coffee: ['Pastries'], 
      drinks: ['Cocktails'], 
      treats: ['Ice Cream'] 
    },
    'Indian': { 
      lunch: ['Indian'], 
      dinner: ['Indian', 'Date Night'], 
      breakfast: ['Healthy'], 
      coffee: ['Pastries'], 
      drinks: ['Cocktails'], 
      treats: ['Ice Cream'] 
    },
    'Mediterranean': { 
      lunch: ['Mediterranean'], 
      dinner: ['Mediterranean', 'Date Night'], 
      breakfast: ['Healthy'], 
      coffee: ['Pastries'], 
      drinks: ['Wine Bar'], 
      treats: ['Cookies'] 
    },
    'BBQ': { 
      lunch: ['BBQ', 'American'], 
      dinner: ['BBQ', 'American', 'Casual'], 
      breakfast: ['Diner'], 
      coffee: ['Pastries'], 
      drinks: ['Craft Beer'], 
      treats: ['Cookies'] 
    },
    'Seafood': { 
      lunch: ['Seafood'], 
      dinner: ['Seafood', 'Fine Dining'], 
      breakfast: ['Brunch'], 
      coffee: ['Pastries'], 
      drinks: ['Wine Bar'], 
      treats: ['Ice Cream'] 
    },
    'American': { 
      lunch: ['American'], 
      dinner: ['American', 'Casual'], 
      breakfast: ['Diner'], 
      coffee: ['Pastries'], 
      drinks: ['Craft Beer'], 
      treats: ['Cookies'] 
    },
    'Sandwiches': { 
      lunch: ['Sandwiches', 'American'], 
      dinner: ['American', 'Casual'], 
      breakfast: ['Brunch'], 
      coffee: ['Pastries'], 
      drinks: ['Craft Beer'], 
      treats: ['Cookies'] 
    },
    'Bakery': { 
      lunch: ['Bakery'], 
      dinner: ['Casual'], 
      breakfast: ['Pancakes', 'Brunch'], 
      coffee: ['Pastries'], 
      drinks: ['Mocktails'], 
      treats: ['Cookies', 'Donuts'] 
    },
    'Steak': { 
      lunch: ['American'], 
      dinner: ['Steak', 'Fine Dining'], 
      breakfast: ['Diner'], 
      coffee: ['Espresso'], 
      drinks: ['Wine Bar'], 
      treats: ['Ice Cream'] 
    },
    'Global': { 
      lunch: ['Global'], 
      dinner: ['Global', 'Date Night'], 
      breakfast: ['Brunch'], 
      coffee: ['Pastries'], 
      drinks: ['Cocktails'], 
      treats: ['Ice Cream'] 
    },
    'Vegan': { 
      lunch: ['Vegan'], 
      dinner: ['Vegan'], 
      breakfast: ['Vegan', 'Healthy'], 
      coffee: ['Vegan'], 
      drinks: ['Mocktails'], 
      treats: ['Vegan'] 
    },
    'Healthy': { 
      lunch: ['Vegan'], 
      dinner: ['Vegan'], 
      breakfast: ['Healthy', 'Vegan'], 
      coffee: ['Vegan'], 
      drinks: ['Mocktails'], 
      treats: ['Vegan'] 
    },
  };
  
  // Map detected cuisines to portal categories
  for (const cuisine of detectedCuisines) {
    if (cuisineToPortal[cuisine] && cuisineToPortal[cuisine][targetCategory]) {
      const portalCats = cuisineToPortal[cuisine][targetCategory];
      for (const cat of portalCats) {
        if (validCategories.includes(cat) && !mapped.includes(cat)) {
          mapped.push(cat);
        }
      }
    }
  }
  
  // Also check Google categories from the API
  const googleMappings: Record<string, Record<CategoryType, string[]>> = {
    'Bar': { 
      lunch: ['American'], 
      dinner: ['Casual'], 
      breakfast: ['Brunch'], 
      coffee: ['Espresso'], 
      drinks: ['Cocktails', 'Craft Beer'], 
      treats: ['Ice Cream'] 
    },
    'Restaurant': { 
      lunch: ['American'], 
      dinner: ['Casual'], 
      breakfast: ['Brunch'], 
      coffee: ['Pastries'], 
      drinks: ['Craft Beer'], 
      treats: ['Ice Cream'] 
    },
    'Coffee': { 
      lunch: ['Bakery'], 
      dinner: ['Casual'], 
      breakfast: ['Brunch'], 
      coffee: ['Espresso', 'Cold Brew'], 
      drinks: ['Mocktails'], 
      treats: ['Cookies'] 
    },
    'Cafe': { 
      lunch: ['Bakery'], 
      dinner: ['Casual'], 
      breakfast: ['Brunch'], 
      coffee: ['Espresso', 'Pastries'], 
      drinks: ['Mocktails'], 
      treats: ['Cookies'] 
    },
    'Bakery': { 
      lunch: ['Bakery'], 
      dinner: ['Casual'], 
      breakfast: ['Pancakes'], 
      coffee: ['Pastries'], 
      drinks: ['Mocktails'], 
      treats: ['Cookies', 'Donuts'] 
    },
    'Ice Cream': { 
      lunch: ['Bakery'], 
      dinner: ['Casual'], 
      breakfast: ['Brunch'], 
      coffee: ['Pastries'], 
      drinks: ['Mocktails'], 
      treats: ['Ice Cream', 'Frozen Yogurt'] 
    },
  };
  
  for (const cat of restaurant.categories) {
    if (googleMappings[cat] && googleMappings[cat][targetCategory]) {
      const portalCats = googleMappings[cat][targetCategory];
      for (const pc of portalCats) {
        if (validCategories.includes(pc) && !mapped.includes(pc)) {
          mapped.push(pc);
        }
      }
    }
    // Direct match
    if (validCategories.includes(cat) && !mapped.includes(cat)) {
      mapped.push(cat);
    }
  }
  
  // Default category if none matched
  if (mapped.length === 0) {
    switch (targetCategory) {
      case 'coffee': mapped.push('Espresso'); break;
      case 'breakfast': mapped.push('Brunch'); break;
      case 'lunch': mapped.push('American'); break;
      case 'dinner': mapped.push('Casual'); break;
      case 'drinks': mapped.push('Craft Beer'); break;
      case 'treats': mapped.push('Ice Cream'); break;
    }
  }
  
  return [...new Set(mapped)];
}

function formatRestaurant(restaurant: Restaurant, isChain: boolean, targetCategory: CategoryType): string {
  const mappedCategories = mapToPortalCategories(restaurant, targetCategory);
  
  const formatted = {
    id: restaurant.id,
    name: restaurant.name,
    address: restaurant.address,
    categories: mappedCategories,
    hours: restaurant.hours,
    ...(restaurant.website && { website: restaurant.website }),
    mapUrl: restaurant.mapUrl,
    rating: restaurant.rating,
    price: restaurant.price || 2,
  };
  
  const json = JSON.stringify(formatted, null, 2);
  
  if (isChain) {
    const lines = json.split('\n');
    return lines.map((line, i) => {
      if (i === 0) return `  // CHAIN: ${line}`;
      return `  // ${line}`;
    }).join('\n');
  }
  
  return '  ' + json.split('\n').join('\n  ');
}

function generateFile(
  category: CategoryType, 
  restaurants: Restaurant[],
  exportName: string
): string {
  const dateStr = new Date().toISOString().split('T')[0];
  
  const localRestaurants = restaurants.filter(r => !isChainRestaurant(r.name));
  const chainRestaurants = restaurants.filter(r => isChainRestaurant(r.name));
  
  // Sort alphabetically
  localRestaurants.sort((a, b) => a.name.localeCompare(b.name));
  chainRestaurants.sort((a, b) => a.name.localeCompare(b.name));
  
  const formattedLocal = localRestaurants.map(r => formatRestaurant(r, false, category));
  const formattedChains = chainRestaurants.map(r => formatRestaurant(r, true, category));
  
  const allFormatted = [...formattedLocal, ...formattedChains];
  
  return `import { Restaurant } from '../../types';

/**
 * ${category.charAt(0).toUpperCase() + category.slice(1)} restaurants from Google Places API
 * Generated on: ${dateStr}
 * 
 * Local restaurants: ${localRestaurants.length}
 * Chain restaurants (commented out): ${chainRestaurants.length}
 * 
 * Review and copy desired entries to data/${category}.ts
 */

export const ${exportName}: Restaurant[] = [
${allFormatted.join(',\n')}
];
`;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('📂 Restaurant Categorization Script');
  console.log('═'.repeat(50));
  console.log('');
  
  // Read the master export
  const inputPath = './data/exports/master-export.ts';
  
  if (!fs.existsSync(inputPath)) {
    console.error('❌ No master export found!');
    console.error('   Run "npm run google-export" first.');
    process.exit(1);
  }
  
  const content = fs.readFileSync(inputPath, 'utf-8');
  
  // Try multiple patterns to find the export
  const patterns = [
    /export const masterExport: Restaurant\[\] = (\[[\s\S]*?\]);/,
    /export const googleRestaurants: Restaurant\[\] = (\[[\s\S]*?\]);/,
  ];
  
  let match: RegExpMatchArray | null = null;
  for (const pattern of patterns) {
    match = content.match(pattern);
    if (match) break;
  }
  
  if (!match) {
    console.error('❌ Could not parse master-export.ts');
    console.error('   Expected export const masterExport or googleRestaurants');
    process.exit(1);
  }
  
  let restaurants: Restaurant[];
  try {
    restaurants = JSON.parse(match[1]);
  } catch (e) {
    console.error('❌ Failed to parse restaurant data:', e);
    process.exit(1);
  }
  
  console.log(`📊 Loaded ${restaurants.length} restaurants\n`);
  
  // Categorize restaurants (can be in multiple categories!)
  const categorized: Record<CategoryType, Restaurant[]> = {
    coffee: [],
    breakfast: [],
    lunch: [],
    dinner: [],
    drinks: [],
    treats: [],
  };
  
  for (const restaurant of restaurants) {
    const cats = detectCategories(restaurant);
    for (const cat of cats) {
      categorized[cat].push(restaurant);
    }
  }
  
  // Print summary
  console.log('📋 Categorization Summary:');
  console.log('─'.repeat(50));
  console.log('   (Restaurants can appear in multiple categories)');
  console.log('─'.repeat(50));
  
  const categoryOrder: CategoryType[] = ['coffee', 'breakfast', 'lunch', 'dinner', 'drinks', 'treats'];
  
  for (const cat of categoryOrder) {
    const items = categorized[cat];
    const local = items.filter(r => !isChainRestaurant(r.name)).length;
    const chains = items.filter(r => isChainRestaurant(r.name)).length;
    console.log(`   ${cat.padEnd(12)} ${String(items.length).padStart(3)} total (${local} local, ${chains} chains)`);
  }
  
  console.log('─'.repeat(50));
  console.log('');
  
  // Create output directory
  const outputDir = './data/categorized';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const fileConfigs: { category: CategoryType; filename: string; exportName: string }[] = [
    { category: 'coffee', filename: 'coffee.ts', exportName: 'coffeeImports' },
    { category: 'breakfast', filename: 'breakfast.ts', exportName: 'breakfastImports' },
    { category: 'lunch', filename: 'lunch.ts', exportName: 'lunchImports' },
    { category: 'dinner', filename: 'dinner.ts', exportName: 'dinnerImports' },
    { category: 'drinks', filename: 'drinks.ts', exportName: 'drinksImports' },
    { category: 'treats', filename: 'treats.ts', exportName: 'treatsImports' },
  ];
  
  console.log('📁 Writing categorized files to data/categorized/:');
  
  for (const config of fileConfigs) {
    const items = categorized[config.category];
    
    const output = generateFile(config.category, items, config.exportName);
    const outputPath = path.join(outputDir, config.filename);
    fs.writeFileSync(outputPath, output);
    
    const local = items.filter(r => !isChainRestaurant(r.name)).length;
    console.log(`   ✅ ${config.filename.padEnd(15)} ${String(items.length).padStart(3)} restaurants (${local} local, ${items.length - local} chains)`);
  }
  
  console.log('');
  console.log('═'.repeat(50));
  console.log('');
  console.log('📝 Next steps:');
  console.log('   1. Review files in data/categorized/*.ts');
  console.log('   2. Copy desired restaurants to data/*.ts files');
  console.log('   3. Uncomment chains if you want to include them');
  console.log('   4. Adjust categories to match your portal cravings');
  console.log('');
  console.log('🎉 Done!');
}

main().catch(console.error);
