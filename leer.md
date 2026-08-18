# Portfolio Headless WordPress + Astro + Cloudflare
## Project Planning Specification for Codex / OpenCode

**Version:** 1.0  
**Date:** 2026-08-17  
**Status:** Planning specification — DO NOT IMPLEMENT YET

---

# 1. Purpose

Build a modern personal portfolio using:

- WordPress as a headless CMS/backend
- Astro as the frontend framework
- TypeScript
- Tailwind CSS
- WPGraphQL as the preferred WordPress API
- Cloudflare Workers as the production runtime/deployment platform
- GitHub as source control and CI/CD
- Agent Skills compatible with Codex/OpenCode

The first task is **planning, not implementation**.

The agent must inspect this specification, analyze the architecture, identify missing decisions, and produce a detailed implementation plan before changing or creating project files.

---

# 2. Core Architecture

The intended data flow is:

WordPress
→ WPGraphQL
→ typed WordPress API client
→ Astro
→ reusable Astro components
→ browser

WordPress is the editorial source of truth.

Astro is the presentation layer.

Cloudflare Workers is the production runtime.

The WordPress frontend/theme is NOT the public frontend.

The portfolio must be architected so that the frontend can be redesigned without changing the editorial content model unnecessarily.

---

# 3. Technology Stack

## Frontend

- Astro
- TypeScript
- Tailwind CSS
- Native HTML/CSS where practical
- React only if a genuinely complex interactive component requires it

## CMS

- WordPress
- Custom Post Types (CPT)
- Advanced Custom Fields (ACF), if appropriate
- WPGraphQL
- WordPress Media Library

## Infrastructure

- Cloudflare Workers
- Wrangler
- Cloudflare DNS/CDN
- GitHub
- GitHub Actions / Cloudflare deployment integration

## Optional technologies

Only introduce these if a concrete requirement exists:

- React
- Motion/animation library
- Cloudflare D1
- Cloudflare KV
- Cloudflare R2
- Durable Objects
- external databases
- external authentication

Do not add infrastructure just because it is available.

---

# 4. WordPress Content Model

WordPress will manage portfolio content.

Initial content model:

## CPT: Projects

Expected conceptual fields:

- title
- slug
- excerpt
- full description
- featured image
- gallery/media
- project date/year
- client/company
- role
- technologies
- project category
- project URL
- repository URL
- featured flag
- status
- ordering
- case-study content
- SEO metadata where needed

The exact field model must be planned before implementation.

## CPT: Experience

Possible fields:

- company
- position
- start date
- end date
- current role flag
- description
- responsibilities
- technologies
- company URL
- logo
- ordering

## Posts: Blog

Use standard WordPress Posts.

Expected data:

- title
- slug
- excerpt
- content
- featured image
- author
- categories
- tags
- publication date
- modified date
- SEO metadata

## Optional CPTs

Do not create these unless they are actually required:

- Testimonials
- Services
- Talks
- Certifications
- Education

The agent must recommend whether each belongs in a CPT, taxonomy, ACF field, or standard WordPress entity.

---

# 5. WordPress API Strategy

Preferred API:

**WPGraphQL**

Reason:

- structured data retrieval
- predictable frontend queries
- good fit for CPTs
- avoids unnecessarily retrieving rendered WordPress HTML
- easier to type and compose frontend data requirements

REST API may be used when it provides a clear advantage, but it should not become a second undocumented API layer.

All WordPress access must be centralized.

Frontend WordPress integration belongs under:

`src/lib/wordpress/`

Suggested structure:

```text
src/lib/wordpress/
├── client.ts
├── queries.ts
├── types.ts
├── mappers.ts
└── index.ts
```

Components must NOT make arbitrary WordPress API requests.

---

# 6. Frontend Architecture

Suggested structure:

```text
src/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── projects/
│   ├── blog/
│   └── navigation/
│
├── layouts/
│   ├── BaseLayout.astro
│   ├── BlogLayout.astro
│   └── ProjectLayout.astro
│
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── experience.astro
│   ├── projects/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── contact.astro
│
├── lib/
│   ├── wordpress/
│   ├── seo/
│   └── utils/
│
├── styles/
│   ├── global.css
│   └── tokens.css
│
└── types/
    ├── project.ts
    ├── post.ts
    └── experience.ts
```

The exact structure may change if the planning phase identifies a better Astro-native architecture.

Do not create folders merely because they appear in this example.

---

# 7. Astro Principles

1. Prefer Astro components.
2. Minimize client-side JavaScript.
3. Use hydration only where interaction requires it.
4. Do not introduce React by default.
5. Prefer server/static rendering.
6. Keep data fetching outside presentation components.
7. Keep content models typed.
8. Avoid unnecessary abstractions.
9. Use Astro-native features before adding dependencies.

