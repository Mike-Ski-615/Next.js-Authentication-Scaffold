import Link from "next/link"
import { Suspense } from "react"
import {
  IconBrandGithub,
  IconShieldCheck,
} from "@tabler/icons-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { checkAuth } from "@/lib/dal"

async function DashboardButton() {
  const { isAuth } = await checkAuth()
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isAuth ? "Go to Dashboard" : "Please Login First"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function Page() {
  return (
    <div className="relative size-full overflow-hidden ">
      {/* Gate Doors */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-background animate-out slide-out-to-top fill-mode-forwards duration-1000 delay-300" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-background animate-out slide-out-to-bottom fill-mode-forwards duration-1000 delay-300" />
      </div>

      {/* Main Content */}
      <div className="flex h-full items-center justify-center bg-zinc-50 dark:bg-black">
        <main className="flex h-full w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/[.08] dark:border-white/[.145] bg-black/[.02] dark:bg-white/[.02]">
            <IconShieldCheck className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">
              Production-Ready Authentication
            </span>
          </div>

          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Complete authentication system with 5 auth methods built in.
            </h1>

            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Email OTP, Phone OTP, Passkey, Wallet, and Social Login. Built with{" "}
              <a
                href="https://nextjs.org"
                className="font-medium text-zinc-950 dark:text-zinc-50"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js 16
              </a>
              ,{" "}
              <a
                href="https://react.dev"
                className="font-medium text-zinc-950 dark:text-zinc-50"
                target="_blank"
                rel="noopener noreferrer"
              >
                React 19
              </a>
              , and{" "}
              <a
                href="https://www.prisma.io"
                className="font-medium text-zinc-950 dark:text-zinc-50"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prisma
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-4">
            <Suspense
              fallback={
                <Link
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              }
            >
              <DashboardButton />
            </Suspense>

            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
              href="https://github.com/Mike-Ski-615/scaffold"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandGithub className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </main>
      </div>
    </div>
  )
}
