# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

# SvelteKit Movie Listing Web App

## Table of Contents

1. [Installation](#installation)
   - [Project Setup](#project-setup)
   - [Tailwind CSS Setup](#tailwind-css-setup)
2. [Project Workflow](#project-workflow)
   - [Features](#features)
   - [File Structure](#file-structure)
   - [Core Functionality](#core-functionality)
3. [Usage](#usage)
   - [Adding Movies to Watchlist](#adding-movies-to-watchlist)
   - [Searching for Movies](#searching-for-movies)
   - [Filtering Movies](#filtering-movies)

---

## Installation

### Project Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/movie-listing-web-app.git
   ```

## Features

- **Movie Listing:** Displays a list of popular movies with details such as title, year, genre, rating, and an overview.
- **Movie Search:** Allows users to search for movies by title.
- **Detailed Movie Views:** Provides detailed information about each movie.
- **Watchlist Management:** Users can add or remove movies from their watchlist, with immediate updates to the UI.
- **User Login and Signup:** Handles user-specific data such as watchlists.
- **Filtering Movies:** Filters movies by genre, year, and rating to help users find movies that match their preferences.

---

## Usage

### Adding Movies to Watchlist

- On the movie listing page, click the "Add to Watchlist" button for a movie to add it to your watchlist.
- To remove a movie from the watchlist, click the "Remove from Watchlist" button.

### Searching for Movies

- Enter a movie title in the search bar and click "Search" to filter the movie list by the search query.

### Filtering Movies

- Use the genre buttons to filter movies by genre (e.g., Action, Comedy, Drama).
- Use the year buttons to filter movies by the year of release.
- Use the rating buttons to filter movies by rating (e.g., 7+, 8+).
