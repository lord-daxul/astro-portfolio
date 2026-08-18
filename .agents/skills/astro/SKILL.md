---
name: astro
description: Expert guidelines for building pages, layouts, and components in Astro 6+ with SSR and Cloudflare adapter.
---

# Astro Skill Guide

## Principles
1. **Prefer `.astro` components:** Build components natively using Astro frontmatter and templating.
2. **SSR & Prerendering:**
   - The project uses `output: 'server'` for dynamic content updates from WordPress.
   - For purely static pages (e.g. `/about`, `/404`), set `export const prerender = true;` if dynamic server features are unnecessary.
3. **Data Fetching in Frontmatter:**
   - Always perform data queries in the frontmatter (`---`) block at page level.
   - Pass strongly typed data to child presentation components via props.
4. **Islands & Client Scripts:**
   - Avoid client-side frameworks (React, Vue) unless required for complex stateful widgets.
   - Use lightweight `<script>` tags for UI behaviors (e.g. theme toggle, mobile menu drawer, form submission).
5. **Assets & Images:**
   - Use native `<img>` with explicit `width`, `height`, `loading="lazy"`, `decoding="async"`, and `fetchpriority="high"` for LCP images.
