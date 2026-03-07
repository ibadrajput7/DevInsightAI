// app/layout.tsx

import "./globals.css" 

import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })

export const metadata: Metadata = {
  title: 'DevInsightAI - AI Code Reviewer',
  description: 'Upload your GitHub repo or ZIP file and get instant AI-powered code reviews. Architecture analysis, security assessment, performance audits, and production readiness scores.',
  generator: 'DevInsightAI',
  keywords: ['AI code review', 'code analysis', 'security assessment', 'architecture review', 'GitHub code review'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}