---

# 8. TypeScript Principles

Use strict TypeScript.

Rules:

- avoid `any`
- prefer explicit domain types
- type GraphQL responses
- type transformed/mapped CMS data
- do not suppress errors with `@ts-ignore` unless there is a documented reason
- avoid unnecessary runtime validation if compile-time types are sufficient
- validate external data at the boundary when appropriate

---

# 9. Tailwind / Design System

Tailwind CSS is the primary styling utility.

The project should establish a coherent design system before extensive component creation.

Define:

- typography scale
- spacing scale
- breakpoints
- layout widths
- radii
- shadows
- transitions
- focus states
- dark/light behavior if used
- design tokens

Avoid generic AI-generated visual patterns.

Avoid excessive:

- gradients
- glassmorphism
- cards everywhere
- huge hero sections
- decorative animations
- rounded containers without purpose
- shadows without purpose

Visual hierarchy should come primarily from:

1. typography
2. spacing
3. composition
4. contrast
5. imagery
6. interaction

---

# 10. UI/UX Principles

The portfolio should feel designed, not assembled from generic components.

Before implementing a major section, determine:

- What is the purpose?
- What should the visitor notice first?
- What information matters most?
- What action should the visitor take?
- How does the section behave on mobile?
- What can be removed?

Use progressive disclosure where appropriate.

Animations should support hierarchy or feedback rather than exist only for visual novelty.

Respect `prefers-reduced-motion`.

---

# 11. SEO

Every public page should have:

- unique title
- meta description
- canonical URL
- Open Graph metadata
- social sharing metadata
- appropriate structured data
- semantic headings
- descriptive URLs

Site-wide:

- sitemap
- robots.txt
- favicon
- appropriate RSS feed if blog warrants it

Recommended structured data may include:

- Person
- WebSite
- Article
- CreativeWork
- BreadcrumbList

The agent must decide which schemas are actually appropriate rather than adding all of them indiscriminately.

---

# 12. Accessibility

Use semantic HTML.

Requirements:

- keyboard navigation
- visible focus states
- meaningful link/button labels
- appropriate alt text
- sufficient contrast
- accessible forms
- logical heading hierarchy
- no keyboard traps
- reduced motion support
- responsive text/layout

Use ARIA only when native HTML semantics are insufficient.

---

# 13. Performance

Performance is a first-class requirement.

Prioritize:

- minimal JavaScript
- optimized images
- responsive images
- lazy loading when appropriate
- efficient fonts
- limited dependencies
- server/static rendering
- caching where appropriate

Do not introduce a client-side library for functionality that Astro or browser APIs can provide.

The agent should plan a performance verification process, potentially including Lighthouse or equivalent checks.

---

# 14. Cloudflare

Production platform:

**Cloudflare Workers**

Use Wrangler for local development/deployment.

Keep Cloudflare-specific code isolated where practical.

Do not add:

- D1
- KV
- R2
- Durable Objects
- Queues
- Workers AI

unless a concrete requirement is identified.

The agent should verify the current recommended Astro + Cloudflare Workers configuration before implementation.

---

# 15. Git and GitHub Workflow

GitHub is the source of truth for code.

Development workflow:

```text
feature branch
→ implementation
→ type/check
→ build
→ diff review
→ commit
→ push
→ pull request
→ merge
```

Never casually commit directly to `main`.

Branch examples:

```text
feature/project-page
feature/blog
feature/wordpress-api
fix/mobile-navigation
refactor/graphql-client
```

Commits should be:

- small
- meaningful
- focused
- easy to review

Do not mix unrelated changes.

Never commit secrets.

---

# 16. Environment Variables

Secrets must never be hardcoded.

Potential variables:

```text
WORDPRESS_GRAPHQL_URL
WORDPRESS_API_TOKEN
PUBLIC_SITE_URL
```

The exact environment variables must be decided during planning.

Provide:

`.env.example`

Never commit real secrets.

---

# 17. Agent Skills

The project should have 10 conceptual skills:

```text
.agents/skills/
├── astro/
├── typescript/
├── tailwind/
├── wordpress/
├── graphql/
├── github/
├── cloudflare/
├── ui-design/
├── seo/
└── performance-accessibility/
```

Each skill should contain focused instructions and references relevant to the project.

Do not duplicate the entire AGENTS.md inside every skill.

## Skill 1: Astro

Should cover:

- Astro components
- layouts
- pages
- routing
- islands
- SSR/static rendering
- data fetching
- image optimization
- Astro configuration

## Skill 2: TypeScript

Should cover:

- strict typing
- interfaces/types
- API models
- narrowing
- avoiding any
- safe data transformations

## Skill 3: Tailwind

Should cover:

