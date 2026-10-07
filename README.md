# Simple Help Desk Ticket System

This repository contains three runnable applications:

- `/` — React + Vite support dashboard
- `/frontend` — React + Vite employee ticket portal
- `/backend` — Express + MongoDB API

## Requirements

- Node.js 20 or newer
- MongoDB running locally or a MongoDB connection string

## Backend

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

Set `MONGO_URI` and a secure `JWT_SECRET` in `backend/.env`. The API runs on
`http://localhost:5000` by default. Register and log in through
`/api/auth/register` and `/api/auth/login`; login responses include the JWT used
by protected ticket routes.

## Employee portal

```powershell
cd frontend
Copy-Item .env.example .env
npm install
npm run dev
```

Set `VITE_API_URL=http://localhost:5000` and paste an employee JWT into
`VITE_AUTH_TOKEN` to use the API. Leave both values blank to use local demo data.

## Support dashboard

From the repository root:

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Set `VITE_API_URL=http://localhost:5000` and paste a support-user JWT into
`VITE_AUTH_TOKEN`. Leave both values blank to use the included demonstration
tickets.

## Verification

```powershell
cd backend
npm test
npm audit

cd ..\frontend
npm run lint
npm run build

cd ..
npm run build
```
