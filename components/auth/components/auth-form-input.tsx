import { Controller, Control, FieldValues, Path } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Field, FieldError } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { IconArrowRight, IconLoader } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface AuthFormInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  type: string
  placeholder: string
  autoComplete: string
  isPending: boolean
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export function AuthFormInput<T extends FieldValues>({
  control,
  name,
  type,
  placeholder,
  autoComplete,
  isPending,
}: AuthFormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="relative">
            <Input
              {...field}
              id={`${name}-input`}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={isPending}
              aria-invalid={fieldState.invalid}
              className="h-10 w-full rounded-xl border-0 bg-secondary pl-3 pr-12 text-xs font-medium text-foreground shadow-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
            />
            <SubmitButton
              disabled={!field.value || isPending}
              isLoading={isPending}
              className="absolute right-1 top-1/2 -translate-y-1/2"
            />
          </div>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="text-xs px-3" />
          )}
        </Field>
      )}
    />
  )
}

// ─────────────────────────────────────────────────────────────
// Sub Components
// ─────────────────────────────────────────────────────────────

function SubmitButton({
  disabled,
  isLoading,
  className,
}: {
  disabled: boolean
  isLoading?: boolean
  className?: string
}) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      size="icon-sm"
      className={cn(
        "group h-8 w-10 shrink-0 rounded-lg text-xs transition-colors duration-200 ease-out",
        disabled
          ? "cursor-not-allowed bg-muted text-muted-foreground"
          : "bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
    >
      {isLoading ? <IconLoader className="animate-spin" /> : <IconArrowRight />}
    </Button>
  )
}
