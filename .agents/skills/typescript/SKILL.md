---
name: typescript
description: Strict TypeScript guidelines, domain modeling, type narrowing, and avoiding any.
---

# TypeScript Skill Guide

## Principles
1. **Strict Mode:** No implicit `any`, strict null checks enabled.
2. **Explicit Domain Types:**
   - Define clear domain types in `src/types/` (e.g. `Project`, `Experience`, `Post`).
   - Separate raw GraphQL API response types (`src/lib/wordpress/types.ts`) from application domain types.
3. **Safe Data Narrowing:**
   - Use optional chaining (`?.`), nullish coalescing (`??`), and type guards (`is`) when processing nullable CMS data.
   - Never suppress errors with `@ts-ignore` without a documented, verified justification.
4. **Avoid Type Duplication:** Reuse interfaces across components and mappers.
