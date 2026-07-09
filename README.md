# Aureth Tyrian

Marketing site and admin panel for **Aureth Tyrian**, a premium web design and software studio. "Crafted like gold. Guarded like a secret."

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Prisma + SQLite. No heavy UI libraries — every interactive element is hand-built.

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4 (design tokens in [src/app/globals.css](src/app/globals.css))
- **Database:** SQLite via Prisma ([prisma/schema.prisma](prisma/schema.prisma))
- **Auth:** Single admin account, bcrypt-hashed password, signed JWT session cookie (no third-party auth service)
- **Validation:** Zod on every form and API route
- **Fonts:** Fraunces (display) + Inter (body) via `next/font`

## Getting started

```bash
npm install
npx prisma migrate dev    # creates dev.db and applies the schema
npm run db:seed           # fills the database with starter content
npm run dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the admin panel.

**Default admin login** (seeded into `.env` — change before deploying, see below):

- Email: `admin@aurethtyrian.com`
- Password: `AurethTyrian2026!`

## Project structure

```
prisma/
  schema.prisma        # Project, Service, Testimonial, PricingPackage, ContactSubmission, SiteSettings
  seed.ts               # Starter content: 6 services, 3 projects, 3 testimonials, pricing, legal pages
src/
  app/
    (site)/             # Public pages — share the header/footer layout
      page.tsx           # Homepage
      services/, work/, about/, pricing/, contact/, privacy/, terms/
    admin/
      login/             # Public login screen (outside auth)
      (protected)/        # Everything behind the session check: dashboard, CRUD screens
    api/
      contact/            # Public contact form submission
      admin/               # All admin CRUD + auth endpoints (session-protected)
    sitemap.ts, robots.ts
    not-found.tsx         # Branded 404
  components/
    layout/, ui/, home/, work/, pricing/, contact/, admin/
  lib/
    prisma.ts             # Prisma client singleton
    session.ts             # Edge-safe JWT session verification (used by middleware)
    password.ts             # bcrypt hashing (Node-only, never imported by middleware)
    require-admin.ts         # Server-side session check for API routes/pages
    rate-limit.ts              # In-memory rate limiter for the login route
    email.ts                    # Pluggable contact-form email forwarding
    validation/                  # Zod schemas (contact form + every admin form)
  middleware.ts            # Protects /admin/* pages and /api/admin/* routes server-side
```

## Content model

Everything editable from the admin panel lives in the database, not hardcoded in components:

| Model | Public page(s) | Admin screen |
|---|---|---|
| `Project` + `ProjectImage` | `/work`, `/work/[slug]`, homepage | Projects |
| `Service` | `/services`, `/services/[slug]`, homepage | Services |
| `Testimonial` | Homepage | Testimonials |
| `PricingPackage` | `/pricing` | Pricing |
| `ContactSubmission` | — (received via `/contact`) | Submissions |
| `SiteSettings` | Footer, header announcement, `/privacy`, `/terms` | Settings |

Structured fields (a service's included-list, process steps, and FAQ; a project's tags; a pricing package's features) are stored as JSON strings in SQLite and parsed via helpers in [src/lib/content-types.ts](src/lib/content-types.ts).

## Changing the admin password

Never edit `ADMIN_PASSWORD_HASH` in `.env` by hand with a plaintext password. Generate a proper bcrypt hash:

```bash
npm run hash-password -- "your-new-password"
```

Copy the printed `ADMIN_PASSWORD_HASH="..."` line into `.env` exactly as shown, including the surrounding quotes and escaped `\$` characters. **This escaping matters**: bcrypt hashes look like `$2b$12$...`, and Next.js's env loader treats unescaped `$word` sequences as variable interpolation, silently corrupting the hash and breaking login with no clear error. The script escapes this for you automatically — don't hand-edit a hash without doing the same.

Also change `ADMIN_EMAIL` and generate a fresh `SESSION_SECRET` (any long random string — `openssl rand -base64 32` works) before deploying.

## Contact form email forwarding

Contact form submissions **always** save to the database and appear in Admin → Submissions, regardless of email configuration. Email forwarding on top of that is optional and pluggable — pick one in `.env`:

```bash
# Option A — Web3Forms (get a free access key at web3forms.com)
EMAIL_PROVIDER=web3forms
WEB3FORMS_ACCESS_KEY=your-access-key

