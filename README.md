# AcreArch Full-Stack Application

AcreArch is a React/Vite frontend backed by an Express REST API and MongoDB through Mongoose. The original luxury property visual language, public pages, filters, calculators, gallery, contact flow, and admin property management are represented as reusable React components.

## Installation

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Environment configuration

Copy `backend/.env.example` to `backend/.env` and provide your MongoDB connection:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/acrearch
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
GOOGLE_DRIVE_API_KEY=your_google_drive_api_key
```

Copy `frontend/.env.example` to `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Never commit either `.env` file.

For Google Drive property galleries, enable the Google Drive API in Google Cloud, add its API key as `GOOGLE_DRIVE_API_KEY`, and share each media folder as “Anyone with the link”. Paste that folder link into the property form in Admin. Images and videos are resolved when the property details page opens.

## Seed existing properties

With MongoDB running and the backend environment configured:

```bash
cd backend
npm run seed
```

The seed is idempotent and upserts the six listings preserved from the original property pages.

## Run locally

In one terminal:

```bash
cd backend
npm run dev
```

In another terminal:

```bash
cd frontend
npm run dev
```

Frontend: `http://localhost:5173`  
API: `http://localhost:5000/api`  
Admin: `http://localhost:5173/admin`

## API

- `GET /api/properties` (supports `status`, `featured`, `type`, `region`, and `search` together)
- `GET /api/properties/:id`
- `POST /api/properties`
- `PUT /api/properties/:id`
- `DELETE /api/properties/:id`
- `GET /api/health`

All responses use `{ "success": true, "data": ... }` or `{ "success": false, "message": ... }`.
