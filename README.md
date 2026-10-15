# thehelios.co.in

Official website of HELIOS AI Lab, live at [thehelios.co.in](https://thehelios.co.in).

This is a [Next.js](https://nextjs.org) project (Pages Router) deployed to Cloudflare Workers using [OpenNext](https://opennext.js.org/cloudflare).

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the home page by modifying `src/pages/index.tsx`. The page auto-updates as you edit the file.

Requirements: Node.js 20.9 or newer and npm.

## Environment Variables

The contact form API (`src/pages/api/contact.ts`) needs these variables. Copy `.dev.vars.example` to `.dev.vars` for local Cloudflare preview. Never commit `.dev.vars` or real values.

- `RESEND_API_KEY`: Resend API key used to send form emails
- `CONTACT_FROM`: sender shown on form emails
- `CONTACT_TO`: optional recipient address for form submissions

## Available Scripts

- `npm run dev`: start the development server
- `npm run build`: create a production build
- `npm run start`: run the production build locally
- `npm run lint`: run ESLint
- `npm run preview`: build with OpenNext and preview in the Cloudflare Workers runtime
- `npm run deploy`: build with OpenNext and deploy to Cloudflare
- `npm run upload`: build with OpenNext and upload a version to Cloudflare
- `npm run cf-typegen`: regenerate Cloudflare environment types

## Project Structure

```
public/              Static assets
src/
  components/        Layout, shared, UI and visual components
  lib/               Helpers, site config, structured data
  pages/             Routes and the /api/contact endpoint
  styles/            Global CSS
wrangler.jsonc       Cloudflare Workers configuration
open-next.config.ts  OpenNext configuration
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API.
- [OpenNext for Cloudflare](https://opennext.js.org/cloudflare) - how this app runs on Cloudflare Workers.
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/) - Workers and Wrangler documentation.

## Deploy on Cloudflare

This site is deployed on Cloudflare Workers (worker name `thehelioscoin`), not Vercel. Changes merged into the `dev` branch are built and deployed by Cloudflare. Production releases are approved by the release owner.

To test in the Cloudflare runtime locally before opening a PR, run `npm run preview`.