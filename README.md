# Portfolio V2

Personal portfolio site built with Next.js App Router. It highlights featured projects, shows the latest GitHub activity, and includes a contact form backed by Upstash Redis and optional EmailJS delivery.

## Features

- Hero, About, Projects, Tools, and Contact sections
- Live GitHub data via GraphQL (pinned repos + repo websites)
- "Currently Working On" panel driven by a GitHub webhook + Redis
- Status/thought feed powered by a simple API and Redis
- Contact form with validation, Upstash storage, and optional EmailJS notifications
- Particle background and motion-enhanced UI

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Upstash Redis
- EmailJS
- Framer Motion + tsParticles

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file (see Environment Variables below).

3. Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local` with the following values:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GITHUB_TOKEN` | GitHub GraphQL token for pinned repos and repo websites. |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID for contact form (optional). |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID for contact form (optional). |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key (optional). |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL. |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token. |
| `GITHUB_WEBHOOK_SECRET` | Secret used to verify GitHub webhook signatures. |
| `PERSONAL_STATUS_API_KEY` | API key required to POST status updates. |

Notes:
- If EmailJS variables are not set, the contact form still stores messages in Redis.
- `NEXT_PUBLIC_*` values are exposed to the client. Do not place secrets there.

## Webhook Setup (Latest Push)

To enable the "Currently Working On" panel:

1. Create a GitHub webhook for push events.
2. Point it to `/api/webhooks/github` on your deployed domain.
3. Use `GITHUB_WEBHOOK_SECRET` as the webhook secret.

The webhook stores the latest push in Redis under the `latest-push` key, which is read by `/api/latest-push`.

## Status / Thought Feed

- `POST /api/status` updates the current status. Requires `X-API-Key: PERSONAL_STATUS_API_KEY`.
- `GET /api/status` returns the latest status or `offline` if the update is stale.
- `GET /api/thought` reads the most recent thought from Redis.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
