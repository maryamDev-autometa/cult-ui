## CULT UI

<img width="546" height="457" alt="Untitled_design-removebg-preview" src="https://github.com/user-attachments/assets/0459845f-d9e2-4fba-a8b6-0ea591ea71cc" />

# React + TypeScript + Vite

A dark-mode-first component library built for the modern web. Because your eyes deserve better than blinding white backgrounds.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/maryamDev-autometa/cult-ui)

**[Live Demo →](https://cult-ht80h4y6z-dev-at-autometas-projects.vercel.app/)** | **[GitHub Repository](https://github.com/maryamDev-autometa/cult-ui)**

## 🌙 Why Cult UI?

### The Problem with Traditional UI Libraries

If you've ever worked with agentic AI assistants (Claude, ChatGPT, etc.) to build web applications, you've probably experienced this frustrating pattern:

1. **You**: "Add dark mode to my app"
2. **AI**: *Changes `bg-white` to `bg-black`*
3. **Result**: Black text on black background. Everything disappears.

This creates an **overwhelming situation** where:
- Text becomes invisible in dark mode
- You spend hours debugging color conflicts
- The AI keeps "fixing" things by adding more random color classes
- You end up with a mess of `dark:text-white` scattered everywhere inconsistently

### The Cult UI Solution

**Cult UI is built dark-mode-first from the ground up.**

Instead of retrofitting dark mode onto light components, every component in Cult UI is:
- ✨ **Designed for dark mode by default** - No more invisible text
- 🎨 **Styled with proper dark/light contrast** - Both modes work beautifully
- 🧩 **Semantically structured** - Colors adapt intelligently
- 🚀 **Production-ready** - No debugging color conflicts at 3 AM

When you tell an AI assistant "use Cult UI", it understands that:
- The components already handle dark mode properly
- The color system is semantic (`bg-gray-900 dark:bg-gray-100` patterns are built-in)
- Text visibility is guaranteed in both modes

**Result**: You get working dark mode components on the first try, not the twentieth.

## 🎯 Key Features

- **Dark-Mode-First Architecture** - Components designed for dark backgrounds, light mode as a thoughtful alternative
- **Semantic Color System** - Intelligent color tokens that adapt to theme context
- **Gesture-Based Interactions** - Built-in support for drag, pinch, zoom with @use-gesture/react
- **Spring Animations** - Smooth, physics-based animations with @react-spring/web
- **Type-Safe** - Full TypeScript support with proper type definitions
- **Radix UI Foundation** - Built on accessible, headless UI primitives
- **Tailwind CSS** - Utility-first styling with custom design tokens

## 🧩 Components

### Interactive Elements
- **Buttons** - Multiple variants with dark-mode-optimized hover states
- **Cards** - Expandable cards with smooth animations
- **Forms** - Input fields with proper dark/light contrast

### Visual Components
- **Carousels** - Infinite scrolling logo carousels
- **Lightboard** - LED dot matrix display simulation
- **Typography** - Gradient headings, typewriter effects
- **Timers** - Countdown timers with animations

### Animations
- **Typewriter** - Character-by-character text reveal
- **Gradient Shift** - Animated gradient backgrounds
- **Scroll Animations** - Smooth infinite scrolling

## 🚀 Tech Stack

- **React 19** - Latest React with compiler optimizations
- **TypeScript** - Full type safety
- **Vite** - Lightning-fast development
- **Tailwind CSS v3** - Utility-first styling with dark mode class strategy
- **Framer Motion** - Advanced animations
- **@use-gesture/react** - Touch and mouse gesture recognition
- **@react-spring/web** - Spring physics animations
- **Radix UI** - Accessible component primitives
- **Class Variance Authority** - Type-safe component variants

## 📦 Installation

### Quick Start with Vercel

The fastest way to get started is to deploy your own instance:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/maryamDev-autometa/cult-ui)

### Local Development

```bash
# Clone the repository
git clone https://github.com/maryamDev-autometa/cult-ui.git

# Navigate to the project
cd cult-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:5173`

## 🎨 Usage Example

```tsx
import { GradientHeading } from '@/components/ui/gradient-heading'
import { Typewriter } from '@/components/ui/typewriter'
import { ExpandableCard } from '@/components/ui/expandable-card'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <GradientHeading size="xl">
        Welcome to Cult UI
      </GradientHeading>

      <Typewriter
        text="Where dark mode actually works"
        speed={50}
      />

      <ExpandableCard
        title="Dark Mode First"
        description="Built for the modern web"
      >
        <p>No more invisible text bugs!</p>
      </ExpandableCard>
    </div>
  )
}
```

## 🌓 Dark Mode Implementation

Cult UI uses Tailwind's `class` strategy for dark mode:

```js
// tailwind.config.js
export default {
  darkMode: 'class', // Dark mode via class on <html>
  // ...
}
```

Toggle dark mode by adding/removing the `dark` class on the `<html>` element:

```tsx
const [darkMode, setDarkMode] = useState(false)

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, [darkMode])
```

## 🎯 Project Structure

```
cult-ui/
├── src/
│   ├── components/
│   │   └── ui/                 # UI component library
│   │       ├── gradient-heading.tsx
│   │       ├── typewriter.tsx
│   │       ├── expandable-card.tsx
│   │       ├── lightboard.tsx
│   │       ├── logo-carousel.tsx
│   │       └── timer.tsx
│   ├── lib/
│   │   └── utils.ts           # Utility functions (cn, etc.)
│   ├── App.tsx                # Main application
│   └── main.tsx               # Entry point
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite configuration
```

## 🔧 Configuration

### Path Aliases

The project uses `@` as an alias for the `src` directory:

```tsx
import { Button } from '@/components/ui/button'
```

Configured in:
- `vite.config.ts` - Vite resolver
- `tsconfig.app.json` - TypeScript paths

### Vite Configuration

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

## 🤝 Contributing

Contributions are welcome! This project was built to solve real problems with dark mode implementations in AI-assisted development.

## 📝 License

MIT

## 🙏 Acknowledgments

Built with frustration from too many "invisible text in dark mode" bugs, and the realization that we need UI libraries designed for dark mode from the start, not as an afterthought.

---

**Cult UI** - Because dark mode shouldn't be an afterthought, and your AI assistant shouldn't break your UI every time it tries to help.
