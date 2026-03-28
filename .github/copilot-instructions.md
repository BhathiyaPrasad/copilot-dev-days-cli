# Copilot Instructions for Mona Mayhem

## Project Overview

This is an **Astro SSR workshop project** for building a retro arcade-themed GitHub contribution comparison battle arena. The repository is intentionally minimal — participants use GitHub Copilot to build the full application step-by-step following the workshop guides in `/workshop`.

**Tech Stack:**
- Framework: Astro v5.14.4 (server-side rendered)
- Runtime: Node.js with `@astrojs/node` adapter in standalone mode
- Language: TypeScript (strict mode)
- Module System: ESM

## Build & Dev Commands

```bash
npm run dev       # Start dev server on http://localhost:4321
npm run build     # Production build
npm run preview   # Preview production build
```

**No test or lint commands exist** — this is a starter template for workshop participants to build upon.

## Architecture

### SSR Configuration
This is a **server-side rendered Astro app**, not a static site:
```javascript
// astro.config.mjs
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' })
});
```

### File Structure
```
src/
├── pages/
│   ├── index.astro                   # Main battle page (starter scaffold)
│   └── api/contributions/
│       └── [username].ts             # Dynamic API route (TODO: implement)
```

### Key Implementation Areas

**API Route (`src/pages/api/contributions/[username].ts`):**
- ✅ Proxies GitHub's contribution API: `https://github.com/{username}.contribs`
- ✅ Uses `APIRoute` type from Astro with TypeScript interfaces
- ✅ Returns JSON with contribution data and `cached` flag
- ✅ In-memory cache with 5-minute TTL (resets on server restart)
- ✅ Username validation (1-39 chars, alphanumeric + hyphens only)
- ✅ Comprehensive error handling:
  - 400: Invalid/missing username
  - 404: User not found
  - 429: GitHub rate limit exceeded
  - 503: Network errors
  - 500: Generic server errors

**Main Page (`src/pages/index.astro`):**
- Currently minimal scaffold
- Needs: username input forms, battle button, contribution grid visualization
- Should fetch from `/api/contributions/{username}` in parallel for two users
- Expected: client-side TypeScript/JavaScript in `<script>` tag or separate `.ts` files

## Astro Conventions

### File-Based Routing
- Files in `src/pages/` map to routes automatically
- `index.astro` → `/`
- `[param].ts` → dynamic route with `params.param` access
- API routes export `GET`, `POST`, etc. handlers with `APIRoute` type

### Component Structure
```astro
---
// Frontmatter: Server-side TypeScript/JavaScript
import Component from '../components/Component.astro';
const data = await fetch('...');
---

<!-- Template: HTML with component imports -->
<html>
  <Component />
</html>

<style>
  /* Scoped by default */
</style>

<script>
  // Client-side JavaScript (processed by Vite)
</script>
```

### TypeScript
- Strict mode enforced via `astro/tsconfigs/strict`
- Define interfaces for contribution data structures
- Use type imports: `import type { APIRoute } from 'astro'`

## GitHub Contribution API

**Endpoint:** `https://github.com/{username}.contribs`
- Returns SVG with contribution graph data
- Parse SVG `<rect>` elements for contribution counts
- Color palette: `#ebedf0` (0), `#9be9a8`, `#40c463`, `#30a14e`, `#216e39` (high)
- Grid: 7 rows (days of week) × 53 columns (weeks)

## Workshop Context

This is a **teaching project**. The workshop guides (`/workshop/00-06`) instruct participants to:
1. Set up context engineering (Part 1)
2. Plan API & UI architecture (Part 2) 
3. Build battle logic with agentic workflows (Part 3)
4. Apply retro arcade theming (Part 4)
5. Polish with parallel workflows (Part 5)
6. Add bonus features (Part 6)

When making changes:
- Align with workshop learning objectives (planning-first, agentic workflows, parallelism)
- Preserve the minimal starting point unless implementing specific workshop steps
- Reference workshop guides when participants ask about next steps
- Use the retro arcade theme (Press Start 2P font loaded via CDN in index.astro)

## DevContainer Setup

Configured for GitHub Codespaces:
- Node.js v22 (Debian Bookworm)
- Post-create: `npm ci`
- Port 4321 forwarded for dev server
- Recommended extensions: Astro, GitHub Copilot

## Deployment

GitHub Pages deployment via `.github/workflows/deploy.yml`:
- Copies `/docs` folder to `_site` (workshop documentation site)
- Separate from the Astro app (which requires Node.js server)
- Astro app deployment not configured in starter template
