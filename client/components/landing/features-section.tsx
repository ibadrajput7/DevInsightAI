"use client"

import {
  Shield,
  Database,
  Gauge,
  GitBranch,
  Lock,
  Cpu,
  FileSearch,
  AlertTriangle,
  BarChart3,
} from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const features = [
  {
    icon: FileSearch,
    label: "EXEC_SUMMARY",
    title: "Executive Summary",
    description:
      "Get a high-level overview of your codebase quality, patterns, and immediate action items distilled into a concise report.",
  },
  {
    icon: GitBranch,
    label: "ARCH_REVIEW",
    title: "Architecture Review",
    description:
      "Deep analysis of your project structure, module dependencies, separation of concerns, and scalability patterns.",
  },
  {
    icon: Shield,
    label: "SEC_AUDIT",
    title: "Security Assessment",
    description:
      "Identify vulnerabilities, injection risks, exposed secrets, insecure configurations, and OWASP compliance gaps.",
  },
  {
    icon: Lock,
    label: "AUTH_QUALITY",
    title: "Authentication Quality",
    description:
      "Evaluate your auth implementation: session management, token handling, password policies, and access control patterns.",
  },
  {
    icon: Database,
    label: "DB_DESIGN",
    title: "Database Design Review",
    description:
      "Analyze schema design, indexing strategies, query patterns, N+1 problems, and migration safety.",
  },
  {
    icon: Cpu,
    label: "ASYNC_RISKS",
    title: "Async & Concurrency Risks",
    description:
      "Detect race conditions, deadlock potential, unhandled promises, and concurrency anti-patterns in your code.",
  },
  {
    icon: Gauge,
    label: "PERF_RISKS",
    title: "Performance Risks",
    description:
      "Spot memory leaks, expensive computations, unnecessary re-renders, and optimization opportunities.",
  },
  {
    icon: BarChart3,
    label: "PROD_SCORE",
    title: "Production Readiness Score",
    description:
      "A 0-100 score measuring how ready your code is for production deployment across all review dimensions.",
  },
  {
    icon: AlertTriangle,
    label: "TECH_DEBT",
    title: "Technical Debt Analysis",
    description:
      "Prioritized list of improvements ranked by impact. Know exactly what to fix first for maximum code quality gains.",
  },
]

export function FeaturesSection() {
  const headerRef = useScrollReveal<HTMLDivElement>({ animation: "fade-up" })
  const gridRef = useScrollReveal<HTMLDivElement>({ animation: "fade-up", staggerChildren: true, threshold: 0.05, staggerDelay: 70 })

  return (
    <section id="features" className="noise-bg relative border-b border-border py-20 lg:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 flex flex-col gap-4">
          <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
            <span className="text-primary">// SECTION: REVIEW_MODULES</span>
            <span className="hidden h-px flex-1 bg-border sm:block" />
            <span>004</span>
          </div>
          <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Every dimension of your code,<br />
            <span className="text-primary">brutally analyzed.</span>
          </h2>
          <p className="max-w-2xl text-pretty font-sans text-base leading-relaxed text-muted-foreground">
            Nine specialized review modules dissect your codebase from security vulnerabilities to architecture patterns.
            No surface-level linting. Deep, actionable intelligence.
          </p>
        </div>

        {/* Features grid */}
        <div ref={gridRef} className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.label}
              className="group relative flex flex-col gap-4 bg-background p-6 transition-colors hover:bg-card lg:p-8"
            >
              {/* Top row: index + icon */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex size-10 items-center justify-center border border-border bg-card transition-colors group-hover:border-primary/30 group-hover:bg-primary/5">
                  <feature.icon className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] tracking-widest text-primary">
                  {feature.label}
                </span>
                <h3 className="font-sans text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>

              {/* Corner accent on hover */}
              <div className="absolute top-0 right-0 size-0 border-t-20 border-l-20 border-t-transparent border-l-transparent opacity-0 transition-opacity group-hover:opacity-100 group-hover:border-t-primary/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
