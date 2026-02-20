# S3N Technologies Website

Official website for **S3N Technologies** — a leading AI solutions company. Built with React (Vite) on the frontend and Express on the backend.

---

## Project Structure

```
s3n-website/
  frontend/                   React + Vite app
    src/
      components/
        Navbar.jsx             Shared navigation bar
        Footer.jsx             Shared footer
      pages/
        Home.jsx               Landing page with hero, features, stats
        About.jsx              Company story, team, achievements
        Services.jsx           AI service offerings and pricing
        Testimonials.jsx       Client reviews and case studies
        Contact.jsx            Contact form with validation
      App.jsx                  React Router route definitions
      main.jsx                 React entry point
      styles.css               Global stylesheet
    index.html
    vite.config.js             Dev proxy: /api → localhost:3001
    package.json

  backend/                    Express API server
    config/
      app.config.js            Centralized config (reads .env)
    middleware/
      rateLimiter.js           Rate limits contact form (5 req/15 min)
    routes/
      contact.js               POST /api/contact (+ nodemailer email)
    server.js
    package.json
    .env.example               Copy to .env and fill in credentials

  scripts/
    build.sh                   Builds frontend for production
    start-dev.sh               Starts frontend + backend concurrently
    deploy.sh                  Builds and reports deploy status

  .gitignore
  README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Install Dependencies

```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install
```

### Environment Setup

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your values:

```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173

# Optional: fill in to enable contact form emails
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@email.com
EMAIL_PASS=your-app-password
EMAIL_TO=sk.senthil@gmail.com
```

---

## Running in Development

Start both frontend and backend together:

```bash
bash scripts/start-dev.sh
```

Or individually:

```bash
# Frontend — http://localhost:5173
cd frontend && npm run dev

# Backend — http://localhost:3001
cd backend && npm run dev
```

---

## Building for Production

```bash
bash scripts/build.sh
```

Output goes to `frontend/dist/`. Deploy that folder to any static hosting (Netlify, Vercel, Azure Static Web Apps, etc.).

---

## API Endpoints

| Method | Endpoint      | Description              |
|--------|---------------|--------------------------|
| GET    | /api/health   | Server health check      |
| POST   | /api/contact  | Submit contact form      |

---

## Pages

| Route           | Page          |
|-----------------|---------------|
| `/`             | Home          |
| `/about`        | About Us      |
| `/services`     | Services      |
| `/testimonials` | Testimonials  |
| `/contact`      | Contact       |

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 18, React Router v6, Vite 5 |
| Styling  | Custom CSS (styles.css)           |
| Backend  | Node.js, Express 4                |
| Email    | Nodemailer                        |
| Icons    | Font Awesome 6                    |
| Fonts    | Google Fonts (Inter)              |

---

## Contact

**SK Senthil** — sk.senthil@gmail.com
GitHub: [sksenthil-git/s3n-website](https://github.com/sksenthil-git/s3n-website)

&copy; 2025 S3N Technologies. All rights reserved.
