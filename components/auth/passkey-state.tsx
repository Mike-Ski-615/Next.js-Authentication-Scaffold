"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { IconFingerprint, IconLoader } from "@tabler/icons-react"
import { motion } from "motion/react"

import { ITEM_VARIANTS } from "../../type/constants"
import type { StateComponentProps } from "../../type/types"

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function PasskeyState({ onStateChange }: StateComponentProps) {
  const [isVerifying, setIsVerifying] = useState(false)

  const handlePasskeyAuth = () => {
    setIsVerifying(true)
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false)
    }, 2000)
  }

  return (
    <motion.div
      className="flex flex-col"
      variants={ITEM_VARIANTS}
      initial="initial"
      animate="animate"
    >
      {/* Fingerprint icon and prompt */}
      <div className="flex flex-col items-center gap-4 pb-4 pt-2">
        <SpinningBorder isActive={isVerifying}>
          <div className="flex size-14 items-center justify-center rounded-xl bg-background">
            {isVerifying ? (
              <IconLoader className="size-7 animate-spin text-foreground" />
            ) : (
              <IconFingerprint className="size-7 text-foreground" />
            )}
          </div>
        </SpinningBorder>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2">
        <Button
          className="h-10 w-full rounded-xl font-semibold"
          onClick={handlePasskeyAuth}
          disabled={isVerifying}
        >
          {isVerifying ? (
            <>
              <IconLoader className="animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify with Passkey"
          )}
        </Button>
        <Button
          variant="outline"
          className="h-10 w-full rounded-xl font-semibold"
          onClick={() => onStateChange({ step: "default" })}
          disabled={isVerifying}
        >
          Back
        </Button>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// Sub Components
// ─────────────────────────────────────────────────────────────

function SpinningBorder({ children, isActive }: { children: React.ReactNode; isActive?: boolean }) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-[18px] p-0.5">
      {/* Rotating gradient border */}
      {isActive && (
        <div
          className="absolute inset-[-40%] h-[180%] w-[180%] animate-spin bg-[conic-gradient(from_0deg,transparent_0%,var(--info)_10%,var(--info)_25%,transparent_35%)]"
          style={{ animationDuration: "1.25s" }}
        />
      )}

      {/* Content container */}
      <div className="z-10 rounded-3xl bg-secondary p-1">
        <div className="rounded-xl bg-muted p-1">{children}</div>
      </div>
    </div>
  )
}
