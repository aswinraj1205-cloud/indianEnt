# Founders' Narrative - Entrepreneur Interview Platform

A full-stack, responsive web application for a content creation and distribution agency that interviews high-growth entrepreneurs and packages the interviews into platform-native media assets for YouTube, Instagram, LinkedIn, and Spotify.

Built with a modern, high-impact **React + TypeScript** frontend and a **Node.js + Express** backend backed by a **MySQL** database.

---

## Project Structure

```text
indianEnt/
├── backend/
│   ├── db.js             # MySQL Connection pool helper
│   ├── server.js         # Express server & API endpoints
│   ├── setup-db.js       # Database initialization & seeding script
│   ├── schema.sql        # MySQL table schema
│   ├── package.json      # Backend dependencies
│   ├── .env              # Local environment credentials
│   └── .env.example      # Reference environment variables
└── frontend/
    ├── index.html        # Main template (fonts, SEO metadata)
    ├── package.json      # React + Vite dependencies
    ├── vite.config.ts    # Config mapping `/api` requests to backend
    └── src/
        ├── App.tsx       # Core React components & logic
        ├── index.css     # Premium Vanilla CSS design system
        └── main.tsx      # React DOM entry point
```

---

## Tech Stack & Highlights

* **Frontend**: React (Functional Components & Hooks), Vite, TypeScript, Lucide Icons, and responsive Vanilla CSS.
* **Backend**: Node.js & Express (CORS middleware, JSON parsing, API routers).
* **Database**: MySQL. We use connection pools and promise-based queries (`mysql2/promise`).
* **Offline Fallback Resilience**: If your local MySQL database is offline or not configured, the Express server will print a clear warning, but **automatically fall back to high-quality mock data** for endpoints. This ensures you can preview the frontend, filter interviews, open detail modals, and simulate form submissions instantly!
* **Theme**: White, blue, and black color palette. Elegant Lora serif typography for titles, crisp Inter sans-serif for reading blocks, subtle transitions, and dynamic hover overlays.

---

## Setup & Running Instructions

### 1. Requirements
* [Node.js](https://nodejs.org/) installed (v18+ recommended)
* [MySQL](https://www.mysql.com/) installed and running locally (if you want database storage)

---

### 2. Running with Offline Mock Data (Instant Preview)
To test the interface and simulate form registration without configuring MySQL:

1. Open a terminal in the `backend/` folder:
   ```bash
   cd backend
   npm install
   npm start
   ```
   *The server starts on `http://localhost:5000` (handles queries gracefully via fallbacks).*

2. Open another terminal in the `frontend/` folder:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

---

### 3. Setting up with MySQL
To hook up the database server to store your actual entrepreneur submissions:

1. Open your MySQL client and ensure the server is running.
2. Edit `backend/.env` with your actual MySQL database credentials:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=entrepreneur_db
   ```
3. Initialize the database schema and seed mock interviews into the database tables by running the setup script in the `backend/` folder:
   ```bash
   cd backend
   npm run db:setup
   ```
   *This automatically creates the `entrepreneur_db` database and the `registrations` and `interviews` tables, seeding them with initial entries.*

4. Restart your backend server:
   ```bash
   npm start
   ```

Now, all interview cards on the homepage will be read dynamically from your MySQL database, and form submissions from the registration form will be saved securely to the `registrations` table!

---

## API Endpoints

* **`GET /api/interviews`**: Retrieves list of past interviews.
* **`POST /api/register`**: Registers a founder application.
  * *Body payload example:*
    ```json
    {
      "full_name": "Rahul Sharma",
      "company_name": "Acme Tech",
      "role_title": "Co-founder & CEO",
      "industry": "SaaS",
      "email": "rahul@company.com",
      "phone": "+91 98765 43210",
      "company_stage": "Growth Stage",
      "pitch": "We built a workflow tool for legal professionals...",
      "consent": 1
    }
    ```
