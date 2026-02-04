"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IconChevronRight, IconPlus } from "@tabler/icons-react"
import { motion } from "motion/react"
import Image from "next/image"
import { ITEM_VARIANTS, WALLETS } from "../../type/constants"
import type { Wallet } from "../../type/types"

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function ConnectWalletState() {
  return (
    <div className="flex flex-col gap-2">
      <motion.div
        className="flex flex-col gap-2"
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.06,
              delayChildren: 0.02,
            },
          },
        }}
      >
        {WALLETS.map((wallet) => (
          <WalletButton key={wallet.id} wallet={wallet} />
        ))}

        <motion.div variants={ITEM_VARIANTS}>
          <Button variant="destructive" className="h-10 w-full">
            <IconPlus />
            Create New Wallet
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Sub Components
// ─────────────────────────────────────────────────────────────

function WalletButton({ wallet }: { wallet: Wallet }) {
  return (
    <motion.div variants={ITEM_VARIANTS}>
      <Button
        variant="secondary"
        className="flex h-10 w-full justify-between"
      >
        <div className="flex items-center gap-3">
          <Image
            src={wallet.icon}
            alt={wallet.label}
            width={18}
            height={18}
          />

          <span className="select-none text-xs/relaxed font-semibold text-gray-1200">
            {wallet.label}
          </span>

          {wallet.badge && (
            <Badge variant="secondary" className="text-gray-1100">
              {wallet.badge}
            </Badge>
          )}
        </div>

        <IconChevronRight />
      </Button>
    </motion.div>
  )
}
