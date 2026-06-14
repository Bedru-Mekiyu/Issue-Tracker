<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/Issue%20Tracker-8B5CF6?style=for-the-badge&logo=bugatti&logoColor=white">
    <img alt="Issue Tracker" src="https://img.shields.io/badge/Issue%20Tracker-8B5CF6?style=for-the-badge&logo=bugatti&logoColor=white" width="250">
  </picture>
</p>

<p align="center">
  <strong>Modern, minimalist issue tracking built with Next.js 16</strong>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js" alt="Next.js 16"></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript 5"></a>
  <a href="#"><img src="https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma" alt="Prisma 6"></a>
  <a href="#"><img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql" alt="MySQL"></a>
  <a href="#"><img src="https://img.shields.io/badge/NextAuth-4-EA580C?style=flat-square&logo=google" alt="NextAuth 4"></a>
  <a href="#"><img src="https://img.shields.io/badge/Radix%20UI-3-FFE55C?style=flat-square&logo=radixui" alt="Radix UI"></a>
  <a href="#"><img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS 4"></a>
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License"></a>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Problem & Motivation](#problem--motivation)
- [Key Features](#key-features)
- [User Roles](#user-roles)
- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Database Design](#database-design)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [FAQ](#faq)
- [License](#license)

---

## Overview

**Issue Tracker** is a full-stack web application for creating, managing, and tracking software issues. Built with the latest **Next.js 16 App Router**, it provides a clean, responsive dashboard with real-time status tracking, team assignment, and powerful filtering.

The project uses **Prisma 6** with **MySQL** for persistence, **NextAuth v4** for Google SSO authentication, and **Radix UI Themes** for a polished, accessible interface.

---

## Problem & Motivation

Most issue tracking tools are either:

- **Overly complex** (Jira) — drowning in configuration and workflow management
- **Too simplistic** — lacking the basic features teams actually need
- **Slow and bloated** — heavy SPAs with poor initial load performance

This project was built to fill the gap: a **fast, lightweight** issue tracker that gets out of your way. It prioritizes:

- **Speed** — Server components eliminate client-side waterfalls
- **Simplicity** — Three status states (Open, In Progress, Closed), not a dozen
- **Focus** — Core workflows done well: create, assign, filter, track
- **Modern DX** — TypeScript end-to-end, Prisma ORM, Google SSO in minutes

---

## Key Features

### Dashboard

| Feature | Description | Status |
|---------|-------------|--------|
| Issue Summary Cards | Count of Open, In Progress, and Closed issues with drill-down links | ✅ |
| Bar Chart | Visual distribution of issues by status (Recharts) | ✅ |
| Latest Issues Widget | Shows the 5 most recently created issues with assignee avatars | ✅ |
| Metadata | Dynamic page titles and descriptions per route | ✅ |

### Issue Management

| Feature | Description | Status |
|---------|-------------|--------|
| Create Issue | Title + Markdown description with live preview (EasyMDE) | ✅ |
| Edit Issue | Update title and description with pre-filled form | ✅ |
| Delete Issue | Confirmation dialog before permanent deletion | ✅ |
| View Issue Details | Full markdown rendering of issue description | ✅ |
| Issue Status Badges | Color-coded badges for Open (red), In Progress (violet), Closed (green) | ✅ |

### Issue Listing

| Feature | Description | Status |
|---------|-------------|--------|
| Filter by Status | Dropdown filter — All, Open, In Progress, Closed | ✅ |
| Column Sorting | Clickable column headers for Title, Status, Created date | ✅ |
| Pagination | 10 issues per page with first/prev/next/last controls | ✅ |
| Responsive Table | Status and date columns hidden on mobile | ✅ |

### Assignment

| Feature | Description | Status |
|---------|-------------|--------|
| Assign to User | Dropdown selector on issue detail page | ✅ |
| Unassign | Set issue to unassigned | ✅ |
| User Avatars | Gravatar-style images from Google SSO | ✅ |
| Client-side Caching | User list cached via TanStack React Query (60s stale time) | ✅ |

### Authentication

| Feature | Description | Status |
|---------|-------------|--------|
| Google OAuth | Sign-in with Google account | ✅ |
| JWT Sessions | Stateless auth (no database sessions) | ✅ |
| Route Protection | Middleware guards create/edit routes | ✅ |
| API Authorization | Server-side session check on all mutation endpoints | ✅ |
| Auth UI | Dropdown menu with avatar, name, and sign-out | ✅ |
| Loading States | Skeleton components during auth check | ✅ |

---

## User Roles

| Role | Capabilities | Restrictions |
|------|-------------|-------------|
| **Guest** (Unauthenticated) | View dashboard, browse issue list, view issue details | Cannot create, edit, delete, or assign issues |
| **User** (Authenticated) | Full CRUD on all issues, assign/unassign any user | None within the application |

> **Note:** There is no RBAC beyond authenticated vs. unauthenticated. All authenticated users share equal permissions.

---

## Screenshots

| Dashboard | Issue List | Issue Detail |
|-----------|-----------|-------------|
| Summary cards + chart + latest issues | Filtered, sortable, paginated table | Markdown description + actions panel |
| <img src="public/screenshot-dashboard.svg" width="260" alt="Dashboard preview"/> | <img src="public/screenshot-issue-list.svg" width="260" alt="Issue list preview"/> | <img src="public/screenshot-issue-detail.svg" width="260" alt="Issue detail preview"/> |

> Replace these placeholder SVGs with actual screenshots by running the app, capturing screen grabs, and saving them to `public/screenshot-*.png`.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser                           │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐ │
│  │ Next.js  │  │ Radix UI │  │ Tailwind CSS v4   │ │
│  │ App      │  │ Themes   │  │ Utility Classes   │ │
│  │ Router   │  │ Components│  │                   │ │
│  └──────────┘  └──────────┘  └───────────────────┘ │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐ │
│  │ TanStack │  │ React    │  │ React Hook Form   │ │
│  │ React    │  │ Markdown │  │ + Zod Validation  │ │
│  │ Query    │  │ (render) │  │                   │ │
│  └──────────┘  └──────────┘  └───────────────────┘ │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP (JSON)
┌──────────────────────▼──────────────────────────────┐
│              Next.js API Routes                      │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────┐ │
│  │ POST     │  │ PATCH/DELETE │  │ GET           │ │
│  │ /api/    │  │ /api/issues/ │  │ /api/users    │ │
│  │ issues   │  │ [id]         │  │               │ │
│  └──────────┘  └──────────────┘  └───────────────┘ │
│  ┌──────────────────────────────────────────────────┐│
│  │          NextAuth v4 (Google OAuth + JWT)        ││
│  └──────────────────────────────────────────────────┘│
└──────────────────────┬──────────────────────────────┘
                       │ Prisma ORM
┌──────────────────────▼──────────────────────────────┐
│                   MySQL Database                      │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐ │
│  │ Issue    │  │ User     │  │ Account/Session/  │ │
│  │ (core)   │  │ (auth)   │  │ VerificationToken │ │
│  └──────────┘  └──────────┘  └───────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### Data Flow

1. **Server Components** fetch data directly from Prisma (dashboard, issue list, issue detail)
2. **Client Components** handle interactivity: forms, filters, pagination, assignment
3. **API Routes** serve as the mutation layer (create, update, delete) with auth + validation
4. **TanStack React Query** manages client-side cache for the users list (used in AssigneeSelect)
5. **NextAuth** manages the auth session via JWT, checked in middleware and API routes

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 16.0.5 | React framework with App Router |
| [React](https://react.dev/) | 19.2.0 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type safety |
| [Radix UI Themes](https://www.radix-ui.com/themes) | 3.2.1 | Design system & accessible components |
| [Radix UI Icons](https://www.radix-ui.com/icons) | 1.3.2 | Icon set |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first CSS |
| [TanStack React Query](https://tanstack.com/query/) | 5.90.12 | Server state management |
| [React Hook Form](https://react-hook-form.com/) | 7.67.0 | Form state management |
| [Zod](https://zod.dev/) | 4.1.13 | Schema validation |
| [EasyMDE](https://github.com/Ionaru/easy-markdown-editor) | via react-simplemde-editor | Markdown editor |
| [React Markdown](https://github.com/remarkjs/react-markdown) | 8.0.7 | Markdown rendering |
| [Recharts](https://recharts.org/) | 3.5.1 | Charting library |
| [React Hot Toast](https://react-hot-toast.com/) | 2.6.0 | Toast notifications |
| [React Loading Skeleton](https://github.com/dvtng/react-loading-skeleton) | 3.3.1 | Skeleton loading states |
| [Axios](https://axios-http.com/) | 1.13.2 | HTTP client |
| [Classnames](https://github.com/JedWatson/classnames) | 2.5.1 | Conditional CSS classes |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) | 16.x | Serverless API handlers |
| [Prisma](https://www.prisma.io/) | 6.2.1 | ORM & migrations |
| [NextAuth](https://next-auth.js.org/) | 4.24.13 | Authentication |
| [Zod](https://zod.dev/) | 4.1.13 | Input validation |

### Database

| Technology | Version | Purpose |
|------------|---------|---------|
| MySQL | — | Primary database |
| Prisma Migrate | 6.2.1 | Schema migrations |

---

## Database Design

### Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐
│      Issue      │       │      User       │
├─────────────────┤       ├─────────────────┤
│ id (Int, PK)    │       │ id (String, PK) │
│ title (String)  │       │ name (String?)  │
│ description(Text)│      │ email (String?) │
│ status (Enum)   │──┐    │ emailVerified   │
│ createdAt       │  │    │ image (String?) │
│ updatedAt       │  │    └────────┬────────┘
│ assignedToUserId│──┘             │
└─────────────────┘                │
                                   │
                                   │  NextAuth
                                   │  Relations
                                   │
                          ┌────────┴────────┐
                          │     Account      │
                          │     Session      │
                          │ VerificationToken│
                          └─────────────────┘
```

### Issue Status Enum

| Value | Badge Color | Meaning |
|-------|------------|---------|
| `OPEN` | Red | Issue created but not yet addressed |
| `IN_PROGRESS` | Violet | Work is actively underway |
| `CLOSED` | Green | Issue is resolved |

### Key Relationships

- **Issue → User (assignedToUser)**: Optional many-to-one via `assignedToUserId`
- **User → Account**: One-to-many (OAuth provider accounts)
- **User → Session**: One-to-many (auth sessions — unused with JWT strategy)
- **User → Issue (assignedIssues)**: One-to-many (issues assigned to this user)

### Migration History

| Migration | Description |
|-----------|-------------|
| `20251130005145_issue_tracker` | Initial issue tracker schema |
| `20251130174217_migrations` | Schema refinements |
| `20251204114004_adding_user_model` | NextAuth user model |
| `20251205090046_adding_iuse_to_user` | Issue-user assignment relationship |

---

## API Reference

All API routes are defined under `app/api/`.

### Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handler (sign-in, callback, session, sign-out) |

### Issues

#### `POST /api/issues`

Create a new issue (requires authentication).

**Request Body:**
```json
{
  "title": "Fix login button alignment",
  "description": "The login button is misaligned on mobile **screens**."
}
```

**Validation:**
- `title`: string, 1–255 characters, required
- `description`: string, 1–65535 characters, required

**Responses:**
- `201` — Issue created successfully
- `400` — Validation error
- `401` — Unauthorized

---

#### `PATCH /api/issues/[id]`

Update an existing issue (requires authentication). All fields optional.

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description with *markdown*",
  "assignedToUserId": "clxxxxxxx"
}
```

**Validation:**
- `title`: string, 1–255, optional
- `description`: string, 1–65535, optional
- `assignedToUserId`: string (valid user ID) or `null` (unassign), optional

**Responses:**
- `200` — Issue updated
- `400` — Validation error
- `401` — Unauthorized
- `404` — Issue or assigned user not found

---

#### `DELETE /api/issues/[id]`

Permanently delete an issue (requires authentication).

**Responses:**
- `200` — Issue deleted
- `401` — Unauthorized
- `404` — Issue not found

### Users

#### `GET /api/users`

List all registered users (no authentication required).

**Query params:** `orderBy: { name: 'asc' }`

**Response:**
```json
[
  {
    "id": "clxxxxxxx",
    "name": "John Doe",
    "email": "john@example.com",
    "emailVerified": null,
    "image": "https://..."
  }
]
```

---

## Getting Started

### Prerequisites

- **Node.js** 20.x or later
- **npm** 10.x or later
- **Docker Desktop** (recommended for local MySQL — see `docker-compose.yml`)
- **MySQL** 8.0+ (if not using Docker)
- A **Google Cloud Platform** project with OAuth 2.0 credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/issue-tracker.git
cd issue-tracker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values (see Environment Variables section)

# Start MySQL via Docker (optional — requires Docker Desktop)
docker compose up -d

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/issue_tracker"

# Google OAuth (create at https://console.cloud.google.com/apis/credentials)
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-at-least-32-chars"
```

### Variable Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | ✅ | — | MySQL connection string |
| `GOOGLE_CLIENT_ID` | ✅ | — | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | ✅ | — | Google OAuth client secret |
| `NEXTAUTH_URL` | ✅ | — | Full URL of the deployed app |
| `NEXTAUTH_SECRET` | ✅ | — | Random string for JWT encryption |

> **Security**: Never commit `.env` to version control. The `.gitignore` already excludes `.env*` files.

---

## Development Workflow

```bash
# Start development server with Turbopack
npm run dev

# Type-check the codebase
npx tsc --noEmit

# Lint
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### Project Structure

```
├── app/
│   ├── api/                    # API route handlers
│   │   ├── auth/[...nextauth]  #  NextAuth
│   │   ├── issues/             # Issue CRUD
│   │   └── users/              # User listing
│   ├── auth/                   # Auth config & provider
│   ├── components/             # Shared UI components
│   │   ├── ErrorMessage.tsx
│   │   ├── IssueStatusBadge.tsx
│   │   ├── Link.tsx
│   │   ├── Pagination.tsx
│   │   └── Spinner.tsx
│   ├── Issues/
│   │   ├── _components/        # Form components (SSR-safe)
│   │   ├── [id]/               # Issue detail page
│   │   ├── edit/[id]/          # Edit page
│   │   ├── list/               # Issue list with filtering
│   │   └── new/                # Create issue page
│   ├── IssueChart.tsx          # Dashboard bar chart
│   ├── IssueSummary.tsx        # Dashboard summary cards
│   ├── LatestIssues.tsx        # Dashboard latest issues
│   ├── NavBar.tsx              # Top navigation
│   ├── QueryClientProvider.tsx  # TanStack Query provider
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Dashboard (home page)
│   └── validationSchema.ts     # Zod schemas
├── lib/
│   ├── prisma.ts              # Prisma client singleton
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Migration history
├── docker/
│   └── mysql/init/             # Docker MySQL initialization scripts
├── public/                     # Static assets & screenshots
│   ├── screenshot-dashboard.svg
│   ├── screenshot-issue-list.svg
│   └── screenshot-issue-detail.svg
├── tests/                      # Vitest test suite
│   ├── api/
│   ├── components/
│   ├── lib/
│   └── setup.ts
├── .env.example                # Environment variable template
├── docker-compose.yml          # Local MySQL service
├── CONTRIBUTING.md             # Contribution guide
├── vitest.config.ts            # Test runner configuration
├── middleware.ts               # Route protection
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```

### Component Patterns

- **Server Components** (default in App Router) for data fetching and static rendering
- **Client Components** (marked with `'use client'`) for interactivity, event handlers, hooks
- **Dynamic imports** for heavy client libraries (EasyMDE via `next/dynamic`)
- **React.cache** for deduplicating database queries in parallel server components

---

## Testing

Unit and validation tests are written with **Vitest**.

```bash
# Run all tests
npm run test

# Watch mode (auto-rerun on changes)
npm run test:watch

# With coverage report
npm run test:coverage
```

### Test Structure

```
tests/
├── api/
│   └── issues.test.ts           # Zod schema validation tests
├── components/
│   ├── IssueStatusBadge.test.tsx # Badge color/label mapping
│   └── Pagination.test          # Pagination logic tests
├── lib/
│   └── prisma.test.ts           # Singleton pattern verification
└── setup.ts                     # Vitest globals + mocks
```

### What's Tested

| Area | Coverage | Notes |
|------|----------|-------|
| Zod Schemas | `IssueSchema`, `patchIssueSchema` | Title length, description length, field optionality |
| IssueStatusBadge | All 3 status values | Label and color mapping |
| Pagination | Page count, boundary conditions | First/last page disabling, hide logic |
| Prisma Singleton | Global caching pattern | Dev vs production behavior |

> **Planned**: Component rendering tests (React Testing Library), API integration tests (supertest), and E2E tests (Playwright).

---

## Deployment

### Deploy on Vercel (Recommended)

The project is fully compatible with Vercel's Next.js deployment.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your repository to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add the required [environment variables](#environment-variables)
4. Deploy

### Manual Build

```bash
npm run build
npm start
```

### Database

You need a publicly accessible MySQL database. Recommended providers:

- [PlanetScale](https://planetscale.com/) (MySQL-compatible serverless)
- [Aiven](https://aiven.io/mysql)
- [Railway](https://railway.app/) (MySQL plugin)

Run migrations against the production database:

```bash
DATABASE_URL="mysql://..." npx prisma migrate deploy
```

### Prisma Client

Prisma Client is automatically generated during `next build`. Ensure your build process includes:

```bash
npx prisma generate
```

---

## Security

### Authentication

- **Google OAuth 2.0** is the sole authentication provider
- **JWT strategy** — no session records stored in the database
- Protected routes are enforced at two levels:
  - **Middleware**: Guards `/Issues/new` and `/Issues/edit/[id]` routes
  - **API checks**: Every mutation endpoint calls `getServerSession()`

### Input Validation

- **Zod schemas** validate all API request bodies
- Title capped at 255 characters
- Description capped at 65,535 characters
- assignedToUserId validated against existing users in the database

### Data Protection

- **Markdown rendering** via `react-markdown` (safe by default — no HTML execution)
- **Prisma parameterized queries** prevent SQL injection
- **Environment secrets** managed via `.env` (excluded from git)

### HTTPS

Enforce HTTPS in production (Vercel provides this by default).

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide — including code conventions, commit format, PR process, testing guidelines, and database change workflows.

Quick reference:

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run Vitest
npm run typecheck    # TypeScript check (tsc --noEmit)
npx prisma studio   # Open Prisma Studio (DB GUI)
npx prisma migrate  # Create/apply migrations
```

---

## Roadmap

### Short Term

- [x] **Testing suite** (Vitest unit tests)
- [ ] **User-based authorization** (issue creators can delete their own issues)
- [ ] **Search** — full-text search across issue titles and descriptions
- [ ] **Notifications** — email or in-app notifications for assignments

### Medium Term

- [ ] **Comments/activity log** on issues
- [ ] **File attachments** on issues
- [ ] **Dark mode** support
- [x] **Docker Compose** setup for local development
- [ ] **GitHub Actions CI** — lint, type-check, test, deploy

### Long Term

- [ ] **Multi-project support** (organize issues by project)
- [ ] **Webhooks** for third-party integrations
- [ ] **SSO providers** (GitHub, Microsoft, SAML)
- [ ] **API tokens** for programmatic access

---

## FAQ

### Can I use PostgreSQL instead of MySQL?

The Prisma schema uses `mysql` provider. To switch to PostgreSQL, change the provider in `prisma/schema.prisma` and adjust any `@db.VarChar` annotations to the PostgreSQL equivalents. Run `npx prisma migrate dev` to regenerate migrations.

### How do I add more OAuth providers?

Edit `app/auth/authOptions.ts` and add additional NextAuth providers (e.g., GitHub, Twitter). See the [NextAuth providers documentation](https://next-auth.js.org/providers/).

### Why is there no sign-up page?

Sign-up is handled entirely by Google OAuth. Any user with a Google account can sign in. The first sign-in creates a user record automatically via the Prisma adapter.

### How do I view the database?

Run `npx prisma studio` to open Prisma Studio — a web-based GUI for browsing and editing data.

### How do I set up a local MySQL database?

Use Docker Compose (requires Docker Desktop):

```bash
docker compose up -d
```

This starts a MySQL 8.0 container on port 3306 with the credentials from `docker-compose.yml`. Use `DATABASE_URL="mysql://app:app_password@localhost:3306/issue_tracker"` in your `.env`.

### How do I run the tests?

```bash
npm run test          # Run once
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

---

## License

[MIT](LICENSE)

---

## Acknowledgements

- [Next.js](https://nextjs.org/) — The React framework
- [Prisma](https://www.prisma.io/) — Database toolkit
- [NextAuth.js](https://next-auth.js.org/) — Authentication
- [Radix UI](https://www.radix-ui.com/) — Accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Vercel](https://vercel.com/) — Deployment platform
- [Recharts](https://recharts.org/) — Charting library
- [EasyMDE](https://github.com/Ionaru/easy-markdown-editor) — Markdown editor
- [TanStack Query](https://tanstack.com/query/latest/) — Data fetching
- [React Hot Toast](https://react-hot-toast.com/) — Toast notifications
- [Zod](https://zod.dev/) — Schema validation
- [React Hook Form](https://react-hook-form.com/) — Form management

---

<p align="center">
  Built by the community &middot; Powered by Next.js
</p>
