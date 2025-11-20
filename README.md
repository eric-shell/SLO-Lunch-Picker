# SLO Lunch Picker 🌮🥗🍔

A fun, React-based web application to help you decide where to eat lunch in San Luis Obispo (93401/93405). Built with Vite, TypeScript, and Tailwind CSS.

## Features

*   **Spin the Wheel**: Randomly selects a restaurant from your filtered list.
*   **Filtering**: Filter by food category or check what's "Open Now".
*   **Local Data**: Powered by a local TypeScript data file for easy editing.
*   **Fun UI**: Beach-themed design with animations and confetti.

## Project Structure

*   `data/restaurants.ts`: The database of restaurants. Edit this to add more spots!
*   `components/`: Reusable UI components.
*   `utils/`: Helper logic for time checking.

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

1.  Open `data/restaurants.ts`.
2.  Add a new object to the `restaurants` array following the existing pattern:
    ```typescript
    {
      id: "unique-id",
      name: "Restaurant Name",
      address: "Address String",
      category: "Category Name",
      hours: {
        "Mon": "11:00-21:00",
        // ... other days
      },
      mapUrl: "Google Maps Link",
      // Optional fields: website, notes, rating, price
    }
    ```
3.  Save the file. The development server will auto-reload if running.

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
