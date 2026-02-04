"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import {
  passkeyFormSchema,
  type PasskeyFormData,
} from "@/lib/validation"
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandQq,
  IconBrandWechat,
  IconBrandX,
  IconFingerprint,
  IconWallet,
  IconArrowRight,
} from "@tabler/icons-react"

import { ITEM_VARIANTS, LOGIN_TABS } from "../../type/constants"
import type { DefaultStateProps, LoginTabKey, SocialProviderKey } from "../../type/types"
import { useAuthForm } from "./hooks/use-auth-form"
import { AuthFormInput } from "./components/auth-form-input"

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────

const SOCIAL_PROVIDERS: { key: SocialProviderKey; icon: React.ReactNode }[] = [
  { key: "google", icon: <IconBrandGoogle /> },
  { key: "qq", icon: <IconBrandQq /> },
  { key: "wechat", icon: <IconBrandWechat /> },
  { key: "github", icon: <IconBrandGithub /> },
  { key: "x", icon: <IconBrandX /> },
]

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function DefaultState({ onStateChange }: DefaultStateProps) {
  const [activeTab, setActiveTab] = React.useState<LoginTabKey>("email")

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2">
        <motion.div variants={ITEM_VARIANTS} initial="initial" animate="animate">
          <SocialProviders />
        </motion.div>

        <motion.div variants={ITEM_VARIANTS} initial="initial" animate="animate">
          <TabSelector activeTab={activeTab} onSelect={setActiveTab} />
        </motion.div>

        <div>
          {activeTab === "email" && <IdentifierForm identifierType="email" onStateChange={onStateChange} />}
          {activeTab === "phone" && <IdentifierForm identifierType="phone" onStateChange={onStateChange} />}
          {activeTab === "passkey" && <PasskeyForm onStateChange={onStateChange} />}
        </div>
      </div>

      <motion.div variants={ITEM_VARIANTS} initial="initial" animate="animate">
        <div className="relative my-0.5 flex h-6 items-center justify-center">
          <Separator className="absolute inset-x-0 my-0.5" />
          <span className="relative bg-popover px-2 text-xs/relaxed uppercase text-muted-foreground">
            or
          </span>
        </div>
      </motion.div>

      <motion.div variants={ITEM_VARIANTS} initial="initial" animate="animate">
        <Button
          type="button"
          className="h-10 w-full"
          onClick={() => onStateChange({ step: "wallets" })}
        >
          <IconWallet />
          Connect Wallet
        </Button>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Form Components
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// Unified Identifier Form - Single component for email/phone
// ─────────────────────────────────────────────────────────────

const IDENTIFIER_FORM_CONFIG = {
  email: {
    type: "email" as const,
    placeholder: "Please enter email address",
    autoComplete: "email",
  },
  phone: {
    type: "tel" as const,
    placeholder: "Please enter phone number",
    autoComplete: "tel",
  },
} as const

function IdentifierForm({ 
  identifierType,
  onStateChange,
}: { 
  identifierType: "email" | "phone"
  onStateChange: DefaultStateProps["onStateChange"] 
}) {
  const config = IDENTIFIER_FORM_CONFIG[identifierType]
  
  const { form, isPending, onSubmit } = useAuthForm(identifierType, {
    onRegister: (identifier) => {
      onStateChange({
        step: "register",
        identifier,
        identifierType,
      })
    },
    onVerify: (identifier) => {
      onStateChange({
        step: identifierType,
        identifier,
        flow: "sign_in",
      })
    },
  })

  return (
    <form
      id={`${identifierType}-form`}
      onSubmit={form.handleSubmit(onSubmit)}
      className="mt-1 flex flex-col gap-1"
    >
      <AuthFormInput
        control={form.control}
        name="identifier"
        type={config.type}
        placeholder={config.placeholder}
        autoComplete={config.autoComplete}
        isPending={isPending}
      />
    </form>
  )
}

function PasskeyForm({ onStateChange }: { onStateChange: DefaultStateProps["onStateChange"] }) {
  const form = useForm<PasskeyFormData>({
    resolver: zodResolver(passkeyFormSchema),
    defaultValues: { passkey: "" },
  })

  function onSubmit() {
    onStateChange({ step: "passkey" })
  }

  return (
    <form
      id="passkey-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="mt-1 flex flex-col gap-1"
    >
      <Field>
        <Button
          type="submit"
          variant="secondary"
          className="relative h-10 w-full justify-start gap-2 rounded-xl pl-3 pr-12"
        >
          <IconFingerprint size={16} className="text-muted-foreground" />
          <span className="flex-1 text-left text-xs font-medium text-muted-foreground">
            Sign in with passkey
          </span>
          <div className="absolute right-1 top-1/2 flex h-8 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <IconArrowRight size={16} />
          </div>
        </Button>
      </Field>
    </form>
  )
}

// ─────────────────────────────────────────────────────────────
// Sub Components
// ─────────────────────────────────────────────────────────────

function SocialProviders() {
  return (
    <div className="flex gap-2">
      {SOCIAL_PROVIDERS.map((provider) => (
        <Button
          key={provider.key}
          type="button"
          variant="secondary"
          className="size-10 flex-1"
        >
          {provider.icon}
        </Button>
      ))}
    </div>
  )
}

function TabSelector({
  activeTab,
  onSelect,
}: {
  activeTab: LoginTabKey
  onSelect: (tab: LoginTabKey) => void
}) {
  return (
    <div className="flex h-10 w-full items-center rounded-xl bg-secondary px-1">
      <div className="relative flex w-full items-center gap-1" role="tablist">
        {LOGIN_TABS.map((tab) => {
          const isActive = activeTab === tab.key

          return (
            <Button
              key={tab.key}
              type="button"
              size="sm"
              variant="ghost"
              className={`relative h-8 flex-1 ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
              onClick={() => onSelect(tab.key)}
            >
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-md bg-black/5 dark:bg-white/5"
                  transition={ITEM_VARIANTS.animate.transition}
                  initial={false}
                />
              )}
              <span className="relative select-none">{tab.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
