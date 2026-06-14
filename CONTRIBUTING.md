# Contributing to Issue Tracker

First off, thank you for considering contributing! We welcome contributions from everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Database Changes](#database-changes)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

This project follows a **Contributor Covenant** code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

**Our Pledge**: In the interest of fostering an open and welcoming environment, we pledge to make participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/issue-tracker.git
   cd issue-tracker
   ```
3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/original-owner/issue-tracker.git
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```

## Development Setup

### Prerequisites

- **Node.js** 20.x or later
- **npm** 10.x or later
- **Docker Desktop** (for local MySQL — see `docker-compose.yml`)
- A **Google Cloud Platform** project with OAuth 2.0 credentials

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start MySQL via Docker
docker compose up -d

# 3. Copy and configure environment variables
cp .env.example .env
# Edit .env — see Environment Variables section below

# 4. Run database migrations
npx prisma migrate dev

# 5. Start the dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | MySQL connection string |
| `GOOGLE_CLIENT_ID` | ✅ | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | ✅ | Google OAuth client secret |
| `NEXTAUTH_URL` | ✅ | Full URL of the deployment |
| `NEXTAUTH_SECRET` | ✅ | Random string >= 32 chars for JWT |

See `.env.example` for detailed instructions.

## Project Structure

```
├── app/
│   ├── api/                    # Route handlers
│   │   ├── auth/[...nextauth]  # NextAuth handler
│   │   ├── issues/             # Issue CRUD endpoints
│   │   └── users/              # User listing
│   ├── auth/                   # Auth config & SessionProvider
│   ├── components/             # Shared UI (Badge, Pagination, Spinner, etc.)
│   ├── Issues/
│   │   ├── _components/        # Private form components
│   │   ├── [id]/               # Issue detail + assign/delete/edit
│   │   ├── edit/[id]/          # Edit issue page
│   │   ├── list/               # Filterable, sortable, paginated list
│   │   └── new/                # Create issue page
│   ├── NavBar.tsx              # Navigation + auth status
│   ├── QueryClientProvider.tsx  # TanStack Query provider
│   ├── layout.tsx              # Root layout (Radix, Auth, Query providers)
│   ├── page.tsx                # Dashboard (summary, chart, latest)
│   └── validationSchema.ts     # Zod schemas
├── lib/
│   └── prisma.ts              # Prisma client singleton
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Migration history
├── public/                     # Static assets & screenshots
├── middleware.ts               # Auth route protection
└── tests/                      # Test suite (Vitest)
```

## Coding Standards

### General

- **TypeScript** only — strict mode enabled in `tsconfig.json`
- Use `const` / `let`, never `var`
- Prefer `async/await` over raw promises
- No `any` types unless absolutely necessary; prefer `unknown` + type guards

### React & Next.js

- **Server Components** (no `'use client'`) are the default — use them for data fetching
- Only add `'use client'` when you need hooks, event handlers, or browser APIs
- Extract interactive UI into client components; keep data fetching in server components
- Use `next/dynamic` for heavy client-only libraries (e.g., EasyMDE)
- Prefer `react.cache()` for deduplicating database queries in parallel server components

### Styling

- Use **Tailwind CSS** utility classes for layout and spacing
- Use **Radix UI Theme** components for buttons, cards, dialogs, tables, dropdowns
- Use `classnames` package for conditional class merging
- Follow the existing `nav-link` pattern for reusable utility classes

### Forms & Validation

- Use **React Hook Form** for form state
- Define **Zod schemas** in `app/validationSchema.ts`
- Use `@hookform/resolvers/zod` to bridge the two
- Display errors via the `ErrorMessage` component

### Database

- All schema changes go through **Prisma Migrate**
- Never modify the database directly
- Use `prisma.ts` singleton (never `new PrismaClient()` in route handlers)

## Commit Conventions

We use **Conventional Commits**:

```
<type>(<scope>): <description>

[optional body]
```

### Types

| Type | Usage |
|------|-------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting, missing semicolons, etc. |
| `refactor` | Code restructuring |
| `test` | Adding/updating tests |
| `chore` | Build, CI, dependencies |

### Examples

```
feat(issues): add comment thread on issue detail page
fix(auth): handle expired session token redirect
docs(readme): add deployment section
test(issues): add unit tests for IssueSchema validation
chore(deps): upgrade Prisma to 6.3.0
```

## Pull Request Process

1. **Create an issue** first describing what you want to change (unless it's a trivial fix)
2. **Keep PRs focused** — one feature/fix per PR
3. **Write tests** for new functionality
4. **Update documentation** if you change the API, env vars, or add features
5. **Ensure all checks pass**:
   ```bash
   npm run lint        # ESLint
   npx tsc --noEmit   # TypeScript check
   npm run test        # Vitest
   ```
6. **Squash commits** into logical units before requesting review
7. Reference the issue in your PR description: `Closes #123`

### PR Title Format

Same as commit convention:
```
feat(issues): add comment thread
fix(dashboard): correct chart color mapping
```

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test -- --watch

# With coverage
npm run test -- --coverage
```

### Test Structure

Tests live in the `tests/` directory and mirror the app structure:

```
tests/
├── api/
│   ├── issues.test.ts          # API endpoint tests
│   └── users.test.ts
├── components/
│   ├── IssueStatusBadge.test.tsx
│   ├── Pagination.test.tsx
│   └── Spinner.test.tsx
├── lib/
│   └── validation.test.ts      # Zod schema tests
└── setup.ts                    # Vitest setup (globals, mocks)
```

### Writing Tests

- **Unit tests**: Test individual functions, components, and schemas in isolation
- **API tests**: Use `fetch` or `supertest` against route handlers (requires running app)
- **Component tests**: Use React Testing Library for rendering and interactions

### Mocking Strategy

- `@prisma/client` — use `vi.mock` to mock the Prisma client
- `next-auth` — mock `getServerSession` for API route tests
- `next/navigation` — mock `useRouter`, `useSearchParams` for component tests

## Database Changes

1. Edit `prisma/schema.prisma`
2. Create a migration:
   ```bash
   npx prisma migrate dev --name describe_your_change
   ```
3. Review the generated SQL in `prisma/migrations/`
4. Regenerate the client:
   ```bash
   npx prisma generate
   ```
5. Commit both `schema.prisma` and the migration folder

> **Warning**: Never edit migration files after they're committed. Create a new migration instead.

## Reporting Issues

### Bug Reports

When filing a bug, include:

- **Steps to reproduce** (minimal, complete, verifiable example)
- **Expected behavior** vs **actual behavior**
- **Screenshots** if visible
- **Environment**: Node version, browser, OS, database provider
- **Console errors** (if any)

### Feature Requests

Describe:

- **What** you want to add
- **Why** it's useful (the problem it solves)
- **How** it should work (optional — maintainers will help design)

---

Thank you for contributing!
