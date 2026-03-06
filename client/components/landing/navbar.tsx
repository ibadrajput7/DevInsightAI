"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { Menu, X, Terminal, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

const navLinks = [
  { label: "FEATURES", href: "#features" },
  { label: "HOW_IT_WORKS", href: "#how-it-works" },
  { label: "ABOUT_US", href: "/about" },
  { label: "PRICING", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <a href="#" className="flex items-center gap-2 group">
          <div className="flex size-8 items-center justify-center border border-primary bg-primary/10">
            <Terminal className="size-4 text-primary" />
          </div>
          <span className="font-mono text-sm font-bold tracking-wider text-foreground">
            DEV<span className="text-primary">INSIGHT</span>AI
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-2 font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary"  >
              {link.label}
            </Link>
            ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </button>
          )}
          <a
            href="/auth?mode=login"
            className="font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            LOG_IN
          </a>
          <a
            href="/auth?mode=signup"
            className="border border-primary bg-primary px-4 py-2 font-mono text-xs font-bold tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            GET STARTED
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center border border-border p-2"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="size-4 text-foreground" /> : <Menu className="size-4 text-foreground" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2 font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
              <a href="/auth?mode=login" className="py-2 font-mono text-xs tracking-wider text-muted-foreground">
                LOG_IN
              </a>
              <a
                href="/auth?mode=signup"
                className="border border-primary bg-primary px-4 py-2 text-center font-mono text-xs font-bold tracking-wider text-primary-foreground"
              >
                GET STARTED
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
