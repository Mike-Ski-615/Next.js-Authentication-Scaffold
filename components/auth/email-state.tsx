"use client"

import { Button } from "@/components/ui/button"
import { IconLoader } from "@tabler/icons-react"
import { motion } from "motion/react"

import { ITEM_VARIANTS } from "../../type/constants"
import type { StateComponentProps } from "../../type/types"
import { useOTPVerification } from "./hooks/use-otp-verification"
import { OTPInput } from "./components/otp-input"

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function EmailState({ state, onStateChange }: StateComponentProps) {
  const {
    form,
    isPending,
    isResending,
    errorMessage,
    handleSubmit,
    handleResend,
  } = useOTPVerification({
    identifier: state.step === "email" ? state.identifier : "",
    type: "email",
    flow: state.step === "email" ? state.flow : "sign_in",
    name: state.step === "email" ? state.name : undefined,
    onSuccess: () => onStateChange({ step: "default" }),
  })

  if (state.step !== "email") return null

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
          type="email"
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
