# Coders Gyan Frontend

A modern, high-performance frontend application for the Coders Gyan platform, built to deliver a premium learning experience. This repository contains the client-side code, featuring a responsive design, interactive course players, and a comprehensive user dashboard.

## 🚀 Key Features

### 🌐 Public Platform
- **Landing Page**: Engaging home page with feature highlights.
- **Course Catalog**: Browse and filter available courses.
- **Course Details**: In-depth information about course curriculum and pricing.
- **Articles & Resources**: Educational content and coding labs.
- **Membership**: Details on subscription plans and benefits.
- **Testimonials**: User success stories and reviews.

### 👤 User Dashboard
- **Overview**: Personalized learning progress at a glance.
- **My Courses**: Access to enrolled courses.
- **Certificates**: View and download earned certificates.
- **Settings**: Manage user profile and preferences.

### 🎓 Learning Experience
- **Dedicated Course Player**: Distraction-free environment for video lessons.
- **Progress Tracking**: Real-time tracking of lesson completion.

## 🛠️ Tech Stack

This project is built with a modern frontend stack to ensure performance, scalability, and developer experience:

- **Core**: [React 18](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) for lightning-fast HMR and bundling.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid UI interactions.
- **Routing**: [React Router v6](https://reactrouter.com/) for client-side navigation.
- **Icons**: [Lucide React](https://lucide.dev/) for consistent iconography.
- **UI Utilities**: [Radix UI](https://www.radix-ui.com/) primitives, `clsx`, and `tailwind-merge`.

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/    # Reusable UI components
│   ├── layouts/       # Page layouts (Main, Dashboard, etc.)
│   ├── pages/         # Route components (Home, Courses, Dashboard, etc.)
│   ├── data/          # Static data and constants
│   ├── lib/           # Utility functions and helpers
│   ├── App.tsx        # Main application component with Routing
│   └── main.tsx       # Entry point
├── public/            # Static assets
└── package.json       # Dependencies and scripts
```

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn**

### Installation

1.  Clone the repository (if applicable) or navigate to the project directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate the static assets in the `dist` directory, ready for deployment.

### Linting

Run the linter to ensure code quality:

```bash
npm run lint
```

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

---

*Built with ❤️ by the Coders Gyan Team.*
