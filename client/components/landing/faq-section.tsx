"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const faqs = [
  {
    question: "What languages and frameworks do you support?",
    answer:
      "DevInsightUI supports any language and framework. Our AI engine understands JavaScript, TypeScript, Python, Go, Rust, Java, C#, Ruby, PHP, and more. Framework-specific analysis covers Next.js, React, Django, Rails, Spring Boot, Express, FastAPI, and others.",
  },
  {
    question: "How does the GitHub integration work?",
    answer:
      "Simply paste your GitHub repository URL and we clone it securely for analysis. We only read your code - we never write, push, or store your repository after analysis is complete. All data is encrypted in transit and at rest.",
  },
  {
    question: "What does the production readiness score measure?",
    answer:
      "The score (0-100) is a composite metric across all 9 review modules: security, architecture, auth quality, database design, async patterns, performance, error handling, testing coverage, and code organization. Each module contributes weighted points based on industry standards.",
  },
  {
    question: "Can I use the AI assistant without running a full review?",
    answer:
      "The AI assistant works best after a review since it has full context of your codebase. However, Pro and Enterprise users can ask general coding questions anytime. The assistant specializes in code organization, scalability patterns, and debugging guidance.",
  },
  {
    question: "Is my code stored or used to train AI models?",
    answer:
      "No. Your code is analyzed in an isolated, ephemeral environment and deleted immediately after review generation. We never store your source code, never use it for training, and never share it. Full SOC 2 compliance.",
  },
  {
    question: "How is this different from linting tools?",
    answer:
      "Linters check syntax and style. DevInsightUI performs deep semantic analysis - understanding your architecture decisions, evaluating security patterns, detecting concurrency risks, and scoring production readiness. Think of it as a senior engineer reviewing your code, not a spell checker.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const headerRef = useScrollReveal<HTMLDivElement>({ animation: "fade-up" })
  const listRef = useScrollReveal<HTMLDivElement>({ animation: "fade-up", staggerChildren: true, threshold: 0.05, staggerDelay: 60 })

  return (
    <section id="faq" className="noise-bg relative border-b border-border py-20 lg:py-8">
      <div className="relative z-10 mx-auto max-w-4xl px-4 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 flex flex-col gap-4">
          <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
            <span className="text-primary">// SECTION: FAQ</span>
            <span className="hidden h-px flex-1 bg-border sm:block" />
            <span>009</span>
          </div>
          <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently asked<br />
            <span className="text-primary">questions.</span>
          </h2>
        </div>

        {/* FAQ items */}
        <div ref={listRef} className="flex flex-col">
          {faqs.map((faq, i) => (
            <div key={i} className="border-t border-border last:border-b">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={openIndex === i}
              >
                <div className="flex items-start gap-4">
                  <span className="shrink-0 font-mono text-xs text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-sm font-medium text-foreground sm:text-base">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`size-4 shrink-0 text-muted-foreground transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className="grid transition-all duration-300 ease-in-out"
                style={{
                  gridTemplateRows: openIndex === i ? "1fr" : "0fr",
                }}
              >
                <div className="overflow-hidden">
                  <div className="pb-5 pl-10">
                    <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
