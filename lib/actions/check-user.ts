"use server"

import { prisma } from "@/lib/prisma"
import type { IdentifierType } from "@/prisma/generated/prisma/enums"

/**
 * Check if a user exists by email or phone number
 * 
 * @param identifier - Email address or phone number
 * @param type - Type of identifier ("email" or "phone")
 * @returns Object with exists boolean, identifier, and type
 * 
 * Security: Always returns exists: false on errors to prevent user enumeration
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5
 */
export async function checkUserExists(
  identifier: string,
  type: IdentifierType
): Promise<{
  exists: boolean
  identifier: string
  type: IdentifierType
}> {
  try {
    if (type === "email") {
      const user = await prisma.user.findUnique({
        where: { email: identifier },
        select: { id: true },
      })
      return {
        exists: !!user,
        identifier,
        type,
      }
    }

    if (type === "phone") {
      const user = await prisma.user.findUnique({
        where: { phoneNumber: identifier },
        select: { id: true },
      })
      return {
        exists: !!user,
        identifier,
        type,
      }
    }

    // Fallback for invalid type
    return {
      exists: false,
      identifier,
      type,
    }
  } catch (error) {
    // Log error for debugging but don't expose to user
    console.error("Check user error:", error)

    // Critical: Return exists: false on error to prevent information leakage
    // This prevents attackers from distinguishing between "user doesn't exist" 
    // and "database error" responses
    return {
      exists: false,
      identifier,
      type,
    }
  }
}
