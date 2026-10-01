# React Construction Management

Enterprise construction project management frontend built with React, TypeScript, and Vite.

## Architecture

The application uses feature-oriented modules with repository interfaces separating UI/server-state logic from transport and persistence.

```text
React page
  → feature hook
  → TanStack Query
  → repository interface
  → mock repository | HTTP repository
  → REST API
```

Mock repositories remain useful for local demonstrations. Production integrations can enable the HTTP repositories without changing pages or feature hooks.

## Stack

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- TanStack Table
- React Hook Form
- Zod
- Lucide React
- Recharts
- date-fns
- Vitest
- React Testing Library
- Playwright

## Development

Use Node.js 22.

```bash
npm install
npm run dev
```

Quality commands:

```bash
npm run lint
npm test
npm run build
npm run test:e2e
```

## Data providers

Mock data is the default:

```env
VITE_DATA_PROVIDER=mock
VITE_API_BASE_URL=/api/v1
VITE_APP_ENV=development
```

To use a REST backend:

```env
VITE_DATA_PROVIDER=http
VITE_API_BASE_URL=/api/v1
VITE_APP_ENV=production
```

The backend remains authoritative for authentication, authorization, validation, audit integrity, and persistence.

## Functional coverage

The project workspace includes planning and WBS, activities and schedule, daily progress, manpower, equipment, materials, procurement, subcontractors, variations, cost control, documents, drawings, RFIs, inspections, quality, safety, issues and actions, reports, analytics, search, notifications, audit trail, project users, and site attachments.

## Quality and release

The repository includes:

- strict TypeScript configuration
- linting
- unit/component tests
- Playwright desktop and mobile journeys
- accessible shared interaction primitives
- route-level lazy loading
- application error recovery
- validated runtime environment configuration
- mock/HTTP repository switching
- GitHub Actions release verification

CI gates linting, unit tests, production build, and Playwright before a change is considered release-ready.
