<div align="center">

# Precious Moments — AI‑Powered Jewelry Store

Elegant Nuxt 3 storefront with AI search ranking, a stylist assistant, a dynamic product catalog, and a lightweight cart/login prototype.

</div>

---

## ✨ Features
- AI‑powered search ranking (Cloudflare AI) and a stylist assistant panel
- Dynamic product routes `/products/[id]` for SEO/shareability
- Smart search and advanced filters (tags, price, text scope)
- Cart with local persistence and header badge counter
- Login page with email/password, magic link and OAuth placeholders + remember last page
- Responsive header with hamburger menu and custom wordmark/monogram
- Modern, vintage‑inspired About/Contact pages

## 🧱 Tech Stack
- Nuxt 3, Vue 3, TypeScript
- Tailwind CSS (+ @nuxt/image)
- Cloudflare AI (Llama) via server API routes

## 📂 Project Structure (high‑level)
```
app/
  components/         # UI components (Header, productCard, AiAssistant, etc.)
  pages/              # Pages (Home, Products, products/[id], About, Contact, Cart, Login)
  composables/        # useCart, useAuth, useCfAiSearch, useCfAiRecommend
  plugins/            # v-reveal directive for entrance animations
  data/               # products.ts (static seed data)
  assets/css/         # main.css (Tailwind + fonts)
server/api/           # ai_search.ts, useCfAiRecommend.ts (Cloudflare AI)
nuxt.config.ts        # Nuxt config (runtime env + modules)
```

## 🔐 Environment Variables
The AI endpoints require Cloudflare credentials. Do NOT commit .env files.

- `CF_ACCOUNT_ID` — your Cloudflare account id
- `CF_API_TOKEN` — API token with permission to run AI models

Nuxt reads these via `runtimeConfig` in `nuxt.config.ts`.

Local development:
```bash
# .env (not committed)
CF_ACCOUNT_ID=xxxx
CF_API_TOKEN=yyyy
```

## 🚀 Getting Started

1) Install dependencies
```bash
npm install
```

2) Run dev server
```bash
npm run dev
# http://localhost:3000
```

3) Build & preview
```bash
npm run build
npm run preview
```

## 🧠 AI Integration Notes
- `server/api/ai_search.ts`: Ranks products by calling Cloudflare AI; returns ordered ids and matched results. Soft‑fails to empty results if creds are missing.
- `server/api/useCfAiRecommend.ts`: Stylist assistant; returns message + items `{id, why, when}` and matched results. Also soft‑fails if creds missing.

Both endpoints compact product payloads before sending to AI to reduce tokens and sanitize optional image URLs.

## 🛒 Cart & 👤 Auth (Prototype)
- `useCart`: localStorage persistence, add/remove/update, computed count/subtotal
- `/cart`: item list, quantity controls, subtotal, payment badges (placeholders)
- `useAuth`: localStorage user, email/magic/OAuth placeholders, remember last route
- `/login`: form + buttons; redirects back to the last page after login

These are UI/UX prototypes suitable for demos; wire to a real backend for production.

## 🌐 Deploying to Vercel

1) Push your repo to GitHub/GitLab/Bitbucket

2) In Vercel Dashboard → New Project → Import your repo

3) Set Environment Variables (Settings → Environment Variables)
   - `CF_ACCOUNT_ID`
   - `CF_API_TOKEN`
   - Enable for Development, Preview, Production

4) Build settings (auto-detected)
   - Framework: Nuxt.js
   - Install: `npm install`
   - Build: `npm run build`
   - Output: `.output/public`

5) Deploy
- From dashboard (recommended), or via CLI:
```bash
npm i -g vercel
vercel --prod
```

## 🧪 Scripts
```bash
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview built output
```

## 🧰 Troubleshooting
- AI features return no results
  - Ensure `CF_ACCOUNT_ID` and `CF_API_TOKEN` are set in Vercel (and locally for dev)
- 500 errors on AI routes
  - Cloudflare credentials, network issues, or model availability
- Images not loading
  - Verify `public/images/*` paths and `NuxtImg` usage
- Local storage resets
  - Clearing site data wipes cart/auth prototypes by design

## 📄 License
MIT — use, modify, and distribute freely. Please retain copyright notices.