# Option B — Resend (resend.com)
EMAIL_PROVIDER=resend
RESEND_API_KEY=your-api-key
RESEND_FROM_EMAIL=notifications@yourdomain.com   # must be a verified sender
```

Leave `EMAIL_PROVIDER` unset to skip forwarding entirely. See [src/lib/email.ts](src/lib/email.ts) for the implementation — it's a plain `fetch` call to each provider's REST API, no SDK dependency.

## Deploying to Vercel

```bash
npm i -g vercel   # if you don't have it
vercel
```

Set these environment variables in the Vercel project dashboard (Settings → Environment Variables) — `.env` is gitignored and never deployed:

- `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`
- Optionally `EMAIL_PROVIDER` + its matching key(s)

### Two things that need attention before going live on Vercel

**1. The database.** This project uses a local SQLite file (`prisma/dev.db`) for development. Vercel's serverless functions have an ephemeral, read-only filesystem — a SQLite file won't persist writes in production (every deploy or cold start resets it). Before deploying:

- Switch `DATABASE_URL` to a hosted database. The least-friction options that stay SQLite-compatible:
  - [Turso](https://turso.tech) (libSQL — same SQL dialect, minimal schema changes)
  - Or move to Postgres (change `provider = "sqlite"` to `"postgresql"` in `prisma/schema.prisma`, update `DATABASE_URL`, re-run `npx prisma migrate dev`)
- Run `npx prisma migrate deploy` against the production database once, then `npm run db:seed` if you want the starter content there too.

**2. Uploaded images.** Admin-uploaded project images are written to `/public/uploads` on the local filesystem (see [src/app/api/admin/upload/route.ts](src/app/api/admin/upload/route.ts)). This works for local development and traditional Node hosting. On Vercel, the workflow is:

- Run the admin panel locally, upload your images — they land in `public/uploads/`.
- Commit those files (the folder isn't gitignored) and push. Vercel serves them fine as static files from the build.
- Uploading *after* the site is live on Vercel won't work, since the runtime can't write to disk there. For a fully dynamic production setup, swap the upload route for a cloud storage provider (Vercel Blob, S3, Cloudinary) — the validation logic (type/size checks, server-generated filenames) carries over directly.

## Quality checklist already covered

- **SEO:** unique title/description per page (editable per project/service from the admin), Open Graph tags, `sitemap.xml`, `robots.txt`, one `<h1>` per page, semantic landmarks
- **Accessibility:** WCAG AA contrast verified on every text/background color pairing in the design system, visible focus rings, keyboard-navigable (native `<details>`/`<summary>` for FAQs, no custom widgets that trap focus), alt-text fields on every admin image upload
- **Security:** all `/admin` pages and `/api/admin/*` routes protected server-side via middleware (not just hidden UI) plus a second session check in each route; Zod validation on every form and API route; Prisma for all queries (no raw SQL); uploaded files validated by MIME type and size with server-generated filenames; security headers (CSP, X-Frame-Options, HSTS, etc.) in `next.config.ts`; no secrets imported into client-side code
- **Performance:** `next/image` throughout, no client-side data waterfalls on public pages (server components fetch directly), restrained motion respecting `prefers-reduced-motion`

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run db:seed` | Re-run the seed script (safe to run repeatedly — upserts by slug) |
| `npm run db:reset` | Drop and recreate the database, then reseed |
| `npm run hash-password -- "..."` | Generate a bcrypt hash for a new admin password |
| `npm run lint` | ESLint |
