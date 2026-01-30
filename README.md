# Next.js Scaffold

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

A full-featured, modular Next.js authentication system scaffold with multiple authentication methods.

[English](./README.md) | [中文文档](./README_CN.md)

</div>

## ✨ Features

- 🔐 **Multiple Authentication Methods**
  - Email OTP verification
  - Phone OTP verification
  - Passkey/WebAuthn biometric authentication
  - Wallet connection
  - Social account login

- 🎨 **Modern Tech Stack**
  - Next.js 16 (App Router)
  - React 19
  - TypeScript
  - Prisma ORM
  - PostgreSQL
  - Tailwind CSS
  - Shadcn UI

- 🏗️ **Excellent Architecture**
  - Modular component structure
  - Separation of concerns
  - Custom Hooks for business logic
  - Full type safety
  - Server Actions

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (main)/            # Main application route group
│   │   ├── dashboard/     # Dashboard page
│   │   └── page.tsx       # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
│
├── components/            # React components
│   ├── auth/             # Authentication module (see components/auth/README.md)
│   ├── ui/               # UI base components (Shadcn)
│   ├── app-sidebar.tsx   # Application sidebar
│   └── site-header.tsx   # Site header
│
├── lib/                   # Core library
│   ├── actions/          # Server Actions
│   │   ├── check-user.ts
│   │   ├── user.ts
│   │   └── verification-code.ts
│   ├── generated/        # Prisma generated client
│   ├── dal.ts           # Data access layer
│   ├── prisma.ts        # Prisma client
│   ├── session.ts       # Session management
│   ├── types.ts         # Type definitions
│   ├── utils.ts         # Utility functions
│   └── validation.ts    # Form validation rules
│
├── prisma/               # Database
│   ├── migrations/      # Database migrations
│   └── schema.prisma    # Database schema
│
├── hooks/               # Custom React Hooks
│   ├── use-measure.ts
│   └── use-mobile.ts
│
└── public/              # Static assets
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Bun (recommended) or npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone git@github.com:Mike-Ski-615/scaffold.git
cd scaffold

# Install dependencies
bun install
# or
npm install
```

### Environment Configuration

Create a `.env` file:

```env
# Database connection
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# JWT secret (for session management)
JWT_SECRET="your-secret-key-here"

# Other configurations...
```

### Database Setup

```bash
# Run database migrations
bunx prisma migrate dev

# Generate Prisma client
bunx prisma generate
```

### Start Development Server

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 Core Features

### Authentication System

The authentication module uses a modular design. For detailed documentation, see [components/auth/README.md](./components/auth/README.md)

Key features:
- State machine-driven authentication flow
- Reusable form components and Hooks
- OTP verification system
- Passkey biometric support

### Database Models

Using Prisma ORM, main models include:
- `user` - User information
- `account` - Account associations
- `session` - Session management
- `verification` - Verification codes
- `passkey` - Passkey credentials

### Session Management

JWT-based session system:
- Secure token generation and verification
- Automatic expiration handling
- Device and IP tracking

## 🛠️ Development Guide

### Adding New Authentication Methods

1. Create new state components in `components/auth/`
2. Add corresponding server logic in `lib/actions/`
3. Update state routing in `auth-dialog.tsx`
4. Add necessary type definitions

### Code Standards

- Use TypeScript strict mode
- Use kebab-case for components and files
- Follow ESLint configuration
- Format code with Prettier

### Build for Production

```bash
bun run build
bun run start
```

## 📦 Main Dependencies

- **Framework**: Next.js 16, React 19
- **Database**: Prisma, PostgreSQL
- **UI**: Tailwind CSS, Shadcn UI, Radix UI
- **Forms**: React Hook Form, Zod
- **Authentication**: Jose (JWT), WebAuthn
- **Animation**: Motion (Framer Motion)

## 🤝 Contributing

Contributions are welcome! Please check the contributing guidelines for details.

### Quick Contribution

1. Fork this project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

## � License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

Thanks to the following open source projects:

- [Next.js](https://nextjs.org/) - React framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [Shadcn UI](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

## 📮 Contact & Support

- 💬 [Submit Issue](../../issues) - Report bugs or suggestions
- 💡 [Start Discussion](../../discussions) - Share ideas and questions
- 📧 Contact maintainer - Via GitHub Profile

---

<div align="center">

**[⬆ Back to Top](#nextjs-scaffold)**

Made with ❤️ using Next.js

</div>
