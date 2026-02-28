"use client"

import { Upload, Cpu, FileOutput, MessageSquare } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const steps = [
  {
    icon: Upload,
    label: "UPLOAD",
    number: "01",
    title: "Upload Your Codebase",
    description:
      "Connect your GitHub repository or drag-and-drop a ZIP file. We support any language, any framework, any size.",
    terminal: [
      "> connect --repo github.com/you/project",
      "> scanning repository structure...",
      "> 1,247 files detected across 38 modules",
    ],
  },
  {
    icon: Cpu,
    label: "ANALYZE",
    number: "02",
    title: "AI Deep Analysis",
    description:
      "Our AI engine runs 9 specialized review modules simultaneously. Architecture, security, performance, database, auth, and more.",
    terminal: [
      "> executing review_pipeline --mode=full",
      "> module[security_assessment]: RUNNING",
      "> module[architecture_review]: RUNNING",
      "> module[performance_risks]: RUNNING",
    ],
  },
  {
    icon: FileOutput,
    label: "REPORT",
    number: "03",
    title: "Get Your Report",
    description:
      "Receive a comprehensive review with production readiness score, risk severity distribution, and prioritized improvements.",
    terminal: [
      "> review_complete: all 9 modules passed",
      "> production_readiness_score: 82/100",
      "> technical_debt_level: Medium",
      "> top_improvements: 7 items prioritized",
    ],
  },
  {
    icon: MessageSquare,
    label: "ASSIST",
    number: "04",
    title: "Chat with AI Assistant",
    description:
      "Ask our AI chatbot how to fix issues, refactor code, organize files, and scale your architecture. Real-time guidance.",
    terminal: [
      '> ask "How do I fix the N+1 query?"',
      "> assistant: Use eager loading with...",
      "> generating code suggestion...",
      "> patch ready for review",
    ],
  },
]

function StepCard({ step, index, total }: { step: (typeof steps)[0]; index: number; total: number }) {
  const ref = useScrollReveal<HTMLDivElement>({
    animation: index % 2 === 0 ? "fade-left" : "fade-right",
    delay: 100,
  })

  return (
    <div
      ref={ref}
      className={`group grid items-start gap-8 border-t border-border py-12 lg:grid-cols-2 lg:gap-16 ${
        index === total - 1 ? "border-b" : ""
      }`}
    >
      {/* Left: Info */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center border border-primary bg-primary/10">
            <step.icon className="size-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] tracking-widest text-primary">
              {step.label}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              STEP_{step.number}
            </span>
          </div>
        </div>

        <h3 className="font-sans text-2xl font-bold text-foreground">
          {step.title}
        </h3>
        <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </div>

      {/* Right: Terminal */}
      <div className="border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-destructive/60" />
            <span className="size-2 rounded-full bg-chart-4/60" />
            <span className="size-2 rounded-full bg-primary/60" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            step_{step.number}.sh
          </span>
        </div>
        <div className="flex flex-col gap-2 p-4">
          {step.terminal.map((line, j) => (
            <div key={j} className="flex items-start gap-2 font-mono text-xs">
              <span className="text-primary shrink-0">{">"}</span>
              <span className="text-muted-foreground">{line.replace("> ", "")}</span>
            </div>
          ))}
          <div className="mt-1 flex items-center gap-2 font-mono text-xs">
            <span className="text-primary">{">"}</span>
            <span className="animate-blink text-primary">_</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HowItWorksSection() {
  const headerRef = useScrollReveal<HTMLDivElement>({ animation: "fade-up" })

  return (
    <section id="how-it-works" className="noise-bg relative border-b border-border py-20 lg:py-8">
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 flex flex-col gap-4">
          <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
            <span className="text-primary">// SECTION: PROCESS_FLOW</span>
            <span className="hidden h-px flex-1 bg-border sm:block" />
            <span>005</span>
          </div>
          <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From upload to insight<br />
            <span className="text-primary">in under 10 seconds.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
