# Smile Mart India — Website

A premium, mobile-responsive website and admin panel for Smile Mart India, built with Next.js (App Router), TypeScript and Tailwind CSS. It covers every page and admin workflow from the requirements document, with a lightweight file-based data layer so the whole thing runs locally with zero external setup.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the website, and [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin panel.

**Default admin login** (change this immediately in production — see "Security" below):

- Username: `admin`
- Password: `ChangeMe123!`

A `.env.local` with a random `SESSION_SECRET` is already included so the app runs out of the box. `.env.example` documents every variable.

## What's Real vs. Placeholder

Per the requirements doc, no business facts were invented. Everything below is a clearly-labeled placeholder, editable from **Admin → Settings** without touching code:

- Business address, phone number, email, WhatsApp number
- The legal disclaimer text (doc's example wording is pre-filled, pending legal review)
- About page company story, Vision and Mission copy
- The "Business Network" section (brochure names are seeded but the section is **hidden** until you publish it from Admin → Business Network, once those relationships are verified)
- Testimonials (none are seeded — add only genuine, approved ones)

Product/category photography wasn't supplied, so categories, business models and other tiles render as clean icon tiles instead of stock photography. Upload real images any time via each admin form's image field — they immediately replace the icon fallback.

## Architecture

```
app/
  (site)/          Public pages — home, about, products, business-opportunity, how-it-works,
                    social-media-marketing, faq, contact — sharing one layout (Header/Footer/
                    WhatsApp button/mobile sticky CTA)
  admin/
    login/          Public login page
    (dashboard)/    Everything behind auth: dashboard, leads, categories, products,
                    business-models, faqs, testimonials, business-network, settings
  api/
    leads/, events/               Public endpoints (lead capture, analytics events)
    admin/*                       Authenticated CRUD endpoints, one per entity
  sitemap.ts, robots.ts

components/
  ui/       Primitives — Button, Container, SectionHeading, Card, Badge, Field (Input/Textarea/Select), IconTile
  site/     Public-site building blocks — Header, Footer, LeadForm, WhatsAppButton, StickyCTA,
            BusinessModelCard, CategoryCard, etc. Built once, reused across every page that needs them.
  admin/    Admin-only building blocks — Sidebar, Topbar, StatCard, LeadStatusBadge, ImageUploadField

lib/
  types.ts            Shared TypeScript types for every entity
  data/                One repository module per entity (categories, products, businessModels,
                        faqs, testimonials, businessNetwork, leads, settings, admins), all built on
                        lib/data/crud.ts + lib/data/store.ts
  validation/          Zod schemas — shared by client-side checks and server-side API validation
  auth/                Session (JWT via jose, httpOnly cookie), password hashing (bcryptjs)
  api/entityRoutes.ts  Shared GET/POST/PATCH/DELETE handler factory used by every admin CRUD route
  notify.ts, analytics.ts, rateLimit.ts   Stubs described below

data/*.json   The "database" — see below
proxy.ts      Next.js 16's middleware equivalent; gates /admin and /api/admin except the login routes
```

### The data layer (and how to move off it)

Every page and API route reads/writes through `lib/data/*.ts` — nothing touches `fs` directly outside of `lib/data/store.ts`. That's the single swap point for a real database:

1. Stand up PostgreSQL (or keep SQLite) and add Prisma.
2. Reimplement the functions inside `lib/data/store.ts` (`readCollection`, `mutateCollection`, `readSingleton`, `mutateSingleton`) against Prisma instead of the filesystem.
3. Nothing in `app/`, `components/`, or the per-entity repo files needs to change — they only call those four functions plus each repo's own exported functions.

`data/leads.json` and `data/admins.json` are git-ignored (lead PII and the admin password hash shouldn't be committed); the seeded content files (categories, business models, FAQs, business network) are safe to commit as-is.

## Extending This Build (stubbed, not built)

These need real credentials/accounts this build couldn't provision. Each has a single, obvious extension point:

| Feature | Extension point | What to do |
|---|---|---|
| Admin email notifications on new leads | `lib/notify.ts` → `notifyAdminOfNewLead()` | Wire in Resend/SES/SMTP; currently logs to the console |
| CAPTCHA / stronger anti-spam | `app/api/leads/route.ts` (alongside the existing honeypot + rate limit) | Add a CAPTCHA provider's server-side verification call |
| Cloud image storage | `app/api/admin/upload/route.ts` | Currently saves to `public/uploads/`; swap the write for an S3/Cloudinary upload and return that URL instead |
| Real analytics (GA4, etc.) | `lib/analytics.ts` → `trackEvent()` | Currently appends to `data/events.log`; forward to your analytics provider instead. All the doc's named events (business_model_view, whatsapp_click, lead_form_submit, etc.) already fire from the right places — see `lib/analytics-client.ts` and the `<ViewTracker>`/`<TrackedLink>` components |
| Production deployment | — | Set real env vars (`SESSION_SECRET`, `NEXT_PUBLIC_SITE_URL`), put behind HTTPS, and change the seeded admin password immediately (see below) |

## Security Notes

- Change the seeded admin password before this goes anywhere near production — there's no self-service password change UI yet, so update the hash in `data/admins.json` (generate one with `bcryptjs`) or add one.
- `proxy.ts` blocks unauthenticated access to `/admin/*` and `/api/admin/*`; every admin API route also re-checks the session itself (`lib/auth/requireAdmin.ts`), so a future routing change can't silently drop auth on one endpoint.
- The lead form has a honeypot field plus a per-IP rate limit (`lib/rateLimit.ts`) — an in-memory stub suitable for a single-instance deployment; swap for a shared store (Redis, etc.) if you scale to multiple instances.
- Passwords are hashed with bcrypt; sessions are signed JWTs in an httpOnly, secure (in production), sameSite cookie.

## Verification Checklist

- [x] `npm run build` — production build succeeds with no type errors
- [x] `npx eslint .` — no lint errors
- [x] All public pages render and are responsive (mobile/tablet/desktop)
- [x] Lead form validates client- and server-side, persists, and appears in Admin → Leads
- [x] Admin login/logout, and every CRUD screen (categories, products, business models, FAQs, testimonials, business network, settings) create/update/delete correctly
- [x] Unauthenticated requests to `/admin/*` and `/api/admin/*` are blocked (307 redirect / 401 respectively)
- [x] WhatsApp floating button and mobile sticky CTA (Call | WhatsApp | Apply Now) use the configurable number from Settings
