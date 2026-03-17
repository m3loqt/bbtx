---
name: Admin CMS Build
description: Complete production-grade admin CMS built for BBTX.AI (March 2026)
type: project
---

Full admin CMS built at /admin route. Stack: Next.js 16 App Router, TypeScript strict, Tailwind CSS 4, Supabase, shadcn/ui, react-hook-form + zod, recharts, sonner toasts.

**Why:** Grant and Mel need an internal tool to manage all website content and view form submissions.

**How to apply:** When modifying admin pages, follow the established patterns: Server components for data fetching, client components for interactivity, Sheet for forms, Dialog for confirmations, optimistic UI for toggles, sonner for toasts.

Key files:
- lib/admin/types.ts — All shared types
- lib/admin/queries.ts — All Supabase query functions
- lib/admin/supabase-admin.ts — Service role client
- middleware.ts — Auth protection for /admin/* routes
- app/admin/layout.tsx — SidebarProvider + AdminSidebar + AdminHeader + Toaster
- components/admin/AdminSidebar.tsx — Full sidebar with nav groups
- components/admin/AdminHeader.tsx — Top bar with page title
- components/admin/AssessmentDetailSheet.tsx — Shared between contact and assessments pages
- components/admin/SubmissionChart.tsx — Recharts area chart
- components/admin/NewsletterChart.tsx — Recharts bar chart

Pages: /admin (dashboard), /admin/login, /admin/content (blogs+podcasts tabs), /admin/courses, /admin/events, /admin/contact, /admin/assessments, /admin/newsletter

Database migration: lib/admin-schema.sql (run in Supabase SQL editor before using admin)

Pre-existing issue: app/community/page.tsx has an unclosed JSX tag (line ~915) that breaks the production build — must be fixed before deployment.
