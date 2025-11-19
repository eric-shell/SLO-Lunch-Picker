# SLO Lunch Picker 🌮🥗🍔

A fun, React-based web application to help you decide where to eat lunch in San Luis Obispo (93401/93405). Built with Vite, TypeScript, and Tailwind CSS.

## Features

*   **Spin the Wheel**: Randomly selects a restaurant from your filtered list.
*   **Filtering**: Filter by food category or check what's "Open Now".
*   **Local Data**: Powered by a local JSON file for easy editing.
*   **Fun UI**: Beach-themed design with animations and confetti.

## Project Structure

*   `src/data/restaurants.json`: The database of restaurants. Edit this to add more spots!
*   `src/components/`: Reusable UI components.
*   `src/utils/`: Helper logic for time checking.

## Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Locally**:
    ```bash
    npm run dev
    ```
    Open http://localhost:5173 to view the app.

## How to Update Restaurant Data

1.  Open `src/data/restaurants.json`.
2.  Add a new object to the array following this schema:
    ```json
    {
      "id": "unique-id",
      "name": "Restaurant Name",
      "address": "Address String",
      "category": "Category Name",
      "hours": {
        "Mon": "11:00-21:00",
        ...
      },
      "mapUrl": "Google Maps Link"
    }
    ```
3.  Save the file and redeploy.

## Deployment to GitHub Pages

This project is pre-configured for GitHub Pages.

1.  **Update `vite.config.ts`** (Optional):
    If you deploy to a user page (`username.github.io`), remove the `base` line.
    If you deploy to a project page (`username.github.io/repo-name`), the current configuration (`base: './'`) handles relative paths automatically, but setting `base: '/repo-name/'` is explicit and recommended if routing issues occur.

2.  **Build and Deploy**:
    We recommend using the `gh-pages` package.

    First, install the deploy script utility:
    ```bash
    npm install --save-dev gh-pages
    ```

    Add these scripts to your `package.json`:
    ```json
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist",
      ...
    }
    ```

    Run the deploy command:
    ```bash
    npm run deploy
    ```

3.  **GitHub Settings**:
    Go to your repository Settings > Pages and select `gh-pages` branch as the source.

## Tech Stack

*   React 18
*   TypeScript
*   Vite
*   Tailwind CSS (via CDN for portability, easily convertible to PostCSS)
