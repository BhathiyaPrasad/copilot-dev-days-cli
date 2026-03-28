# Copilot Instructions for Mona Mayhem

## Project Overview

This is an **Astro SSR Harry Potter themed project** that transforms GitHub contribution graphs into magical wizard duels. Originally a workshop template for learning GitHub Copilot, it now features a complete "Great Hall Contribution Duel" experience where users battle with spell-casting power derived from their GitHub activity.

**Tech Stack:**
- Framework: Astro v5.14.4 (server-side rendered)
- Runtime: Node.js with `@astrojs/node` adapter in standalone mode
- Language: TypeScript (strict mode)
- Module System: ESM
- Theme: Harry Potter / Wizarding World aesthetic

## Build & Dev Commands

```bash
npm run dev       # Start dev server on http://localhost:4321
npm run build     # Production build
npm run preview   # Preview production build
```

**No test or lint commands exist** — this is a themed showcase project.

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
│   ├── index.astro                   # Harry Potter themed battle UI
│   └── api/contributions/
│       └── [username].ts             # GitHub API proxy (complete)
```

### Key Implementation

**Main Page (`src/pages/index.astro`):**
- Complete Harry Potter themed UI with Great Hall aesthetic
- Features: Wizard duel layout, parchment inputs, spell power grids
- Fonts: Cinzel Decorative (headings), IM Fell English (body)
- Colors: Burgundy/gold primary, purple/blue secondary, spell power gradients
- Animations: Glowing wands, starry background, spell-casting effects
- JavaScript: API integration, parallel fetching, winner logic, grid rendering
- Responsive: Mobile-first with 768px breakpoint
- Accessible: ARIA labels, keyboard navigation, screen reader support

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

## Harry Potter Theme Details

### Design System

**Fonts (via Google Fonts):**
- `Cinzel Decorative` - Magical, dramatic headings
- `IM Fell English` - Readable body text with wizarding world feel
- Fallback: serif fonts

**Color Palette:**
```css
--color-burgundy: #740001
--color-gold: #D3A625
--color-dark-purple: #2A0845
--color-midnight-blue: #0E1A40
--color-parchment: #F4E8C1
```

**Spell Power Colors (contribution levels 0-4):**
- Level 0: `rgba(42, 8, 69, 0.2)` - No activity
- Level 1: `#4A5899` - Minor spell
- Level 2: `#8B5CF6` - Standard spell
- Level 3: `#D3A625` - Powerful spell
- Level 4: `#FF6B35` - Maximum power

### UI Components

**Layout:** Three-column grid (wizard | VS | wizard) on desktop, stacked on mobile (≤768px)
**Title:** "The Great Hall Contribution Duel" with lightning bolt accents (⚡)
**Inputs:** Parchment-textured with curled edges effect
**Button:** "Cast Duel Spell" with sparkle emojis (✨), glowing burgundy gradient
**Winner Badge:** "Most Powerful Wizard" 🏆 with sparkle animations

### Animations
- Starry background with twinkling
- Glowing wand hover effects
- Spell-casting loading spinner (⚡)
- Winner card pulsing animation
- Grid cell scale on hover

## GitHub Contribution API

**Endpoint:** `https://github.com/{username}.contribs`
- Returns SVG with contribution graph data
- Parse SVG `<rect>` elements for contribution counts
- Color palette: `#ebedf0` (0), `#9be9a8`, `#40c463`, `#30a14e`, `#216e39` (high)
- Grid: 7 rows (days of week) × 53 columns (weeks)

## Workshop Context

This project was originally a **teaching workshop** but now features a complete Harry Potter themed implementation. The workshop guides (`/workshop/00-06`) show the original learning path for building with GitHub Copilot.

**Current State:**
- ✅ Complete Harry Potter themed UI (`src/pages/index.astro`)
- ✅ Fully functional GitHub API proxy (`src/pages/api/contributions/[username].ts`)
- ✅ Wizard duel interface with spell power visualization
- ✅ Mobile responsive design with accessibility features

When making changes:
- Maintain the Harry Potter theme aesthetic (fonts, colors, magical language)
- Keep the spell power visualization for contribution grids
- Preserve magical terminology (wizards, spells, Great Hall, etc.)
- Ensure accessibility features remain intact

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
