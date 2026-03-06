"use client"

import { Menu, Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface HeaderProps {
  activeSection: string
  onToggleSidebar: () => void
}

const SECTION_TITLES: Record<string, string> = {
  overview: "Dashboard",
  generate: "Generate Report",
  reports: "My Reports",
  "view-report": "Report Details",
  chatbot: "AI Assistant",
  settings: "Settings",
}

export function DashboardHeader({ activeSection, onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex items-center h-16 px-6 border-b border-border bg-background/80 backdrop-blur-sm shrink-0">
      <Button
        variant="ghost"
        size="icon"
        className="mr-4 size-8 text-muted-foreground hover:text-foreground md:hidden"
        onClick={onToggleSidebar}
      >
        <Menu className="size-4" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-foreground">
          {SECTION_TITLES[activeSection] || "Dashboard"}
        </h1>
        {activeSection === "overview" && (
          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
            Pro Plan
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            className="w-64 pl-9 h-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative size-9 text-muted-foreground hover:text-foreground">
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  )
}
