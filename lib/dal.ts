import "server-only"

import { cache } from "react"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getSessionFromCookie } from "@/lib/session"
import { isSessionExpired, isSessionValid, type UserDTO } from "@/lib/types"

/**
 * Re-export UserDTO for convenience
 */
export type { UserDTO } from "@/lib/types"

/**
 * Session verification result
 */
export type VerifiedSession = {
  isAuth: true
  userId: string
  sessionId: string
  user: UserDTO
}

/**
 * Verify current session
 * Uses React cache() to ensure only one execution per request
 * 
 * @returns Verified session information
 * @throws redirect to home page (if not authenticated)
 */
export const verifySession = cache(async (): Promise<VerifiedSession> => {
  const sessionPayload = await getSessionFromCookie()

  if (!isSessionValid(sessionPayload)) {
    redirect("/")
  }

  // TypeScript now knows sessionPayload is not null
  // Verify session validity from database
  const session = await prisma.session.findUnique({
    where: { id: sessionPayload!.sessionId },
    include: { user: true },
  })

  if (!session || isSessionExpired(session.expiresAt)) {
    redirect("/")
  }

  // Return DTO, not complete user object
  return {
    isAuth: true,
    userId: session.userId,
    sessionId: session.id,
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    },
  }
})

/**
 * Get current user (must be authenticated)
 * Uses React cache() to ensure only one execution per request
 */
export const getUser = cache(async (): Promise<UserDTO> => {
  const session = await verifySession()
  return session.user
})

/**
 * Check if authenticated (no redirect)
 * Used for conditional rendering scenarios
 */
export const checkAuth = cache(async (): Promise<{ isAuth: boolean; user: UserDTO | null }> => {
  const sessionPayload = await getSessionFromCookie()

  if (!isSessionValid(sessionPayload)) {
    return { isAuth: false, user: null }
  }

  // TypeScript now knows sessionPayload is not null
  const session = await prisma.session.findUnique({
    where: { id: sessionPayload!.sessionId },
    include: { user: true },
  })

  if (!session || isSessionExpired(session.expiresAt)) {
    return { isAuth: false, user: null }
  }

  return {
    isAuth: true,
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    },
  }
})
