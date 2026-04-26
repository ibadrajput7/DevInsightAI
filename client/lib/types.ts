import { ApiReport } from "@/lib/api"

// Existing UI Report type (kept for backward compat)
export interface Report {
  id: string
  title: string
  topic: string
  source: "github" | "upload"
  sourceUrl?: string
  status: "generating" | "completed" | "failed"
  createdAt: string
  summary: string
  metrics: {
    files: number
    issues: number
    score: number
  }
}

// Map API report → UI Report for overview/list displays
export function mapApiReport(r: ApiReport): Report {
  const dist = r.risk_severity_distribution
  const totalIssues = (dist?.critical ?? 0) + (dist?.high ?? 0) + (dist?.medium ?? 0) + (dist?.low ?? 0)
  return {
    id: String(r.id),
    title: r.project_title,
    topic: r.technical_debt_level ? `Tech Debt: ${r.technical_debt_level}` : "Code Review",
    source: "github",
    status: "completed",
    createdAt: new Date().toISOString(),
    summary: r.executive_summary,
    metrics: {
      files: 0,
      issues: totalIssues,
      score: r.production_readiness_score,
    },
  }
}
