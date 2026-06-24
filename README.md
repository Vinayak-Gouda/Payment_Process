# Payment_Gateway

Simple payment gateway scaffold with backend (Node + Sequelize) and frontend (React + Vite).

Backend:
- Folder: `backend`
- Uses ES modules (`type: module`)
- In-memory SQLite via Sequelize (`sqlite::memory:`)

Frontend:
- Folder: `frontend`
- Vite + React app (ES modules)

Run:
1. Backend
```bash
cd backend
npm install
npm run dev
```
Server runs on `http://localhost:3000`.

2. Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs on `http://localhost:5173` by default and talks to backend at `http://localhost:3000`.

Note: Frontend uses TailwindCSS (devDependencies include `tailwindcss`, `postcss`, `autoprefixer`). If you installed dependencies previously, run `npm install` again in the `frontend` folder to fetch dev dependencies.

API endpoints (POST JSON):
- `POST /api/transactions/credit` { amount: number }
- `POST /api/transactions/withdraw` { amount: number }
- `GET /api/transactions/history`

Notes: Responses are randomly set to success or failure for demo purposes.
