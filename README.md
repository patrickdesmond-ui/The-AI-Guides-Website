# The AI Guides Website

Modern, high-performance website for The AI Guides - empowering Australian SMEs with trusted AI strategy, training, and resources.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Content**: MDX files
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
# Production build
npm run build

# Start production server
npm start
```

## Project Structure

```
├── content/
│   └── guides/          # Blog posts as MDX files
├── public/
│   └── images/          # Static images
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── [slug]/      # Dynamic blog post pages
│   │   ├── about/
│   │   ├── ai-readiness-survey/
│   │   ├── contact/
│   │   ├── executive-training/
│   │   ├── resources/   # Blog index
│   │   ├── services/
│   │   ├── layout.tsx   # Root layout
│   │   ├── page.tsx     # Homepage
│   │   ├── robots.ts    # robots.txt generation
│   │   └── sitemap.ts   # sitemap.xml generation
│   ├── components/
│   │   ├── blog/        # Blog-specific components
│   │   ├── layout/      # Header, Footer
│   │   ├── sections/    # Page section components
│   │   └── ui/          # Reusable UI components
│   ├── lib/
│   │   ├── blog.ts      # Blog data fetching
│   │   └── utils.ts     # Utility functions
│   └── types/           # TypeScript types
├── MIGRATION.md         # Migration guide
├── next.config.ts       # Next.js configuration
└── tailwind.config.ts   # Tailwind configuration
```

## Adding Content

### Adding a New Blog Post

1. Create a new `.mdx` file in `/content/guides/`:

```mdx
---
title: "Your Post Title"
date: "2025-01-20"
excerpt: "A brief description of the post"
author: "Patrick D."
categories: ["AI Strategy", "Training"]
tags: ["SME", "Australia"]
---

Your content here in Markdown...
```

2. The post will automatically appear at `/{slug}` and on the resources page.

### Editing Pages

Pages are located in `/src/app/[page-name]/page.tsx`. Edit the content directly in the React component.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

## Configuration

### Environment Variables

Create a `.env.local` file for local development:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production (set in Vercel dashboard):

```
NEXT_PUBLIC_SITE_URL=https://theaiguides.co
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics (optional)
```

### Redirects

URL redirects are configured in `next.config.ts`. Add new redirects to the `redirects()` function.

## Design System

### Colours

| Name | Value | Usage |
|------|-------|-------|
| Primary | `#0066CC` | Buttons, links, accents |
| Primary Dark | `#004C99` | Hover states |
| Primary Light | `#3385D6` | Backgrounds |
| Text Primary | `#1A1A2E` | Headings |
| Text Secondary | `#4A4A68` | Body text |
| Background | `#FFFFFF` | Page background |
| Background Secondary | `#F7F9FC` | Section backgrounds |

### Typography

- **Headings**: System font stack (Inter-like)
- **Body**: 16-18px, 1.6 line height
- **H1**: clamp(2.25rem, 5vw, 3.5rem)
- **H2**: clamp(1.75rem, 4vw, 2.5rem)
- **H3**: clamp(1.25rem, 3vw, 1.5rem)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Configure environment variables
4. Deploy

### Manual Deploy

```bash
npm run build
# Upload .next folder to your hosting
```

## Migration

See [MIGRATION.md](./MIGRATION.md) for detailed migration instructions from the WordPress site.

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Accessibility

This site targets WCAG 2.2 AA compliance:

- Semantic HTML structure
- Proper heading hierarchy
- Sufficient colour contrast (4.5:1 minimum)
- Keyboard navigation support
- Focus indicators
- Alt text for images

## Performance

Target Core Web Vitals:

- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

## Licence

Private - The AI Guides Pty Ltd
