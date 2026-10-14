<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Guidelines & Agent Rules

## 1. Project Directory Structure & Organization

The codebase strictly follows a clean full-stack Next.js architecture separating Frontend Client layers from Backend Express-style Server layers:

```text
ai-recruite/
├── app/                                       # Next.js App Router (UI Routes & API Endpoints)
│   ├── (auth)/                               # Public Auth Pages (login, register, forgot-password)
│   │   ├── forgot-password/
│   │   ├── login/
│   │   └── register/
│   │       ├── candidate/
│   │       └── employer/
│   ├── (candidate)/candidate/                # Candidate Portal (10 Full Pages)
│   │   ├── ai-interview/                     # AI Pre-screening Interview runner & report
│   │   ├── applied-jobs/                     # 5-Stage timeline application tracker
│   │   ├── chat/                             # Direct messaging with AI tone polisher
│   │   ├── cv-manager/                       # ATS gauge & STAR diff editor
│   │   ├── dashboard/                        # Candidate overview metrics & recommendations
│   │   ├── find-jobs/                        # Job search with faceted filters
│   │   │   └── [job_slug]/                   # Job details & AI application modal
│   │   ├── interviews/                       # Scheduled final interviews & calendar sync
│   │   ├── profile/                          # Candidate profile & credentials
│   │   ├── saved-jobs/                       # Bookmarked jobs
│   │   └── settings/                         # Candidate preferences & security
│   ├── (employer)/employer/                  # Employer Portal (8 Full Pages)
│   │   ├── candidates/                       # Candidate explorer & evaluation drawer
│   │   ├── chat/                             # Recruiter direct messaging
│   │   ├── company-profile/                  # Company branding & details
│   │   ├── dashboard/                        # Hiring funnel metrics & active jobs
│   │   ├── interviews/                       # Interview scheduling & management
│   │   ├── my-jobs/                          # Active & draft job postings
│   │   ├── post-job/                         # Job post wizard with 5 AI weight sliders
│   │   └── settings/                         # Settings (ai, billing, company, notifications, security, team)
│   ├── (marketing)/                          # Public Landing Page (/)
│   ├── (onboarding)/onboarding/              # Post-signup Onboarding Wizards
│   │   ├── candidate/
│   │   └── employer/
│   └── api/                                  # Thin Route Handlers (Delegate to server/controllers/)
│       └── auth/
│           ├── login/route.ts                # POST -> delegates to authController.login(req)
│           ├── register/route.ts             # POST -> delegates to authController.register(req)
│           ├── resend-verification/route.ts  # POST -> delegates to authController.resendVerification(req)
│           └── verify-email/route.ts         # GET  -> delegates to authController.verifyEmail(req)
│
├── server/                                   # ⚙️ BACKEND ARCHITECTURE (Express-style Clean Layers)
│   ├── controllers/                          # Controllers: Request parsing, validation, HTTP response
│   │   └── auth.controller.ts
│   └── services/                             # Backend Services: Business logic, bcryptjs & Prisma DB access
│       ├── auth.service.ts
│       └── mail.service.ts                   # Transactional email dispatcher & HTML template
│
├── services/                                 # 🌐 FRONTEND CLIENT SERVICES (Client-side HTTP Fetchers)
│   ├── api.ts                                # Axios/fetch wrapper with interceptors & typed methods
│   └── auth/
│       └── auth.service.ts                   # Client caller for UI forms (calls /api/auth/*)
│
├── types/                                    # 🏷️ Centralized TypeScript Definitions (Strictly in root types/)
│   ├── auth/
│   │   └── auth.types.ts
│   ├── candidate/                            # Candidate page-specific type definitions
│   │   ├── ai-interview.types.ts
│   │   ├── applied-jobs.types.ts
│   │   ├── cv-manager.types.ts
│   │   ├── dashboard.types.ts
│   │   ├── find-jobs.types.ts
│   │   ├── interviews.types.ts
│   │   ├── job-details.types.ts
│   │   ├── onboarding.types.ts
│   │   ├── profile.types.ts
│   │   ├── saved-jobs.types.ts
│   │   └── settings.types.ts
│   ├── employer/                             # Employer page-specific type definitions
│   │   ├── ai-settings.types.ts
│   │   ├── candidates.types.ts
│   │   ├── company-profile.types.ts
│   │   ├── interviews.types.ts
│   │   ├── my-jobs.types.ts
│   │   ├── notification.types.ts
│   │   ├── onboarding.types.ts
│   │   ├── post-job.types.ts
│   │   └── schedule-interview.types.ts
│   ├── chat/
│   │   └── chat.types.ts
│   ├── notification/
│   │   └── notification.types.ts
│   └── global.types.ts                       # Shared application-wide types
│
├── hooks/                                    # 🪝 Custom React Hooks (Created upon real API integration)
│   └── auth/
│       └── use-auth.ts
│
├── components/                               # Reusable UI & Layout Components
│   ├── layouts/                              # Header, Sidebar, Footer, Notification dropdown
│   ├── modals/                               # Global modals (Withdraw, Confirm, etc.)
│   ├── shared/                               # Cross-portal reusable components
│   └── ui/                                   # Base primitives & visual elements
│
├── lib/                                      # Utilities & Singletons
│   ├── prisma.ts                             # Global PrismaClient singleton with @prisma/adapter-neon
│   ├── api-response.ts                       # Standard API response helpers (successResponse, errorResponse)
│   ├── constants.ts                          # App constants & configurations
│   └── utils.ts                              # Class merging (cn) & common helpers
│
├── prisma/
│   └── schema.prisma                         # Prisma 7 PostgreSQL schema (Synced with Neon)
├── prisma.config.ts                          # Prisma 7 Config (Datasource URL for CLI & Migrations)
├── providers/                                # Context Providers (Toaster, Theme, AntD Config)
│   └── toaster.provider.tsx
├── store/                                    # Zustand Client State Slices
│   ├── index.ts
│   └── slices/
├── public/                                   # Static assets, icons, and illustrations
└── AGENTS.md                                 # Codebase Guidelines & Architectural Rules
```

