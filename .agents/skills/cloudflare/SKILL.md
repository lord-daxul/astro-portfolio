---
name: cloudflare
description: Cloudflare Workers edge deployment, Wrangler configuration, environment variables, and caching.
---

# Cloudflare Workers Skill Guide

## Principles
1. **Runtime:** `@astrojs/cloudflare` adapter running on Cloudflare Workers edge runtime.
2. **Wrangler Configuration:** `wrangler.jsonc` maintains compatibility flags and build asset bindings.
3. **Environment Compatibility:**
   - Client/build variables: `import.meta.env.PUBLIC_*`.
   - Edge/Node compatibility: Access server env gracefully with `process.env` fallback where needed.
4. **Lean Edge Footprint:** Avoid adding unnecessary Cloudflare bindings (KV, D1, R2) unless specifically required.
