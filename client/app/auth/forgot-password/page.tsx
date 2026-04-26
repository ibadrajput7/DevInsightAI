"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { apiForgotPassword, apiVerifyResetCode, apiResetPassword } from "@/lib/api"
import { toast } from "sonner"

type Step = "email" | "code" | "password" | "done"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) { toast.error("Please enter your email"); return }
    setLoading(true)
    try {
      await apiForgotPassword(email)
      toast.success("Reset code sent! Check your email.")
      setStep("code")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send reset code")
    } finally { setLoading(false) }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code) { toast.error("Please enter the code"); return }
    setLoading(true)
    try {
      const res = await apiVerifyResetCode(email, code)
      if (res.message === "Invalid or expired code") {
        toast.error("Invalid or expired code. Please try again.")
      } else {
        toast.success("Code verified!")
        setStep("password")
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Verification failed")
    } finally { setLoading(false) }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPassword || !confirmPassword) { toast.error("Please fill in both fields"); return }
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return }
    setLoading(true)
    try {
      await apiResetPassword(email, newPassword)
      toast.success("Password updated successfully!")
      setStep("done")
      setTimeout(() => router.push("/auth?mode=login"), 2000)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Reset failed")
    } finally { setLoading(false) }
  }

  const inputCls = "w-full px-3.5 py-2.5 bg-transparent text-foreground border border-border font-mono text-[0.8rem] outline-none transition-colors duration-150 placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20"
  const btnCls = "w-full py-3 bg-primary text-primary-foreground border border-primary font-mono text-[0.75rem] font-bold tracking-[0.15em] uppercase cursor-pointer transition-opacity duration-150 hover:opacity-85 disabled:opacity-60 disabled:cursor-not-allowed"

  const STEPS = { email: 1, code: 2, password: 3, done: 3 }
  const currentStep = STEPS[step]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-[420px] flex flex-col gap-8">

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-primary opacity-40" />
        <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-primary opacity-40" />

        {/* Header */}
        <div className="flex flex-col gap-3">
          <a href="/auth" className="font-mono text-[0.65rem] text-primary tracking-[0.1em] hover:underline w-fit">← BACK TO LOGIN</a>
          <div className="font-mono text-[0.65rem] text-muted-foreground tracking-[0.12em]">// RESET_PASSWORD</div>
          <h1 className="font-mono text-2xl font-bold text-foreground">Forgot your password?</h1>
          <p className="font-mono text-[0.75rem] text-muted-foreground leading-relaxed">
            {step === "email" && "Enter your email and we'll send you a reset code."}
            {step === "code" && `Enter the 6-digit code we sent to ${email}`}
            {step === "password" && "Choose a strong new password."}
            {step === "done" && "Password updated! Redirecting to login..."}
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`size-6 rounded-full flex items-center justify-center font-mono text-[0.6rem] font-bold border ${s <= currentStep ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border"}`}>
                {s < currentStep ? "✓" : s}
              </div>
              {s < 3 && <div className={`flex-1 h-px w-12 ${s < currentStep ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
          <span className="font-mono text-[0.6rem] text-muted-foreground ml-2">
            {step === "email" && "Send Code"}
            {step === "code" && "Verify Code"}
            {(step === "password" || step === "done") && "New Password"}
          </span>
        </div>

        {/* Step 1 — Email */}
        {step === "email" && (
          <form className="flex flex-col gap-5" onSubmit={handleSendEmail}>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[0.7rem] font-semibold text-foreground tracking-[0.06em] uppercase">Email Address</label>
              <input type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
            </div>
            <button type="submit" disabled={loading} className={btnCls}>{loading ? "SENDING..." : "→ Send Reset Code"}</button>
          </form>
        )}

        {/* Step 2 — OTP Code */}
        {step === "code" && (
          <form className="flex flex-col gap-5" onSubmit={handleVerifyCode}>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[0.7rem] font-semibold text-foreground tracking-[0.06em] uppercase">Reset Code</label>
              <input type="text" placeholder="123456" maxLength={10} value={code} onChange={(e) => setCode(e.target.value)} className={`${inputCls} text-center tracking-[0.3em] text-lg`} />
            </div>
            <button type="submit" disabled={loading} className={btnCls}>{loading ? "VERIFYING..." : "→ Verify Code"}</button>
            <button type="button" onClick={() => handleSendEmail({ preventDefault: () => {} } as React.FormEvent)} className="font-mono text-[0.65rem] text-primary hover:underline underline-offset-4 bg-transparent border-none cursor-pointer">
              Didn&apos;t receive it? Resend code
            </button>
          </form>
        )}

        {/* Step 3 — New Password */}
        {step === "password" && (
          <form className="flex flex-col gap-5" onSubmit={handleResetPassword}>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[0.7rem] font-semibold text-foreground tracking-[0.06em] uppercase">New Password</label>
              <input type="password" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputCls} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[0.7rem] font-semibold text-foreground tracking-[0.06em] uppercase">Confirm Password</label>
              <input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputCls} />
            </div>
            <div className="font-mono text-[0.6rem] text-muted-foreground leading-relaxed border border-border/50 p-3">
              Password must be 8+ chars with uppercase, lowercase, number, and special character.
            </div>
            <button type="submit" disabled={loading} className={btnCls}>{loading ? "UPDATING..." : "→ Update Password"}</button>
          </form>
        )}

        {/* Step done */}
        {step === "done" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-3xl text-primary">✓</span>
            </div>
            <p className="font-mono text-sm text-muted-foreground text-center">Redirecting to login...</p>
          </div>
        )}
      </div>
    </div>
  )
}
