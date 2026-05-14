import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkWikilinks from './src/lib/remark-wikilinks.ts';

export default defineConfig({
  site: 'https://chen-yiy.dev',
  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkWikilinks],
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
