# Sales & Revenue Dashboard

A modern, professional dashboard built with React, Redux, and Tailwind CSS to visualize and analyze sales performance data.

## Live Demo

[Link](https://sales-revenue-dashboard.vercel.app/) 


## Features

-   **At-a-Glance KPIs**: Track key metrics like Total Revenue, Target Achievement, and Month over Month Growth with clear visual indicators.
-   **Interactive Charts**: A line chart visualizes monthly sales vs. targets, and a pie chart breaks down revenue share by product.
-   **Data Tables**: View top performing products and customers, and browse all sales records with advanced sorting, searching, and pagination.
-   **Centralized State Management**: Uses Redux Toolkit for efficient and scalable state management.

## Tech Stack

-   **Frontend**: React (JavaScript)
-   **Styling**: Tailwind CSS
-   **State Management**: Redux Toolkit
-   **Charting**: Recharts

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

-   Node.js (v14 or later)
-   npm

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/namachi007/sales-revenue-dashboard.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd sales-revenue-dashboard
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm start
    ```

The application will now be running at `http://localhost:3000`.

## Previewing the UI Locally

Want to take the refreshed dashboard for a spin before pushing to GitHub? Use the dev server above, then:

1. Wait for the terminal to display `Compiled successfully!` (or address any errors it surfaces).
2. Open `http://localhost:3000` in your browser—CRA automatically reloads as you tweak files, so you can instantly evaluate style tweaks.
3. When you are finished reviewing the UI, stop the server with `Ctrl + C` in the terminal.

If you prefer testing the exact production bundle you will deploy, you can also run:

```bash
npm run build
npx serve -s build
```

That generates an optimized build and serves it locally so you can verify the final look and feel before publishing your changes.

## Running Tests Locally

The project currently relies on Jest (via Create React App) for unit testing. There are no authored tests yet, so Jest will exit with an error unless you instruct it to allow empty test suites. Use the following command to confirm the tooling still compiles and the configuration passes:

```bash
npm run test -- --watchAll=false --passWithNoTests
```

This runs Jest a single time in CI-friendly mode. If you begin adding tests later, simply omit the `--passWithNoTests` flag so that failures are surfaced normally.