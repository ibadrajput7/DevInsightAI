"use client"

import { MessageSquare, Bot, User, Send } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const chatMessages = [
  {
    role: "user" as const,
    content: "I have N+1 queries in my user dashboard. How do I fix this?",
  },
  {
    role: "assistant" as const,
    content:
      "Your `/api/users` endpoint fetches users, then loops through each to fetch their posts individually. This creates N+1 queries.\n\nSolution: Use eager loading with a JOIN or a subquery. Here's the fix:",
  },
  {
    role: "assistant" as const,
    content:
      '```sql\nSELECT u.*, json_agg(p.*) as posts\nFROM users u\nLEFT JOIN posts p ON p.user_id = u.id\nGROUP BY u.id\n```\n\nThis reduces your 247 queries down to 1. Expected latency improvement: ~94%.',
  },
  {
    role: "user" as const,
    content: "How should I organize my project for better scalability?",
  },
  {
    role: "assistant" as const,
    content:
      "Based on your codebase analysis, I recommend migrating from your flat structure to a feature-based architecture:\n\n/features/auth/\n/features/dashboard/\n/features/api/\n\nEach feature module contains its own routes, services, and tests. This enables parallel team development and cleaner dependency boundaries.",
  },
]

export function ChatbotSection() {
  const leftRef = useScrollReveal<HTMLDivElement>({ animation: "fade-left" })
  const rightRef = useScrollReveal<HTMLDivElement>({ animation: "fade-right", delay: 150 })

  return (
    <section className="noise-bg relative border-b border-border py-20 lg:py-8">
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Content */}
          <div ref={leftRef} className="flex flex-col gap-6">
            <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
              <span className="text-primary">// SECTION: AI_ASSISTANT</span>
              <span className="hidden h-px flex-1 bg-border sm:block" />
              <span>008</span>
            </div>

            <div className="inline-flex w-fit items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1.5 font-mono text-xs text-primary">
              <MessageSquare className="size-3" />
              CHAT_MODULE
            </div>

            <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Your personal<br />
              <span className="text-primary">code mentor.</span>
            </h2>

            <p className="max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
              Stuck on how to write scalable code? Our AI assistant knows your codebase.
              Ask it anything - from fixing specific issues to restructuring your entire architecture.
              Built for developers who want to level up.
            </p>

            <div className="flex flex-col gap-3 border-t border-border pt-6">
              {[
                "Contextual answers based on your actual code",
                "SQL query optimization suggestions",
                "Architecture and file organization guidance",
                "Security fix recommendations with code patches",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 size-1.5 shrink-0 bg-primary" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chat preview */}
          <div ref={rightRef} className="border border-border bg-card">
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <Bot className="size-4 text-primary" />
                <span className="font-mono text-xs text-foreground">DevInsight Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[10px] text-primary">ONLINE</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-4 p-4" style={{ maxHeight: "480px", overflowY: "auto" }}>
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex size-7 shrink-0 items-center justify-center border ${
                      msg.role === "user"
                        ? "border-border bg-secondary"
                        : "border-primary/30 bg-primary/10"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="size-3.5 text-muted-foreground" />
                    ) : (
                      <Bot className="size-3.5 text-primary" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] border p-3 ${
                      msg.role === "user"
                        ? "border-border bg-secondary"
                        : "border-primary/20 bg-primary/5"
                    }`}
                  >
                    <p className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input area */}
            <div className="border-t border-border p-3">
              <div className="flex items-center gap-2 border border-border bg-background px-3 py-2">
                <span className="font-mono text-xs text-muted-foreground">
                  Ask about your code...
                </span>
                <Send className="ml-auto size-3.5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