---

## 2. Type Declarations & Organization
- **Never create local `types.ts` or place type files inside page or `_components/` folders.**
- **All types must reside in the root `types/` directory**, organized by module and page/feature name:
  - Pattern: `types/<module>/<page-name>.types.ts`
  - Examples:
    - Auth types: `types/auth/auth.types.ts`
    - Employer post job page (`/employer/post-job`): `types/employer/post-job.types.ts`
    - Employer my jobs page (`/employer/my-jobs`): `types/employer/my-jobs.types.ts`
    - Candidate saved jobs page (`/candidate/saved-jobs`): `types/candidate/saved-jobs.types.ts`
    - Chat types: `types/chat/chat.types.ts`
    - Notification types: `types/notification/notification.types.ts`
  - Global and shared application-wide types belong in `types/global.types.ts`.
- Components, hooks, and services must import types directly from `@/types/<module>/<page-name>.types`.

---

## 3. Frontend Client Services Architecture (`services/`)
- **The root `services/` directory is strictly dedicated to Frontend Client API Services** that perform HTTP requests (`fetch` or `api.ts` calls) from the browser/components to Next.js Route Handlers (`/api/*`).
- **Never put server-side database logic, Prisma queries, or private secrets in `services/`.**
- **Only create services when API integration happens.** In the static UI phase, manage state and mock data within client components and local `dummy.ts` files.
- **Never create local service or API files inside page or `_components/` folders.**
- When API integration begins, all frontend client services reside in `services/`, organized by module and feature:
  - Pattern: `services/<module>/<page-or-feature-name>.service.ts`
  - Examples:
    - Auth client service: `services/auth/auth.service.ts`
    - Employer post job service: `services/employer/post-job.service.ts`
    - Candidate saved jobs service: `services/candidate/saved-jobs.service.ts`
  - Core HTTP client and base fetcher reside in `services/api.ts`.
- UI Components and hooks import services directly from `@/services/<module>/<page-or-feature-name>.service`.

---

## 4. Backend Architecture & Clean Separation (`server/` & `app/api/`)
The backend follows an Express-style Layered Clean Architecture (Route ➔ Controller ➔ Service ➔ Database):

