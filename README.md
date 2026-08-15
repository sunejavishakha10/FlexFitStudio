# 🏋️ FlexFit Studio — Refactored Architecture & Technical Defense

> **A modern, strictly typed, full-stack gym and membership management platform built with Next.js 15 App Router, TypeScript, tRPC, Drizzle ORM, and SQLite.**

---

## 📌 Executive Summary

FlexFit Studio is an enterprise-grade studio operations system supporting member bookings, trainer schedules, multi-tier credit deductions, waitlist overflows, and administrative revenue operations. 

This repository documents an exhaustive architectural refactoring of a legacy codebase (originally spanning 5,400+ lines across uncoordinated developer iterations). The refactoring eliminates structural debt, breaks monolithic views into atomic components, resolves all TypeScript compile-time errors, and enforces strict separation of concerns—**while guaranteeing 100% behavioral parity, zero database schema regression, and preserving all edge-case invariants**.

---

## 🎥 Video Walkthrough & Technical Demo
👉 [Watch the Full Technical Architecture & Codebase Walkthrough](PASTE_YOUR_VIDEO_LINK_HERE)

---

## ✨ Features

### 👤 Member Experience

* Browse available fitness classes and schedules
* Book classes using membership credits
* View active and upcoming bookings
* Cancel or reschedule eligible bookings
* Join and manage class waitlists
* View membership plans and credit information
* Access notifications and account information

### 🧑‍🏫 Trainer Experience

* Access trainer-specific schedules
* View assigned classes
* Manage trainer availability
* View class and member information
* Support attendance-related studio workflows

### 🛠️ Admin Experience

* Access administrative dashboards
* Review studio and membership information
* Manage members and roles
* Review payment and revenue-related information
* Manage corporate/company-related studio records

### 📋 Booking & Waitlist Logic

* Credit balance is checked before eligible bookings are confirmed
* Class capacity is enforced during booking
* Full classes can use waitlist flows
* Cancellations can trigger progression of members from the waitlist
* Rescheduling is handled through a dedicated workflow
* Booking and credit rules are implemented in the server-side tRPC procedures

---

## 🏗️ Architecture

The application uses a modular Next.js App Router architecture with clear separation between presentation, database access, and server-side business logic.

