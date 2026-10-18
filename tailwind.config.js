/**
 * Tailwind CSS configuration – tailored for a premium sci‑fi dark theme.
 * Includes custom indigo/teal palette, futuristic fonts, and required plugins.
 */
const config = {
  // Enable class‑based dark mode for easy toggling
  darkMode: 'class',
  // Scan all source files for class names
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--bg-card)',
        primary: '#1e3a8a', // deep indigo
        secondary: '#0f766e', // teal
        accent: {
          purple: 'var(--accent-purple)',
          pink: 'var(--accent-pink)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
      },
      fontFamily: {
        sans: ['"Orbitron"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [
    // Forms utilities for better input styling
    require('@tailwindcss/forms'),
    // Typography plugin for prose styling
    require('@tailwindcss/typography'),
  ],
};

export default config;
