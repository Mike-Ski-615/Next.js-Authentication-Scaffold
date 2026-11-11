# Next.js Authentication Scaffold

A modular Next.js 16 authentication reference with a working email/phone OTP verification flow, JWT-backed server sessions, Prisma persistence, and a protected dashboard.

[![ci](https://github.com/Mike-Ski-615/Next.js-Authentication-Scaffold/actions/workflows/ci.yml/badge.svg)](https://github.com/Mike-Ski-615/Next.js-Authentication-Scaffold/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

**[English](./README.md)** | **[中文文档](./README_CN.md)**

## Demo

Recorded walkthrough:

https://github.com/user-attachments/assets/a10d0cb9-6d0f-4eae-8377-082e16b50780

There is currently no hosted deployment. To reproduce the flow locally:

```bash
cp .env.example .env
# Set DATABASE_URL and SESSION_SECRET.

bun install
bun run db:push
bun run dev
```

Open <http://localhost:3000>.

Demo checklist:

1. Enter an email or phone number in the auth dialog.
2. The six-digit code is printed in the **server console**; there is no email/SMS provider wired yet.
3. Enter the code and complete registration or sign-in.
4. The protected dashboard validates the database session through the DAL.
5. Log out and confirm that `/dashboard` redirects.

## Capability Status

| Capability | Status | Evidence |
| --- | --- | --- |
| Email / phone OTP verification | Implemented in the app: six-digit codes, one-minute expiry, five attempts, single use, database-backed registration and sign-in | [lib/actions/verification-code.ts](lib/actions/verification-code.ts) |
| Email / SMS delivery | **Development stub**: codes are logged to the server console | [lib/actions/verification-code.ts](lib/actions/verification-code.ts) |
| Session cookie | HS256 JWT in an HttpOnly, SameSite=Lax cookie with a 30-day expiry | [lib/session.ts](lib/session.ts) |
| Database session validation | A session row is checked against the signed cookie before protected data is returned | [lib/dal.ts](lib/dal.ts) |
| Route protection | `proxy.ts` performs an optimistic cookie presence check; the DAL performs the real authorization check | [proxy.ts](proxy.ts), [app/(main)/dashboard/page.tsx](app/(main)/dashboard/page.tsx) |
| Data model | `user`, `session`, `account`, `passkey`, and `verification` models | [prisma/schema.prisma](prisma/schema.prisma) |
| Profile and logout actions | Profile update requires a verified session; logout deletes the database session and cookie | [lib/actions/user.ts](lib/actions/user.ts) |
| Passkey, wallet, and social login | **UI states only**; no WebAuthn, wallet, or OAuth provider is called | [components/auth/](components/auth) |
| Automated tests | **Not added yet**; CI runs lint, type-check, and production build | [.github/workflows/ci.yml](.github/workflows/ci.yml) |

## Engineering Evidence

| What a reviewer can verify | Where |
| --- | --- |
| End-to-end OTP generation, persistence, expiry, attempt limits, and verification | [lib/actions/verification-code.ts](lib/actions/verification-code.ts) |
| HS256 JWT creation and HttpOnly cookie policy | [lib/session.ts](lib/session.ts) |
| Server-side session and user lookup with React request caching | [lib/dal.ts](lib/dal.ts) |
| Optimistic route gate separated from authoritative authorization | [proxy.ts](proxy.ts), [app/(main)/dashboard/page.tsx](app/(main)/dashboard/page.tsx) |
| Prisma schema and generated client integration | [prisma/schema.prisma](prisma/schema.prisma), [lib/prisma.ts](lib/prisma.ts) |
| Typed forms and validation | [components/auth/hooks/use-auth-form.ts](components/auth/hooks/use-auth-form.ts), [lib/validation.ts](lib/validation.ts) |
| Modular auth dialog states | [components/auth/auth-dialog.tsx](components/auth/auth-dialog.tsx), [components/auth/](components/auth) |
| CI with a real PostgreSQL service | [.github/workflows/ci.yml](.github/workflows/ci.yml) |

CI runs:

```bash
bun install
bun run lint
bun run type-check
bun run build
```

## Architecture

```mermaid
graph TB
    UI[Auth dialog states] --> SA[Server Actions]
    SA --> V[Verification records]
    SA --> U[User records]
    SA --> S[Session records]
    S --> C[HS256 JWT cookie]
    C --> P[Optimistic proxy gate]
    P --> D[Data access layer]
    D --> DB[(PostgreSQL via Prisma)]
```

The important boundary is that `proxy.ts` only checks whether a cookie exists. Authorization uses the signed cookie **and** the database session row in `lib/dal.ts`.

## Quick Start

### Prerequisites

- Bun 1.3+ or Node.js 20.9+
- PostgreSQL 14+

### Environment

```bash
cp .env.example .env
```

Required variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?sslmode=disable"
SESSION_SECRET="generate-with-openssl-rand-base64-32"
```

### Run

```bash
bun install
bun run db:push
bun run dev
```

### Production Build

```bash
bun run build
bun start
```

> The build script runs `prisma db push --accept-data-loss`. That is convenient for a demo, but a production deployment should use reviewed migrations instead.

## Tech Stack

- Next.js 16 App Router, React 19, TypeScript
- Prisma 7 and PostgreSQL
- `jose` for HS256 JWT signing and verification
- React Hook Form, Zod, and `input-otp`
- Tailwind CSS 4, shadcn/ui, Radix UI, and Motion

## Project Structure

```text
app/
  (main)/page.tsx          public entry and dashboard link
  (main)/dashboard/        protected route using the DAL
components/auth/           auth dialog, forms, OTP, passkey/wallet UI states
lib/
  actions/                 server actions for users and verification
  dal.ts                   authoritative session checks
  session.ts               JWT cookie helpers
  validation.ts            email, phone, name, and OTP schemas
prisma/schema.prisma       auth data model
proxy.ts                   optimistic route gate
```

## Limitations

- No automated tests yet. The current CI proves linting, type safety, and a production build, not behavior.
- OTP delivery is a console stub. Connect an email or SMS provider before using this outside a demo.
- Passkey, wallet, and social-provider buttons do not perform real authentication yet.
- The proxy check is optimistic by design and must not be treated as authorization.
- There is no hosted demo and no committed lockfile, so dependency resolution is not fully reproducible.
- The repository declares MIT in `package.json`, but no `LICENSE` file is currently committed.

## License

MIT is declared in `package.json`. Add the repository's license file before distributing the project.
