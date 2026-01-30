import { z } from "zod"
import { AuthStep, AuthFlow, IdentifierType } from "@/prisma/generated/prisma/enums"

/**
 * Email validation schema
 * Requirements: 9.1
 * Validates email format using standard email validation
 */
export const emailSchema = z
  .string()
  .min(1, "Please enter email address")
  .email({ message: "Please enter a valid email address" })

/**
 * Email form schema for use with react-hook-form
 */
export const emailFormSchema = z.object({
  email: emailSchema,
})

export type EmailFormData = z.infer<typeof emailFormSchema>

// ─────────────────────────────────────────────────────────────
// Phone Number Validation Schema
// ─────────────────────────────────────────────────────────────

/**
 * Chinese mobile phone number validation schema
 * Requirements: 9.2
 * Pattern: 1[3-9]\d{9}
 * - Starts with 1
 * - Second digit is 3-9
 * - Followed by 9 digits
 */
export const phoneSchema = z
  .string()
  .min(1, "Please enter phone number")
  .regex(/^1[3-9]\d{9}$/, "Please enter a valid phone number")

/**
 * Phone form schema for use with react-hook-form
 */
export const phoneFormSchema = z.object({
  phone: phoneSchema,
})

export type PhoneFormData = z.infer<typeof phoneFormSchema>

// ─────────────────────────────────────────────────────────────
// Name Validation Schema
// ─────────────────────────────────────────────────────────────

/**
 * Name validation schema
 * Requirements: 9.3
 * Validates that name is not empty and has reasonable length
 */
export const nameSchema = z
  .string()
  .min(1, "Please enter name")
  .min(2, "Username must be at least 2 characters")
  .max(50, "Username cannot exceed 50 characters")
  .trim()

/**
 * Register form schema for use with react-hook-form
 */
export const registerFormSchema = z.object({
  name: nameSchema,
})

export type RegisterFormData = z.infer<typeof registerFormSchema>

// ─────────────────────────────────────────────────────────────
// Verification Code Validation Schema
// ─────────────────────────────────────────────────────────────

/**
 * Verification code validation schema
 * Requirements: 9.4
 * Validates that code is exactly 6 digits
 */
export const verificationCodeSchema = z
  .string()
  .length(6, "Verification code must be 6 digits")
  .regex(/^\d{6}$/, "Verification code must contain only digits")

/**
 * OTP form schema for use with react-hook-form
 */
export const otpFormSchema = z.object({
  otp: verificationCodeSchema,
})

export type OTPFormData = z.infer<typeof otpFormSchema>

// ─────────────────────────────────────────────────────────────
// Passkey Validation Schema
// ─────────────────────────────────────────────────────────────

/**
 * Passkey form schema (optional field)
 */
export const passkeyFormSchema = z.object({
  passkey: z.string().optional(),
})

export type PasskeyFormData = z.infer<typeof passkeyFormSchema>

// ─────────────────────────────────────────────────────────────
// Prisma Enum Re-exports - For convenience in client code
// ─────────────────────────────────────────────────────────────

/**
 * Re-export Prisma enums for convenience
 * This allows importing from validation.ts instead of the generated Prisma client
 */
export { IdentifierType, AuthFlow, AuthStep }
