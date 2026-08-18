# AGENTS.md — Agent Development Constitution

This document defines the architectural principles, rules of engagement, and coding standards for all AI coding agents working on this project.

---

## 1. Core Architecture & System Boundaries

* **WordPress (`https://rauldavid.com`):** The single source of truth for editorial content (Projects, Experience, Blog Posts).
* **WPGraphQL:** The sole API gateway for querying structured WordPress data into the frontend.
* **Astro:** The presentation layer. Renders fast, accessible, semantic HTML using server/static rendering. No client-side frameworks unless strictly required by complex interactivity.
* **Cloudflare Workers:** The production edge runtime (`@astrojs/cloudflare` + `wrangler`).
* **GitHub:** Source code control, feature branch workflow, and CI/CD pipelines.

---

## 2. Content & Data Principles

1. **Never Hardcode Editorial Content:** Projects, experience items, and blog articles must always be sourced from WordPress via the data layer.
2. **Defensive API Ingestion:** Always handle network failures, missing fields, or empty lists gracefully. Fall back to clean empty states rather than breaking page builds or runtime rendering.
3. **Strict Domain Mapping:** External WPGraphQL responses must pass through `src/lib/wordpress/mappers.ts` to convert CMS types into clean application domain types.
4. **Never Invent Fields:** Never invent WordPress custom fields or GraphQL fields without verifying against the schema or domain models.

---

## 3. Component & Frontend Guidelines

1. **Astro-First:** Build with native `.astro` components.
2. **Zero Client JS by Default:** Deliver zero client-side JavaScript for static content. Use `<script>` or islands only for user interactions (e.g. theme toggle, mobile menu, contact form submission).
3. **Design Tokens & Theme:** All styling must follow the design token system defined in `src/styles/tokens.css` and `src/styles/global.css`.
4. **Dark Mode by Default:** The application defaults to dark mode, respecting stored preference or explicit toggle with high contrast and accessible focus rings.
5. **Semantic HTML & WCAG 2.1 AA:** Always use semantic elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`), valid heading hierarchies (`<h1>`-`<h6>`), descriptive `aria-label`s when needed, and sufficient color contrast (> 4.5:1).

---

## 4. Security & Environment Variables

1. **Zero Secret Leaks:** Never commit `.env` files or API secrets to the repository.
2. **Public vs Private Variables:**
   * Public variables exposed to client/frontend must use `PUBLIC_` prefix (e.g. `PUBLIC_WORDPRESS_GRAPHQL_URL`, `PUBLIC_SITE_URL`).
   * Private server secrets (e.g. `RESEND_API_KEY`) must never be prefixed with `PUBLIC_` and must only be accessed in server endpoints / SSR frontmatter.
3. **Content Sanitization:** Always sanitize raw HTML strings received from WordPress before rendering to prevent XSS.

---

## 5. Agent Workflow & Vibe Coding Rules

When modifying or adding features:
1. **Plan First:** Analyze the task and affected files before making changes.
2. **Keep Changes Focused:** Do not rewrite unrelated code or perform opportunistic refactors outside the task scope.
3. **Verify Every Step:**
   * Check TypeScript types: `npm run check` (or astro check).
   * Verify build integrity: `npm run build`.
4. **Report Changes Concisely:** Clearly describe what was created or modified.
