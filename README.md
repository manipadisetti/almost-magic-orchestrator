# Thin Air - Zero-Spec Cognitive Foundry

## Infrastructure Details

- **Hosting:** Digital Pacific (Australian VPS)
- **Database:** Neon.tech (Cloud Postgres)
- **Ports:**
  - ThinAir Web: 5173
  - ThinAir API: 3002

## Australian Compliance

This application is optimised for Australian businesses with:
- Australian English localisation throughout the UI
- GDPR and Australian Privacy Principles (APP) compliance considerations
- Australian date format (DD/MM/YYYY) and timezone (AEST/AEDT) support

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`

## Project Structure

This is a monorepo containing:
- `apps/web`: Frontend application
- `apps/server`: Backend API
- `apps/marketing`: Marketing website
- `packages/ui`: Shared UI components
