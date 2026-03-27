# PrintLux V15 — Final Launch-Ready System

This is the most complete generated PrintLux package in this session.

## Included
- premium product ordering page
- MongoDB + Mongoose core models
- Stripe checkout + webhook sync
- Cloudinary signed upload route
- EasyPost quote + tracking routes
- Redis-backed rate limiting with memory fallback
- CSRF helper
- upload validation + malware scan hook
- upsell engine, bundles, proof approval APIs
- admin dashboard scaffold
- customer orders scaffold
- checkout success/cancel pages
- health/ready endpoints
- seed script
- deployment checklist
- GitHub Actions CI workflow

## Quick start
```bash
npm install
cp .env.example .env.local
npm run seed
npm run dev
```
