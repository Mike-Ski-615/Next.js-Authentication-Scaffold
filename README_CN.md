# Next.js 脚手架

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

一个功能完整、模块化的 Next.js 脚手架，支持多种认证方式。

[English](./README.md) | [中文文档](./README_CN.md)

</div>

## ✨ 特性

- 🔐 **多种认证方式**
  - 邮箱 OTP 验证
  - 手机号 OTP 验证
  - Passkey/WebAuthn 生物识别
  - 钱包连接
  - 社交账号登录

- 🎨 **现代化技术栈**
  - Next.js 16 (App Router)
  - React 19
  - TypeScript
  - Prisma ORM
  - PostgreSQL
  - Tailwind CSS
  - Shadcn UI

- 🏗️ **优秀的架构设计**
  - 模块化组件结构
  - 关注点分离
  - 自定义 Hooks 封装业务逻辑
  - 完整的类型安全
  - 服务端 Actions

## 📁 项目结构

```
├── app/                    # Next.js App Router
│   ├── (main)/            # 主应用路由组
│   │   ├── dashboard/     # 仪表板页面
│   │   └── page.tsx       # 首页
│   ├── layout.tsx         # 根布局
│   └── globals.css        # 全局样式
│
├── components/            # React 组件
│   ├── auth/             # 认证模块（详见 components/auth/README.md）
│   ├── ui/               # UI 基础组件（Shadcn）
│   ├── app-sidebar.tsx   # 应用侧边栏
│   └── site-header.tsx   # 网站头部
│
├── lib/                   # 核心库
│   ├── actions/          # 服务端 Actions
│   │   ├── check-user.ts
│   │   ├── user.ts
│   │   └── verification-code.ts
│   ├── generated/        # Prisma 生成的客户端
│   ├── dal.ts           # 数据访问层
│   ├── prisma.ts        # Prisma 客户端
│   ├── session.ts       # 会话管理
│   ├── types.ts         # 类型定义
│   ├── utils.ts         # 工具函数
│   └── validation.ts    # 表单验证规则
│
├── prisma/               # 数据库
│   ├── migrations/      # 数据库迁移
│   └── schema.prisma    # 数据库模型
│
├── hooks/               # 自定义 React Hooks
│   ├── use-measure.ts
│   └── use-mobile.ts
│
└── public/              # 静态资源
```

## 🚀 快速开始

### 环境要求

- Node.js 18+
- PostgreSQL 数据库
- Bun（推荐）或 npm/yarn/pnpm

### 安装

```bash
# 克隆项目
git clone git@github.com:Mike-Ski-615/scaffold.git
cd scaffold

# 安装依赖
bun install
# 或
npm install
```

### 配置环境变量

创建 `.env` 文件：

```env
# 数据库连接
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# JWT 密钥（用于会话管理）
JWT_SECRET="your-secret-key-here"

# 其他配置...
```

### 数据库设置

```bash
# 运行数据库迁移
bunx prisma migrate dev

# 生成 Prisma 客户端
bunx prisma generate
```

### 启动开发服务器

```bash
bun dev
# 或
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📚 核心功能说明

### 认证系统

认证模块采用模块化设计，详细文档请查看 [components/auth/README.md](./components/auth/README.md)

主要特点：
- 状态机驱动的认证流程
- 可复用的表单组件和 Hooks
- OTP 验证码系统
- Passkey 生物识别支持

### 数据库模型

使用 Prisma ORM，主要模型包括：
- `user` - 用户信息
- `account` - 账号关联
- `session` - 会话管理
- `verification` - 验证码
- `passkey` - Passkey 凭证

### 会话管理

基于 JWT 的会话系统：
- 安全的 token 生成和验证
- 自动过期处理
- 设备和 IP 追踪

## 🛠️ 开发指南

### 添加新的认证方式

1. 在 `components/auth/` 创建新的状态组件
2. 在 `lib/actions/` 添加对应的服务端逻辑
3. 更新 `auth-dialog.tsx` 的状态路由
4. 添加必要的类型定义

### 代码规范

- 使用 TypeScript 严格模式
- 组件和文件使用 kebab-case 命名
- 遵循 ESLint 配置
- 使用 Prettier 格式化代码

### 构建生产版本

```bash
bun run build
bun run start
```

## 📦 主要依赖

- **框架**: Next.js 16, React 19
- **数据库**: Prisma, PostgreSQL
- **UI**: Tailwind CSS, Shadcn UI, Radix UI
- **表单**: React Hook Form, Zod
- **认证**: Jose (JWT), WebAuthn
- **动画**: Motion (Framer Motion)

## 🤝 贡献

欢迎贡献！请查看贡献指南了解详情。

### 快速贡献

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](./LICENSE) 文件了解详情。

## 🙏 致谢

感谢以下开源项目：

- [Next.js](https://nextjs.org/) - React 框架
- [Prisma](https://www.prisma.io/) - 数据库 ORM
- [Shadcn UI](https://ui.shadcn.com/) - UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架

## 📮 联系与支持

- 💬 [提交 Issue](../../issues) - 报告 Bug 或提出建议
- 💡 [发起讨论](../../discussions) - 分享想法和问题
- 📧 联系维护者 - 通过 GitHub Profile

---

<div align="center">

**[⬆ 回到顶部](#nextjs-脚手架)**

Made with ❤️ using Next.js

</div>
