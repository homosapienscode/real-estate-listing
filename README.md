# Real Estate Listings Platform

This project is a full-stack real estate listings application built as part of the **TechKraft Inc. Full Stack Engineer take-home assessment**. It provides a public property search experience with filtering and pagination, a property detail page, JWT-based authentication, and role-aware access for admin vs normal users.

The frontend is built using **React + TypeScript + Vite + Tailwind CSS + shadcn/ui**, while the backend is powered by **Node.js + Express + TypeScript + PostgreSQL + Prisma ORM**.


## Table of Contents

- [Real Estate Listings Platform](#real-estate-listings-platform)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [Features](#features)
  - [API Overview](#api-overview)
  - [Role-Based Access Behavior](#role-based-access-behavior)
  - [Testing](#testing)
  - [Key Design Decisions / Tradeoffs](#key-design-decisions--tradeoffs)


## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (recommended: v20+)
- **npm** (recommended: v10+)
- **Docker + Docker Compose** (recommended for database setup)

Optional:
- **PostgreSQL** (only if you prefer not to use Docker instead of the provided Docker setup)

---

## Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd real-estate-listing
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

---

## Configuration

### 1. Database setup (Recommended: Docker)

This project includes a `docker-compose.yml` file for PostgreSQL.

From the project root, start the database container:

```bash
docker compose up -d
```

This starts PostgreSQL with the following configuration:

- **Container name:** `real-estate-postgres`
- **Image:** `postgres:16`
- **Port:** `5432`
- **Database:** `real_estate_db`
- **Username:** `postgres`
- **Password:** `postgres`

To confirm the container is running:

```bash
docker ps
```

If you want to stop the database container later:

```bash
docker compose down
```

If you want to completely reset the database volume:

```bash
docker compose down -v
```

---

### 2. Backend environment configuration

Create a `.env` file inside the `backend/` directory and add copy the content from `.env.example` file.

> **Note:** The `DATABASE_URL` above is aligned with the provided `docker-compose.yml`.

---

### 3. Frontend environment configuration

Create a `.env` file inside the `frontend/` directory and add copy the content from `.env.example` file.

---

### 4. Prisma setup (backend)

After configuring the backend `.env`, run the following commands from the `backend/` directory:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run db:seed
```

This will:

- generate the Prisma client
- apply database migrations
- seed the database with sample users and listings

---

### 5. Sample accounts for review

Below are the seeded accounts you can use to test the application immediately after done seeding.

#### Admin account

```bash
email: admin@techkraft.com
password: Password123!
```

#### Normal user account

```bash
email: user@techkraft.com
password: Password123!
```

---

## Running the Application

1. Start the database (from the project root):

```bash
docker compose up -d
```

2. Start the backend server:

```bash
cd backend
npm run dev
```

3. In a separate terminal, start the frontend server:

```bash
cd frontend
npm run dev
```

4. Open your browser and navigate to:

```text
http://localhost:5173
```

The backend API will be available at:

```text
http://localhost:4000/api
```

---


## Features

- User authentication (Admin and Regular users)
- User registration endpoint
- JWT-based login and current user session check (`/api/auth/me`)
- Public property listings page with:
  - pagination
  - keyword search
  - suburb filter
  - property type filter
  - minimum / maximum price filter
  - minimum bedrooms filter
  - minimum bathrooms filter
- Property detail page
- Role-aware property detail access
- Admin-only visibility of internal listing metadata (`internalStatusNotes`)
- Responsive UI using Tailwind CSS and shadcn/ui
- URL-based filter state for shareable and refresh-safe searches
- Seeded sample data for easy reviewer testing
- Dockerized PostgreSQL local setup

---

## API Overview

### Authentication Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Listings Endpoints

- `GET /api/listings`
- `GET /api/listings/:id`

### Example listings query

```http
GET /api/listings?page=1&limit=9&keyword=family&suburb=Northside&property_type=HOUSE&price_min=500000&price_max=900000&bedrooms_min=3&bathrooms_min=2
```

---

## Role-Based Access Behavior

### `GET /api/listings`

This endpoint is intentionally treated as the **public broker-style search surface**.

- Guests can see **active listings only**
- Normal users can see **active listings only**
- Admin users can also see **active listings only**

### `GET /api/listings/:id`

This endpoint is intentionally **role-aware**.

- Guests and normal users can access **active listings only**
- Admin users can access **all listing statuses**, including:
  - `ACTIVE`
  - `SOLD`
  - `OFF_MARKET`
  - `DRAFT`

### Admin-only metadata

The `internalStatusNotes` field is returned **only for admin users** on the listing detail endpoint.

### How to verify non-active listing access

Use any seeded listing with status `SOLD`, `OFF_MARKET`, or `DRAFT` and open:

```text
http://localhost:5173/listings/<listing-id>
```

Expected behavior:

- **Guest / normal user:** unavailable / not found
- **Admin:** listing detail loads successfully

> **Note:** Listing IDs are generated by the database and will differ per local environment.

---

## Testing

Run the backend test suite from the `backend/` directory:

```bash
cd backend
npm test
```

The backend test coverage focuses on:

- authentication endpoints
- listings endpoints
- role-aware listing detail behavior

> If your project uses a different test script (for example `npm run test` or `npm run test:run`), use the script defined in `backend/package.json`.

---


## Key Design Decisions / Tradeoffs

### 1. Public search vs role-aware detail

I intentionally treated `GET /api/listings` as the public-facing broker search surface, so it returns active listings only for all users. I used `GET /api/listings/:id` to demonstrate role-aware access and admin-only metadata visibility.

### 2. JWT auth kept intentionally simple

For the purposes of the take-home, I implemented a straightforward JWT-based authentication flow. This keeps the authentication layer easy to review while still supporting protected endpoints and role-aware behavior.

### 3. Frontend filter state in URL

Applied filter state is stored in URL query parameters so that:

- filters are shareable
- the page is refresh-safe
- reviewer testing is easier
- pagination and filtering remain consistent

### 4. Public image URLs

I intentionally used seeded public image URLs rather than implementing an upload pipeline, since image upload/storage was not part of the assessment requirements. This kept the implementation focused on the requested product and API behavior.

---
