import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a unique ID using cryptographic randomness
 * Used for session tokens and other unique identifiers
 * 
 * @returns A 64-character hexadecimal string
 */
export function generateId(): string {
  const array = new Uint8Array(32)
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(array)
  } else {
    // Fallback for environments without crypto API
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256)
    }
  }
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

/**
 * Generates a 6-digit random verification code
 * 
 * @returns A string containing 6 random digits (100000-999999)
 */
export function generateVerificationCode(): string {
  const code = Math.floor(100000 + Math.random() * 900000)
  return code.toString()
}

/**
 * Calculates the expiration time for a verification code
 * 
 * @param minutes - Number of minutes until expiration (default: 1)
 * @returns Date object representing expiration time
 */
export function getExpirationTime(minutes: number = 1): Date {
  const now = new Date()
  return new Date(now.getTime() + minutes * 60 * 1000)
}

