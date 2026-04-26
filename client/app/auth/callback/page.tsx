"use client"

import { Suspense } from "react"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { setToken } from "@/lib/auth"

function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get("token")
    if (token) {
      setToken(token)
      router.replace("/userdashboard")
    } else {
      router.replace("/auth?error=oauth_failed")
    }
  }, [router, searchParams])

  return null
}

export default function AuthCallbackPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="size-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <p className="font-mono text-sm text-muted-foreground tracking-[0.08em]">
          Completing sign-in...
        </p>
        <Suspense>
          <CallbackHandler />
        </Suspense>
      </div>
    </div>
  )
}
