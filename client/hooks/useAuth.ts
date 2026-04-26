"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { removeToken } from "@/lib/auth"

export function useAuth() {
  const router = useRouter()

  const logout = useCallback(() => {
    removeToken()
    router.push("/auth")
  }, [router])

  return { logout }
}
