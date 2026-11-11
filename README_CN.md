# Next.js Authentication Scaffold

一个模块化的 Next.js 16 认证参考实现：邮箱 / 手机号 OTP 验证流程、JWT 服务端会话、Prisma 持久化，以及受保护的 Dashboard。

[![ci](https://github.com/Mike-Ski-615/Next.js-Authentication-Scaffold/actions/workflows/ci.yml/badge.svg)](https://github.com/Mike-Ski-615/Next.js-Authentication-Scaffold/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

**[English](./README.md)** | **[中文文档](./README_CN.md)**

## Demo

录屏演示：

https://github.com/user-attachments/assets/a10d0cb9-6d0f-4eae-8377-082e16b50780

当前没有在线部署。可在本地复现：

```bash
cp .env.example .env
# 填写 DATABASE_URL 与 SESSION_SECRET

bun install
bun run db:push
bun run dev
```

打开 <http://localhost:3000>。

演示步骤：

1. 在认证弹窗输入邮箱或手机号。
2. 6 位验证码会打印在**服务端控制台**；目前没有接入邮件 / 短信服务商。
3. 输入验证码，完成注册或登录。
4. 受保护的 Dashboard 通过 DAL 校验数据库会话。
5. 登出后再次访问 `/dashboard`，确认会跳转。

## 能力状态

| 能力 | 状态 | 证据 |
| --- | --- | --- |
| 邮箱 / 手机号 OTP 验证 | 已实现应用内流程：6 位码、1 分钟过期、最多 5 次尝试、单次使用、注册与登录都会落库 | [lib/actions/verification-code.ts](lib/actions/verification-code.ts) |
| 邮件 / 短信发送 | **开发占位**：验证码只打印到服务端控制台 | [lib/actions/verification-code.ts](lib/actions/verification-code.ts) |
| 会话 Cookie | HS256 JWT，HttpOnly、SameSite=Lax，30 天过期 | [lib/session.ts](lib/session.ts) |
| 数据库会话校验 | 受保护数据返回前，同时校验签名 Cookie 与数据库 session 记录 | [lib/dal.ts](lib/dal.ts) |
| 路由保护 | `proxy.ts` 只做 Cookie 存在性的乐观检查；真正的授权在 DAL | [proxy.ts](proxy.ts)、[app/(main)/dashboard/page.tsx](app/(main)/dashboard/page.tsx) |
| 数据模型 | `user`、`session`、`account`、`passkey`、`verification` | [prisma/schema.prisma](prisma/schema.prisma) |
| 资料与登出 | 更新资料前验证会话；登出同时删除数据库会话与 Cookie | [lib/actions/user.ts](lib/actions/user.ts) |
| Passkey / 钱包 / 社交登录 | **仅 UI 状态**，尚未调用 WebAuthn、钱包或 OAuth Provider | [components/auth/](components/auth) |
| 自动化测试 | **尚未添加**；CI 只验证 lint、类型检查与生产构建 | [.github/workflows/ci.yml](.github/workflows/ci.yml) |

## 工程证据

| 可核查内容 | 位置 |
| --- | --- |
| OTP 生成、落库、过期、尝试次数与验证 | [lib/actions/verification-code.ts](lib/actions/verification-code.ts) |
| HS256 JWT 与 HttpOnly Cookie 策略 | [lib/session.ts](lib/session.ts) |
| 服务端会话校验与按请求缓存 | [lib/dal.ts](lib/dal.ts) |
| 乐观路由检查与权威授权分层 | [proxy.ts](proxy.ts)、[app/(main)/dashboard/page.tsx](app/(main)/dashboard/page.tsx) |
| Prisma Schema 与 Client 装配 | [prisma/schema.prisma](prisma/schema.prisma)、[lib/prisma.ts](lib/prisma.ts) |
| 类型化表单与校验 | [components/auth/hooks/use-auth-form.ts](components/auth/hooks/use-auth-form.ts)、[lib/validation.ts](lib/validation.ts) |
| 模块化认证弹窗状态 | [components/auth/auth-dialog.tsx](components/auth/auth-dialog.tsx)、[components/auth/](components/auth) |
| 带真实 PostgreSQL 服务的 CI | [.github/workflows/ci.yml](.github/workflows/ci.yml) |

CI 实际执行：

```bash
bun install
bun run lint
bun run type-check
bun run build
```

## 架构

```mermaid
graph TB
    UI[认证弹窗状态] --> SA[Server Actions]
    SA --> V[Verification 记录]
    SA --> U[User 记录]
    SA --> S[Session 记录]
    S --> C[HS256 JWT Cookie]
    C --> P[乐观 Proxy 门禁]
    P --> D[数据访问层]
    D --> DB[(PostgreSQL / Prisma)]
```

关键边界：`proxy.ts` 只检查 Cookie 是否存在；真正授权在 `lib/dal.ts` 中同时校验签名 Cookie 与数据库 session 记录。

## 快速开始

### 前置要求

- Bun 1.3+ 或 Node.js 20.9+
- PostgreSQL 14+

### 环境变量

```bash
cp .env.example .env
```

必填：

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?sslmode=disable"
SESSION_SECRET="使用-openssl-rand-base64-32-生成"
```

### 启动

```bash
bun install
bun run db:push
bun run dev
```

### 生产构建

```bash
bun run build
bun start
```

> 构建脚本会执行 `prisma db push --accept-data-loss`。它适合快速演示，但生产发布应改用经过审核的 migration。

## 技术栈

- Next.js 16 App Router、React 19、TypeScript
- Prisma 7、PostgreSQL
- `jose` 负责 HS256 JWT 签名与校验
- React Hook Form、Zod、`input-otp`
- Tailwind CSS 4、shadcn/ui、Radix UI、Motion

## 项目结构

```text
app/
  (main)/page.tsx          公开入口与 Dashboard 链接
  (main)/dashboard/        通过 DAL 保护的页面
components/auth/           认证弹窗、表单、OTP、Passkey / 钱包 UI 状态
lib/
  actions/                 用户与验证码 Server Actions
  dal.ts                   权威会话校验
  session.ts               JWT Cookie
  validation.ts            邮箱、手机号、姓名、OTP Schema
prisma/schema.prisma       认证数据模型
proxy.ts                   乐观路由门禁
```

## 已知限制

- 暂无自动化测试。当前 CI 证明 lint、类型检查与生产构建，不证明业务行为。
- OTP 发送是控制台占位；用于真实环境前需要接入邮件或短信服务。
- Passkey、钱包、社交登录按钮尚未执行真实认证。
- Proxy 只是乐观检查，不能当作授权层。
- 没有在线 Demo，也没有提交 lockfile，依赖解析不完全可复现。
- `package.json` 声明 MIT，但仓库目前没有提交 `LICENSE` 文件。

## 许可证

MIT 已在 `package.json` 中声明。分发项目之前应补充许可证文件。
