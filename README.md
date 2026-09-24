# React Construction Management

Enterprise construction project management frontend built with React and TypeScript.

## Architecture

The application uses a feature-oriented frontend architecture with a repository boundary between UI/server-state logic and data sources.

During frontend development, feature repositories use mock data. When the REST backend is available, HTTP repository implementations replace the mock implementations without coupling pages to transport details.

## Planned stack

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- TanStack Table
- React Hook Form
- Zod
- Tailwind CSS
- shadcn/ui
- Lucide React
- Recharts
- date-fns
- Vitest
- React Testing Library
- Playwright

## Development principles

- TypeScript strict mode
- Feature-oriented modules
- API-ready repository interfaces
- Accessible reusable UI components
- Responsive desktop/tablet/mobile layouts
- Consistent construction-domain status semantics
- Tables for operational data and dashboards for summaries/exceptions
- Mock data never imported directly by pages
- Backend authorization remains authoritative when API integration is introduced

## Planned phases

1. Project foundation
2. Design system
3. Application shell
4. Core UI components
5. Data tables and forms
6. API/mock architecture
7. Shared construction domain
8. Projects and project workspace
9. Dashboard
10. Planning, activities, schedule, and daily progress
11. Resources
12. Procurement and commercial
13. Document control
14. Quality and safety
15. Reporting and analytics
16. Enterprise features
17. Field/mobile experience
18. Testing and accessibility
19. Performance and production hardening
20. REST API integration
