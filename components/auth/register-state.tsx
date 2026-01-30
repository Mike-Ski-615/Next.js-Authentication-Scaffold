"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { IconArrowRight, IconLoader } from "@tabler/icons-react"
import { toast } from "sonner"

import { ITEM_VARIANTS } from "../../type/constants"
import type { StateComponentProps } from "../../type/types"
import { sendVerificationCode } from "@/lib/actions/verification-code"
import { registerFormSchema, type RegisterFormData } from "@/lib/validation"

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function RegisterState({ 
  state,
  onStateChange 
}: StateComponentProps) {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
    },
  })

  if (state.step !== "register") return null
  
  // Extract properties after type guard
  const { identifier, identifierType } = state

  const isPending = form.formState.isSubmitting

  async function onSubmit(data: RegisterFormData) {
    const result = await sendVerificationCode(
      identifier,
      identifierType,
      "sign_up",
      "register",
      data.name
    )

    if (!result.success) {
      toast.error(result.error)
      return
    }

    toast.success("Verification code sent")
    
    if (identifierType === "email") {
      onStateChange({
        step: "email",
        identifier: identifier,
        flow: "sign_up",
        name: data.name,
      })
    }

    if (identifierType === "phone") {
      onStateChange({
        step: "phone",
        identifier: identifier,
        flow: "sign_up",
        name: data.name,
      })
    }
  }

  return (
    <motion.div
      className="flex flex-col gap-4"
      variants={ITEM_VARIANTS}
      initial="initial"
      animate="animate"
    >
      <form
        id="register-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FieldGroup>
          {/* Identifier display (read-only) */}
          <Field>
            <FieldLabel htmlFor="identifier-input">
              {identifierType === "email" ? "Email Address" : "Phone Number"}
            </FieldLabel>
            <div className="relative">
              <Input
                id="identifier-input"
                type="text"
                value={identifier}
                disabled
                className="h-10 w-full rounded-xl border-0 bg-secondary px-3 text-xs font-medium text-foreground shadow-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
          </Field>

          {/* Username input */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name-input">Username</FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="name-input"
                    type="text"
                    placeholder="Please enter username"
                    autoComplete="name"
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                    className="h-10 w-full rounded-xl border-0 bg-secondary px-3 text-xs font-medium text-foreground shadow-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-xs px-3" />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Submit button */}
        <Button
          type="submit"
          className="h-10 w-full"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <IconLoader className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Continue
              <IconArrowRight />
            </>
          )}
        </Button>

        {/* Back button */}
        <Button
          type="button"
          variant="outline"
          className="h-10 w-full"
          onClick={() => onStateChange({ step: "default" })}
          disabled={isPending}
        >
          Back
        </Button>
      </form>
    </motion.div>
  )
}
