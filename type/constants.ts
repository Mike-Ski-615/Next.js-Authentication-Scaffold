import type { LoginTab, Wallet } from "./types"
import type { AuthState } from "./types"

// ─────────────────────────────────────────────────────────────
// Header Content - Title and Description Mapping
// ─────────────────────────────────────────────────────────────

export const HEADER_CONTENT: Record<
  AuthState["step"],
  { title: string; description: string }
> = {
  default: {
    title: "Sign In",
    description: "Sign in to your account to continue",
  },
  wallets: {
    title: "Connect Wallet",
    description: "Choose a way to connect to your wallet",
  },
  email: {
    title: "Email Sign In",
    description: "We will send a verification code to your email to complete sign in",
  },
  phone: {
    title: "Phone Sign In",
    description: "Please enter your phone number, we will send a verification code to complete sign in",
  },
  passkey: {
    title: "Passkey",
    description: "Please follow the system prompts to complete passkey verification",
  },
  register: {
    title: "Register Account",
    description: "Create your new account",
  },
}

// ─────────────────────────────────────────────────────────────
// Login Tabs - Login Tab Configuration
// ─────────────────────────────────────────────────────────────

export const LOGIN_TABS: LoginTab[] = [
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "passkey", label: "Passkey" },
]

// ─────────────────────────────────────────────────────────────
// Wallets - Wallet List Configuration
// ─────────────────────────────────────────────────────────────

export const WALLETS: Wallet[] = [
  { id: "metamask", label: "MetaMask", icon: "Wallets/Metamask.svg" },
  { id: "coinbase", label: "Coinbase Wallet", icon: "Wallets/Coinbase.svg" },
  { id: "phantom", label: "Phantom", icon: "Wallets/Phantom.svg" },
  { id: "rainbow", label: "Rainbow", icon: "Wallets/Rainbow.svg" },
  { id: "other", label: "Other Wallets", icon: "Wallets/Other wallets.svg", badge: "350+" },
]

// ─────────────────────────────────────────────────────────────
// Animation Variants - Animation Configuration
// ─────────────────────────────────────────────────────────────

export const ITEM_VARIANTS = {
  initial: { opacity: 0, scale: 0.7 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 30,
    },
  },
}

export const CONTENT_VARIANTS = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { 
    type: "spring" as const, 
    bounce: 0, 
    duration: 0.3,
  },
}