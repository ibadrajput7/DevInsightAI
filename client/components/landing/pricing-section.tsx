
"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const tiers = [
  {
    name: "OPEN_SOURCE",
    number: "01",
    price: "$0",
    period: "/ forever",
    description: "Community-grade reviews. Rate-limited. No SLA.",
    cta: "DEPLOY FREE",
    ctaStyle:
      "border border-border text-foreground hover:border-primary/50 hover:text-primary",
    features: [
      { label: "3 reviews / month", included: true },
      { label: "GitHub repo upload", included: true },
      { label: "Executive summary only", included: true },
      { label: "Community support", included: true },
      { label: "Full 9-module review", included: false },
      { label: "AI chatbot assistant", included: false },
      { label: "Priority processing", included: false },
      { label: "Team collaboration", included: false },
    ],
  },
  {
    name: "PRO_TIER",
    number: "02",
    price: "$29",
    period: "/ month",
    description: "Full review suite. All 9 modules. AI assistant included.",
    cta: "START BUILDING",
    ctaStyle:
      "border border-primary bg-primary text-primary-foreground hover:bg-primary/90",
    features: [
      { label: "Unlimited reviews", included: true },
      { label: "GitHub + ZIP upload", included: true },
      { label: "Full 9-module review", included: true },
      { label: "AI chatbot assistant", included: true },
      { label: "Production readiness score", included: true },
      { label: "Priority processing", included: true },
      { label: "Export reports", included: true },
      { label: "Team collaboration", included: false },
    ],
  },
  {
    name: "ENTERPRISE",
    number: "03",
    price: "CUSTOM",
    period: "",
    description: "Self-hosted. Custom models. Full operational control.",
    cta: "CONTACT SALES",
    ctaStyle:
      "border border-border text-foreground hover:border-primary/50 hover:text-primary",
    features: [
      { label: "Everything in Pro", included: true },
      { label: "Self-hosted deployment", included: true },
      { label: "Custom review modules", included: true },
      { label: "Team collaboration", included: true },
      { label: "SSO / SAML", included: true },
      { label: "Custom SLA", included: true },
      { label: "Dedicated support", included: true },
      { label: "On-prem option", included: true },
    ],
  },
]

export function PricingSection() {
  const [activeTier, setActiveTier] = useState("PRO_TIER") // ✅ Default selected

  const headerRef = useScrollReveal<HTMLDivElement>({ animation: "fade-up" })
  const gridRef = useScrollReveal<HTMLDivElement>({
    animation: "fade-up",
    staggerChildren: true,
    threshold: 0.05,
    staggerDelay: 150,
  })

  return (
    <section
      id="pricing"
      className="noise-bg relative border-b border-border py-20 lg:py-8"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 flex flex-col gap-4">
          <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
            <span className="text-primary">// SECTION: PRICING_TIERS</span>
            <span className="hidden h-px flex-1 bg-border sm:block" />
            <span>007</span>
          </div>
          <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Select your <span className="text-primary">review tier.</span>
          </h2>
          <p className="max-w-2xl text-pretty font-sans text-base leading-relaxed text-muted-foreground">
            All tiers include secure file handling and structured review output.
            Upgrade anytime. No vendor lock-in.
          </p>
        </div>

        {/* Pricing grid */}
        <div ref={gridRef} className="grid gap-px bg-border lg:grid-cols-3">
          {tiers.map((tier) => {
            const isActive = activeTier === tier.name

            return (
              <div
                key={tier.name}
                onClick={() => setActiveTier(tier.name)}
                className={`relative flex cursor-pointer flex-col bg-background p-6 transition-all duration-300 lg:p-8 ${
                  isActive ? "ring-1 ring-primary" : ""
                }`}
              >
                {/* Top highlight line for active */}
                {isActive && (
                  <div className="absolute -top-px left-0 right-0 h-px bg-primary" />
                )}

                {/* Tier header */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                    {tier.name}
                  </span>

                  {tier.name === "PRO_TIER" ? (
                    <span className="border border-primary bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
                      RECOMMENDED
                    </span>
                  ) : (
                    <span className="font-mono text-xs text-muted-foreground">
                      {tier.number}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mt-6 flex items-end gap-1">
                  <span className="font-mono text-4xl font-bold text-foreground">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="mb-1 font-mono text-sm text-muted-foreground">
                      {tier.period}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  {tier.description}
                </p>

                {/* Features */}
                <div className="mt-8 flex flex-col gap-3">
                  {tier.features.map((feature) => (
                    <div
                      key={feature.label}
                      className="flex items-center gap-3"
                    >
                      {feature.included ? (
                        <Check className="size-3.5 shrink-0 text-primary" />
                      ) : (
                        <X className="size-3.5 shrink-0 text-muted-foreground/40" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground/40"
                        }`}
                      >
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#"
                  className={`mt-8 flex items-center justify-center px-6 py-3 font-mono text-xs font-bold tracking-wider transition-colors ${tier.ctaStyle}`}
                >
                  {tier.cta}
                </a>
              </div>
            )
          })}
        </div>

        <p className="mt-6 text-center font-mono text-xs text-muted-foreground">
          * All plans billed monthly. Cancel anytime. No vendor lock-in.
        </p>
      </div>
    </section>
  )
}