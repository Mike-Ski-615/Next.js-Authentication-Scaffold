import { Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { IconReload } from "@tabler/icons-react"
import type { IdentifierType } from "@/prisma/generated/prisma/enums"

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────

const OTP_LENGTH = 6

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface OTPInputProps {
  control: any
  isPending: boolean
  isResending: boolean
  errorMessage: string
  type: IdentifierType
  onResend: () => void
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export function OTPInput({
  control,
  isPending,
  isResending,
  errorMessage,
  type,
  onResend,
}: OTPInputProps) {
  return (
    <Controller
      name="otp"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid || !!errorMessage}>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">Verification Code</FieldLabel>
            <ResendButton onClick={onResend} isLoading={isResending} />
          </div>

          <InputOTP
            maxLength={OTP_LENGTH}
            id="otp-verification"
            value={field.value}
            onChange={field.onChange}
            disabled={isPending}
          >
            <InputOTPGroup className="flex-1 *:data-[slot=input-otp-slot]:flex-1 *:data-[slot=input-otp-slot]:h-10 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>

            <InputOTPSeparator className="mx-2" />

            <InputOTPGroup className="flex-1 *:data-[slot=input-otp-slot]:flex-1 *:data-[slot=input-otp-slot]:h-10 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <FieldDescription>
            <a href="#" className="underline-offset-4 hover:underline">
              {type === "email"
                ? "I no longer have access to this email address."
                : "I no longer have access to this phone number."}
            </a>
          </FieldDescription>

          {(fieldState.invalid || errorMessage) && (
            <FieldError
              errors={[fieldState.error || { message: errorMessage }]}
            />
          )}
        </Field>
      )}
    />
  )
}

// ─────────────────────────────────────────────────────────────
// Sub Components
// ─────────────────────────────────────────────────────────────

function ResendButton({
  onClick,
  isLoading,
}: {
  onClick: () => void
  isLoading: boolean
}) {
  return (
    <Button
      variant="outline"
      size="xs"
      onClick={onClick}
      disabled={isLoading}
      type="button"
    >
      <IconReload className={isLoading ? "animate-spin" : ""} />
      {isLoading ? "Sending..." : "Resend"}
    </Button>
  )
}
