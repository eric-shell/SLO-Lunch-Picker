# SLO Picker 🌮🥗🍔

A fun, React-based web application to help you decide where to eat lunch in San Luis Obispo California. Built with Vite, TypeScript, and Tailwind CSS.

Production URL:
<a href="https://eric-shell.github.io/SLO-Lunch-Picker"/>https://eric-shell.github.io/SLO-Lunch-Picker/</a>

## Features

*   **Spin the Wheel**: Randomly selects a restaurant from your filtered list.
*   **Filtering**: Filter by food category, check what's "Open Now" (Default), change probability with "Rating Adjusted" and toggle value options with "Cheap Eats" .
*   **Local Data**: Powered by a local TypeScript data file for easy editing.
*   **Fun UI**: Minimal coastal inspired design with animations and confetti.

## Project Structure

*   `data/curated/`: The curated restaurant files used by the app (coffee.ts, lunch.ts, etc.)
*   `data/categorized/`: Auto-generated categorized files for review (gitignored)
*   `data/exports/`: Raw Google API exports (gitignored)
*   `data/config.ts`: Portal configuration and data imports
*   `components/`: Reusable UI components
*   `scripts/`: Import and categorization scripts
*   `utils/`: Helper logic for time checking

## Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Locally**:
    ```bash
    npm run dev
    ```
    Open the link shown in the terminal (usually http://localhost:5173) to view the app.

## How to Update Restaurant Data

### Manual Updates

1.  Open `data/curated/lunch.ts` (or the appropriate category file).
2.  Add a new object to the array following the existing pattern:
    ```typescript
    {
      id: "unique-id",
      name: "Restaurant Name",
      address: "Address String",
      categories: ["Category Name"],
      hours: {
        "Mon": "11:00-21:00",
        // ... other days
      },
      mapUrl: "Google Maps Link",
      rating: 4.5,
      price: 2,
      // Optional fields: website, notes
    }
    ```
3.  Save the file. The development server will auto-reload if running.

### Google Places API Export (Monthly Refresh)

Fetch the latest restaurants from Google Places API:

1.  **First-time setup** (only once):
    - Go to [Google Cloud Console](https://console.cloud.google.com/)
    - Create a project and enable the "Places API"
    - Create an API key under Credentials
    - Add your key to `.env`: `GOOGLE_API_KEY=your_key_here`

2.  **Run the import** (does both steps below):
    ```bash
    npm run import
    ```

    Or run individually:
    ```bash
    npm run generate    # Fetch from Google → data/exports/master-export.ts
    npm run categorize  # Sort into categories → data/categorized/*.ts
    ```

3.  **Review the categorized files**:
    - `data/categorized/coffee.ts` - Coffee shops
    - `data/categorized/breakfast.ts` - Breakfast spots
    - `data/categorized/lunch.ts` - Lunch restaurants
    - `data/categorized/dinner.ts` - Dinner venues
    - `data/categorized/drinks.ts` - Bars & breweries
    - `data/categorized/treats.ts` - Dessert & treats

    **Chain restaurants are automatically commented out** to prioritize local businesses.

4.  **Merge into curated files**:
    - Copy desired entries to `data/curated/*.ts`
    - Uncomment chains if you want to include them
    - Adjust categories to match your portal cravings

**Note**: The Google Places API has a free tier ($200/month credit) which is more than enough for monthly exports. Each run costs approximately $10-15.

## Deployment to GitHub Pages

This project is configured to deploy to GitHub Pages using the `/docs` folder.

1.  **Build the Project**:
    ```bash
    npm run build
    ```
    This will generate the static site in the `docs/` folder.

2.  **Push to GitHub**:
    Commit and push the `docs/` folder changes to your repository.

3.  **GitHub Settings**:
    Go to your repository **Settings > Pages**.
    *   **Source**: Select `Deploy from a branch`.
    *   **Branch**: Select `main` (or your default branch) and `/docs` folder.
    *   Click **Save**.

## Tech Stack

*   React 19
*   TypeScript
*   Vite 7
*   Tailwind CSS 4