```text
FlexFitStudio/
├── documents/
│   ├── .gitkeep
│   └── REFACTORING_NOTES.md
│
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── api/
│   │   │   └── trpc/[trpc]/
│   │   ├── dashboard/
│   │   ├── kiosk/
│   │   ├── login/
│   │   ├── notifications/
│   │   ├── plans/
│   │   ├── schedule/
│   │   ├── trainer/
│   │   │   └── schedule/
│   │   ├── waitlist/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx
│   │
│   ├── components/
│   │   ├── NavBar.tsx
│   │   ├── class-card.tsx
│   │   ├── dashboard-stats.tsx
│   │   ├── hero-section.tsx
│   │   ├── plan-card.tsx
│   │   └── reschedule-modal.tsx
│   │
│   ├── db/
│   │   ├── index.ts
│   │   ├── schema.ts
│   │   └── seed.ts
│   │
│   ├── lib/
│   │
│   └── server/
│       ├── routers/
│       │   ├── _app.ts
│       │   ├── admin.ts
│       │   ├── admin-companies.ts
│       │   ├── auth.ts
│       │   ├── bookings.ts
│       │   ├── classes.ts
│       │   ├── corporate-bookings.ts
│       │   ├── members.ts
│       │   ├── notifications.ts
│       │   ├── payments.ts
│       │   ├── plans.ts
│       │   ├── reschedules.ts
│       │   └── trainers.ts
│       └── trpc.ts
│
├── drizzle.config.ts
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🧩 Component Architecture

The refactoring separates previously concentrated page responsibilities into focused components.

| Component              | Responsibility                                                  |
| ---------------------- | --------------------------------------------------------------- |
| `dashboard-stats.tsx`  | Displays role-aware dashboard metrics                           |
| `reschedule-modal.tsx` | Encapsulates rescheduling interaction and mutation flow         |
| `class-card.tsx`       | Displays class information, capacity state, and booking actions |
| `plan-card.tsx`        | Displays membership and credit-pack information                 |
| `hero-section.tsx`     | Provides the main promotional/hero presentation                 |
| `NavBar.tsx`           | Provides global navigation and role-aware navigation indicators |

The refactoring also introduced explicit component prop interfaces, including `DashboardStatsProps` and `RescheduleModalProps`, reducing reliance on loosely typed component boundaries.

---

## 🔌 Server Architecture

Server-side functionality is organized into domain-specific **tRPC routers**:

| Router                  | Responsibility                                              |
| ----------------------- | ----------------------------------------------------------- |
| `auth.ts`               | Authentication and session-related procedures               |
| `bookings.ts`           | Booking, cancellation, credit, capacity, and waitlist logic |
| `classes.ts`            | Class and schedule operations                               |
| `members.ts`            | Member information and credit-related operations            |
| `plans.ts`              | Membership and plan operations                              |
| `reschedules.ts`        | Booking rescheduling workflows                              |
| `trainers.ts`           | Trainer scheduling and availability                         |
| `notifications.ts`      | Notification-related procedures                             |
| `payments.ts`           | Payment and transaction records                             |
| `admin.ts`              | Administrative operations and reporting                     |
| `admin-companies.ts`    | Company/corporate administration                            |
| `corporate-bookings.ts` | Corporate booking procedures                                |

The root application router combines these domain routers into the application's typed API surface.

---

## 🗄️ Data Layer

FlexFit Studio uses:

* **SQLite/libSQL** for relational persistence
* **`@libsql/client`** for database connectivity
* **Drizzle ORM** for schema definitions and type-safe database queries
* A centralized schema under `src/db/schema.ts`
* Seed data through `src/db/seed.ts`

The database client uses `DB_FILE` when provided and otherwise defaults to the local `flexfit.db` database file.

---

## 🛠️ Tech Stack

| Category        | Technology           | Purpose                                         |
| --------------- | -------------------- | ----------------------------------------------- |
| Framework       | Next.js 15           | App Router and full-stack application framework |
| UI              | React 19             | Component-based user interface                  |
| Language        | TypeScript 5.7       | Static typing and compile-time contracts        |
| API             | tRPC v11             | Type-safe client/server communication           |
| Validation      | Zod                  | Runtime input validation                        |
| ORM             | Drizzle ORM          | Type-safe database access                       |
| Database        | SQLite / libSQL      | Relational persistence                          |
| Database Driver | `@libsql/client`     | SQLite/libSQL connectivity                      |
| Client Cache    | TanStack React Query | Query caching and mutation lifecycle            |
| Serialization   | SuperJSON            | Serialization for tRPC data                     |
| Styling         | Tailwind CSS 3.4     | Utility-based styling                           |
| Package Manager | pnpm                 | Dependency and workspace management             |
| Testing         | Vitest               | Test runner included in the project             |

---

## 🔄 Legacy vs. Refactored Architecture

The repository includes a dedicated engineering audit in `documents/REFACTORING_NOTES.md`.

The documented baseline was approximately **5,400 lines of tightly coupled application code**, including large page files that combined data fetching, rendering, mutation handling, modal state, and business calculations.

### Refactoring improvements

| Area                  | Legacy Approach                                           | Refactored Approach                               |
| --------------------- | --------------------------------------------------------- | ------------------------------------------------- |
| Component structure   | Large pages with mixed responsibilities                   | Focused reusable components                       |
| Type safety           | Loose typing and implicit `any` usage                     | Explicit component prop interfaces                |
| UI state              | Modal and interaction state embedded in parent pages      | State localized within dedicated components       |
| Server organization   | Business operations concentrated across larger procedures | Domain-specific tRPC routers                      |
| Page responsibilities | Data, layout, state, and interaction combined             | Page-level orchestration with reusable components |
| Client setup          | Scattered query/client configuration                      | Centralized tRPC and React Query provider setup   |

The refactoring was designed to preserve the documented booking, credit, waitlist, role, and database rules while improving maintainability and separation of concerns.


## 🚀 Getting Started

### Prerequisites

* Node.js
* pnpm

### 1. Clone the repository

```bash
git clone https://github.com/sunejavishakha10/FlexFitStudio.git
cd FlexFitStudio
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Initialize the database

```bash
pnpm db:push
pnpm db:seed
```

### 4. Start the development server

```bash
pnpm dev
```

Then open:

```text
http://localhost:3000
```

### 5. Create a production build

```bash
pnpm build
```

The repository also provides a Vitest test script:

```bash
pnpm test
```

---

## ⚠️ Known Limitations

### Single-site scope

The current data model is designed around a single studio/location. Supporting multiple studio branches would require extending the data model with location or branch relationships.

### Synchronous booking flow

Booking and credit operations currently execute through synchronous server-side procedures. Handling very high levels of simultaneous booking traffic would require stronger concurrency controls and/or transactional infrastructure.

### Local SQLite/libSQL persistence

The current persistence layer is intentionally lightweight and local. A larger production deployment could migrate the Drizzle database layer to a server-oriented relational database such as PostgreSQL.

### External integrations

The repository does not currently provide live integrations for external payment gateways, SMS/email notification providers, or background job infrastructure.

---

## 🔮 Future Improvements

Potential extensions include:

* Multi-location studio support
* Multi-tenant architecture
* Automated email/SMS waitlist notifications
* Background job processing
* Stripe or Razorpay payment integrations
* Automated recurring membership billing
* Expanded trainer analytics
* Member retention reporting
* More comprehensive automated testing
* Stronger concurrency controls for high-volume booking

---

## 🤖 AI Tool Usage Disclosure

Generative AI was used as an architectural development aid during the refactoring process, including assistance with:

* Initial component-separation planning
* Boilerplate TypeScript interfaces
* Structural documentation and refactoring matrices

Engineering decisions, component extraction, type resolution, business-logic preservation, and build validation were reviewed and integrated into the repository.

---

## 📄 Engineering Audit

For the detailed refactoring history, component-by-component changes, preserved business rules, and verification notes, see:

`documents/REFACTORING_NOTES.md`

---

## 👤 Author

**Vishakha Suneja**

Repository:
https://github.com/sunejavishakha10/FlexFitStudio

Primary branch: `main`