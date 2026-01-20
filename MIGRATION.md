# Migration Guide: WordPress to Next.js

This document outlines the steps required to migrate theaiguides.co from GoDaddy/WordPress to the new Next.js static site.

## Pre-Launch Checklist

### 1. DNS & Domain Setup

- [ ] Export current DNS records from GoDaddy
- [ ] Set up Vercel project and link domain
- [ ] Configure DNS records:
  - A record: Point to Vercel's IP (76.76.21.21)
  - CNAME for www: Point to cname.vercel-dns.com
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up www to non-www redirect (or vice versa)

### 2. Environment Variables

Configure these in Vercel dashboard:

```
# Required
NEXT_PUBLIC_SITE_URL=https://theaiguides.co

# Analytics (when ready)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact Form (choose one)
FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxx
# OR
CONTACT_EMAIL=contact@theaiguides.co
```

### 3. Contact Form Setup

Choose one of these options:

**Option A: Formspree (Recommended for simplicity)**
1. Create account at formspree.io
2. Create new form
3. Update contact page with form endpoint
4. Test form submission

**Option B: Netlify Forms**
If deploying to Netlify instead of Vercel:
1. Add `data-netlify="true"` to form
2. Deploy and test

**Option C: Custom API Route**
1. Create `/api/contact` endpoint
2. Configure email service (SendGrid, Resend, etc.)
3. Update form action

### 4. Image Optimization

Current images need to be downloaded and optimised:

**From WordPress:**
- Logo: `/wp-content/uploads/2025/11/the-ai-guides-logo-transparent-e1762259254685.webp`
- Hero: `/wp-content/uploads/2025/11/2205342232.jpg`
- Training: `/wp-content/uploads/2025/11/2220841315-2-1024x683.jpg`
- Resource images: Various in `/wp-content/uploads/2025/11/`
- Founder photos: `/wp-content/uploads/2025/11/1140498657-1.jpg`

**Actions:**
- [ ] Download all images from WordPress
- [ ] Optimise with squoosh.app or similar
- [ ] Convert to WebP format
- [ ] Place in `/public/images/`
- [ ] Update image references in code

### 5. Analytics Setup

- [ ] Create Google Analytics 4 property
- [ ] Add GA tracking ID to environment variables
- [ ] Consider adding:
  - Google Search Console
  - Microsoft Clarity (for heatmaps)
  - Plausible (privacy-friendly alternative)

### 6. AI Readiness Survey Integration

Options for the survey:
1. **Typeform**: Embed Typeform survey
2. **Google Forms**: Embed Google Form
3. **Tally**: Free form builder with embedding
4. **Custom**: Build survey with React state

Update `/src/app/ai-readiness-survey/page.tsx` with chosen solution.

---

## URL Mapping (301 Redirects)

All redirects are configured in `next.config.ts`. Current mappings:

| Old URL | New URL | Status |
|---------|---------|--------|
| `/home/` | `/` | 301 |
| `/posts/` | `/resources/` | 301 |
| `/blog/` | `/resources/` | 301 |
| `/category/*` | `/resources/` | 301 |
| `/tag/*` | `/resources/` | 301 |
| `/author/*` | `/about/` | 301 |

**Preserved URLs (no change needed):**
- `/services/` → `/services/`
- `/executive-training/` → `/executive-training/`
- `/ai-readiness-survey/` → `/ai-readiness-survey/`
- `/about/` → `/about/`
- `/contact/` → `/contact/`
- `/resources/` → `/resources/`
- Blog posts: `/{slug}/` → `/{slug}/`

---

## Content Inventory

### Pages (6 total)
1. Homepage (`/`)
2. Services (`/services/`)
3. Executive Training (`/executive-training/`)
4. AI Readiness Survey (`/ai-readiness-survey/`)
5. About (`/about/`)
6. Contact (`/contact/`)
7. Resources/Blog Index (`/resources/`)

### Blog Posts (7 total)
All dated November 2025:

1. `microsoft-copilot-features` - Four Microsoft Copilot Features Australian SMEs Should Actually Be Using
2. `news-in-ai-oct2025` - News in AI (for Australian SMEs)
3. `ai-skills-gap-australia-2025` - The AI Skills Gap Is Real—And It's Getting Worse
4. `10-quick-wins-genai-services-finance-ops` - 10 Quick Wins with GenAI
5. `building-ai-skills-across-teams` - Building AI Skills Across Teams
6. `ai-strategy-essentials-for-smes` - AI Strategy Essentials for SMEs
7. `executive-guide-to-ai-governance-sme-edition` - Executive Guide to AI Governance

---

## Launch Day Checklist

### Morning of Launch

- [ ] Final build test: `npm run build`
- [ ] Deploy to Vercel: `git push` or Vercel CLI
- [ ] Verify all pages load correctly
- [ ] Test all internal links
- [ ] Test contact form
- [ ] Verify images load

### DNS Cutover

- [ ] Update DNS records
- [ ] Wait for propagation (5-60 minutes typically)
- [ ] Verify site loads on domain
- [ ] Check HTTPS certificate

### Post-Launch Verification

- [ ] Test all redirects from old URLs
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Google Analytics tracking
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals

### Within First Week

- [ ] Monitor Search Console for crawl errors
- [ ] Check for 404 errors in analytics
- [ ] Verify form submissions are received
- [ ] Monitor site performance

---

## Rollback Plan

If issues arise after launch:

1. **Quick Rollback**: Repoint DNS back to GoDaddy
2. **Partial Rollback**: Keep new site but redirect problematic URLs
3. **Fix Forward**: Address issues on new site while monitoring

Keep WordPress site active for at least 2 weeks post-launch as backup.

---

## Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| LCP | < 2.5s | Lighthouse |
| FID | < 100ms | Lighthouse |
| CLS | < 0.1 | Lighthouse |
| Performance Score | > 90 | Lighthouse |
| Accessibility Score | > 90 | Lighthouse |
| SEO Score | > 95 | Lighthouse |

---

## Support & Maintenance

### Adding New Blog Posts

1. Create new `.mdx` file in `/content/guides/`
2. Add frontmatter (title, date, excerpt, author, categories, tags)
3. Write content in Markdown
4. Commit and push
5. Vercel auto-deploys

### Updating Pages

1. Edit page files in `/src/app/[page-name]/page.tsx`
2. Commit and push
3. Vercel auto-deploys

### Common Issues

**Build fails:**
- Check TypeScript errors: `npm run type-check`
- Check lint errors: `npm run lint`

**Images not loading:**
- Verify image path in `/public/images/`
- Check file extension matches reference

**Form not working:**
- Verify form endpoint environment variable
- Check browser console for errors