- responsive design
- spacing
- typography
- design tokens
- component styling
- dark mode if used
- focus states
- avoiding style duplication

## Skill 4: WordPress Headless

Should cover:

- CPTs
- ACF
- taxonomies
- media
- WordPress editorial modeling
- headless architecture
- content ownership

## Skill 5: GraphQL / WPGraphQL

Should cover:

- queries
- fragments
- variables
- CPT queries
- pagination
- taxonomies
- media
- typed responses
- error handling

## Skill 6: GitHub

Should cover:

- branches
- commits
- pull requests
- issues
- reviews
- GitHub Actions
- safe repository operations

## Skill 7: Cloudflare

Should cover:

- Workers
- Wrangler
- configuration
- deployments
- environment variables
- domains
- caching
- production/preview environments

## Skill 8: UI Design

Should cover:

- hierarchy
- composition
- typography
- spacing
- responsive design
- interaction
- animation restraint
- avoiding generic AI design

## Skill 9: SEO

Should cover:

- metadata
- canonical URLs
- Open Graph
- sitemap
- robots
- JSON-LD
- semantic URLs

## Skill 10: Performance & Accessibility

Should cover:

- Core Web Vitals
- image optimization
- JavaScript minimization
- accessibility
- keyboard navigation
- semantic HTML
- reduced motion
- contrast

---

# 18. Agent Development Constitution

The project should contain an `AGENTS.md` file with the following principles.

## Architecture

WordPress is the CMS.

Astro is the frontend.

Cloudflare Workers is the runtime.

GitHub is source control.

WPGraphQL is the preferred API.

## Content

Editorial content comes from WordPress.

Do not hardcode projects, experience or blog content unless explicitly requested.

## Components

Components have clear responsibilities.

Avoid both duplication and premature abstraction.

## Dependencies

Before adding a dependency, determine whether Astro, TypeScript, Tailwind or native browser APIs already solve the problem.

## Security

Never expose secrets.

Never commit credentials.

Never invent authentication or authorization behavior.

## Correctness

Never invent WordPress fields or GraphQL schema fields.

If the schema is unknown, inspect or ask rather than guessing.

## Scope

Do not rewrite unrelated code.

Do not perform opportunistic refactors while implementing a feature.

## Verification

After meaningful changes:

```text
npm run check
npm run build
```

Run linting if configured.

## Vibe Coding

The agent must:

1. inspect the project
2. understand the existing architecture
3. state assumptions
4. propose the smallest good solution
5. implement
6. verify
7. report changes

The agent should challenge an implementation suggestion when there is a clearly better architectural solution, but must explain why.

---

# 19. Planning Phase

Before writing application code, the agent must produce a planning document covering:

## A. Architecture

- frontend architecture
- CMS architecture
- API architecture
- deployment architecture
- caching strategy

## B. WordPress schema

Define:

- CPTs
- fields
- taxonomies
- relationships
- media
- slugs
- ordering
- GraphQL exposure

## C. Astro routes

Define:

- home
- about
- experience
- projects
- project detail
- blog
- blog detail
- contact

## D. Data flow

Document exactly how data moves from WordPress to Astro.

## E. Rendering strategy

For each page determine:

- static
- server-rendered
- cached
- dynamic

Do not choose blindly.

## F. Deployment

Define:

- GitHub workflow
- preview deployment
- production deployment
- environment variables
- domain
- rollback strategy

## G. Performance

Define measurable performance goals.

## H. SEO

Define page metadata and structured data strategy.

## I. Accessibility

Define verification approach.

## J. Risks

Identify:

- WordPress API issues
- caching problems
- preview/published content behavior
- image handling
- API failures
- deployment problems
- SEO problems
- content-model limitations

---

# 20. Decisions That Must Be Confirmed Before Implementation

The agent must explicitly identify unresolved decisions.

At minimum:

1. WordPress hosting location
2. WordPress domain/API URL
3. WPGraphQL installation
4. ACF usage
5. exact CPT names
6. exact custom fields
7. taxonomy model
8. whether authenticated/private GraphQL data is required
9. image strategy
10. caching/revalidation strategy
11. portfolio visual direction
12. dark/light mode
13. contact form strategy
14. analytics strategy
15. domain
16. Cloudflare production/preview environments

Do not make irreversible decisions silently.

---

# 21. Recommended Build Phases

## Phase 0 — Discovery

- inspect environment
- inspect available agent skills
- inspect current WordPress setup
- identify CMS capabilities
- identify deployment constraints

## Phase 1 — Architecture

- finalize content model
- finalize GraphQL contract
- finalize routes
- finalize rendering strategy
- finalize infrastructure

## Phase 2 — Foundation

- create Astro project
- configure TypeScript
- configure Tailwind
- configure Cloudflare
- configure lint/check/build
- create AGENTS.md
- create skills

