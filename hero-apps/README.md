# 🦸‍♂️ Hero IO

> Discover, install, and manage hero-approved applications with a curated React experience.

Hero IO is a single-page application built for Assignment 008. It delivers a responsive marketplace with rich data visualisations, live search, and localStorage-powered installations.

## ✨ Features

- Modern home page with dynamic stats, curated app grid, and high-contrast hero banner
- Comprehensive catalogue with live search, download-based sorting, and loading feedback
- Detailed app view including install/uninstall actions, success toasts, and Recharts breakdowns
- My Installation dashboard backed by localStorage with uninstall flows and install history
- Guided installation page covering best practices, tips, and FAQs
- Custom navigation/loading states and polished footer/header layout

## 🧰 Tech Stack

- React 19 with React Router v7
- Vite 7
- Tailwind CSS v4 + DaisyUI components
- Recharts 3 for visualisations
- react-hot-toast for notifications

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open the dev server URL provided by Vite (defaults to <http://localhost:5173>).

## 📦 Available Scripts

- `npm run dev` – start the development server
- `npm run build` – build the project for production
- `npm run preview` – preview the production build locally
- `npm run lint` – run ESLint checks

## ☁️ Deployment Notes

- Deploy on Netlify/Vercel/Cloudflare with SPA fallback enabled (rewrite `/*` to `/index.html`)
- Ensure environment caches are cleared if testing localStorage install/uninstall flows

Enjoy exploring the Hero IO marketplace!
