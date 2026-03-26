# SORD Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` (optional):
   ```env
   PORT=4000
   JWT_SECRET=super-secret-jwt-key
   JWT_EXPIRES_IN=8h
   CORS_ORIGIN=http://localhost:5173
   ```
3. Seed database:
   ```bash
   npm run seed
   ```
4. Run backend:
   ```bash
   npm run dev
   ```

## Seeded Users
- admin@sord.local / Test@1234
- manager@sord.local / Test@1234
- operator@sord.local / Test@1234

## API Base
`http://localhost:4000/api`
