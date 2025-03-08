# Gov-Perf-Frontend

A modern React application for government performance tracking and analytics.

## Overview

Gov-Perf-Frontend is a web application built with React and TypeScript that provides an interface for monitoring and analyzing government performance metrics.

## Features

- Modern UI with Radix UI and Tailwind CSS
- Data fetching with React Query
- State management with Zustand
- Type-safe development with TypeScript
- Comprehensive testing with Vitest

## Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gov-perf-frontend.git
   cd gov-perf-frontend
   Copy
   Insert
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

This will start the Vite development server, typically at [http://localhost:3000](http://localhost:3000).

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

### Testing

Run tests in watch mode:

```bash
npm run test
```

Run tests for CI:

```bash
npm run test:ci
```

### Linting

Check code for linting issues:

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint:fix
```

### Project Structure

```bash
gov-perf-frontend/
├── src/
│ ├── assets/ # Static assets
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page components
│ ├── services/ # API and service integrations
│ ├── store/ # State management
│ ├── styles/ # Global styles
│ ├── utils/ # Utility functions
│ ├── App.tsx # Main App component
│ └── main.tsx # Application entry point
├── public/ # Public static files
└── ... # Config files
```

### Technologies

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- React Query
- Zustand
- Vitest
- Biome

#### CI/CD

The project uses GitHub Actions for continuous integration. The workflow runs tests on every push to ensure code quality.

### Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

#### Attribution of Contributions

Contributions are made by individuals, not by the organizations they may be associated with.

## 📜 License & Usage

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)** license. This means:

- ✅ **You are free to:**

  - Share - Copy and redistribute the material in any medium or format.
  - Adapt - Remix, transform, and build upon the material.

- ❗ **Under the following conditions:**
  - **Attribution** - You must give appropriate credit to all contributors, provide a link to the license, and indicate if changes were made.
  - **NonCommercial** - You may not use the material for commercial purposes.
  - **ShareAlike** - If you remix, transform, or build upon the material, you must distribute your contributions under the same license.

For full details, see the [official CC BY-NC-SA 4.0 license](https://creativecommons.org/licenses/by-nc-sa/4.0/).

## 🏛 Political Neutrality

This project is **independent and not affiliated with any political party**. Contributions from all parties, organizations, or individuals are welcome as long as they align with the principles of open data and transparency.

While some contributors may have political affiliations, **this project does not endorse any party or ideology**. Contributions should be made in the spirit of data integrity and public interest.
