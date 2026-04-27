# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack appointment scheduling system. Users can register, log in, and manage appointments with business-rule validation (no weekends, 24h advance notice, business hours 08:00–18:00, no duplicate bookings).

## Repository Layout

```
root/
├── back/          # Node.js + Express + TypeScript backend
│   └── src/
└── front/
    └── vite-project/  # React frontend (JSX, not TSX)
```

## Commands

### Backend (`back/`)

```bash
npm run dev       # Start with nodemon (ts-node, watches src/**/*.ts)
npm run build     # Compile TypeScript to dist/
npm start         # Run compiled output (dist/index.js)
npm run serve     # build + start
```

### Frontend (`front/vite-project/`)

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Environment Setup

Copy `back/src/.env.example` to `back/src/.env` and fill in:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=<postgres user>
DB_PASSWORD=<password>
DB_DATABASE=<db name — must exist before starting>
DB_SYNCHRONIZE=true
DB_DROP=true       # drops and recreates schema on each start
DB_LOGGING=true
```

The PostgreSQL database must exist before running the backend. TypeORM handles schema creation via `synchronize: true`. `dropSchema: true` wipes and recreates all tables on every restart — set `DB_DROP=false` to persist data across restarts.

## API Endpoints

Base URL: `http://localhost:3000`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/users` | List all users |
| GET | `/users/:id` | Get user with their appointments |
| POST | `/users/register` | Register new user |
| POST | `/users/login` | Login, returns `{ user }` |
| GET | `/appointments` | List all appointments |
| GET | `/appointments/:id` | Get appointment by id |
| POST | `/appointments/schedule` | Create appointment (`{ date, time, userId }`) |
| PUT | `/appointments/cancel/:id` | Cancel appointment (sets status to `cancelled`) |

## Architecture

### Backend layers

- **entities/** — TypeORM entities: `User` (OneToOne Credential, OneToMany Appointments), `Credential` (hashed password), `Appointment` (ManyToOne User, status enum `active`/`cancelled`)
- **repositories/** — Extended TypeORM repositories. `AppointmentModel` adds `validateAllowAppointment` (date/time/weekend rules) and `validateExistingApp` (duplicate check)
- **services/** — Business logic; calls repositories. Throws `Error` on rule violations
- **controllers/** — Express handlers; catch errors and return appropriate HTTP responses
- **DTO/** — Plain TypeScript types used for request body typing
- **interfaces/** — Shared interfaces and the `Status` enum

### Frontend

- **context/UserContext.jsx** — Single global context (`UsersContext`) wrapping all API calls via axios. Persists logged-in user to `localStorage`. All views consume this context via `useContext`.
- **App.jsx** — Route guard logic: unauthenticated users are redirected to `/login`; logged-in users are redirected away from `/login` and `/register`.
- **views/** — One folder per page: `Home`, `Login`, `Register`, `MisTurnos`, `AgendarTurno`, `About`
- **components/** — Shared: `NavBar`, `NotFound`
- **helpers/** — `validates.js` (Formik validation schemas), `myAppointments.js` (appointment fetch helper)
- Forms use **Formik**; alerts use **SweetAlert2**

### Frontend API base URL

Configured via `VITE_API_URL` env variable (read in `UserContext.jsx` as `import.meta.env.VITE_API_URL`). Default `.env` points to `http://localhost:3000`. For deploy, set `VITE_API_URL` to the production backend URL before running `npm run build`.

### Deploy checklist

- Frontend: set `VITE_API_URL=<production backend URL>` before `npm run build`
- Backend: set `FRONTEND_URL=<production frontend URL>` so CORS allows the right origin
- Backend: set `DB_DROP=false` in production to avoid dropping the schema on restart
