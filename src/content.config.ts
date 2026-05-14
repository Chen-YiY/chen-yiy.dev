import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const wiki = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/wiki' }),
  schema: z.object({
    type: z.enum(['concept', 'entity', 'insight', 'topic', 'source']),
    tags: z.array(z.string()).default([]),
    sources: z.string().optional(),
    aliases: z.array(z.string()).default([]),
    related: z.string().optional(),
    category: z.string().optional(),
    strength: z.string().optional(),
    created: z.coerce.date().optional(),
    ingested: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { blog, wiki };
