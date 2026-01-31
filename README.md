<div align="center">

# 🔐 Next.js Authentication Scaffold

### A Modern, Full-Featured Authentication System

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

**[English](./README.md)** | **[中文文档](./README_CN.md)**

---

### 🚀 A production-ready authentication scaffold with multiple modern auth methods

*Built with the latest Next.js App Router, React Server Components, and TypeScript*

[Features](#-features) • [Demo](#-demo) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🎯 Demo](#-demo)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [🎨 Tech Stack](#-tech-stack)
- [📚 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 Multiple Authentication Methods

- **Email OTP** - Secure one-time password via email
- **Phone OTP** - SMS verification support
- **Passkey/WebAuthn** - Biometric authentication
- **Wallet Connect** - Web3 wallet integration
- **Social Login** - OAuth providers ready

</td>
<td width="50%">

### 🎨 Modern Development Experience

- **Next.js 16** - Latest App Router & RSC
- **React 19** - Concurrent features
- **TypeScript** - Full type safety
- **Prisma ORM** - Type-safe database access
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Beautiful components

</td>
</tr>
<tr>
<td width="50%">

### 🏗️ Production Ready

- **Modular Architecture** - Clean separation of concerns
- **Server Actions** - Type-safe server mutations
- **JWT Sessions** - Secure session management
- **Database Migrations** - Version-controlled schema
- **Form Validation** - Zod schema validation
- **Error Handling** - Comprehensive error boundaries

</td>
<td width="50%">

### 🎯 Developer Friendly

- **Custom Hooks** - Reusable business logic
- **State Machine** - Predictable auth flows
- **API Documentation** - Well-documented code
- **ESLint & Prettier** - Code quality tools
- **Hot Reload** - Fast development cycle
- **Easy Deployment** - Vercel-ready

</td>
</tr>
</table>

---

## 🎯 Demo

> 🚧 **Coming Soon** - Live demo will be available shortly

### Screenshots

<details>
<summary>📸 Click to view screenshots</summary>

*Screenshots will be added soon*

</details>

---

## 🏗️ Architecture

```mermaid
graph TB
    A[Client] -->|Request| B[Next.js App Router]
    B --> C[Server Components]
    B --> D[Server Actions]
    D --> E[Data Access Layer]
    E --> F[Prisma ORM]
    F --> G[(PostgreSQL)]
    D --> H[Session Manager]
    H --> I[JWT Tokens]
    C --> J[React Components]
    J --> K[Shadcn UI]
    J --> L[Custom Hooks]
```

### Key Design Principles

- **🎯 Separation of Concerns** - Clear boundaries between layers
- **🔒 Security First** - Built-in protection against common vulnerabilities
- **♻️ Reusability** - Modular components and hooks
- **📈 Scalability** - Ready for production workloads
- **🧪 Testability** - Easy to test and maintain

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **PostgreSQL** 14.x or higher
- **Bun** (recommended) or npm/yarn/pnpm

### Installation

```bash
# 1. Clone the repository
git clone git@github.com:Mike-Ski-615/Next.js-Authentication-Scaffold.git
cd Next.js-Authentication-Scaffold

# 2. Install dependencies
bun install
# or
npm install
```

### Environment Setup

```bash
# 3. Copy environment template
cp .env.example .env

# 4. Edit .env with your configuration
# Required variables:
# - DATABASE_URL: Your PostgreSQL connection string
# - SESSION_SECRET: Generate with: openssl rand -base64 32
```

### Database Setup

```bash
# 5. Generate Prisma client
bun run db:generate

# 6. Run database migrations
bun run db:migrate

# 7. (Optional) Seed database with sample data
bun run db:seed
```

### Start Development

```bash
# 8. Start the development server
bun dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Build the application
bun run build

# Start production server
bun start
```

---

## 📁 Project Structure

```
Next.js-Authentication-Scaffold/
│
├── 📂 app/                          # Next.js App Router
│   ├── 📂 (main)/                   # Main route group
│   │   ├── 📂 dashboard/            # Dashboard pages
│   │   ├── layout.tsx               # Main layout
│   │   └── page.tsx                 # Home page
│   ├── layout.tsx                   # Root layout
│   ├── globals.css                  # Global styles
│   └── favicon.ico                  # App icon
│
├── 📂 components/                   # React Components
│   ├── 📂 auth/                     # Authentication module
│   │   ├── auth-dialog.tsx          # Main auth dialog
│   │   ├── default-state.tsx        # Initial state
│   │   ├── email-state.tsx          # Email OTP flow
│   │   ├── phone-state.tsx          # Phone OTP flow
│   │   ├── passkey-state.tsx        # Passkey flow
│   │   ├── wallet-state.tsx         # Wallet connect flow
│   │   ├── register-state.tsx       # Registration flow
│   │   ├── 📂 components/           # Shared auth components
│   │   └── 📂 hooks/                # Auth-specific hooks
│   │
│   ├── 📂 ui/                       # UI Components (Shadcn)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── ...                      # Other UI components
│   │
│   ├── app-sidebar.tsx              # Application sidebar
│   ├── site-header.tsx              # Site header
│   └── nav-*.tsx                    # Navigation components
│
├── 📂 lib/                          # Core Library
│   ├── 📂 actions/                  # Server Actions
│   │   ├── check-user.ts            # User validation
│   │   ├── user.ts                  # User operations
│   │   └── verification-code.ts     # OTP handling
│   │
│   ├── dal.ts                       # Data Access Layer
│   ├── prisma.ts                    # Prisma client instance
│   ├── session.ts                   # Session management
│   ├── types.ts                     # TypeScript types
│   ├── utils.ts                     # Utility functions
│   └── validation.ts                # Zod schemas
│
├── 📂 prisma/                       # Database
│   ├── schema.prisma                # Database schema
│   └── 📂 migrations/               # Migration files (git-ignored)
│
├── 📂 hooks/                        # Custom React Hooks
│   ├── use-measure.ts               # Element measurement
│   └── use-mobile.ts                # Mobile detection
│
├── 📂 public/                       # Static Assets
│   └── 📂 Wallets/                  # Wallet icons
│
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── next.config.ts                   # Next.js config
├── tailwind.config.ts               # Tailwind config
└── README.md                        # This file
```

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ | `postgresql://user:pass@localhost:5432/db` |
| `SESSION_SECRET` | JWT signing secret (32+ chars) | ✅ | Generate with `openssl rand -base64 32` |

### Database Schema

The application uses the following main models:

- **`user`** - User accounts and profile information
- **`account`** - OAuth provider associations
- **`session`** - Active user sessions with JWT tokens
- **`verification`** - OTP codes for email/phone verification
- **`passkey`** - WebAuthn credentials for biometric auth

### Customization

<details>
<summary>🎨 Styling & Theming</summary>

The project uses Tailwind CSS with Shadcn UI components. Customize the theme in:

- `app/globals.css` - CSS variables and global styles
- `tailwind.config.ts` - Tailwind configuration
- `components/ui/` - Component-level styling

</details>

<details>
<summary>🔐 Authentication Methods</summary>

Enable or disable authentication methods by modifying:

- `components/auth/default-state.tsx` - Available auth options
- `lib/actions/` - Server-side auth logic
- `prisma/schema.prisma` - Database models

</details>

<details>
<summary>📧 Email & SMS Providers</summary>

Integrate your preferred providers:

- Email: Add SMTP configuration or use services like SendGrid, Resend
- SMS: Integrate Twilio, AWS SNS, or other SMS providers
- Update `lib/actions/verification-code.ts` with your provider logic

</details>

---

## 🎨 Tech Stack

### Core Framework

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with concurrent features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Database & ORM

- **[Prisma 7](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Prisma Migrate](https://www.prisma.io/migrate)** - Database migrations

### UI & Styling

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Shadcn UI](https://ui.shadcn.com/)** - Re-usable components
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Motion](https://motion.dev/)** - Animation library
- **[Tabler Icons](https://tabler.io/icons)** - Icon set

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant forms
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Input OTP](https://input-otp.rodz.dev/)** - OTP input component

### Authentication & Security

- **[Jose](https://github.com/panva/jose)** - JWT operations
- **[WebAuthn](https://webauthn.io/)** - Passkey/biometric auth
- **Server-only** - Prevent client-side imports

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking

---

## 📚 Documentation

### Authentication Flow

```mermaid
stateDiagram-v2
    [*] --> Default: User opens auth dialog
    Default --> Email: Select email
    Default --> Phone: Select phone
    Default --> Passkey: Select passkey
    Default --> Wallet: Select wallet
    
    Email --> OTPVerification: Send OTP
    Phone --> OTPVerification: Send OTP
    OTPVerification --> Register: New user
    OTPVerification --> Dashboard: Existing user
    
    Passkey --> Dashboard: Biometric verified
    Wallet --> Dashboard: Wallet connected
    
    Register --> Dashboard: Complete registration
    Dashboard --> [*]
```

### Key Concepts

<details>
<summary>🔄 Server Actions</summary>

Server Actions provide type-safe server mutations:

```typescript
// lib/actions/user.ts
'use server'

export async function createUser(data: CreateUserInput) {
  // Server-side validation
  const validated = userSchema.parse(data)
  
  // Database operation
  const user = await prisma.user.create({
    data: validated
  })
  
  return user
}
```

</details>

<details>
<summary>🎣 Custom Hooks</summary>

Reusable hooks encapsulate business logic:

```typescript
// components/auth/hooks/use-auth-form.ts
export function useAuthForm() {
  const form = useForm({
    resolver: zodResolver(schema)
  })
  
  const onSubmit = async (data) => {
    // Handle form submission
  }
  
  return { form, onSubmit }
}
```

</details>

<details>
<summary>🔐 Session Management</summary>

JWT-based sessions with automatic expiration:

```typescript
// lib/session.ts
export async function createSession(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)
  
  return token
}
```

</details>

### API Reference

For detailed API documentation, see:

- [Authentication Module](./components/auth/README.md) *(if exists)*
- [Server Actions](./lib/actions/README.md) *(if exists)*
- [Database Schema](./prisma/schema.prisma)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

- 🐛 **Report Bugs** - [Open an issue](../../issues/new?template=bug_report.md)
- 💡 **Suggest Features** - [Start a discussion](../../discussions/new)
- 📖 **Improve Documentation** - Submit a PR with doc updates
- 🔧 **Submit Code** - Fix bugs or add features

### Development Workflow

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone git@github.com:YOUR_USERNAME/Next.js-Authentication-Scaffold.git

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes
# 5. Run tests and linting
bun run lint
bun run type-check

# 6. Commit with conventional commits
git commit -m "feat: add amazing feature"

# 7. Push to your fork
git push origin feature/amazing-feature

# 8. Open a Pull Request
```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test additions or changes
- `chore:` - Build process or auxiliary tool changes

### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Use kebab-case for file names
- Add JSDoc comments for public APIs
- Write meaningful commit messages

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

### What this means:

✅ Commercial use  
✅ Modification  
✅ Distribution  
✅ Private use  

❌ Liability  
❌ Warranty  

---

## 🙏 Acknowledgments

Special thanks to these amazing open-source projects:

- [Next.js](https://nextjs.org/) - The React Framework for the Web
- [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
- [Shadcn UI](https://ui.shadcn.com/) - Beautifully designed components
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Vercel](https://vercel.com/) - Platform for frontend developers

---

## 📮 Support & Contact

<div align="center">

### Need Help?

[![GitHub Issues](https://img.shields.io/badge/Issues-Report%20Bug-red?style=for-the-badge&logo=github)](../../issues)
[![GitHub Discussions](https://img.shields.io/badge/Discussions-Ask%20Question-blue?style=for-the-badge&logo=github)](../../discussions)
[![GitHub Stars](https://img.shields.io/github/stars/Mike-Ski-615/Next.js-Authentication-Scaffold?style=for-the-badge&logo=github)](../../stargazers)

---

### Show Your Support

If this project helped you, please consider giving it a ⭐️!

**[⬆ Back to Top](#-nextjs-authentication-scaffold)**

---

Made with ❤️ by [Mike-Ski](https://github.com/Mike-Ski-615)

</div>
