# Bounties

> The economic layer for open source.

A minimal platform for discovering paid contribution opportunities in open source. Built by [Lucci Labs](https://luccilabs.xyz).

**[Live Site →](https://bounties.luccilabs.xyz)**

---

## Overview

Bounties helps developers discover contribution opportunities through:

- **Smart Filtering** – By language, issue type, industry, and bounty status
- **Real-time Search** – Instant filtering across thousands of issues
- **Good First Issues** – Curated entry points for newcomers
- **BountyPay Integration** – Find paid contribution opportunities (coming soon)

---

## Architecture

```
/src
  /app
    /api
      /get-issues       # Fetches issues from KV or local JSON
      /get-last-update  # Returns last sync timestamp
      /cron             # Updates issues from GitHub API
    page.tsx            # Main quest browser
    layout.tsx          # Navigation and theme provider
  /components
    /quests             # Quest cards, filters, search
    /ui                 # shadcn/ui components
  /types
    quest.ts            # Issue → Quest type mapping
  /lib
    fetch-issues.ts     # GitHub API integration
/public
  issues.json           # Fallback data for local dev
```

**Data Flow:**
1. Cron job fetches issues from GitHub API (configured repos in `fetch-issues.ts`)
2. Stores in Vercel KV for production
3. Client fetches via `/api/get-issues`
4. Filters and sorts client-side for instant UX

---

## Local Development

```bash
pnpm install
pnpm dev
```

No environment variables required. The app automatically uses `public/issues.json` when KV is not configured.

### Optional Configuration

Create `.env.local`:

```bash
# Force local file mode (even if KV vars present)
USE_LOCAL_DATA=true

# Increase GitHub API rate limits (optional)
GITHUB_TOKEN=your_github_token
```

---

## Contributing

### Adding Repositories

Edit `src/lib/fetch-issues.ts`:

```typescript
const REPOS = [
  { 
    owner: "organization", 
    repo: "repository", 
    label: "good first issue", 
    tags: ["language", "category", "ecosystem"] 
  },
  // Add your repo here
];
```

Tags map to:
- **Languages** – javascript, python, rust, go, etc.
- **Industries** – blockchain, frontend, backend, security, etc.
- **Types** – Inferred from issue labels

### Updating Issues Locally

```bash
pnpm run update-issues
```

This fetches fresh issues from GitHub and saves to `public/issues.json`.

### Project Structure Changes

- **Filters** – Edit `src/app/page.tsx` (issue types, languages, industries)
- **Quest Cards** – Edit `src/components/quests/QuestCard.tsx`
- **Type Mappings** – Edit `src/types/quest.ts` (add fields to Quest interface)
- **Styling** – Tailwind classes throughout, config in `tailwind.config.ts`

---

## Deployment

### Vercel (Production)

1. Import repository on [Vercel](https://vercel.com)
2. Connect a Vercel KV store for issue caching
3. Add environment variables:
   - `CRON_SECRET` – Secures the cron endpoint
   - `GITHUB_TOKEN` – (Optional) Increases API rate limits
4. KV variables are added automatically by Vercel

The cron job (`vercel.json`) updates issues automatically.

---

## Tech Stack

- **Next.js 15** – App router, server components
- **Vercel KV** – Redis-based issue cache
- **shadcn/ui** – Component library
- **Tailwind CSS** – Styling
- **TypeScript** – Type safety

---

## License

MIT

---

By [Lucci Labs](https://luccilabs.xyz) | [Discord](https://discord.gg/MWxWzRVSx) | [X](https://x.com/LucciLabs)
