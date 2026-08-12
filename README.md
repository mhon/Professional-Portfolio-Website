# Raymond Bastasa — Professional Portfolio Website

Personal portfolio for Raymond Bastasa, a full-stack software engineer focused on modern web applications, AI integration, automation, and developer tooling.

## Project structure

This repository is a pnpm workspace with three artifacts:

- `artifacts/portfolio` — React + Vite portfolio website
- `artifacts/api-server` — Express API for the contact form
- `artifacts/mockup-sandbox` — isolated component preview tooling

## Run locally

Install dependencies with pnpm, then start the development workflows:

```bash
pnpm install
pnpm --filter @workspace/portfolio run dev
pnpm --filter @workspace/api-server run dev
```

The portfolio runs on its configured Vite port and the API runs on port `8080`.

Useful verification commands:

```bash
pnpm run typecheck
pnpm run build
pnpm --filter @workspace/portfolio run typecheck
pnpm --filter @workspace/api-server run build
```

## Contact form

The contact form submits to `POST /api/contact`. The server:

- validates name, email, and message types and lengths;
- escapes user content before placing it in the HTML email;
- limits submissions to five requests per IP every 15 minutes;
- trusts the single Replit proxy hop so rate limiting works in production.

The current sender uses Gmail SMTP with the Replit secrets `GMAIL_USER` and `GMAIL_APP_PASSWORD`.

### Yahoo delivery limitation

The target inbox is `mhonbastasa@yahoo.com.ph`. Yahoo currently rejects messages from the cloud SMTP route with `554 PH01 — Email not accepted for policy reasons`; direct Yahoo SMTP from the cloud environment is also rejected. This is an upstream Yahoo policy response, not a form validation or Gmail authentication error.

For reliable delivery to the Yahoo inbox, connect a transactional email provider such as Resend and replace the SMTP transport with its HTTP API. Do not commit email credentials or API keys to this repository.

## Responsive Skills network

The Skills section uses a responsive SVG graph and scalable percentage-based node positions. On mobile and tablet widths, selecting a node brings the active skills panel into view so the complete detail card is readable without the panel being stranded below the viewport. The layout also honors reduced-motion preferences.

## Deployment

The portfolio is configured as a static web artifact and the API as a runnable service. Publishing is user-initiated through Replit's Publishing tool; production environment secrets must be configured separately and are never stored in Git.

## GitHub

The intended remote repository is:

`https://github.com/mhon/Professional-Portfolio-Website`

Pushes require the GitHub account to be connected through Replit Source Control. The repository copy does not include Replit secrets, so those values must be added again when deploying elsewhere.
