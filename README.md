# The AI Guides Website

Modern Next.js rebuild of theaiguides.co for The AI Guides advisory and executive training business.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Deployment (Vercel-ready)

1. Push this repo to GitHub.
2. In Vercel, click **New Project** and import the repo.
3. Use the default Next.js settings.
4. Add environment variables as needed (see below).

## Content editing

- Core page copy lives in `data/pages.json`.
- Navigation and footer details live in `data/site.json`.
- Blog metadata lives in `data/posts.json`.
- Blog post bodies live in `content/posts/*.md`.

## Contact form

The contact form posts to `/api/contact` and includes a honeypot + basic in-memory rate limiting. For production, swap the handler to your preferred provider (e.g. Formspree, Resend, or a custom CRM) and store secrets in environment variables.

## Analytics

Add your analytics tool by injecting the script in `app/layout.tsx`. Suggested env vars:

- `NEXT_PUBLIC_ANALYTICS_ID`
- `NEXT_PUBLIC_ANALYTICS_SCRIPT`

## Migration checklist

- [ ] Provide logo files and any brand guidelines.
- [ ] Confirm brand colours and typography choices.
- [ ] Supply preferred analytics provider + tracking ID.
- [ ] Set contact form destination (email or CRM endpoint).
- [ ] Confirm AI Readiness Survey implementation (hosted survey link or embedded tool).
- [ ] Provide blog post full content + featured images.
- [ ] Provide favicon assets.
- [ ] Review redirects and legacy URLs for SEO parity.
- [ ] Update DNS to point `theaiguides.co` to the hosting provider.

## QA checklist

- [ ] Verify all navigation links and CTA buttons.
- [ ] Run Lighthouse on mobile and desktop.
- [ ] Validate heading hierarchy and alt text.
- [ ] Test contact form validation, honeypot, and rate limiting.
- [ ] Confirm sitemap and robots.txt are generated.
- [ ] Review performance on Core Web Vitals targets.
- [ ] Verify responsive layouts on iPhone and tablet sizes.
