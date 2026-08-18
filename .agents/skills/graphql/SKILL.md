---
name: graphql
description: WPGraphQL client queries, fragments, variables, error handling, and response typing.
---

# WPGraphQL Skill Guide

## Principles
1. **Centralized Data Access:** All queries reside in `src/lib/wordpress/queries.ts`.
2. **Defensive Fetching:**
   - Always wrap WPGraphQL requests in a unified client (`src/lib/wordpress/client.ts`).
   - Catch missing field errors (`Cannot query field "x" on type "RootQuery"`) and return safe empty structures.
3. **Structured Queries:**
   - Request only necessary fields to reduce payload size.
   - Use GraphQL variables (`$first`, `$slug`, `$id`) for dynamic filtering and pagination.
