<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Guidelines & Agent Rules

## 1. Type Declarations & Organization
- **Never create local `types.ts` or place type files inside page or `_components/` folders.**
- **All types must reside in the root `types/` directory**, organized by module and page/feature name:
  - Pattern: `types/<module>/<page-name>.types.ts`
  - Examples:
    - Employer post job page (`/employer/post-job`): `types/employer/post-job.types.ts`
    - Employer my jobs page (`/employer/my-jobs`): `types/employer/my-jobs.types.ts`
    - Employer notifications page (`/employer/settings/notifications`): `types/employer/notification.types.ts`
    - Candidate saved jobs page (`/candidate/saved-jobs`): `types/candidate/saved-jobs.types.ts`
  - Global and shared application-wide types belong in `types/global.types.ts`.
- Components and pages must import types directly from `@/types/<module>/<page-name>.types`.

## 2. Services Architecture & Organization
- **Only create services when API integration happens.** Do not create service files during the static UI/mockup phase. In the static UI phase, manage state and mock data within client components and local `dummy.ts` files.
- **Never create local service or API files inside page or `_components/` folders.**
- **When API integration begins, all services must reside in the root `services/` directory**, organized by module and page/feature name:
  - Pattern: `services/<module>/<page-or-feature-name>.service.ts`
  - Examples:
    - Employer post job service: `services/employer/post-job.service.ts`
    - Employer my jobs service: `services/employer/my-jobs.service.ts`
    - Employer notification service: `services/employer/notification.service.ts`
    - Candidate saved jobs service: `services/candidate/saved-jobs.service.ts`
    - Auth service: `services/auth/auth.service.ts`
  - Core HTTP client and base fetchers reside in `services/api.ts`.
- Components and hooks must import services directly from `@/services/<module>/<page-or-feature-name>.service`.

## 3. Custom Hooks Architecture & Organization
- **Only create custom hooks when API integration / real backend data fetching happens.** Do not create unnecessary custom hooks during the static UI phase.
- **Never create local custom hooks inside page or `_components/` folders.**
- **When API integration begins, all custom hooks must reside in the root `hooks/` directory**, organized by module and page/feature name:
  - Pattern: `hooks/<module>/use-<page-or-feature-name>.ts`
  - Examples:
    - Employer post job hook: `hooks/employer/use-post-job.ts`
    - Employer my jobs hook: `hooks/employer/use-my-jobs.ts`
    - Employer notification hook: `hooks/employer/use-notification.ts`
    - Candidate saved jobs hook: `hooks/candidate/use-saved-jobs.ts`
    - Auth hook: `hooks/auth/use-auth.ts`
  - Shared, cross-module hooks reside at the root of `hooks/` (e.g., `hooks/use-debounce.ts`, `hooks/use-media-query.ts`).
- Components must import hooks directly from `@/hooks/<module>/use-<page-or-feature-name>`.

## 4. Component Architecture & Modularity
- **Avoid monolithic components**: Keep components concise, focused, and maintainable (aim for under 150-200 lines). Break large views and forms down into subcomponents inside a local `_components/` directory.
- **Identify and extract repetitive UI**: Whenever repetitive UI patterns appear (e.g., section cards, section headers, selectable option/radio cards, toggle items), extract them into clean, reusable components.
- **Modals & Dialogs**: Always use Ant Design's `<Modal />` component (`import { Modal } from "antd"`) with `open`, `onCancel`, `footer={null}`, `destroyOnHidden`, `centered`, and custom content rather than creating raw custom `fixed inset-0` modal wrappers.

## 5. Code Conventions
- Do not import default `React` (`import React from "react";`) in modern Next.js/React files unless utilizing named types (e.g., `import type { ReactNode } from "react"`).
- Keep Tailwind CSS classes clean, idiomatic, and favor design tokens/utilities.
