---
name: github
description: Git feature branch workflows, conventional commits, PR checks, and repository safety.
---

# GitHub & Workflow Skill Guide

## Principles
1. **Branch Protection:** Never push unverified changes directly to `main`.
2. **Feature Branch Naming:**
   - `feature/<name>` for new features or sections.
   - `fix/<name>` for bug fixes and accessibility corrections.
   - `refactor/<name>` for architectural restructuring.
3. **Conventional Commits:** Write clear, focused commit messages (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
4. **Pre-Commit Verification:** Run `npm run check` and `npm run build` before pushing.
