# HRMS — Human Resource Management System

A full-stack HRMS built with **React** (frontend) · **Node.js/Express** (backend) · **MySQL** (database) · **Axios** · **JWT**.

## Repository Structure

```
hrms/
├── frontend/     # React + Vite SPA (Tailwind CSS, React Router, Axios)
├── backend/      # Node.js + Express REST API (Sequelize, JWT, bcrypt)
├── database/     # MySQL Workbench schema (.mwb) + exported DDL (.sql)
└── docs/         # Project documentation (PRD, Architecture, Rules, Phases, Design)
```

## Quick Start

### Prerequisites
- Node.js ≥ 18
- MySQL 8+
- MySQL Workbench (for schema design — Phase 1)

### Backend

```bash
cd backend
cp .env.example .env      # Fill in DB credentials and JWT_SECRET
npm install
npm run dev               # Starts on http://localhost:5000
# Health check: GET http://localhost:5000/api/health
```

### Frontend

```bash
cd frontend
cp .env.example .env      # VITE_API_BASE_URL defaults to /api (proxied by Vite)
npm install
npm run dev               # Starts on http://localhost:3000
```

### Tests

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

## Development Phases

See [Phases.md](./Phases.md) for the full implementation roadmap.

| Phase | Description | Status |
|-------|-------------|--------|
| 0 | Project Setup & Tooling | ✅ Done |
| 1 | Database Schema Design | ⬜ Pending |
| 2 | Auth & Employee Service | ⬜ Pending |
| 3 | Frontend Auth + Layout + Route Guards | ⬜ Pending |
| 4–11 | See Phases.md | ⬜ Pending |

## Documentation

- [PRD.md](./PRD.md) — Product requirements
- [Architecture.md](./Architecture.md) — Technical architecture & folder structure
- [Rules.md](./Rules.md) — Development rules for AI agents and humans
- [Design.md](./Design.md) — UI/UX design decisions
- [Phases.md](./Phases.md) — Implementation roadmap
