# Next.js Frontend for Crypto Tracker

This repository contains the **Next.js frontend** for the **Crypto Tracker** project. The application interacts with the backend to display cryptocurrency prices, track deviations, and fetch market charts.

---

## Features

- Fetch and display the current price of cryptocurrencies.
- Track deviations in cryptocurrency prices.
- Display the market chart for a cryptocurrency over the last 30 days.
- Responsive UI for an enhanced user experience.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Framework**: Tailwind CSS
- **Backend Integration**: Fetches data from a Node.js backend.

---

## Installation and Setup

Follow these steps to set up and run the project on your local machine:

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** (Package Manager)

### Steps

1. **Clone the Repository**

   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or, using yarn:

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the required variables:

   ```env
   NEXT_PUBLIC_API_URL=https://coin-xchange-wine.vercel.app
   ```

   Replace the value of `NEXT_PUBLIC_API_URL` with your backend API's URL.

4. **Run the Development Server**

   Using npm:

   ```bash
   npm run dev
   ```

   Or, using yarn:

   ```bash
   yarn dev
   ```

   The development server will start, and the application will be accessible at:  
   **http://localhost:3000**

5. **Build and Run for Production**

   To build the project for production, run:

   Using npm:

   ```bash
   npm run build
   npm start
   ```

   Or, using yarn:

   ```bash
   yarn build
   yarn start
   ```

---

## Scripts

The following scripts are available in the project:

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.
- **`npm start`**: Runs the production build.
- **`npm run lint`**: Lints the codebase for errors.

---
