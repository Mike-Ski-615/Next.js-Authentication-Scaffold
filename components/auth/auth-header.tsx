'use client';

import { Button } from "@/components/ui/button"
import { DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { IconChevronLeft } from "@tabler/icons-react"
import { HEADER_CONTENT } from "../../type/constants"
import type { AuthState } from "../../type/types"

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface AuthHeaderProps {
  step: AuthState["step"]
  onBack: () => void
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function AuthHeader({ step, onBack }: AuthHeaderProps) {
  const { title, description } = HEADER_CONTENT[step]

  return (
    <div className="flex">
      {/* Back button or placeholder */}
      {step !== "default" ? (
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-md"
          onClick={onBack}
        >
          <IconChevronLeft />
        </Button>
      ) : (
        <Spacer />
      )}

      {/* Title area */}
      <div className="flex flex-1 flex-col text-center">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </div>

      {/* Right spacer to maintain symmetry */}
      <Spacer />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Sub Components
// ─────────────────────────────────────────────────────────────

function Spacer() {
  return <div className="size-6" aria-hidden="true" />
}
