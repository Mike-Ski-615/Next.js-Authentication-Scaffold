"use server"

import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.SESSION_SECRET
if (!secretKey) {
  throw new Error("SESSION_SECRET environment variable is required")
}
const encodedKey = new TextEncoder().encode(secretKey)

export type SessionPayload = {
  userId: string
  sessionId: string
  expiresAt: Date
}

/**
 * Encrypt session payload to JWT
 */
export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload, expiresAt: payload.expiresAt.toISOString() })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(encodedKey)
}

/**
 * Decrypt JWT to session payload
 */
export async function decrypt(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null
  
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    })
    
    return {
      userId: payload.userId as string,
      sessionId: payload.sessionId as string,
      expiresAt: new Date(payload.expiresAt as string),
    }
  } catch {
    return null
  }
}

/**
 * Create session cookie
 */
export async function createSessionCookie(payload: SessionPayload): Promise<void> {
  const token = await encrypt(payload)
  const cookieStore = await cookies()
  
  cookieStore.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: payload.expiresAt,
    path: "/",
  })
}

/**
 * Delete session cookie
 */
export async function deleteSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("session_token")
}

/**
 * Get current session (decrypt from cookie)
 */
export async function getSessionFromCookie(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session_token")?.value
  return decrypt(token)
}
