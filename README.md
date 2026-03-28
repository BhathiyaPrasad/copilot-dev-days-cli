# 🎮 The Great Hall Contribution Duel

**Harry Potter Themed GitHub Contribution Battle Arena** — Built with Astro

A magical wizard duel where GitHub contribution graphs transform into spell-casting power! Watch two wizards face off in the Great Hall, their coding activities powering their magical abilities in an enchanted battle.

![The Great Hall Contribution Duel](https://github.com/user-attachments/assets/5eca79e2-cb9f-4e93-aa0d-23666ebde3b7)
*Experience the magic of GitHub contributions reimagined as wizard duels*

## ✨ Features

- **Harry Potter Theme**: Immersive Hogwarts aesthetic with magical fonts, colors, and effects
- **Spell Power Visualization**: GitHub contributions displayed as magical energy levels
- **Real-time Duels**: Compare two GitHub users' contribution graphs side-by-side
- **Enchanted Animations**: Glowing wands, sparkling effects, and spell-casting animations
- **Responsive Design**: Works beautifully on mobile and desktop devices
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🎨 Design Elements

### Typography
- **Headings**: Cinzel Decorative (magical, dramatic style)
- **Body**: IM Fell English (readable, wizarding world feel)

### Color Palette
- **Primary**: Burgundy (#740001), Gold (#D3A625)
- **Secondary**: Deep Purple (#2A0845), Midnight Blue (#0E1A40)
- **Accents**: Magical Green, Parchment textures

### Spell Power Levels (Contribution Intensity)
- Level 0: Transparent/dark (no spells cast)
- Level 1: Dim Blue (#4A5899) - Minor spell
- Level 2: Medium Purple (#8B5CF6) - Standard spell
- Level 3: Bright Gold (#D3A625) - Powerful spell
- Level 4: Vibrant Red-Gold (#FF6B35) - Maximum power!

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd copilot-dev-days-cli
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the dev server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:4321`
   - Enter two GitHub usernames (e.g., "octocat")
   - Click "Cast Duel Spell" to see the magic!

## 🏗️ How It Works

### Frontend (Harry Potter UI)
The main page (`src/pages/index.astro`) features:
- Magical wizard duel interface with parchment-style inputs
- Real-time contribution data fetching
- Animated spell power grids
- Winner declaration with sparkle effects

### Backend API
Server-side API route (`src/pages/api/contributions/[username].ts`):
- Fetches GitHub contribution data from `https://github.com/{username}.contribs`
- In-memory caching with 5-minute TTL
- Username validation and error handling
- Returns JSON with contribution data

## 📚 Workshop (Original Content)

The workshop supports two tracks — follow the one that matches your preferred workflow:

- **VS Code track** — Chat, Plan Mode, Agent Mode, background agents, and editor-native review loops
- **CLI track** — `copilot`, `@file` context, `/plan`, autonomous edits, `/fleet`, `/delegate`, and `/review`

| Part | Title | Copilot Focus |
|------|-------|---------------|
| [00](workshop/00-overview.md) | Overview | Track selection and learning goals |
| [01](workshop/01-setup.md) | Setup & Context Engineering | Instructions, permissions, and environment setup |
| [02](workshop/02-plan-and-scaffold.md) | Plan & Scaffold | Planning the API and page architecture |
| [03](workshop/03-agent-mode.md) | Build the Game | Agentic implementation and iteration |
| [04](workshop/04-design-vibes.md) | Design-First Theming | Visual design planning and implementation |
| [05](workshop/05-polish.md) | Polish & Parallel Work | Parallelism, reviews, and quality passes |
| [06](workshop/06-bonus.md) | Bonus & Extensions | Open-ended feature ideas and extra Copilot experiments |

## 🚀 Quick Start

1. **Create your own repo first** by either:
   - clicking **Use this template** to create a new repo, or
   - forking this repository.
2. Choose your workshop path:
   - **VS Code:** clone your repo and open it in VS Code.
   - **GitHub Copilot CLI:** clone your repo locally, install `copilot`, and work from your terminal.
3. Follow the [workshop guide](workshop/00-overview.md)

## Prerequisites

### Shared

- GitHub Copilot (Pro, Business, or Enterprise)
- Git
- Node.js

### VS Code track

- VS Code v1.107+
- GitHub Copilot extension signed in

### CLI track

- GitHub Copilot CLI (`copilot`)
- Node.js 22+ if you plan to install the CLI via `npm install -g @github/copilot`
- Or Homebrew / WinGet if you prefer a native package manager install

## Technology Stack

- **Framework**: [Astro](https://astro.build/) v5 (SSR mode)
- **Runtime**: Node.js with [@astrojs/node](https://docs.astro.build/en/guides/integrations-guide/node/) adapter
- **Fonts**: Google Fonts (Cinzel Decorative, IM Fell English)
- **API**: GitHub's contribution graph API
- **Theme**: Harry Potter / Wizarding World inspired design

## 🎭 Theme Customization

The Harry Potter theme can be easily customized by modifying the CSS variables in `src/pages/index.astro`:

```css
:root {
  --color-burgundy: #740001;
  --color-gold: #D3A625;
  --spell-level-0: rgba(42, 8, 69, 0.2);
  --spell-level-4: #FF6B35;
  /* ... more colors */
}
```

## 🔮 Features Implemented

✨ **Magical UI Elements**
- Starry animated background
- Glowing wand effects on hover
- Parchment-textured input fields
- Crossed wands VS badge
- Spell-casting loading animations

⚡ **Functional Features**
- Parallel API fetching for both wizards
- Real-time spell power calculation
- Winner determination with visual effects
- Error handling with magical messaging
- Enter key support for quick duels
- Mobile-responsive layout

🛡️ **Accessibility**
- Keyboard navigation
- ARIA labels for screen readers
- High contrast color ratios
- Touch-friendly button sizes

## 📝 API Endpoints

### GET `/api/contributions/[username]`

Fetches GitHub contribution data for a given username.

**Response (Success):**
```json
{
  "username": "octocat",
  "contributions": { ... },
  "cached": false
}
```

**Response (Error):**
```json
{
  "error": "User not found",
  "statusCode": 404
}
```

## 🧙‍♂️ Credits

- **Original Workshop**: Mona Mayhem by GitHub
- **Theme Design**: Harry Potter / Wizarding World inspired
- **Fonts**: Cinzel Decorative, IM Fell English (Google Fonts)
- **Built with**: Astro, TypeScript, and ✨ magic ✨

## License

MIT
