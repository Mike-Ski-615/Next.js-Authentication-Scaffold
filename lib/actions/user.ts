"use server"

import { prisma } from "@/lib/prisma"
import { createSessionCookie, deleteSessionCookie, getSessionFromCookie } from "@/lib/session"
import { verifySession } from "@/lib/dal"
import { generateId } from "@/lib/utils"
import type { user, session } from "@/prisma/generated/prisma/client"
import type { IdentifierType } from "@/prisma/generated/prisma/enums"
import type { ActionResult } from "@/lib/types"

/**
 * Register new user
 */
export async function registerUser(
  identifier: string,
  identifierType: IdentifierType,
  name: string
): Promise<user> {
  const userData: {
    name: string
    email: string
    phoneNumber?: string
    emailVerified?: boolean
    phoneNumberVerified?: boolean
  } = {
    name,
    email: identifierType === "email" ? identifier : `${identifier}@phone.placeholder`,
  }

  if (identifierType === "email") {
    userData.emailVerified = true
  } else {
    userData.phoneNumber = identifier
    userData.phoneNumberVerified = true
  }

  const user = await prisma.user.create({
    data: userData,
  })

  return user
}

/**
 * Create session and set encrypted cookie
 */
export async function createSession(
  userId: string,
  ipAddress?: string,
  userAgent?: string
): Promise<session> {
  const token = generateId()
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30)

  // Create database session
  const sessionRecord = await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
      ipAddress,
      userAgent,
    },
  })

  // Set encrypted session cookie
  await createSessionCookie({
    userId,
    sessionId: sessionRecord.id,
    expiresAt,
  })

  return sessionRecord
}

/**
 * Delete session
 */
export async function deleteSession(
  sessionId: string
): Promise<ActionResult<{ deleted: boolean }>> {
  try {
    await prisma.session.delete({
      where: { id: sessionId },
    })

    return { success: true, data: { deleted: true } }
  } catch (error) {
    console.error("[Session] Error deleting session:", error)
    return { success: false, error: "Logout failed, please try again" }
  }
}

/**
 * Logout current user
 * Deletes session from database and removes session cookie
 */
export async function logout(): Promise<ActionResult<{ success: boolean }>> {
  try {
    const sessionPayload = await getSessionFromCookie()

    if (sessionPayload) {
      await deleteSession(sessionPayload.sessionId)
    }

    await deleteSessionCookie()

    return { success: true, data: { success: true } }
  } catch (error) {
    console.error("[User] Error logging out:", error)
    return { success: false, error: "Logout failed, please try again" }
  }
}

/**
 * Update user profile (example: action requiring authorization)
 */
export async function updateProfile(
  formData: FormData
): Promise<ActionResult<{ updated: boolean }>> {
  // Every action requiring authorization must verify session first
  const session = await verifySession()

  const name = formData.get("name")

  // Validate input
  if (typeof name !== "string" || name.length < 2 || name.length > 50) {
    return { success: false, error: "Name length should be between 2-50 characters" }
  }

  try {
    await prisma.user.update({
      where: { id: session.userId },
      data: { name },
    })

    return { success: true, data: { updated: true } }
  } catch (error) {
    console.error("[User] Error updating profile:", error)
    return { success: false, error: "Update failed, please try again" }
  }
}
