"use client"

import { useEffect, useRef, useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const reviewData = {
  executive_summary:
    "Well-structured Next.js application with solid TypeScript usage. Key concerns in auth token rotation and database query optimization. 7 critical improvements identified.",
  technology_stack: "Next.js 16 / TypeScript / PostgreSQL / Redis / Docker",
  production_readiness_score: 78,
  technical_debt_level: "Medium",
  risk_severity: {
    critical: 2,
    high: 5,
    medium: 12,
    low: 23,
  },
  top_improvements: [
    "Implement token refresh rotation in auth middleware",
    "Add database connection pooling with PgBouncer",
    "Fix N+1 queries in user dashboard endpoint",
    "Add rate limiting to public API routes",
    "Implement proper error boundaries in React tree",
  ],
}

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, started])

  return <span ref={ref}>{count}</span>
}

export function ReviewOutputSection() {
  const headerRef = useScrollReveal<HTMLDivElement>({ animation: "fade-up" })
  const cardRef = useScrollReveal<HTMLDivElement>({ animation: "fade-scale", threshold: 0.05 })

  return (
    <section className="noise-bg relative border-b border-border py-20 lg:py-8">
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 flex flex-col gap-4">
          <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
            <span className="text-primary">// SECTION: SAMPLE_OUTPUT</span>
            <span className="hidden h-px flex-1 bg-border sm:block" />
            <span>006</span>
          </div>
          <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What your review<br />
            <span className="text-primary">actually looks like.</span>
          </h2>
          <p className="max-w-2xl text-pretty font-sans text-base leading-relaxed text-muted-foreground">
            Not a vague linting report. A structured, machine-readable review document with scores, severity distribution, and prioritized action items.
          </p>
        </div>

        {/* Review card */}
        <div ref={cardRef} className="border border-border bg-card">
          {/* Header bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-destructive/60" />
                <span className="size-2.5 rounded-full bg-chart-4/60" />
                <span className="size-2.5 rounded-full bg-primary/60" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">review_output.json</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-primary">ANALYSIS COMPLETE</span>
            </div>
          </div>

          <div className="grid gap-px bg-border lg:grid-cols-3">
            {/* Left: Main stats */}
            <div className="flex flex-col gap-6 bg-background p-6 lg:col-span-1">
              {/* Production score */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  PRODUCTION_READINESS
                </span>
                <div className="flex items-end gap-2">
                  <span className="font-mono text-5xl font-bold text-primary">
                    <AnimatedCounter target={reviewData.production_readiness_score} />
                  </span>
                  <span className="mb-2 font-mono text-lg text-muted-foreground">/100</span>
                </div>
                <div className="h-2 w-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-2000" style={{ width: `${reviewData.production_readiness_score}%` }} />
                </div>
              </div>

              {/* Tech debt */}
              <div className="flex flex-col gap-2 border-t border-border pt-4">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  TECHNICAL_DEBT
                </span>
                <span className="font-mono text-lg font-bold text-chart-4">
                  {reviewData.technical_debt_level}
                </span>
              </div>

              {/* Tech stack */}
              <div className="flex flex-col gap-2 border-t border-border pt-4">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  STACK_DETECTED
                </span>
                <span className="font-mono text-xs text-foreground">
                  {reviewData.technology_stack}
                </span>
              </div>

              {/* Risk distribution */}
              <div className="flex flex-col gap-3 border-t border-border pt-4">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  RISK_SEVERITY_DISTRIBUTION
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(reviewData.risk_severity).map(([key, value]) => {
                    const colors: Record<string, string> = {
                      critical: "text-destructive border-destructive/30",
                      high: "text-chart-4 border-chart-4/30",
                      medium: "text-foreground border-border",
                      low: "text-primary border-primary/30",
                    }
                    return (
                      <div
                        key={key}
                        className={`flex flex-col items-center gap-1 border p-2 ${colors[key]}`}
                      >
                        <span className="font-mono text-xl font-bold">
                          <AnimatedCounter target={value} duration={1500} />
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                          {key}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right: Review content */}
            <div className="flex flex-col gap-0 bg-background lg:col-span-2">
              {/* Executive summary */}
              <div className="border-b border-border p-6">
                <span className="font-mono text-[10px] tracking-widest text-primary">
                  EXECUTIVE_SUMMARY
                </span>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  {reviewData.executive_summary}
                </p>
              </div>

              {/* Top improvements */}
              <div className="p-6">
                <span className="font-mono text-[10px] tracking-widest text-primary">
                  TOP_PRIORITIZED_IMPROVEMENTS
                </span>
                <div className="mt-4 flex flex-col gap-0">
                  {reviewData.top_improvements.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 border-t border-border py-3 first:border-t-0"
                    >
                      <span className="shrink-0 font-mono text-xs font-bold text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-foreground">{item}</span>
                      <span className="ml-auto shrink-0 font-mono text-[10px] text-muted-foreground">
                        {i < 2 ? "CRITICAL" : i < 3 ? "HIGH" : "MEDIUM"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
