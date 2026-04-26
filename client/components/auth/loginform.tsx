"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { apiLogin, apiSignup, GOOGLE_LOGIN_URL, GITHUB_LOGIN_URL } from "@/lib/api"
import { setToken } from "@/lib/auth"
import { toast } from "sonner"

function useTypingCycle(words: string[], typingSpeed = 80, pauseDuration = 1400, deletingSpeed = 50) {
  const [displayed, setDisplayed] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing")
  useEffect(() => {
    const word = words[wordIndex % words.length]
    if (phase === "typing") {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase("pausing"), pauseDuration)
        return () => clearTimeout(t)
      }
    }
    if (phase === "pausing") { const t = setTimeout(() => setPhase("deleting"), 200); return () => clearTimeout(t) }
    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed)
        return () => clearTimeout(t)
      } else { setWordIndex((i) => i + 1); setPhase("typing") }
    }
  }, [displayed, phase, wordIndex, words, typingSpeed, pauseDuration, deletingSpeed])
  return { displayed, phase }
}

function LeftPanel() {
  const { displayed, phase } = useTypingCycle(["Review", "Refactor", "Rewrite"])
  return (
    <div className="left-panel relative flex flex-[1_1_50%] min-h-screen items-center justify-center overflow-hidden bg-background border-r border-border">
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "150px" }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background)/0.7)_100%)]" />
      <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-primary" />
      <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-primary" />
      <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-primary" />
      <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-primary" />
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-8">
        <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3.5 py-1.5 font-mono text-[0.65rem] text-primary tracking-[0.12em]">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />AI_CODE_REVIEWER
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[clamp(1.4rem,3vw,2rem)] font-bold text-foreground tracking-[0.05em] leading-tight">DevInsight<span className="text-primary">AI</span></span>
          <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
        <div className="min-h-[3.5rem] flex items-center justify-center">
          <span className="font-mono text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-primary tracking-tight leading-none">
            {displayed}
            <span className={["inline-block w-[3px] h-[1em] bg-primary ml-[3px] align-middle", phase === "pausing" ? "animate-blink" : "opacity-100"].join(" ")} />
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="font-mono text-[clamp(1rem,2vw,1.25rem)] font-bold text-foreground tracking-[0.3em]">SHIP.</div>
          <p className="font-mono text-[0.7rem] text-muted-foreground max-w-[24ch] leading-relaxed tracking-[0.04em]">AI-powered code analysis between your codebase and production.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 border-t border-border pt-5 w-full max-w-[22rem]">
          {[{ value: "50K+", label: "Repos Analyzed" }, { value: "<8s", label: "Avg Review" }, { value: "99.9%", label: "Uptime" }].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <span className="font-mono text-lg font-bold text-primary">{s.value}</span>
              <span className="font-mono text-[0.6rem] text-muted-foreground tracking-[0.05em]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LoginForm({ defaultTab = "login" }: { defaultTab?: "login" | "signup" }) {
  const router = useRouter()
  const [tab, setTab] = useState<"login" | "signup">(defaultTab)
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupConfirm, setSignupConfirm] = useState("")

  useEffect(() => { setTab(defaultTab) }, [defaultTab])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginEmail || !loginPassword) { toast.error("Please enter your email and password"); return }
    setLoading(true)
    try {
      const data = await apiLogin(loginEmail, loginPassword)
      setToken(data.access_token)
      toast.success("Welcome back!")
      router.push("/userdashboard")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed")
    } finally { setLoading(false) }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signupName || !signupEmail || !signupPassword || !signupConfirm) { toast.error("Please fill in all fields"); return }
    if (signupPassword !== signupConfirm) { toast.error("Passwords do not match"); return }
    setLoading(true)
    try {
      await apiSignup({ name: signupName, email: signupEmail, password: signupPassword, role: "user", is_active: true })
      toast.success("Account created! Please log in.")
      router.push("/auth?mode=login")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Signup failed")
    } finally { setLoading(false) }
  }

  const inputCls = "w-full px-3.5 py-2.5 bg-transparent text-foreground border border-border font-mono text-[0.8rem] outline-none transition-colors duration-150 placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20"

  return (
    <div className="flex flex-[1_1_50%] min-h-screen items-center justify-center bg-background p-8">
      <div className="w-full max-w-[400px] flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="font-mono text-[0.65rem] text-muted-foreground tracking-[0.12em] mb-1">{tab === "login" ? "// AUTHENTICATE" : "// CREATE_ACCOUNT"}</div>
          <h1 className="font-mono text-2xl font-bold text-foreground leading-tight">{tab === "login" ? "Login to your account" : "Create your account"}</h1>
          <p className="font-mono text-[0.75rem] text-muted-foreground leading-relaxed">{tab === "login" ? "Enter your credentials to access DevInsightAI" : "Join thousands of developers shipping better code"}</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={tab === "login" ? handleLogin : handleSignup}>
          {tab === "signup" && (
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[0.7rem] font-semibold text-foreground tracking-[0.06em] uppercase">Name</label>
              <input type="text" placeholder="John Doe" value={signupName} onChange={(e) => setSignupName(e.target.value)} className={inputCls} />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[0.7rem] font-semibold text-foreground tracking-[0.06em] uppercase">Email</label>
            <input type="email" placeholder="m@example.com" value={tab === "login" ? loginEmail : signupEmail} onChange={(e) => tab === "login" ? setLoginEmail(e.target.value) : setSignupEmail(e.target.value)} className={inputCls} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[0.7rem] font-semibold text-foreground tracking-[0.06em] uppercase">Password</label>
              {tab === "login" && <a href="/auth/forgot-password" className="font-mono text-[0.65rem] text-primary no-underline tracking-[0.05em] hover:underline underline-offset-4">Forgot password?</a>}
            </div>
            <div className="relative">
              <input type={showPass ? "text" : "password"} placeholder="••••••••" value={tab === "login" ? loginPassword : signupPassword} onChange={(e) => tab === "login" ? setLoginPassword(e.target.value) : setSignupPassword(e.target.value)} className={`${inputCls} pr-16`} />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer font-mono text-[0.6rem] text-muted-foreground hover:text-foreground transition-colors">{showPass ? "HIDE" : "SHOW"}</button>
            </div>
          </div>
          {tab === "signup" && (
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[0.7rem] font-semibold text-foreground tracking-[0.06em] uppercase">Confirm Password</label>
              <input type="password" placeholder="••••••••" value={signupConfirm} onChange={(e) => setSignupConfirm(e.target.value)} className={inputCls} />
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full py-3 bg-primary text-primary-foreground border border-primary font-mono text-[0.75rem] font-bold tracking-[0.15em] uppercase cursor-pointer transition-opacity duration-150 hover:opacity-85 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? "PROCESSING..." : tab === "login" ? "→ Login" : "→ Create Account"}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-[0.6rem] text-muted-foreground tracking-[0.1em]">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex flex-col gap-3">
            <a href={GITHUB_LOGIN_URL} className="w-full py-3 flex items-center justify-center gap-2 bg-transparent text-foreground border border-border font-mono text-[0.75rem] font-semibold tracking-[0.08em] cursor-pointer transition-colors duration-150 hover:border-primary/50 hover:text-primary no-underline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              Continue with GitHub
            </a>
            <a href={GOOGLE_LOGIN_URL} className="w-full py-3 flex items-center justify-center gap-2 bg-transparent text-foreground border border-border font-mono text-[0.75rem] font-semibold tracking-[0.08em] cursor-pointer transition-colors duration-150 hover:border-primary/50 hover:text-primary no-underline">
              <svg width="14" height="14" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </a>
          </div>
        </form>

        <p className="font-mono text-[0.65rem] text-center text-muted-foreground leading-relaxed">
          {tab === "login" ? (
            <>Don&apos;t have an account?{" "}<button type="button" onClick={() => setTab("signup")} className="bg-transparent border-none cursor-pointer font-mono text-[0.65rem] text-primary underline underline-offset-[3px]">Sign up</button></>
          ) : (
            <>Already have an account?{" "}<button type="button" onClick={() => setTab("login")} className="bg-transparent border-none cursor-pointer font-mono text-[0.65rem] text-primary underline underline-offset-[3px]">Login</button></>
          )}
        </p>
      </div>
    </div>
  )
}

export default function LoginPage({ defaultTab = "login" }: { defaultTab?: "login" | "signup" }) {
  return (
    <>
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 0.7s step-end infinite; }
        @media (max-width: 768px) { .login-layout { flex-direction: column !important; } .left-panel { min-height: 50vh !important; } }
      `}</style>
      <div className="login-layout flex min-h-screen w-full">
        <LeftPanel />
        <LoginForm defaultTab={defaultTab} />
      </div>
    </>
  )
}