---
name: performance-accessibility
description: Core Web Vitals optimization (LCP, INP, CLS), WCAG 2.1 AA accessibility, keyboard navigation, and color contrast.
---

# Performance & Accessibility Skill Guide

## Principles
1. **Core Web Vitals:**
   - **LCP (< 1.2s):** Preload or prioritize hero images with `fetchpriority="high"` and `loading="eager"`.
   - **CLS (< 0.05):** Always specify explicit `width` and `height` (or aspect-ratio) on media.
   - **INP (< 100ms):** Minimal main-thread blocking JavaScript.
2. **Accessibility (WCAG 2.1 AA):**
   - Visible keyboard focus rings (`focus-visible:ring-2`).
   - Semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`).
   - Meaningful alt text for images, and empty `alt=""` for purely decorative images.
   - Respect `prefers-reduced-motion` in all CSS transitions and animations.
