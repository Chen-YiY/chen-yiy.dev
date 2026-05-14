export interface WikilinkRef {
  slug: string;
  label: string;
}

/**
 * Extract flat slug from entry.id
 * "concepts/mcp" → "mcp", "mcp" → "mcp"
 */
export function getWikiSlug(entryId: string): string {
  const parts = entryId.split('/');
  return parts[parts.length - 1];
}

/**
 * Parse wikilink strings from frontmatter
 * Input: "[[mcp]], [[context-engineering|Context Engineering]]"
 * Output: [{ slug: "mcp", label: "mcp" }, { slug: "context-engineering", label: "Context Engineering" }]
 */
export function parseWikilinks(text: string | undefined): WikilinkRef[] {
  if (!text) return [];

  const re = /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g;
  const refs: WikilinkRef[] = [];
  let match;

  while ((match = re.exec(text)) !== null) {
    refs.push({
      slug: match[1],
      label: match[2] || match[1],
    });
  }

  return refs;
}
