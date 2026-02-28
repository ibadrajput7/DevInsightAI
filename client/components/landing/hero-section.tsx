"use client"

import { useEffect, useState } from "react"
import { ArrowRight, GitBranch, FileCode, Shield, Zap } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

function TerminalLine({ delay, children }: { delay: number; children: string }) {
  const [text, setText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        setText(children.slice(0, i + 1))
        i++
        if (i >= children.length) {
          clearInterval(interval)
          setShowCursor(false)
        }
      }, 30)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [children, delay])

  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <span className="text-primary">{">"}</span>
      <span className="text-muted-foreground">{text}</span>
      {showCursor && <span className="animate-blink text-primary">_</span>}
    </div>
  )
}

export function HeroSection() {
  const [tick, setTick] = useState(0)
  const leftRef = useScrollReveal<HTMLDivElement>({ animation: "fade-left", threshold: 0.05 })
  const rightRef = useScrollReveal<HTMLDivElement>({ animation: "fade-right", threshold: 0.05, delay: 200 })
  const statsRef = useScrollReveal<HTMLDivElement>({ animation: "fade-up", staggerChildren: true, delay: 300 })

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="noise-bg relative overflow-hidden border-b border-border pt-24 pb-16 lg:pt-16 lg:pb-8">
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        {/* System status bar */}
        <div className="mb-8 flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            SYS.ONLINE
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">TICK:{String(tick).padStart(6, "0")}</span>
          <span>|</span>
          <span>v2.4.1</span>
          <span>|</span>
          <span>MODELS_ACTIVE: 3</span>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Content */}
          <div ref={leftRef} className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="inline-flex w-fit items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1.5 font-mono text-xs text-primary">
                <FileCode className="size-3" />
                // AI_CODE_REVIEWER
              </div>

              <h1 className="text-balance font-sans text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                REVIEW.<br />
                <span className="text-primary">REFACTOR.</span><br />
                SHIP.
              </h1>

              <p className="max-w-lg text-pretty font-sans text-base leading-relaxed text-muted-foreground lg:text-lg">
                DevInsightAI is the AI-powered code analysis engine that sits between your codebase and production.
                Upload a GitHub repo or ZIP file. Get architecture reviews, security audits, and production readiness scores in seconds.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="group flex items-center gap-2 border border-primary bg-primary px-6 py-3 font-mono text-sm font-bold tracking-wider text-primary-foreground transition-all hover:bg-primary/90"
              >
                GET STARTED
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#how-it-works"
                className="flex items-center gap-2 border border-border px-6 py-3 font-mono text-sm tracking-wider text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                HOW IT WORKS
              </a>
            </div>

            {/* Quick stats */}
            <div className="mt-10 flex flex-col gap-4">
             <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-foreground  sm:text-4xl">
                  SUPPORTED {" "}
                <span className="text-primary">TECHNOLOGIES</span>
              </h2>
            </div>
          </div>

          {/* Right: Terminal preview */}
          <div ref={rightRef} className="relative">
            <div className="border border-border bg-card">
              {/* Terminal header */}
              <div className="flex items-center justify-between border-b border-border px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-destructive/60" />
                    <span className="size-2.5 rounded-full bg-chart-4/60" />
                    <span className="size-2.5 rounded-full bg-primary/60" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">devinsight.review</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">LIVE</span>
              </div>

              {/* Terminal body */}
              <div className="flex flex-col gap-3 p-4">
                <TerminalLine delay={300}>analyzing repository: acme/web-platform...</TerminalLine>
                <TerminalLine delay={1500}>scanning 847 files across 12 directories...</TerminalLine>
                <TerminalLine delay={2800}>running security_assessment module...</TerminalLine>
                <TerminalLine delay={4000}>generating architecture_review...</TerminalLine>

                {/* Review output */}
                <div className="mt-2 border border-border bg-background p-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">production_readiness_score</span>
                      <span className="font-mono text-sm font-bold text-primary">78/100</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary">
                      <div className="h-full bg-primary" style={{ width: "78%" }} />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">technical_debt_level</span>
                      <span className="font-mono text-xs font-bold text-chart-4">Medium</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 border-t border-border pt-3">
                      {[
                        { label: "critical", count: 2, color: "text-destructive" },
                        { label: "high", count: 5, color: "text-chart-4" },
                        { label: "medium", count: 12, color: "text-foreground" },
                        { label: "low", count: 23, color: "text-primary" },
                      ].map((item) => (
                        <div key={item.label} className="flex flex-col items-center gap-1">
                          <span className={`font-mono text-lg font-bold ${item.color}`}>{item.count}</span>
                          <span className="font-mono text-[10px] uppercase text-muted-foreground">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modules */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    { icon: Shield, label: "SECURITY" },
                    { icon: GitBranch, label: "ARCHITECTURE" },
                    { icon: Zap, label: "PERFORMANCE" },
                  ].map((mod) => (
                    <div
                      key={mod.label}
                      className="flex items-center gap-1.5 border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground"
                    >
                      <mod.icon className="size-3" />
                      {mod.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute -top-2 -right-2 hidden size-4 border-t border-r border-primary lg:block" />
            <div className="absolute -bottom-2 -left-2 hidden size-4 border-b border-l border-primary lg:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
