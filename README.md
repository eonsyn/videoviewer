# Videoviewer

![Banner Image](https://raw.githubusercontent.com/eonsyn/videoviewer/main/docs/banner.png)

A modern, responsive video player web application built with **Next.js 14** and **React**. It supports multiple video formats, custom playlists, playback controls, subtitles, and a sleek glassmorphism UI.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Responsive Design** – Works flawlessly on desktop, tablet, and mobile.
- **Glassmorphism UI** – Modern translucent panels with smooth micro‑animations.
- **Multiple Source Support** – MP4, WebM, HLS, DASH.
- **Custom Playlists** – Queue videos, reorder, and shuffle.
- **Subtitles & Captions** – VTT support with automatic sync.
- **Keyboard Shortcuts** – Space, Arrow keys, `F` for fullscreen, etc.
- **Theming** – Light & dark mode with CSS variables.
- **Accessibility** – ARIA labels, focus management, screen‑reader friendly.

---

## Demo

<details>
<summary>Click to view live demo</summary>

[Live Demo on Vercel](https://videoviewer.vercel.app)

</details>

---

## Installation

```bash
# Clone the repository
git clone https://github.com/eonsyn/videoviewer.git
cd videoviewer

# Install dependencies (using npm, yarn, pnpm, or bun)
npm install   # or yarn install, pnpm install, bun install
```

---

## Usage

```bash
# Start the development server
npm run dev   # or yarn dev, pnpm dev, bun dev
```

Open your browser at `http://localhost:3000` to see the app. Edit `app/page.js` (or any component under `app/`) and the page will hot‑reload.

---

## Project Structure

```
├─ app/                # Next.js App Router pages & layouts
│   ├─ layout.js       # Root layout with global styles
│   └─ page.js         # Home page – video player UI
├─ components/         # Reusable React components
│   ├─ Player.jsx      # Core video player logic
│   ├─ Controls.jsx    # Playback controls
│   └─ Playlist.jsx    # Playlist UI
├─ public/            # Static assets (icons, images, sample videos)
├─ styles/            # Global CSS & design tokens
│   └─ globals.css    # Tailwind‑free vanilla CSS with glassmorphism
├─ lib/               # Utility functions (formatting, helpers)
├─ .env.example       # Example environment variables
├─ next.config.mjs    # Next.js configuration
├─ package.json       # Project metadata & scripts
└─ README.md          # You are reading it now!
```

---

## Development

- **Styling** – All styles are written in vanilla CSS using CSS custom properties for theming. No Tailwind or external UI libraries.
- **Animations** – Subtle micro‑animations are implemented with `@keyframes` and `transition` for hover/focus effects.
- **Testing** – Run `npm test` (Jest + React Testing Library) to execute unit tests.
- **Linting** – `npm run lint` uses ESLint with the `next/core-web-vitals` preset.

---

## Building for Production

```bash
npm run build   # Generates an optimized production build in .next/
```

The output is a fully static‑optimized site ready for any edge CDN.

---

## Deployment

The easiest way to deploy is via **Vercel** (the creators of Next.js):

1. Push your code to GitHub.
2. Import the repository in the Vercel dashboard.
3. Vercel will automatically detect the Next.js project and set up the build pipeline.

You can also deploy to other platforms (Netlify, Cloudflare Pages) by following the generic Next.js static export guide.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/awesome-feature`).
3. Write tests for your changes.
4. Ensure lint passes (`npm run lint`).
5. Open a Pull Request with a clear description of the changes.

Read our [CONTRIBUTING.md](https://github.com/eonsyn/videoviewer/blob/main/CONTRIBUTING.md) for detailed guidelines.

---

## License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

*Made with ❤️ by the eonsyn team.*
