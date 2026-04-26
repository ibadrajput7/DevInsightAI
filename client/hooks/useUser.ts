"use client"

import { useEffect, useState, useCallback } from "react"
import { apiGetMe, UserResponse } from "@/lib/api"
import { isAuthenticated } from "@/lib/auth"

export function useUser() {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = useCallback(async () => {
    if (!isAuthenticated()) {
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const data = await apiGetMe()
      setUser(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load user")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return { user, loading, error, refetch: fetchUser }
}
