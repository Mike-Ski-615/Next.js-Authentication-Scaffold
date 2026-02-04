"use client"

import { Button } from "@/components/ui/button"
import { IconLoader } from "@tabler/icons-react"
import { motion } from "motion/react"

import { ITEM_VARIANTS } from "../../type/constants"
import type { StateComponentProps } from "../../type/types"
import { useOTPVerification } from "./hooks/use-otp-verification"
import { OTPInput } from "./components/otp-input"
import type { IdentifierType } from "@/prisma/generated/prisma/enums"

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface OTPVerificationStateProps extends StateComponentProps {
  type: IdentifierType
}

// ─────────────────────────────────────────────────────────────
// Component - Unified OTP Verification for Email & Phone
// ─────────────────────────────────────────────────────────────

export default function OTPVerificationState({ 
  state, 
  onStateChange,
  type,
}: OTPVerificationStateProps) {
  // Type guard: only render for matching step
  const isValidStep = state.step === type
  
  const {
    form,
    isPending,
    isResending,
    errorMessage,
    handleSubmit,
    handleResend,
  } = useOTPVerification({
    identifier: isValidStep ? state.identifier : "",
    type,
    flow: isValidStep ? state.flow : "sign_in",
    name: isValidStep ? state.name : undefined,
    onSuccess: () => onStateChange({ step: "default" }),
  })

  if (!isValidStep) return null

  return (
    <motion.div
      className="flex flex-col gap-4"
      variants={ITEM_VARIANTS}
      initial="initial"
      animate="animate"
    >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <OTPInput
          control={form.control}
          isPending={isPending}
          isResending={isResending}
          errorMessage={errorMessage}
          type={type}
          onResend={handleResend}
        />

        <Button type="submit" className="h-10 w-full" disabled={isPending}>
          {isPending ? (
            <>
              <IconLoader className="animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </form>
    </motion.div>
  )
}
