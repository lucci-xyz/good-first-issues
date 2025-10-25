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

```bash
pnpm install        # grab dependencies
pnpm dev            # local server on http://localhost:3000
```

Then open the site, pick an issue, and start coding! 💻✨

To refresh the issue list:

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

The following environment variables need to be set in your Vercel project (Settings > Environment Variables):

- `CRON_SECRET`: A secret key you generate to secure the cron job API endpoint. This is used in the `Authorization: Bearer <secret>` header.
- `GITHUB_TOKEN`: (Optional, but Recommended) A GitHub personal access token to increase rate limits when fetching issues from the GitHub API.
- Vercel KV Environment Variables: When you connect a Vercel KV store, Vercel will automatically add the necessary KV store connection variables (e.g., `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`).

## Cron Job

This project includes a cron job that automatically updates the GitHub issues. The cron job:
1. Is configured in `vercel.json` to run on a schedule (e.g., daily).
2. Calls the `/api/cron/update-issues` endpoint.
3. Fetches the latest 'good first issues' from various repositories using the GitHub API.
4. Saves the fetched issues to a Vercel KV store (key: `all_issues_data`).
5. Saves the update timestamp to Vercel KV (key: `last_cron_update_timestamp`).

The API route `/api/get-issues` retrieves the issues from Vercel KV for display on the frontend.
The API route `/api/get-last-update` retrieves the last update timestamp from Vercel KV.

---

## 🌟 Spread the Word

If this project helps you (or you just think it's cool):

- ⭐️ Star this repo
- 📢 Share it on social media
- 🗣️ Tell a friend who wants to break into blockchain

Together, we're lowering the barrier to Web3 — one good first issue at a time.

---

Made with ❤️ by open-source contributors across the globe.

