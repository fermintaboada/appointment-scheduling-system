# Q-Golf — Appointment Scheduling System

A full-stack appointment booking application for a golf club, built as a portfolio project. Users can register, browse the club, and book tee times — with real-world scheduling rules enforced on the backend.

**Live demo:** https://appointment-scheduling-system-lime.vercel.app

---

## Tech Stack

**Frontend**
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&labelColor=20232a)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white&labelColor=1a1a2e)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white&labelColor=1a1a2e)
![Formik](https://img.shields.io/badge/Formik-2-172B4D?logo=formik&logoColor=white)

**Backend**
![Node.js](https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs&logoColor=white&labelColor=1a1a2e)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&labelColor=1a1a2e)
![TypeORM](https://img.shields.io/badge/TypeORM-0.3-E83524?logo=typeorm&logoColor=white)

**Infrastructure**
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white&labelColor=1a1a2e)
![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-Backend-46E3B7?logo=render&logoColor=white&labelColor=1a1a2e)
![Resend](https://img.shields.io/badge/Resend-Email-000000?logo=mail&logoColor=white)

---

## Features

- **Public browsing** — Home and About pages accessible without login; booking requires authentication
- **Auth system** — Registration and login with hashed credentials (TypeORM + bcrypt-style entity)
- **Appointment booking** — Date + time picker with full backend validation
- **My Appointments** — User-specific list with status (active / cancelled) and cancel action
- **Email confirmation** — Branded HTML confirmation email sent via Resend on booking
- **Business rule enforcement** (server-side):
  - No bookings in the past
  - Minimum 24-hour advance notice
  - Business hours only (08:00–18:00)
  - No weekend bookings
  - No duplicate bookings per user / date / time slot
- **Responsive design** — Mobile-first layout, works across all viewports
- **SweetAlert2 feedback** — Success and error dialogs throughout the user journey

---

## Architecture

```
root/
├── back/                    # Node.js + Express + TypeScript
│   └── src/
│       ├── config/          # DB connection (TypeORM DataSource) + env
│       ├── entities/        # TypeORM entities: User, Credential, Appointment
│       ├── repositories/    # Extended repos with business-rule validation methods
│       ├── services/        # Business logic layer (throws on rule violations)
│       ├── controllers/     # HTTP handlers (catch errors → HTTP responses)
│       ├── routes/          # Express routers
│       ├── DTO/             # Request body types
│       └── interfaces/      # Shared interfaces + Status enum
│
└── front/
    └── vite-project/        # React 19 + Vite (JSX, CSS Modules)
        └── src/
            ├── context/     # UserContext — global state + all API calls (axios)
            ├── views/       # Page components: Home, Login, Register, MisTurnos, AgendarTurno, About
            ├── components/  # NavBar, Footer, Turno card, NotFound
            └── helpers/     # Formik validation schemas, appointment helpers
```

### Data model

```
User 1──────< Appointment
│
└──1 Credential
```

- `User` — id, name, email, phone, OneToMany appointments, OneToOne credential
- `Credential` — id, password (hashed), OneToOne user
- `Appointment` — id, date, time, status (active | cancelled), ManyToOne user

---

## API Reference

Base URL (production): `https://appointment-scheduling-system-hapo.onrender.com`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/users` | — | List all users |
| `GET` | `/users/:id` | — | User with their appointments |
| `POST` | `/users/register` | — | Register `{ name, email, phone, password }` |
| `POST` | `/users/login` | — | Login `{ email, password }` → `{ user }` |
| `GET` | `/appointments` | — | List all appointments |
| `GET` | `/appointments/:id` | — | Appointment by id |
| `POST` | `/appointments/schedule` | — | Book `{ date, time, userId }` |
| `PUT` | `/appointments/cancel/:id` | — | Cancel (sets status → `cancelled`) |

---

## Local Setup

### Prerequisites

- Node.js 18+
- PostgreSQL (database must exist before starting)

### Backend

```bash
cd back
npm install

# Create .env from template
cp src/.env.example src/.env
# Fill in DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE
# Optional: add RESEND_API_KEY for email confirmations

npm run dev        # Start with nodemon + ts-node
```

> `DB_SYNCHRONIZE=true` auto-creates tables. `DB_DROP=true` drops and recreates schema on each restart — set to `false` to persist data.

### Frontend

```bash
cd front/vite-project
npm install

# Create .env
echo "VITE_API_URL=http://localhost:3000" > .env

npm run dev        # Vite dev server at http://localhost:5173
```

---

## Deploy

| Service | Purpose | Config |
|---------|---------|--------|
| **Render** | Backend (Node.js) | Root dir: `back`, build: `npm run build`, start: `npm start` |
| **Vercel** | Frontend (SPA) | Root dir: `front/vite-project`, `vercel.json` handles SPA rewrites |
| **Neon** | PostgreSQL | Free-tier serverless Postgres; connect via `DATABASE_URL` |

**Required env variables:**

Backend (Render):
```
DATABASE_URL=<neon connection string>
FRONTEND_URL=https://your-app.vercel.app   # no trailing slash
RESEND_API_KEY=<resend key>
DB_DROP=false
DB_SYNCHRONIZE=true
```

Frontend (Vercel):
```
VITE_API_URL=https://your-backend.onrender.com
```
