# ✨ **Crypto & Web3 Good First Issues**

> "The best way to learn is by **building together**." — every open-source maintainer ever

Welcome to the one-stop hub that connects **curious newcomers** with **beginner-friendly issues** from the most exciting projects in Crypto, Web3, Blockchain and DeFi.

Our mission is simple:

**🔓 Break down barriers → 🛠️ empower first-time contributors → 🌍 grow the decentralized ecosystem.**

[🌐 **Live Site**](https://good-first-issues-three.vercel.app/)

---

## 🤔 Why this matters

The blockchain space thrives on **open collaboration**. Yet, newcomers often struggle to find a welcoming starting point. By surfacing "good first issues" from dozens of repositories, this project:

1. **Democratises opportunity** — anyone can contribute, regardless of experience or background.
2. **Accelerates learning** — tackling real issues beats any tutorial or course.
3. **Strengthens projects** — maintainers receive fresh perspectives & energy.
4. **Builds community** — contributions create bonds that last well beyond a single pull-request.

> Small PRs today → Massive protocol upgrades tomorrow.

---

## 🌐 What you'll find here

🎯 **Curated Issue Feed**  – A living list of open GitHub issues labelled "good first issue", filtered exclusively for blockchain-related repositories.

🔍 **Smart Filters** – Search by tags (smart-contracts, cryptography, docs…)

💫 **Zero Barrier** – No login, no sign-up. Just pick an issue & start hacking.

---

## 🫂 Who is this for?

| Profile | How we help |
|---------|-------------|
| **Students & Learners** | Get real-world blockchain experience for your résumé. |
| **Bootcamp Grads** | Transition from tutorials to production code. |
| **Experienced Devs new to Web3** | Apply your skills to decentralised tech without the steep ramp-up. |
| **Protocol Maintainers** | Attract fresh contributors & visibility for your project. |

---

## 🤝 Join the Movement

1. **Contribute** – Found an issue that fits? Open a PR to add the repo or improve the UI.
2. **Share** – Tweet your first PR & tag `#goodfirstweb3`, inspire others!
3. **Sponsor** – Your brand can power the next wave of blockchain builders.

> Every contribution – no matter how small – pushes the decentralised future forward.

---

## 🏁 Quick Start (devs at heart)

### Local Development (No Secrets Required!)

Anyone can contribute without needing access to production secrets. The app automatically uses local data when Vercel KV is not configured:

```bash
pnpm install        # grab dependencies
pnpm dev            # local server on http://localhost:3000
```

**That's it!** The app will automatically use the pre-populated data in `public/issues.json` and `public/last-update.json` when no KV credentials are found.

### Optional: Environment Configuration

If you want to customize your local setup, copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` to configure:
- `USE_LOCAL_DATA=true` — Force local file mode (even if KV vars are present)
- `GITHUB_TOKEN` — (Optional) Increase GitHub API rate limits from 60 to 5,000 requests/hour

### How It Works

The app intelligently falls back to local data:

1. **When KV is configured** (production): Reads issues from Vercel KV store
2. **When KV is NOT configured** (local dev): Reads issues from `public/issues.json`
3. **On KV error**: Automatically falls back to local files

This means contributors can:
- Run the app locally without any secrets ✅
- Test UI changes and filters ✅
- Add new features without production access ✅

### Updating the Issue List (Optional)

To fetch fresh issues from GitHub (requires no secrets, but rate-limited):

```bash
pnpm run update-issues
```

## 🚀 Deployment

This project is configured for deployment on Vercel. To deploy:

1. Push your code to a GitHub repository.
2. Import the repository on [Vercel](https://vercel.com).
3. Connect a Vercel KV store to your project for storing fetched issues and timestamps.
4. Vercel will automatically detect the Next.js configuration.
5. Your site will be deployed and available at your Vercel URL.

## Environment Variables

### For Local Development (Optional)

See `.env.example` for all available options. Most common:

- `USE_LOCAL_DATA=true` — Force use of local JSON files instead of KV (default behavior when KV is not configured)
- `GITHUB_TOKEN` — (Optional) Increase GitHub API rate limits when fetching issues

### For Production Deployment

The following environment variables need to be set in your Vercel project (Settings > Environment Variables):

- `CRON_SECRET` — A secret key to secure the cron job API endpoint (used in `Authorization: Bearer <secret>` header)
- `GITHUB_TOKEN` — (Optional, but Recommended) GitHub personal access token to increase rate limits
- Vercel KV Environment Variables — When you connect a Vercel KV store, Vercel automatically adds: `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`

## Cron Job (Production)

This project includes a cron job that automatically updates the GitHub issues in production:

1. Configured in `vercel.json` to run on a schedule (e.g., daily)
2. Calls the `/api/cron/update-issues` endpoint
3. Fetches the latest 'good first issues' from various repositories using the GitHub API
4. Saves the fetched issues to Vercel KV store (key: `all_issues_data`)
5. Saves the update timestamp to Vercel KV (key: `last_cron_update_timestamp`)

### API Routes

- `/api/get-issues` — Retrieves issues from KV (production) or `public/issues.json` (local/fallback)
- `/api/get-last-update` — Retrieves update timestamp from KV (production) or `public/last-update.json` (local/fallback)

Both routes automatically fall back to local JSON files when Vercel KV is unavailable, ensuring the app works seamlessly in local development.

---

## 🌟 Spread the Word

If this project helps you (or you just think it's cool):

- ⭐️ Star this repo
- 📢 Share it on social media
- 🗣️ Tell a friend who wants to break into blockchain

Together, we're lowering the barrier to Web3 — one good first issue at a time.

---

Made with ❤️ by open-source contributors across the globe.

