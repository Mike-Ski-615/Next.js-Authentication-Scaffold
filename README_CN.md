<div align="center">

# 🔐 Next.js 认证系统脚手架

### 现代化、功能完整的认证系统

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

**[English](./README.md)** | **[中文文档](./README_CN.md)**

---

### 🚀 生产级认证脚手架，支持多种现代化认证方式

*基于最新的 Next.js App Router、React Server Components 和 TypeScript 构建*

[功能特性](#-功能特性) • [在线演示](#-在线演示) • [快速开始](#-快速开始) • [文档](#-文档) • [参与贡献](#-参与贡献)

</div>

---

## 📖 目录

- [✨ 功能特性](#-功能特性)
- [🎯 在线演示](#-在线演示)
- [🏗️ 系统架构](#️-系统架构)
- [🚀 快速开始](#-快速开始)
- [📁 项目结构](#-项目结构)
- [🔧 配置说明](#-配置说明)
- [🎨 技术栈](#-技术栈)
- [📚 文档](#-文档)
- [🤝 参与贡献](#-参与贡献)
- [📄 开源协议](#-开源协议)

---

## ✨ 功能特性

<table>
<tr>
<td width="50%">

### 🔐 多种认证方式

- **邮箱 OTP** - 通过邮件发送一次性密码
- **手机 OTP** - 短信验证码支持
- **Passkey/WebAuthn** - 生物识别认证
- **钱包连接** - Web3 钱包集成
- **社交登录** - OAuth 提供商就绪

</td>
<td width="50%">

### 🎨 现代化开发体验

- **Next.js 16** - 最新 App Router 和 RSC
- **React 19** - 并发特性
- **TypeScript** - 完整类型安全
- **Prisma ORM** - 类型安全的数据库访问
- **Tailwind CSS** - 实用优先的样式
- **Shadcn UI** - 精美的组件库

</td>
</tr>
<tr>
<td width="50%">

### 🏗️ 生产就绪

- **模块化架构** - 清晰的关注点分离
- **Server Actions** - 类型安全的服务端操作
- **JWT 会话** - 安全的会话管理
- **数据库迁移** - 版本控制的数据库架构
- **表单验证** - Zod 模式验证
- **错误处理** - 全面的错误边界

</td>
<td width="50%">

### 🎯 开发者友好

- **自定义 Hooks** - 可复用的业务逻辑
- **状态机** - 可预测的认证流程
- **API 文档** - 完善的代码文档
- **ESLint & Prettier** - 代码质量工具
- **热重载** - 快速开发周期
- **易于部署** - Vercel 就绪

</td>
</tr>
</table>

---

## 🎯 在线演示

> 🚧 **即将推出** - 在线演示即将上线

### 截图预览

<details>
<summary>📸 点击查看截图</summary>

*截图即将添加*

</details>

---

## 🏗️ 系统架构

```mermaid
graph TB
    A[客户端] -->|请求| B[Next.js App Router]
    B --> C[服务端组件]
    B --> D[Server Actions]
    D --> E[数据访问层]
    E --> F[Prisma ORM]
    F --> G[(PostgreSQL)]
    D --> H[会话管理器]
    H --> I[JWT Tokens]
    C --> J[React 组件]
    J --> K[Shadcn UI]
    J --> L[自定义 Hooks]
```

### 核心设计原则

- **🎯 关注点分离** - 各层之间边界清晰
- **🔒 安全优先** - 内置常见漏洞防护
- **♻️ 可复用性** - 模块化组件和 Hooks
- **📈 可扩展性** - 为生产负载做好准备
- **🧪 可测试性** - 易于测试和维护

---

## 🚀 快速开始

### 环境要求

开始之前，请确保已安装以下环境：

- **Node.js** 18.x 或更高版本
- **PostgreSQL** 14.x 或更高版本
- **Bun**（推荐）或 npm/yarn/pnpm

### 安装步骤

```bash
# 1. 克隆仓库
git clone git@github.com:Mike-Ski-615/Next.js-Authentication-Scaffold.git
cd Next.js-Authentication-Scaffold

# 2. 安装依赖
bun install
# 或
npm install
```

### 环境配置

```bash
# 3. 复制环境变量模板
cp .env.example .env

# 4. 编辑 .env 文件，配置以下必需变量：
# - DATABASE_URL: PostgreSQL 连接字符串
# - SESSION_SECRET: 生成方式：openssl rand -base64 32
```

### 数据库设置

```bash
# 5. 生成 Prisma 客户端
bun run db:generate

# 6. 运行数据库迁移
bun run db:migrate

# 7. （可选）填充示例数据
bun run db:seed
```

### 启动开发

```bash
# 8. 启动开发服务器
bun dev

# 在浏览器中打开 http://localhost:3000
```

### 生产构建

```bash
# 构建应用
bun run build

# 启动生产服务器
bun start
```

---

## 📁 项目结构

```
Next.js-Authentication-Scaffold/
│
├── 📂 app/                          # Next.js App Router
│   ├── 📂 (main)/                   # 主路由组
│   │   ├── 📂 dashboard/            # 仪表板页面
│   │   ├── layout.tsx               # 主布局
│   │   └── page.tsx                 # 首页
│   ├── layout.tsx                   # 根布局
│   ├── globals.css                  # 全局样式
│   └── favicon.ico                  # 应用图标
│
├── 📂 components/                   # React 组件
│   ├── 📂 auth/                     # 认证模块
│   │   ├── auth-dialog.tsx          # 主认证对话框
│   │   ├── default-state.tsx        # 初始状态
│   │   ├── email-state.tsx          # 邮箱 OTP 流程
│   │   ├── phone-state.tsx          # 手机 OTP 流程
│   │   ├── passkey-state.tsx        # Passkey 流程
│   │   ├── wallet-state.tsx         # 钱包连接流程
│   │   ├── register-state.tsx       # 注册流程
│   │   ├── 📂 components/           # 共享认证组件
│   │   └── 📂 hooks/                # 认证相关 Hooks
│   │
│   ├── 📂 ui/                       # UI 组件（Shadcn）
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── ...                      # 其他 UI 组件
│   │
│   ├── app-sidebar.tsx              # 应用侧边栏
│   ├── site-header.tsx              # 站点头部
│   └── nav-*.tsx                    # 导航组件
│
├── 📂 lib/                          # 核心库
│   ├── 📂 actions/                  # Server Actions
│   │   ├── check-user.ts            # 用户验证
│   │   ├── user.ts                  # 用户操作
│   │   └── verification-code.ts     # OTP 处理
│   │
│   ├── dal.ts                       # 数据访问层
│   ├── prisma.ts                    # Prisma 客户端实例
│   ├── session.ts                   # 会话管理
│   ├── types.ts                     # TypeScript 类型
│   ├── utils.ts                     # 工具函数
│   └── validation.ts                # Zod 验证模式
│
├── 📂 prisma/                       # 数据库
│   ├── schema.prisma                # 数据库模式
│   └── 📂 migrations/               # 迁移文件（git 忽略）
│
├── 📂 hooks/                        # 自定义 React Hooks
│   ├── use-measure.ts               # 元素测量
│   └── use-mobile.ts                # 移动端检测
│
├── 📂 public/                       # 静态资源
│   └── 📂 Wallets/                  # 钱包图标
│
├── .env.example                     # 环境变量模板
├── .gitignore                       # Git 忽略规则
├── package.json                     # 依赖配置
├── tsconfig.json                    # TypeScript 配置
├── next.config.ts                   # Next.js 配置
├── tailwind.config.ts               # Tailwind 配置
└── README_CN.md                     # 本文件
```

---

## 🔧 配置说明

### 环境变量

| 变量名 | 说明 | 必需 | 示例 |
|--------|------|------|------|
| `DATABASE_URL` | PostgreSQL 连接字符串 | ✅ | `postgresql://user:pass@localhost:5432/db` |
| `SESSION_SECRET` | JWT 签名密钥（32+ 字符） | ✅ | 使用 `openssl rand -base64 32` 生成 |

### 数据库模型

应用使用以下主要数据模型：

- **`user`** - 用户账户和个人资料信息
- **`account`** - OAuth 提供商关联
- **`session`** - 活跃用户会话和 JWT 令牌
- **`verification`** - 邮箱/手机验证的 OTP 代码
- **`passkey`** - 生物识别认证的 WebAuthn 凭证

### 自定义配置

<details>
<summary>🎨 样式与主题</summary>

项目使用 Tailwind CSS 和 Shadcn UI 组件。自定义主题位置：

- `app/globals.css` - CSS 变量和全局样式
- `tailwind.config.ts` - Tailwind 配置
- `components/ui/` - 组件级样式

</details>

<details>
<summary>🔐 认证方式</summary>

通过修改以下文件启用或禁用认证方式：

- `components/auth/default-state.tsx` - 可用的认证选项
- `lib/actions/` - 服务端认证逻辑
- `prisma/schema.prisma` - 数据库模型

</details>

<details>
<summary>📧 邮件和短信服务商</summary>

集成您偏好的服务商：

- 邮件：添加 SMTP 配置或使用 SendGrid、Resend 等服务
- 短信：集成 Twilio、AWS SNS 或其他短信服务商
- 在 `lib/actions/verification-code.ts` 中更新服务商逻辑

</details>

---

## 🎨 技术栈

### 核心框架

- **[Next.js 16](https://nextjs.org/)** - 带 App Router 的 React 框架
- **[React 19](https://react.dev/)** - 具有并发特性的 UI 库
- **[TypeScript 5](https://www.typescriptlang.org/)** - 类型安全的 JavaScript

### 数据库与 ORM

- **[Prisma 7](https://www.prisma.io/)** - 下一代 ORM
- **[PostgreSQL](https://www.postgresql.org/)** - 关系型数据库
- **[Prisma Migrate](https://www.prisma.io/migrate)** - 数据库迁移

### UI 与样式

- **[Tailwind CSS 4](https://tailwindcss.com/)** - 实用优先的 CSS
- **[Shadcn UI](https://ui.shadcn.com/)** - 可复用组件
- **[Radix UI](https://www.radix-ui.com/)** - 无样式、可访问的组件
- **[Motion](https://motion.dev/)** - 动画库
- **[Tabler Icons](https://tabler.io/icons)** - 图标集

### 表单与验证

- **[React Hook Form](https://react-hook-form.com/)** - 高性能表单
- **[Zod](https://zod.dev/)** - TypeScript 优先的模式验证
- **[Input OTP](https://input-otp.rodz.dev/)** - OTP 输入组件

### 认证与安全

- **[Jose](https://github.com/panva/jose)** - JWT 操作
- **[WebAuthn](https://webauthn.io/)** - Passkey/生物识别认证
- **Server-only** - 防止客户端导入

### 开发工具

- **[ESLint](https://eslint.org/)** - 代码检查
- **[Prettier](https://prettier.io/)** - 代码格式化
- **[TypeScript](https://www.typescriptlang.org/)** - 静态类型检查

---

## 📚 文档

### 认证流程

```mermaid
stateDiagram-v2
    [*] --> 默认: 用户打开认证对话框
    默认 --> 邮箱: 选择邮箱
    默认 --> 手机: 选择手机
    默认 --> Passkey: 选择 Passkey
    默认 --> 钱包: 选择钱包
    
    邮箱 --> OTP验证: 发送 OTP
    手机 --> OTP验证: 发送 OTP
    OTP验证 --> 注册: 新用户
    OTP验证 --> 仪表板: 现有用户
    
    Passkey --> 仪表板: 生物识别验证
    钱包 --> 仪表板: 钱包已连接
    
    注册 --> 仪表板: 完成注册
    仪表板 --> [*]
```

### 核心概念

<details>
<summary>🔄 Server Actions</summary>

Server Actions 提供类型安全的服务端操作：

```typescript
// lib/actions/user.ts
'use server'

export async function createUser(data: CreateUserInput) {
  // 服务端验证
  const validated = userSchema.parse(data)
  
  // 数据库操作
  const user = await prisma.user.create({
    data: validated
  })
  
  return user
}
```

</details>

<details>
<summary>🎣 自定义 Hooks</summary>

可复用的 Hooks 封装业务逻辑：

```typescript
// components/auth/hooks/use-auth-form.ts
export function useAuthForm() {
  const form = useForm({
    resolver: zodResolver(schema)
  })
  
  const onSubmit = async (data) => {
    // 处理表单提交
  }
  
  return { form, onSubmit }
}
```

</details>

<details>
<summary>🔐 会话管理</summary>

基于 JWT 的会话系统，自动过期处理：

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

### API 参考

详细的 API 文档，请参阅：

- [认证模块](./components/auth/README.md) *（如果存在）*
- [Server Actions](./lib/actions/README.md) *（如果存在）*
- [数据库模式](./prisma/schema.prisma)

---

## 🤝 参与贡献

我们欢迎贡献！以下是您可以提供帮助的方式：

### 贡献方式

- 🐛 **报告 Bug** - [提交 Issue](../../issues/new?template=bug_report.md)
- 💡 **建议功能** - [发起讨论](../../discussions/new)
- 📖 **改进文档** - 提交文档更新的 PR
- 🔧 **提交代码** - 修复 Bug 或添加功能

### 开发工作流

```bash
# 1. Fork 本仓库
# 2. 克隆您的 Fork
git clone git@github.com:YOUR_USERNAME/Next.js-Authentication-Scaffold.git

# 3. 创建功能分支
git checkout -b feature/amazing-feature

# 4. 进行更改
# 5. 运行测试和代码检查
bun run lint
bun run type-check

# 6. 使用约定式提交
git commit -m "feat: 添加惊艳的功能"

# 7. 推送到您的 Fork
git push origin feature/amazing-feature

# 8. 创建 Pull Request
```

### 提交规范

我们遵循[约定式提交](https://www.conventionalcommits.org/zh-hans/)：

- `feat:` - 新功能
- `fix:` - Bug 修复
- `docs:` - 文档更改
- `style:` - 代码样式更改（格式化等）
- `refactor:` - 代码重构
- `test:` - 测试添加或更改
- `chore:` - 构建过程或辅助工具更改

### 代码风格

- 所有新代码使用 TypeScript
- 遵循现有代码风格
- 文件名使用 kebab-case
- 为公共 API 添加 JSDoc 注释
- 编写有意义的提交信息

---

## 📄 开源协议

本项目采用 **MIT 协议** - 详见 [LICENSE](./LICENSE) 文件

### 这意味着：

✅ 商业使用  
✅ 修改  
✅ 分发  
✅ 私人使用  

❌ 责任  
❌ 担保  

---

## 🙏 致谢

特别感谢这些优秀的开源项目：

- [Next.js](https://nextjs.org/) - Web 的 React 框架
- [Prisma](https://www.prisma.io/) - 下一代 Node.js 和 TypeScript ORM
- [Shadcn UI](https://ui.shadcn.com/) - 精美设计的组件
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Vercel](https://vercel.com/) - 前端开发者平台

---

## 📮 支持与联系

<div align="center">

### 需要帮助？

[![GitHub Issues](https://img.shields.io/badge/Issues-报告%20Bug-red?style=for-the-badge&logo=github)](../../issues)
[![GitHub Discussions](https://img.shields.io/badge/Discussions-提问-blue?style=for-the-badge&logo=github)](../../discussions)
[![GitHub Stars](https://img.shields.io/github/stars/Mike-Ski-615/Next.js-Authentication-Scaffold?style=for-the-badge&logo=github)](../../stargazers)

---

### 表达支持

如果这个项目对您有帮助，请考虑给它一个 ⭐️！

**[⬆ 回到顶部](#-nextjs-认证系统脚手架)**

---

用 ❤️ 制作，作者 [Mike-Ski](https://github.com/Mike-Ski-615)

</div>
