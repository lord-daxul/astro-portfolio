---
name: tailwind
description: Tailwind CSS v4 styling rules, design tokens, responsive breakpoints, and dark mode theming.
---

# Tailwind & Design System Skill Guide

## Principles
1. **Tailwind CSS v4:** Utilize `@tailwindcss/vite` integration.
2. **Design Tokens:** Use CSS variables defined in `src/styles/tokens.css` for primary colors, panel backgrounds, borders, and text contrast.
3. **Theme Management:**
   - Dark mode is default (`:root` / `[data-theme='dark']`).
   - Light mode overrides variables in `html[data-theme='light']`.
   - Maintain color contrast ratios above 4.5:1 for both themes.
4. **Responsive Patterns:**
   - Mobile-first approach.
   - Use standard breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).
5. **Restraint:** Avoid overuse of deep gradients, excessive glassmorphism, or non-functional animations.
