# HS Code Finder

AI-powered Harmonized System tariff code classifier. Paste a product description, get ranked HS codes with confidence scores.

**Stack:** Next.js 14 · TypeScript · TailwindCSS · OpenAI GPT-4o-mini · Vercel Edge Runtime

---

## Folder Structure

```
hs-code-finder/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── classify/
│   │   │       └── route.ts        # Edge API — calls OpenAI, returns HS codes
│   │   ├── globals.css             # Tailwind base + font imports
│   │   ├── layout.tsx              # Root layout + SEO metadata
│   │   └── page.tsx                # Main page (client component)
│   ├── components/
│   │   ├── ConfidenceBar.tsx       # Animated confidence meter
│   │   ├── HSCard.tsx              # Individual result card
│   │   └── SearchForm.tsx          # Input + example pills
│   └── lib/
│       ├── classify.ts             # OpenAI prompt + response parsing
│       └── types.ts                # Shared TypeScript interfaces
├── public/
│   └── robots.txt
├── .env.local.example
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

---

## Local Setup

### 1. Clone / create the project

```bash
cd hs-code-finder
npm install
```

### 2. Set your OpenAI API key

```bash
cp .env.local.example .env.local
# Edit .env.local and paste your key:
# OPENAI_API_KEY=sk-...
```

Get a key at https://platform.openai.com/api-keys

### 3. Run locally

```bash
npm run dev
# → http://localhost:3000
```

---

## Deploy to Vercel

### Option A — Vercel CLI (fastest)

```bash
npm i -g vercel
vercel
# Follow prompts: link project, select defaults
```

Then add your env var:

```bash
vercel env add OPENAI_API_KEY
# Paste your key when prompted
# Select: Production, Preview, Development

vercel --prod
```

### Option B — Vercel Dashboard

1. Push this repo to GitHub
2. Go to https://vercel.com/new → Import repo
3. Settings → Environment Variables → add `OPENAI_API_KEY`
4. Click Deploy

---

## Cost estimate

- GPT-4o-mini: ~$0.00015 per query (input) + ~$0.0006 (output)
- **~$0.001 per search** → 1,000 searches ≈ $1
- Vercel hobby tier: free for this traffic level

---

## What to build next

- [ ] Rate limiting (Upstash Redis, 1 line with `@upstash/ratelimit`)
- [ ] Caching repeated queries (Redis or Vercel KV)
- [ ] Copy-to-clipboard on code click
- [ ] CSV batch upload
- [ ] Stripe per-query credits (add when traffic exists)
- [ ] `/api/classify` as public JSON API (monetize via RapidAPI)
