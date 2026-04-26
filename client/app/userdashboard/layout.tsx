"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashbaord/sidebar"
import { DashboardHeader } from "@/components/dashbaord/header"
import { AuthGuard } from "@/components/auth/auth-guard"
import { Toaster } from "sonner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <AuthGuard>
      <div className="flex h-screen bg-background">
        <DashboardSidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
        <div className="flex flex-col flex-1 min-w-0">
          <DashboardHeader activeSection="" onToggleSidebar={() => setIsOpen(!isOpen)} />
          <main className="p-6 flex-1 overflow-auto">
            {children}
          </main>
          <Toaster richColors position="bottom-right" />
        </div>
      </div>
    </AuthGuard>
  )
}