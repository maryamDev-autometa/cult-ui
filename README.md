
<img width="546" height="457" alt="Untitled_design-removebg-preview" src="https://github.com/user-attachments/assets/0459845f-d9e2-4fba-a8b6-0ea591ea71cc" />

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

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

## 🤝 Contributing

Contributions are welcome! This project was built to solve real problems with dark mode implementations in AI-assisted development.

## 📝 License

MIT

## 🙏 Acknowledgments

Built with frustration from too many "invisible text in dark mode" bugs, and the realization that we need UI libraries designed for dark mode from the start, not as an afterthought.

---

**Cult UI** - Because dark mode shouldn't be an afterthought, and your AI assistant shouldn't break your UI every time it tries to help.
