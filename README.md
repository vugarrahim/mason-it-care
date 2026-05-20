# Mason IT Care

Modern landing page for a local IT support business. React + Tailwind + Shadcn UI on the front, FastAPI + MongoDB on the back.

## Stack

- **Frontend:** React 18, Tailwind CSS, Shadcn-style UI primitives, Radix Select/Label, lucide-react icons, sonner toasts, axios
- **Backend:** FastAPI, Motor (async MongoDB driver), Pydantic v2
- **Design system:** Swiss / industrial — Outfit display, IBM Plex Sans body, IBM Plex Mono labels, sharp edges (`rounded-none`), `#FF4F00` accent

## Project structure

```
mason-it-care/
├── backend/
│   ├── server.py            # FastAPI app, all routes under /api
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env.example
    ├── public/index.html
    └── src/
        ├── index.js, index.css, App.js
        ├── lib/utils.js
        ├── components/
        │   ├── Header.jsx, Hero.jsx, Marquee.jsx
        │   ├── Services.jsx, About.jsx, Testimonials.jsx
        │   ├── Contact.jsx, Footer.jsx
        │   └── ui/
        │       ├── button.jsx, input.jsx, textarea.jsx
        │       ├── label.jsx, select.jsx
```

## Setup

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # edit MONGO_URL / DB_NAME if needed
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

MongoDB must be running locally on `mongodb://localhost:27017` (or set `MONGO_URL`).

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # set REACT_APP_BACKEND_URL=http://localhost:8000
npm start
```

Opens at http://localhost:3000.

## API

| Method | Path             | Description                          |
|--------|------------------|--------------------------------------|
| GET    | `/api/`          | Health check                         |
| GET    | `/api/services`  | List the 6 hardcoded services        |
| POST   | `/api/bookings`  | Create a booking (validated)         |
| GET    | `/api/bookings`  | List bookings, newest first          |

### Booking payload

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "(555) 123-4567",
  "service": "Computer Repair",
  "message": "Laptop won't boot"
}
```

The `service` field accepts either the service `id` (e.g. `computer-repair`) or the display `name` (e.g. `Computer Repair`).

## Notes

- All interactive elements carry `data-testid` attributes for E2E testing.
- Frontend gracefully falls back to a hardcoded services list if the API is unreachable, so the form still works during local-only development.
- MongoDB queries always exclude `_id` to keep responses Pydantic-friendly.
- Marquee is doubled in markup so the CSS `translateX(-50%)` loop is seamless.
- The Outfit + IBM Plex pairing is loaded via Google Fonts in `public/index.html` with `preconnect` hints.
