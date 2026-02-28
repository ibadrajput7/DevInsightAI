"use client"

import { Terminal } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const footerLinks = [
  {
    title: "PRODUCT",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Documentation", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Security", href: "#" },
      { label: "SOC 2", href: "#" },
    ],
  },
]

export function Footer() {
  const ref = useScrollReveal<HTMLDivElement>({ animation: "fade-up", threshold: 0.05 })

  return (
    <footer className="border-t border-border bg-background py-16">
      <div ref={ref} className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center border border-primary bg-primary/10">
                <Terminal className="size-4 text-primary" />
              </div>
              <span className="font-mono text-sm font-bold tracking-wider text-foreground">
                DEV<span className="text-primary">INSIGHT</span>AI
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              AI-powered code review for developers who ship with confidence.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-primary" />
              ALL SYSTEMS OPERATIONAL
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                {group.title}
              </span>
              <div className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <span className="font-mono text-xs text-muted-foreground">
            {"\u00A9"} 2026 DevInsightAI. All rights reserved.
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            BUILT WITH RAW INTELLIGENCE
          </span>
        </div>
      </div>
    </footer>
  )
}
