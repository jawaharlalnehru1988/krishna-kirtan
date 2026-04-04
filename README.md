<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Sri Krishna Kirtan (Next.js)

This project now runs on Next.js (App Router).

## Run Locally

Prerequisites: Node.js 18.18+.

1. Install dependencies:
   `npm install`
2. Start development server:
   `npm run dev`
3. Build for production:
   `npm run build`
4. Start production server:
   `npm run start`

## Google Analytics 4 (Visitor Tracking)

1. Create a GA4 property and web data stream in Google Analytics.
2. Copy `.env.example` to `.env.local` (or update your existing `.env.local`).
3. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to your GA4 measurement ID (example: `G-XXXXXXXXXX`).
4. Restart the dev server after changing environment variables.

When `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set, page views are tracked automatically on route and query-string changes.
