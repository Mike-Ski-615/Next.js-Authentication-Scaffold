"use client"

import { useState, useCallback } from "react"
import { AnimatePresence, motion } from "motion/react"

import { useMeasure } from "@/hooks/use-measure"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"

import AuthHeader from "./auth-header"
import ConnectWalletState from "./wallet-state"
import DefaultState from "./default-state"
import EmailState from "./email-state"
import PasskeyState from "./passkey-state"
import PhoneState from "./phone-state"
import RegisterState from "./register-state"
import { CONTENT_VARIANTS, AUTH_DIALOG_DEFAULT_HEIGHT } from "../../type/constants"
import type { AuthState, StateComponentProps } from "../../type/types"

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────

const STATE_COMPONENTS: Record<AuthState["step"], React.ComponentType<StateComponentProps>> = {
    default: DefaultState,
    wallets: ConnectWalletState,
    email: EmailState,
    phone: PhoneState,
    passkey: PasskeyState,
    register: RegisterState,
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function AuthDialog({ children }: { children: React.ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({ step: "default" })
    const [isOpen, setIsOpen] = useState(false)
    const [ref, bounds] = useMeasure<HTMLDivElement>()

    const handleOpenChange = useCallback((open: boolean) => {
        setIsOpen(open)
        if (!open) {
            setAuthState({ step: "default" })
        }
    }, [])

    const handleStateChange = useCallback((newState: AuthState) => {
        setAuthState(newState)
    }, [])

    const handleBack = useCallback(() => {
        setAuthState({ step: "default" })
    }, [])

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="overflow-hidden">
                <DialogHeader>
                    <AuthHeader step={authState.step} onBack={handleBack} />
                </DialogHeader>

                <motion.div
                    animate={{
                        height: authState.step === "default" ? AUTH_DIALOG_DEFAULT_HEIGHT : bounds.height,
                    }}
                    className="will-change-transform"
                >
                    <div ref={ref}>
                        <StepContent
                            state={authState}
                            onStateChange={handleStateChange}
                        />
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    )
}

// ─────────────────────────────────────────────────────────────
// Sub Components
// ─────────────────────────────────────────────────────────────

function StepContent({
    state,
    onStateChange,
}: {
    state: AuthState
    onStateChange: (newState: AuthState) => void
}) {
    const Component = STATE_COMPONENTS[state.step]

    return (
        <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={state.step} {...CONTENT_VARIANTS}>
                <Component state={state} onStateChange={onStateChange} />
            </motion.div>
        </AnimatePresence>
    )
}
