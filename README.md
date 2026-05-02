# green-cup
The Green Cup dashboard prototype for Sustainability Cell

Green Cup Prototype

This workspace contains a minimal prototype for a Green Cup Sustainability Dashboard.

- `backend` — simple Node.js server exposing `/api/sample` which reads `sample_data/hostel_bills.csv` and returns a computed leaderboard.
- `frontend` — Vite + React prototype that fetches the sample leaderboard and allows CSV paste to simulate ingestion.

Run steps:

1. Start backend:

```bash
cd backend
node index.js
```

2. Start frontend (requires npm + vite):

```bash
cd frontend
npm install
npm run dev
```

Notes:
- This is a prototype; coefficients and models are illustrative only.
- For production, add robust CSV parsing, auth, validation, persistence, and meter integrations.
