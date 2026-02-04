import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { z } from "zod"
import { emailSchema, phoneSchema } from "@/lib/validation"
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
// Configuration Map - Single source of truth
// ─────────────────────────────────────────────────────────────

const AUTH_FORM_CONFIG = {
  email: {
    schema: z.object({ identifier: emailSchema }),
    defaultValue: "",
  },
  phone: {
    schema: z.object({ identifier: phoneSchema }),
    defaultValue: "",
  },
} as const

// ─────────────────────────────────────────────────────────────
// Unified Auth Form Hook
// ─────────────────────────────────────────────────────────────

export function useAuthForm(type: IdentifierType, props: UseAuthFormProps) {
  const config = AUTH_FORM_CONFIG[type]
  
  const form = useForm<{ identifier: string }>({
    resolver: zodResolver(config.schema),
    defaultValues: { identifier: config.defaultValue },
  })

  const isPending = form.formState.isSubmitting

  async function onSubmit(data: { identifier: string }) {
    const { exists } = await checkUserExists(data.identifier, type)

    if (!exists) {
      props.onRegister(data.identifier)
      return
    }

    const result = await sendVerificationCode(
      data.identifier,
      type,
      "sign_in",
      "default"
    )

    toast.success("If the account exists, we have sent a verification code")

    if (result.success) {
      props.onVerify(data.identifier)
    }

    if (!result.success) {
      toast.error(result.error)
    }
  }

  return { form, isPending, onSubmit }
}
