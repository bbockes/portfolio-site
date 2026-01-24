# Portfolio Site

Personal portfolio website for Brendan Bockes, built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Hosting**: Netlify

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

This site is configured to deploy automatically to Netlify:

- **Main domain**: brendanbockes.com
- **Blog subdomain**: blog.brendanbockes.com

### Netlify Setup

1. Connect this repository to Netlify
2. Set custom domain to `brendanbockes.com`
3. Enable automatic HTTPS
4. Build command: `npm run build`
5. Publish directory: `dist`

## Features

- ✨ Dark mode support with persistent user preference
- 📱 Fully responsive design
- ⚡ Fast page loads with Vite
- 🎨 Shared design system with blog site
- 🔒 Security headers configured

## Project Structure

```
portfolio-site/
├── src/
│   ├── components/        # React components
│   │   ├── Layout.tsx
│   │   ├── Hero.tsx
│   │   ├── WorkSection.tsx
│   │   ├── WorkCard.tsx
│   │   ├── AboutSection.tsx
│   │   └── ContactSection.tsx
│   ├── shared/           # Shared components
│   │   └── DarkModeToggle.tsx
│   ├── contexts/         # React contexts
│   │   └── ThemeContext.tsx
│   ├── App.tsx           # Main app component
│   ├── index.tsx         # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML template
├── netlify.toml          # Netlify configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## Design System

This site uses the same design patterns as the blog:
- **Font**: Avenir Next
- **Colors**: Tailwind's default palette with custom dark mode
- **Components**: Shared theme context and dark mode toggle

## License

© 2024 Brendan Bockes. All rights reserved.
