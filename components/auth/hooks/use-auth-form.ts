import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  emailFormSchema,
  phoneFormSchema,
  type EmailFormData,
  type PhoneFormData,
} from "@/lib/validation"
import { checkUserExists } from "@/lib/actions/check-user"
import { sendVerificationCode } from "@/lib/actions/verification-code"
import type { IdentifierType } from "@/prisma/generated/prisma/enums"

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface UseAuthFormProps {
  type: IdentifierType
  onRegister: (identifier: string) => void
  onVerify: (identifier: string) => void
}

// ─────────────────────────────────────────────────────────────
// Email Hook
// ─────────────────────────────────────────────────────────────

export function useEmailAuthForm({ onRegister, onVerify }: Omit<UseAuthFormProps, "type">) {
  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "" },
  })

  const isPending = form.formState.isSubmitting

  async function onSubmit(data: EmailFormData) {
    const { exists } = await checkUserExists(data.email, "email")

    if (!exists) {
      onRegister(data.email)
      return
    }

    const result = await sendVerificationCode(
      data.email,
      "email",
      "sign_in",
      "default"
    )

    toast.success("If the account exists, we have sent a verification code")

    if (result.success) {
      onVerify(data.email)
    }

    if (!result.success) {
      console.error("Failed to send verification code:", result.error)
    }
  }

  return { form, isPending, onSubmit }
}

// ─────────────────────────────────────────────────────────────
// Phone Hook
// ─────────────────────────────────────────────────────────────

export function usePhoneAuthForm({ onRegister, onVerify }: Omit<UseAuthFormProps, "type">) {
  const form = useForm<PhoneFormData>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: { phone: "" },
  })

  const isPending = form.formState.isSubmitting

  async function onSubmit(data: PhoneFormData) {
    const { exists } = await checkUserExists(data.phone, "phone")

    if (!exists) {
      onRegister(data.phone)
      return
    }

    const result = await sendVerificationCode(
      data.phone,
      "phone",
      "sign_in",
      "default"
    )

    toast.success("If the account exists, we have sent a verification code")

    if (result.success) {
      onVerify(data.phone)
    }

    if (!result.success) {
      console.error("Failed to send verification code:", result.error)
    }
  }

  return { form, isPending, onSubmit }
}
