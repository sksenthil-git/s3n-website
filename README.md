# S3N Technologies Website

Official website for **S3N Technologies** — an AI solutions company. Built with React + Vite on the frontend and Express.js on the backend, hosted on Azure.

---

## Project Structure

```
s3n-website/
├── frontend/                       React + Vite app (Azure Static Web Apps)
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js              API service layer — all backend calls live here
│   │   ├── components/
│   │   │   ├── Navbar.jsx          Shared navigation bar
│   │   │   ├── Footer.jsx          Shared footer
│   │   │   └── ChatWidget.jsx      Floating chat widget (submits to /api/contact)
│   │   ├── pages/
│   │   │   ├── Home.jsx            Landing page
│   │   │   ├── About.jsx           Company story and team
│   │   │   ├── Services.jsx        AI service offerings
│   │   │   ├── Testimonials.jsx    Client reviews
│   │   │   ├── Contact.jsx         Contact form
│   │   │   ├── DataDeletion.jsx    GDPR data deletion request form
│   │   │   └── Privacy.jsx         Privacy policy
│   │   ├── App.jsx                 React Router route definitions
│   │   ├── main.jsx                React entry point
│   │   └── styles.css              Global stylesheet
│   ├── index.html
│   ├── vite.config.js              Dev proxy: /api → localhost:3001
│   ├── staticwebapp.config.json    Azure SWA routing + security headers
│   └── web.config                  IIS fallback config
│
├── backend/                        Express API server (Azure App Service)
│   ├── config/
│   │   └── app.config.js           Centralized config (reads .env + decrypts EMAIL_PASS)
│   ├── middleware/
│   │   └── rateLimiter.js          Rate limits form endpoints (5 req / 15 min per IP)
│   ├── routes/
│   │   ├── contact.js              POST /api/contact
│   │   └── dataDeletion.js         POST /api/data-deletion
│   ├── utils/
│   │   ├── crypto.js               AES-256-CBC encrypt/decrypt for EMAIL_PASS
│   │   └── sanitize.js             Strips HTML/script injection from form inputs
│   └── server.js                   Express entry point (Helmet, CORS, Morgan)
│
├── scripts/
│   ├── start-dev.sh                Starts frontend + backend concurrently
│   ├── encrypt-secret.sh           Encrypts EMAIL_PASS for safe storage in Azure
│   └── push-env-to-azure.sh        Pushes EMAIL_* vars from .env to Azure App Settings
│
├── .github/workflows/
│   ├── azure-static-web-apps.yml   CI: deploys frontend on changes to frontend/**
│   └── azure-backend-deploy.yml    CI: deploys backend on changes to backend/**
│
└── README.md
```

---

## Architecture

```
Browser
  ↓  HTTPS (Azure enforces TLS)
Frontend — React SPA (Azure Static Web Apps)
  ↓  relative /api/* paths (backend URL never in the bundle)
Backend — Express API (Azure App Service)
  ↓  SMTP over TLS port 587
Gmail SMTP
```

**Security layers in place:**

| Layer | What it does |
|---|---|
| Azure SWA routing | Routes `/api/*` to the backend app service — backend URL is never exposed |
| CORS | Backend only accepts requests from `FRONTEND_URL` |
| Helmet | Sets CSP, HSTS, X-Frame-Options and other security headers |
| Rate limiter | 5 requests / 15 min per IP on all form endpoints |
| Input sanitization | Strips HTML tags, `javascript:`, inline event handlers; enforces field length caps |
| Email validation | Regex checked independently on both frontend and backend |
| App whitelist | DataDeletion `app` field validated against a fixed list |
| EMAIL_PASS encryption | Stored encrypted in Azure; decrypted at runtime using a key baked into the app |

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

Edit `backend/.env`:

```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your-16-char-app-password   # or use encrypt-secret.sh to store encrypted
EMAIL_TO=recipient@email.com
```

> **Note:** Gmail requires an App Password (16 chars), not your regular password.
> Generate one at myaccount.google.com → Security → App Passwords.

---

## Running in Development

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

Vite proxies all `/api/*` requests to the backend during development, matching the production Azure routing.

---

## Building for Production

```bash
cd frontend && npm run build
```

Output goes to `frontend/dist/`. The build also copies `staticwebapp.config.json` and `web.config` into dist automatically.

---

## Scripts

### Encrypt EMAIL_PASS

```bash
./scripts/encrypt-secret.sh "your-gmail-app-password"
```

Outputs an encrypted value to store in `backend/.env` as `EMAIL_PASS`. The backend decrypts it automatically at startup using the key in `backend/utils/crypto.js`.

### Push environment variables to Azure

```bash
./scripts/push-env-to-azure.sh <app-name> <resource-group>
# Example:
./scripts/push-env-to-azure.sh s3n-website-APIs all-apps-backend-API-rg
```

Reads `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_TO` from `backend/.env` and pushes them to Azure App Service settings. Requires Azure CLI (`az login`).

---

## API Endpoints

| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| GET    | /api/health           | Server health check                |
| POST   | /api/contact          | Submit contact / chat widget form  |
| POST   | /api/data-deletion    | Submit GDPR data deletion request  |

---

## Pages

| Route            | Page                  |
|------------------|-----------------------|
| `/`              | Home                  |
| `/about`         | About Us              |
| `/services`      | Services              |
| `/testimonials`  | Testimonials          |
| `/contact`       | Contact               |
| `/data-deletion` | Data Deletion Request |
| `/privacy`       | Privacy Policy        |

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, React Router v6, Vite 5   |
| Styling    | Custom CSS (styles.css)             |
| Backend    | Node.js, Express 4                  |
| Email      | Nodemailer (Gmail SMTP)             |
| Security   | Helmet, express-rate-limit          |
| Encryption | Node.js crypto (AES-256-CBC)        |
| Icons      | Font Awesome 6                      |
| Fonts      | Google Fonts (Inter)                |
| Hosting    | Azure Static Web Apps + App Service |
| CI/CD      | GitHub Actions                      |

---

## Deployment

Both CI pipelines run on push to `master` and are path-scoped:

- **Frontend** triggers only on changes to `frontend/**`
- **Backend** triggers only on changes to `backend/**`

EMAIL credentials are **never** in the CI pipeline. They are set manually in Azure App Settings using `push-env-to-azure.sh`.

---

## Contact

**SK Senthil** — sk.senthil@gmail.com
GitHub: [sksenthil-git/s3n-website](https://github.com/sksenthil-git/s3n-website)

&copy; 2025 S3N Technologies. All rights reserved.
