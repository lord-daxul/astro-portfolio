---
name: wordpress
description: Headless WordPress editorial model, Custom Post Types (projects, experiences), and ACF configuration.
---

# WordPress Headless Skill Guide

## Principles
1. **CMS Boundary:** WordPress at `rauldavid.com` is strictly an editorial CMS.
2. **Entity Types:**
   - `projects`: Portfolio case studies, client work, and personal tools.
   - `experiences`: Career timeline and job milestones.
   - `posts`: Blog articles.
3. **Custom Fields & ACF:**
   - ACF fields registered in custom theme exposed to WPGraphQL.
   - Never assume an ACF field is always present; provide fallback values.
4. **Media & Assets:**
   - Image assets are stored in the WordPress Media Library.
   - Always extract `sourceUrl`, `altText`, and dimensions (`mediaDetails.width`, `mediaDetails.height`) via GraphQL.
