// Base URL for GitHub Pages deployment
// import.meta.env.BASE_URL is available in Astro/Vite context
export const BASE = import.meta.env.BASE_URL?.replace(/\/$/, '') || '';
