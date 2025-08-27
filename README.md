# Aura Harvest

Deployment-ready scaffold generated: 2025-08-27 21:35:30

- Backend: Express + MongoDB (auth, SMS/email verification stubs with cooldowns + device fingerprinting, invites, referrals, ad-free unlock after 3 verified completions, jobs with versions/reposts, announcements, analytics, favorites, notifications, search, leaderboard, admin ad config, audit logs, rate limiting)
- Frontend: Next.js (global layout, partial reveal, resume/profile scaffold, onboarding tour, favorites, notifications, search, leaderboard, i18n hooks, accessibility)
- DevOps: Docker Compose (Mongo, Mongo Express, backend, frontend), CI, VS Code settings
- Docs: Embedded master blueprint

## Quick start
1) cp config/.env.example config/.env
2) docker compose up -d --build
3) Frontend http://localhost:3000 • API http://localhost:5000 • Mongo Express http://localhost:8081
