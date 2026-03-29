# 🏡 LuxeEstate — Real Estate Showcase

A sleek, premium real estate showcase platform built with React + Vite + TypeScript. This project focuses on high-quality presentation, immersive property galleries, and interactive mapping features.

## ✨ Features

- **🏆 Premium Listings**: 10 hand-curated properties with rich details.
- **🖼️ Lightbox Gallery**: Immersive property galleries with lightbox support.
- **🗺️ Interactive Maps**: Full Leaflet & React Leaflet integration for property locations.
- **🔍 Advanced Filtering**: Filter properties by type (Sale/Rent) and title.
- **🌙 Dark & Light Mode**: Seamless theme switching with system detection.
- **🎭 Smooth Transitions**: Fluid page entries and hover effects via Framer Motion.
- **⚡ High Performance**: Fast loading and smooth scrolling (Lenis integration).

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 19, TypeScript |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS v4 |
| **Mapping** | Leaflet, React Leaflet |
| **Animations** | Framer Motion (v12) |
| **Routing** | React Router v7 |
| **Components** | Embla Carousel & Autoplay |

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.0 or higher
- **npm**: 9.0 or higher

### Installation

1.  **Navigate to the project directory**:
    ```bash
    cd real-estate-showcase
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:5173](http://localhost:5173) to view the showcase.

## 📁 Project Structure

```text
src/
 ├─ components/     # UI components & gallery system
 ├─ data/           # Static property data
 ├─ hooks/          # Data & theme custom hooks
 ├─ pages/          # Page components (Home, Listings, etc.)
 ├─ router/         # App routing configuration
 ├─ types/          # TypeScript interfaces
 ├─ assets/         # Static images & icons
 └─ App.tsx         # Main entry component
```

## 📜 Available Scripts

- `npm run dev`: Starts the dev server with HMR.
- `npm run build`: Compiles the project for production.
- `npm run lint`: Checks for linting errors.
- `npm run preview`: Previews the production build locally.

## 📝 License

This project is licensed under the MIT License — feel free to use it for your own projects!
