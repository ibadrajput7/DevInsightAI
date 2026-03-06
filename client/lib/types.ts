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
