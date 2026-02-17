# Andus Labs Website

Next.js + Sanity CMS rebuild of [anduslabs.com](https://anduslabs.com).

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Framer Motion** for animations
- **Sanity v3** (embedded studio at `/studio`)

## Prerequisites

- Node.js 20+
- A [Sanity.io](https://sanity.io) account

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Sanity project

Go to [sanity.io/manage](https://www.sanity.io/manage) and create a new project, or run:

```bash
npx sanity@latest init
```

Note your **Project ID** and create an API token with **Editor** permissions.

### 3. Configure environment

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-17
SANITY_API_TOKEN=your-write-token
```

### 4. Seed initial data

Upload team members, field notes, and site settings to Sanity:

```bash
npx tsx scripts/seed.ts
```

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3000/studio](http://localhost:3000/studio) for the CMS.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx tsx scripts/seed.ts` | Seed Sanity with initial data |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/human-os` | The Human OS for AI |
| `/approach` | Approach (maturity model, offerings) |
| `/team` | Team (CMS-driven) |
| `/field-notes` | Field Notes (CMS-driven) |
| `/contact` | Contact form |
| `/studio` | Sanity Studio (CMS admin) |

## CMS Content Types

- **Site Settings** (singleton) -- nav links, footer text, social links, contact email
- **Team Members** -- name, role, headshot, bio, LinkedIn, sort order
- **Field Notes** -- type, title, description, cover image, URL/PDF, featured flag

## Deployment (Vercel)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Sanity dataset (usually `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Yes | Sanity API version date |
| `SANITY_API_TOKEN` | For seed only | Sanity write token |
