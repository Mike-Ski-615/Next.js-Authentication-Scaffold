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
import OTPVerificationState from "./otp-verification-state"
import PasskeyState from "./passkey-state"
import RegisterState from "./register-state"
import { CONTENT_VARIANTS, AUTH_DIALOG_DEFAULT_HEIGHT } from "../../type/constants"
import type { AuthState, StateComponentProps } from "../../type/types"

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
// Step Content - Renders appropriate component based on state
// ─────────────────────────────────────────────────────────────

function StepContent({
    state,
    onStateChange,
}: StateComponentProps) {
    const renderContent = () => {
        switch (state.step) {
            case "default":
                return <DefaultState onStateChange={onStateChange} />
            case "wallets":
                return <ConnectWalletState />
            case "email":
                return <OTPVerificationState state={state} onStateChange={onStateChange} type="email" />
            case "phone":
                return <OTPVerificationState state={state} onStateChange={onStateChange} type="phone" />
            case "passkey":
                return <PasskeyState state={state} onStateChange={onStateChange} />
            case "register":
                return <RegisterState state={state} onStateChange={onStateChange} />
        }
    }

    return (
        <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={state.step} {...CONTENT_VARIANTS}>
                {renderContent()}
            </motion.div>
        </AnimatePresence>
    )
}
