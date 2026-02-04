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
  onRegister: (identifier: string) => void
  onVerify: (identifier: string) => void
}

// ─────────────────────────────────────────────────────────────
// Shared Submit Logic
// ─────────────────────────────────────────────────────────────

async function handleAuthSubmit(
  identifier: string,
  type: IdentifierType,
  { onRegister, onVerify }: UseAuthFormProps
) {
  const { exists } = await checkUserExists(identifier, type)

  if (!exists) {
    onRegister(identifier)
    return
  }

  const result = await sendVerificationCode(
    identifier,
    type,
    "sign_in",
    "default"
  )

  toast.success("If the account exists, we have sent a verification code")

  if (result.success) {
    onVerify(identifier)
  }

  if (!result.success) {
    toast.error(result.error)
  }
}

// ─────────────────────────────────────────────────────────────
// Specialized Hooks
// ─────────────────────────────────────────────────────────────

export function useEmailAuthForm(props: UseAuthFormProps) {
  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "" },
  })

  const isPending = form.formState.isSubmitting

  async function onSubmit(data: EmailFormData) {
    await handleAuthSubmit(data.email, "email", props)
  }

  return { form, isPending, onSubmit }
}

export function usePhoneAuthForm(props: UseAuthFormProps) {
  const form = useForm<PhoneFormData>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: { phone: "" },
  })

  const isPending = form.formState.isSubmitting

  async function onSubmit(data: PhoneFormData) {
    await handleAuthSubmit(data.phone, "phone", props)
  }

  return { form, isPending, onSubmit }
}