- **Route Layer (`app/api/<module>/.../route.ts`):**
  - Next.js App Router Route Handlers act strictly as thin entry points.
  - Do NOT write business or database logic inside `route.ts`.
  - Simply delegate the request to the corresponding controller:
    ```typescript
    import { NextRequest } from "next/server";
    import { authController } from "@/server/controllers/auth.controller";

    export async function POST(req: NextRequest) {
      return authController.register(req);
    }
    ```

- **Controller Layer (`server/controllers/<module>.controller.ts`):**
  - Responsible for HTTP request parsing (`req.json()`, `req.nextUrl.searchParams`), input validation, and sending HTTP responses (`NextResponse.json(...)` or `successResponse`/`errorResponse` from `@/lib/api-response`).
  - Calls the backend service to perform business logic.
  - Catches domain errors (`AuthError`, etc.) and maps them to appropriate HTTP status codes (`400`, `401`, `404`, `409`, `500`).

- **Service Layer (`server/services/<module>.service.ts`):**
  - Contains pure backend business logic, password hashing (`bcryptjs`), and database operations via Prisma (`@/lib/prisma`).
  - Never import `NextResponse` or client-side packages here. Throws typed/custom errors for the controller to handle.

---

## 5. Database & Prisma ORM Architecture (PostgreSQL on Neon)
- **Prisma 7 Standards:**
  - `prisma/schema.prisma` defines data models, enums, and relations without the deprecated `url` property in `datasource db`.
  - `prisma.config.ts` in the project root configures connection URLs for Prisma CLI and migrations using `DATABASE_URL_UNPOOLED`.
  - `lib/prisma.ts` initializes the global singleton `PrismaClient` using the `@prisma/adapter-neon` driver adapter with `DATABASE_URL` (pooled connection for high concurrency).
  - Standardized JSON API responses are formatted using `lib/api-response.ts` (`successResponse`, `errorResponse`).

---

## 6. Custom Hooks Architecture & Organization
- **Only create custom hooks when API integration / real backend data fetching happens.** Do not create unnecessary custom hooks during the static UI phase.
- **Never create local custom hooks inside page or `_components/` folders.**
- When API integration begins, all custom hooks reside in the root `hooks/` directory, organized by module:
  - Pattern: `hooks/<module>/use-<page-or-feature-name>.ts`
  - Examples:
    - Auth hook: `hooks/auth/use-auth.ts`
    - Candidate hook: `hooks/candidate/use-candidate.ts`
    - Employer hook: `hooks/employer/use-employer.ts`
  - Shared, cross-module hooks reside at the root of `hooks/` (e.g., `hooks/use-debounce.ts`, `hooks/use-media-query.ts`).
- Components import hooks directly from `@/hooks/<module>/use-<page-or-feature-name>`.

---

## 7. Component Architecture & Modularity
- **Avoid monolithic components**: Keep components concise, focused, and maintainable (aim for under 150-200 lines). Break large views and forms down into subcomponents inside a local `_components/` directory.
- **Identify and extract repetitive UI**: Whenever repetitive UI patterns appear (e.g., section cards, section headers, selectable option/radio cards, toggle items), extract them into clean, reusable components.
- **Modals & Dialogs**: Always use Ant Design's `<Modal />` component (`import { Modal } from "antd"`) with `open`, `onCancel`, `footer={null}`, `destroyOnHidden`, `centered`, and custom content rather than creating raw custom `fixed inset-0` modal wrappers.
- **Layouts & Modals Directory**:
  - Global navigation headers, sidebars, and dropdowns reside in `components/layouts/`.
  - Cross-page modals reside in `components/modals/`.
  - Shared visual primitives reside in `components/ui/` and `components/shared/`.

---

## 8. Code Conventions
- Do not import default `React` (`import React from "react";`) in modern Next.js/React files unless utilizing named types (e.g., `import type { ReactNode } from "react"`).
- Keep Tailwind CSS classes clean, idiomatic, and favor design tokens/utilities.
- All client-side state is managed with Zustand in `store/` (`store/slices/`).
- App-level providers (e.g., Sonner toaster) are placed in `providers/`.