## Phase 3 — WordPress Integration

- configure WPGraphQL
- implement typed client
- implement queries
- implement mapping layer
- test error states

## Phase 4 — Design System

- typography
- spacing
- colors
- layout
- buttons
- navigation
- responsive foundations

## Phase 5 — Portfolio

- home
- projects
- project details
- experience
- about
- contact

## Phase 6 — Blog

- blog listing
- article page
- categories/tags if needed
- RSS if appropriate
- SEO

## Phase 7 — Quality

- accessibility
- SEO
- performance
- responsive testing
- error states
- loading states

## Phase 8 — Deployment

- GitHub
- preview
- production
- Cloudflare
- domain
- monitoring

---

# 22. Non-Goals

Unless explicitly requested, do NOT build:

- user authentication
- admin dashboard in Astro
- custom CMS
- e-commerce
- database outside WordPress
- social network features
- unnecessary animations
- unnecessary 3D
- complex backend services
- duplicate WordPress admin functionality

---

# 23. Success Criteria

The project is successful when:

- WordPress manages editorial content
- Astro consumes structured WordPress data
- the frontend does not depend on WordPress themes
- the site deploys to Cloudflare Workers
- GitHub controls the codebase
- content can be updated without changing frontend code
- the site is responsive
- the site is accessible
- the site has strong SEO foundations
- the site loads quickly
- the architecture remains understandable to another developer
- Codex/OpenCode can safely continue development using AGENTS.md and the skills

---

# 24. Initial Agent Prompt

Use the following prompt as the first instruction to Codex/OpenCode.

---

You are the lead architect for this project.

Read `PROJECT_SPEC.md` completely before taking action.

IMPORTANT:

Do NOT write application code yet.

Do NOT install dependencies yet.

Do NOT create the Astro application yet.

Do NOT modify WordPress yet.

Do NOT deploy anything.

Your first task is planning.

## Your objectives

1. Analyze the complete specification.
2. Inspect the current repository, if one exists.
3. Inspect the available Agent Skills.
4. Determine what is already configured.
5. Identify contradictions or missing information.
6. Design the final architecture.
7. Design the WordPress content model.
8. Design the WPGraphQL contract.
9. Design the Astro route structure.
10. Design the Cloudflare deployment architecture.
11. Define the GitHub workflow.
12. Define the development phases.
13. Define the verification strategy.
14. Identify decisions that require human approval.

## Required output

Create a planning proposal containing:

### 1. Executive summary

Explain the proposed architecture in plain language.

### 2. Architecture diagram

Show:

WordPress → WPGraphQL → Astro → Cloudflare Workers → User

and explain each layer.

### 3. WordPress content model

Provide a table containing:

- entity
- field
- field type
- purpose
- required/optional
- GraphQL exposure
- notes

### 4. GraphQL contract

Propose the queries and data structures required by Astro.

Do NOT invent fields that cannot be supported by the planned WordPress schema.

Clearly mark assumptions.

### 5. Astro architecture

Explain:

- routes
- layouts
- components
- data layer
- types
- utilities
- rendering strategy

### 6. Repository structure

Propose the final directory tree.

Explain why each major directory exists.

### 7. Agent Skills

Define the 10 skills required by the project.

For each skill explain:

- purpose
- scope
- when the agent should use it
- what it must not do

### 8. GitHub workflow

Define:

- branch strategy
- commits
- pull requests
- checks
- deployment workflow

### 9. Cloudflare architecture

Define:

- Workers
- Wrangler
- environments
- variables
- domain
- caching
- preview
- production

### 10. Security

Identify:

- secrets
- API exposure
- WordPress authentication considerations
- public/private data boundaries
- common risks

### 11. Performance

Define concrete performance goals and verification methods.

### 12. SEO

Define metadata, structured data and indexing strategy.

### 13. Accessibility

Define accessibility requirements and verification.

### 14. Risks and tradeoffs

List important architectural risks.

### 15. Open decisions

Create a short list of decisions that require the project owner's approval.

Do not hide assumptions.

### 16. Implementation roadmap

Break implementation into small milestones.

Each milestone must include:

- objective
- files/components affected
- dependencies
- verification
- definition of done

## Planning rule

The architecture should optimize for:

1. security
2. correctness
3. accessibility
4. performance
5. maintainability
6. simplicity
7. visual quality

Do not optimize for technology count.

Do not add technologies just because they are popular.

Do not begin implementation until the plan has been reviewed and approved.

---

# 25. Final Instruction to the Agent

The most important rule:

**PLAN FIRST. CODE SECOND.**

If information is missing, identify it.

If an assumption is necessary, state it.

If there is a simpler architecture, recommend it.

If the requested architecture has a technical problem, explain the problem before implementing it.

Do not guess.
