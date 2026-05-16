import { visit } from 'unist-util-visit';
import type { Root, Text, Html } from 'mdast';

// remark 插件在构建时运行，import.meta.env.BASE_URL 此时不可靠
// 直接硬编码与 astro.config.mjs 中的 base 保持一致
const BASE = '/chen-yiy.dev';

// Match [[slug]] or [[slug|display]], exclude ![[image]] embeds
const WIKILINK_RE = /(?<!!)\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g;

export default function remarkWikilinks() {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index === undefined) return;

      const matches = [...node.value.matchAll(WIKILINK_RE)];
      if (matches.length === 0) return;

      const children: (Text | Html)[] = [];
      let lastIndex = 0;

      for (const match of matches) {
        const matchStart = match.index!;
        const matchEnd = matchStart + match[0].length;
        const slug = match[1];
        const display = match[2] || slug;

        // Plain text before match
        if (matchStart > lastIndex) {
          children.push({
            type: 'text',
            value: node.value.slice(lastIndex, matchStart),
          });
        }

        // wikilink → <a> tag
        children.push({
          type: 'html',
          value: `<a href="${BASE}/wiki/${slug}/" class="wiki-link">${display}</a>`,
        } as Html);

        lastIndex = matchEnd;
      }

      // Remaining text after last match
      if (lastIndex < node.value.length) {
        children.push({
          type: 'text',
          value: node.value.slice(lastIndex),
        });
      }

      parent.children.splice(index, 1, ...children);
    });
  };
}
