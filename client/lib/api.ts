const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("access_token")
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  // Only set Content-Type to JSON if we're not sending FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json"
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  })

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token")
      window.location.href = "/auth"
    }
    throw new Error("Unauthorized")
  }

  if (!res.ok) {
    let errorDetail = `Request failed: ${res.status}`
    try {
      const err = await res.json()
      errorDetail = err.detail || JSON.stringify(err)
    } catch {
      // ignore json parse failure
    }
    throw new Error(errorDetail)
  }

  // Handle empty responses (e.g. 204)
  const text = await res.text()
  if (!text) return {} as T
  return JSON.parse(text) as T
}

// ─── Auth APIs ───────────────────────────────────────────────────────────────

export interface LoginResponse {
  access_token: string
  token_type: string
}

export interface UserResponse {
  id: number
  name: string
  email: string
  role: string
}

export interface SignupPayload {
  name: string
  email: string
  password: string
  role: string
  is_active: boolean
}

export async function apiLogin(
  email: string,
  password: string
): Promise<LoginResponse> {
  // The /token endpoint uses OAuth2 form data (not JSON)
  const body = new URLSearchParams()
  body.append("username", email)
  body.append("password", password)

  const res = await fetch(`${BASE_URL}/v1/users/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  })

  if (!res.ok) {
    let errorDetail = "Invalid email or password"
    try {
      const err = await res.json()
      errorDetail = err.detail || errorDetail
    } catch {
      // ignore
    }
    throw new Error(errorDetail)
  }

  return res.json()
}

export async function apiSignup(
  payload: SignupPayload
): Promise<UserResponse> {
  return request<UserResponse>("/v1/users/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function apiGetMe(): Promise<UserResponse> {
  return request<UserResponse>("/v1/users/me")
}

// ─── Forgot Password APIs ────────────────────────────────────────────────────

export async function apiForgotPassword(email: string): Promise<{ message: string }> {
  return request("/v1/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  })
}

export async function apiVerifyResetCode(
  email: string,
  code: string
): Promise<{ message: string }> {
  return request("/v1/auth/verify-reset-code", {
    method: "POST",
    body: JSON.stringify({ email, code }),
  })
}

export async function apiResetPassword(
  email: string,
  new_password: string
): Promise<{ message: string }> {
  return request("/v1/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email, new_password }),
  })
}

// ─── OAuth URLs ───────────────────────────────────────────────────────────────

export const GOOGLE_LOGIN_URL = `${BASE_URL}/v1/user/auth/google/login`
export const GITHUB_LOGIN_URL = "http://127.0.0.1:8000/v1/user/auth/github/login"

// ─── Report APIs ─────────────────────────────────────────────────────────────

export interface ApiReport {
  id: number
  project_title: string
  executive_summary: string
  technology_stack_understanding: string
  architecture_review: string
  security_assessment: string
  authentication_quality: string
  database_design_review: string
  async_concurrency_risks: string
  performance_risks: string
  production_readiness_score: number
  technical_debt_level: "Low" | "Medium" | "High" | "Critical"
  risk_severity_distribution: {
    critical: number
    high: number
    medium: number
    low: number
  }
  top_prioritized_improvements: string[]
}

export async function apiGetReports(): Promise<ApiReport[]> {
  return request<ApiReport[]>("/v1/report")
}

export async function apiGetReport(id: number): Promise<ApiReport> {
  return request<ApiReport>(`/v1/report/${id}`)
}

export async function apiReviewGithub(
  github_repo: string,
  description: string
): Promise<ApiReport> {
  return request<ApiReport>("/v1/review-code/github", {
    method: "POST",
    body: JSON.stringify({ github_repo, description }),
  })
}

export async function apiReviewArchive(
  file: File,
  description: string
): Promise<ApiReport> {
  const formData = new FormData()
  formData.append("archive", file)

  return request<ApiReport>(
    `/v1/review-code/archive?description=${encodeURIComponent(description)}`,
    {
      method: "POST",
      body: formData,
    }
  )
}
