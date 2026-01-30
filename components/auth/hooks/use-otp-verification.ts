import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { otpFormSchema, type OTPFormData } from "@/lib/validation"
import { verifyCode, sendVerificationCode } from "@/lib/actions/verification-code"
import type { IdentifierType, AuthFlow } from "@/prisma/generated/prisma/enums"

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface UseOTPVerificationProps {
  identifier: string
  type: IdentifierType
  flow: AuthFlow
  name?: string
  onSuccess: () => void
}

// ─────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────

export function useOTPVerification({
  identifier,
  type,
  flow,
  name,
  onSuccess,
}: UseOTPVerificationProps) {
  const [isResending, setIsResending] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: { otp: "" },
  })

  const isPending = form.formState.isSubmitting

  async function handleSubmit(data: OTPFormData) {
    setErrorMessage("")
    
    const step = flow === "sign_up" ? "register" : "default"
    
    const result = await verifyCode(
      identifier,
      type,
      flow,
      step,
      data.otp,
      name
    )

    if (result.success) {
      const message = flow === "sign_up" 
        ? `${type === "email" ? "Email" : "Phone"} registration successful` 
        : `${type === "email" ? "Email" : "Phone"} login successful`
      
      toast.success(message)
      onSuccess()
    }

    if (!result.success) {
      setErrorMessage(result.error)
      toast.error(result.error)
    }
  }

  async function handleResend() {
    setIsResending(true)
    setErrorMessage("")
    
    const step = flow === "sign_up" ? "register" : "default"
    
    const result = await sendVerificationCode(
      identifier,
      type,
      flow,
      step,
      name
    )

    if (result.success) {
      toast.success("Verification code resent")
      form.reset()
    }

    if (!result.success) {
      toast.error(result.error)
    }

    setIsResending(false)
  }

  return {
    form,
    isPending,
    isResending,
    errorMessage,
    handleSubmit,
    handleResend,
  }
}
