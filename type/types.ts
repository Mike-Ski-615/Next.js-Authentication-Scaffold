import type { AuthFlow, IdentifierType } from "@/prisma/generated/prisma/enums"

// ─────────────────────────────────────────────────────────────
// Auth State - Authentication State (Unified State Management)
// ─────────────────────────────────────────────────────────────

// Base state for OTP verification (email/phone share same structure)
interface OTPVerificationState {
  identifier: string
  flow: AuthFlow
  name?: string // Optional name for sign-up
}

export type AuthState =
  | { step: "default" }
  | { step: "wallets" }
  | ({ step: "email" } & OTPVerificationState)
  | ({ step: "phone" } & OTPVerificationState)
  | { step: "passkey" }
  | { 
      step: "register"
      identifier: string
      identifierType: IdentifierType
    }

// ─────────────────────────────────────────────────────────────
// Component Props - Component Properties
// ─────────────────────────────────────────────────────────────

export interface StateComponentProps {
  state: AuthState
  onStateChange: (newState: AuthState) => void
}

// DefaultState only needs state change function
export interface DefaultStateProps {
  onStateChange: (newState: AuthState) => void
}

// ─────────────────────────────────────────────────────────────
// Login Tabs - Login Method Tabs
// ─────────────────────────────────────────────────────────────

export type LoginTabKey = "email" | "phone" | "passkey"

export interface LoginTab {
  key: LoginTabKey
  label: string
}

// ─────────────────────────────────────────────────────────────
// Social Providers - Third-party Login
// ─────────────────────────────────────────────────────────────

export type SocialProviderKey = "google" | "qq" | "wechat" | "github" | "x"

// ─────────────────────────────────────────────────────────────
// Wallets - Wallet Connection
// ─────────────────────────────────────────────────────────────

export type WalletId =
  | "metamask"
  | "coinbase"
  | "phantom"
  | "rainbow"
  | "other"

export interface Wallet {
  id: WalletId
  label: string
  icon: string
  badge?: string
}
