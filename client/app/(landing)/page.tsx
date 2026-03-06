// app/page.tsx
// import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { TechTicker } from "@/components/landing/tech-ticker"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { ReviewOutputSection } from "@/components/landing/review-output-section"
import { ChatbotSection } from "@/components/landing/chatbot-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { FaqSection } from "@/components/landing/faq-section"
// import { CtaSection } from "@/components/landing/cta-section"
// import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* <Navbar /> */}
      <HeroSection />
      <TechTicker />
      <FeaturesSection />
      <HowItWorksSection />
      <ReviewOutputSection />
      <ChatbotSection />
      <PricingSection />
      <FaqSection />
      {/* <CtaSection /> */}
      {/* <Footer /> */}
    </main>
  )
}
