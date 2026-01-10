# GEMINI.md: namorim

## Project Overview

This project, "namorim," is a web application designed as a dating platform, similar in concept to Tinder. The goal is to connect users based on their interests and facilitate meaningful connections.

The frontend is a Single Page Application (SPA) built with **React** and **Vite**, using JavaScript (ES6+) and JSX. The backend is powered by **Supabase**, which provides the database (PostgreSQL), user authentication, real-time APIs, and file storage.

The core features, as outlined in the project specifications, include:
*   User profile management (photos, bio, interests).
*   A "discovery" feature with a card-swiping interface (like/dislike).
*   A mutual-match system to enable conversations.
*   A real-time chat functionality for matched users.
*   A premium "Who Liked You" feature.

Authentication is currently implemented using Supabase's magic link (email-based) login.

## Building and Running

The project uses `bun` as the package manager and script runner.

**1. Install Dependencies:**
```bash
bun install
```

**2. Run the Development Server:**
To start the local development server with hot-reloading:
```bash
bun run dev
```
The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

**3. Build for Production:**
To create a production-ready build:
```bash
bun run build
```
The output will be placed in the `dist/` directory.

**4. Preview the Production Build:**
To serve the production build locally for testing:
```bash
bun run preview
```

## Development Conventions

### Code Style
*   The project uses **JavaScript (ES6+)** with **JSX** for React components.
*   There is no explicit linter or formatter (like ESLint or Prettier) configured yet, but the code generally follows standard React conventions.

### Project Structure
*   `src/`: Contains the main source code.
    *   `main.jsx`: The application entry point.
    *   `App.jsx`: The root React component, which handles session management.
    *   `pages/`: Contains top-level components for different application pages (e.g., `Auth.jsx`).
    *   `services/`: Houses modules for interacting with external services.
        *   `supabase.js`: Initializes the Supabase client.
    *   `style.css`: Global stylesheet.

### Backend and Authentication
*   The backend is fully managed by **Supabase**.
*   The Supabase client is configured in `src/services/supabase.js`.
*   **IMPORTANT:** The Supabase URL and `anon` key are currently hardcoded in `src/services/supabase.js`. For a real-world application, these should be replaced with your own credentials and likely managed via environment variables.

### Specifications
*   High-level project goals and features are documented in `specs/namorim-spec.md`.
*   The technology stack is defined in `specs/technology-spec.md`.
