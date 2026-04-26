"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  FileText, Clock, Github, Upload, AlertTriangle, CheckCircle2,
  Code, Shield, Zap, TrendingUp, ArrowLeft, ChevronRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { apiGetReports, apiGetReport, ApiReport } from "@/lib/api"
import { mapApiReport } from "@/lib/types"
import type { Report } from "@/lib/types"

// ─── Report List ──────────────────────────────────────────────────────────────
function ReportList({ reports, loading, onSelect }: { reports: Report[]; loading: boolean; onSelect: (id: string) => void }) {
  const router = useRouter()
  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4 animate-pulse">
            <div className="size-10 rounded-lg bg-primary/10 shrink-0" />
            <div className="flex-1 space-y-2"><div className="h-4 bg-secondary rounded w-48" /><div className="h-3 bg-secondary rounded w-32" /></div>
          </div>
        ))}
      </div>
    )
  }
  if (reports.length === 0) {
    return (
      <div className="text-center py-20">
        <FileText className="size-12 mx-auto mb-4 text-muted-foreground opacity-30" />
        <h3 className="text-base font-medium text-foreground mb-1">No reports yet</h3>
        <p className="text-sm text-muted-foreground mb-6">Generate your first AI code review report.</p>
        <Button className="bg-primary text-primary-foreground" onClick={() => router.push("/userdashboard/generate-report")}>
          <Zap className="size-4 mr-2" />Generate Report
        </Button>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-3">
      {reports.map((report) => (
        <button key={report.id} onClick={() => onSelect(report.id)}
          className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/60 transition-colors text-left w-full group">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <FileText className="size-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-foreground truncate">{report.title}</h3>
              <Badge variant="secondary" className="text-[10px] shrink-0 bg-chart-2/10 text-chart-2 border-0">completed</Badge>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-muted-foreground">{report.topic}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="size-3" />{new Date(report.createdAt).toLocaleDateString("en-GB")}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-sm font-semibold text-foreground">{report.metrics.score}%</span>
            <Progress value={report.metrics.score} className="w-16 h-1.5" />
          </div>
          <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </button>
      ))}
    </div>
  )
}

// ─── Severity Badge ───────────────────────────────────────────────────────────
function SeverityBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    Low: "bg-chart-2/10 text-chart-2",
    Medium: "bg-chart-4/10 text-chart-4",
    High: "bg-orange-500/10 text-orange-500",
    Critical: "bg-destructive/10 text-destructive",
  }
  return <Badge variant="secondary" className={`text-[10px] border-0 ${map[level] ?? "bg-secondary text-muted-foreground"}`}>{level}</Badge>
}

// ─── Report Detail ────────────────────────────────────────────────────────────
function ReportDetail({ report, onBack }: { report: ApiReport; onBack: () => void }) {
  const dist = report.risk_severity_distribution ?? { critical: 0, high: 0, medium: 0, low: 0 }

  const sections = [
    { label: "Executive Summary", icon: FileText, content: report.executive_summary },
    { label: "Technology Stack", icon: Code, content: report.technology_stack_understanding },
    { label: "Architecture Review", icon: Zap, content: report.architecture_review },
    { label: "Security Assessment", icon: Shield, content: report.security_assessment },
    { label: "Authentication Quality", icon: CheckCircle2, content: report.authentication_quality },
    { label: "Database Design", icon: TrendingUp, content: report.database_design_review },
    { label: "Async & Concurrency Risks", icon: AlertTriangle, content: report.async_concurrency_risks },
    { label: "Performance Risks", icon: Zap, content: report.performance_risks },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground shrink-0 mt-0.5" onClick={onBack}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h2 className="text-xl font-semibold text-foreground">{report.project_title}</h2>
          <div className="flex items-center gap-2 mt-1">
            <SeverityBadge level={report.technical_debt_level} />
            <span className="text-xs text-muted-foreground">Technical Debt</span>
          </div>
        </div>
      </div>

      {/* Score + Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3">
            <p className="text-sm text-muted-foreground">Production Readiness</p>
            <div className="relative">
              <svg className="size-28" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="8" className="text-secondary" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${report.production_readiness_score * 3.14} 314`} transform="rotate(-90 60 60)" className="text-primary" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{report.production_readiness_score}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">out of 100</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {[
              { label: "Critical", value: dist.critical, color: "text-destructive", bg: "bg-destructive/10" },
              { label: "High", value: dist.high, color: "text-orange-500", bg: "bg-orange-500/10" },
              { label: "Medium", value: dist.medium, color: "text-chart-4", bg: "bg-chart-4/10" },
              { label: "Low", value: dist.low, color: "text-chart-2", bg: "bg-chart-2/10" },
            ].map((item) => (
              <div key={item.label} className={`flex items-center gap-3 rounded-lg p-3 ${item.bg}`}>
                <AlertTriangle className={`size-4 shrink-0 ${item.color}`} />
                <div>
                  <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Top Improvements */}
      {report.top_prioritized_improvements?.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">Top Prioritized Improvements</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {report.top_prioritized_improvements.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                <span className="size-5 rounded-full bg-primary/20 text-primary text-[0.65rem] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-sm text-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Detail Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sections.map(({ label, icon: Icon, content }) => content && (
          <Card key={label} className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-foreground flex items-center gap-2">
                <Icon className="size-3.5 text-primary" />{label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function MyReportsPageInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const reportIdParam = searchParams.get("id")

  const [reports, setReports] = useState<Report[]>([])
  const [selectedReport, setSelectedReport] = useState<ApiReport | null>(null)
  const [listLoading, setListLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)

  useEffect(() => {
    apiGetReports()
      .then((data) => setReports(data.map(mapApiReport)))
      .catch(() => setReports([]))
      .finally(() => setListLoading(false))
  }, [])

  // If navigated with ?id= param, load that report detail
  useEffect(() => {
    if (reportIdParam) {
      setDetailLoading(true)
      apiGetReport(Number(reportIdParam))
        .then((data) => setSelectedReport(data))
        .catch(() => { setSelectedReport(null); router.replace("/userdashboard/my-report") })
        .finally(() => setDetailLoading(false))
    }
  }, [reportIdParam, router])

  const handleSelectReport = (id: string) => {
    router.push(`/userdashboard/my-report?id=${id}`)
  }

  const handleBack = () => {
    setSelectedReport(null)
    router.push("/userdashboard/my-report")
  }

  if (detailLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Loading report...</p>
        </div>
      </div>
    )
  }

  if (selectedReport) {
    return <ReportDetail report={selectedReport} onBack={handleBack} />
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">My Reports</h2>
        <p className="text-muted-foreground mt-1">All your AI-generated code analysis reports in one place.</p>
      </div>
      <ReportList reports={reports} loading={listLoading} onSelect={handleSelectReport} />
    </div>
  )
}

export default function MyReportsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-32">
        <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    }>
      <MyReportsPageInner />
    </Suspense>
  )
}