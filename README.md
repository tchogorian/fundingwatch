# FundingWatch.org

A free, AI-powered MCA (Merchant Cash Advance) contract analysis tool. Next.js 14 (App Router) landing page with upload, mock analysis, and opt-in flow.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** for styling
- **lucide-react** for icons
- TypeScript

## API routes (placeholders)

- **POST /api/analyze** — Accepts multipart form data (file). Returns mock analysis JSON. Wire to Claude API later.
- **POST /api/opt-in** — Accepts JSON (name, email, phone, business_name, state, consent_timestamp, analysis_data). Logs and returns success. Add email sending later.

## Project structure

- `src/app/` — App Router pages and API routes
- `src/components/` — Reusable UI components
- `src/types/` — Shared TypeScript types

## Color palette

- **Navy** `#1A1A2E` — Primary dark sections
- **White** `#FFFFFF` — Alternate sections
- **Accent blue** `#2E75B6` — CTAs
- **Red** `#C62828` — Critical flags
- **Orange** `#E65100` — Warnings
- **Green** `#2E7D32` — Positive indicators
