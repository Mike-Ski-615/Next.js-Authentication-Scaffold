/**
 * Shared types for server actions and API responses
 */

import type { user } from "@/prisma/generated/prisma/client"
import type { SessionPayload } from "@/lib/session"

/**
 * User DTO - Only includes safe user fields for client exposure
 * Uses Pick to select fields from Prisma generated types
 */
export type UserDTO = Pick<user, "id" | "name" | "email" | "image">

/**
 * Action result type for consistent error handling across all server actions
 */
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }

/**
 * Session validation helpers
 */

/**
 * Check if a session has expired
 * @param expiresAt - The expiration date of the session
 * @returns true if the session has expired, false otherwise
 */
export function isSessionExpired(expiresAt: Date): boolean {
  return expiresAt < new Date()
}

/**
 * Type guard to validate session payload
 * Narrows type from SessionPayload | null to SessionPayload
 * @param sessionPayload - The session payload to validate
 * @returns true if session is valid (exists and not expired), false otherwise
 */
export function isSessionValid(
  sessionPayload: SessionPayload | null
): sessionPayload is SessionPayload {
  if (!sessionPayload) return false
  return !isSessionExpired(sessionPayload.expiresAt)
}
