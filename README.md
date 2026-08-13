# FlexFit Studio 🏋️‍♂️

A modern, full-stack gym membership and class management application built for single-site fitness studios. FlexFit Studio delivers a seamless booking experience for members, schedule management for trainers, and administrative oversight for studio management.

---

## ✨ Key Features & Architecture

- **Role-Based Access Control (RBAC):**
  - **Member View:** Book classes, track active bookings, manage membership credits, and view waitlists.
  - **Trainer View:** Access assigned class schedules, view member rosters, and track class attendance.
  - **Admin View:** Full studio oversight, user role management, and system analytics.
- **Dynamic Dashboard UI:** Real-time stat cards displaying available credits, active bookings, and membership statuses dynamically based on the active role.
- **Interactive Booking & Rescheduling:** Modal-driven class management with instant UI state updates and full type safety.
- **Production-Ready & Deployment Safe:** Fully validated against strict TypeScript type checks during production builds (`pnpm build`).

---

## 🛠️ Tech Stack & Utilities

| Category | Technology / Library | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | React framework for server-rendered and client-side web application |
| **Type Safety** | [TypeScript](https://www.typescriptlang.org/) | End-to-end type safety across components and API procedures |
| **API Layer** | [tRPC](https://trpc.io/) | End-to-end typesafe API layer |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework for responsive UI design |
| **Database & ORM** | SQLite / [Drizzle ORM](https://orm.drizzle.team/) | Lightweight relational database management and schema definitions |
| **Package Manager** | `pnpm` | Fast, disk-space-efficient package manager |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v20 or newer)
- **pnpm** installed globally:
  ```bash
  npm install -g pnpm