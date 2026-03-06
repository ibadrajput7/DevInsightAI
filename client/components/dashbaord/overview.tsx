"use client"

import { FileText, TrendingUp, AlertTriangle, Zap, ArrowRight, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Report } from "@/lib/types"

interface OverviewProps {
  reports: Report[]
  onViewReport: (report: Report) => void
  onNavigate: (section: string) => void
}

export function DashboardOverview({ reports, onViewReport, onNavigate }: OverviewProps) {
  const completedReports = reports.filter((r) => r.status === "completed")
  const avgScore = completedReports.length
    ? Math.round(completedReports.reduce((acc, r) => acc + r.metrics.score, 0) / completedReports.length)
    : 0
  const totalIssues = completedReports.reduce((acc, r) => acc + r.metrics.issues, 0)
  const totalFiles = completedReports.reduce((acc, r) => acc + r.metrics.files, 0)

  const stats = [
    {
      title: "Total Reports",
      value: reports.length.toString(),
      description: "All time generated",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Avg. Score",
      value: `${avgScore}%`,
      description: "Code health score",
      icon: TrendingUp,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "Issues Found",
      value: totalIssues.toString(),
      description: "Across all reports",
      icon: AlertTriangle,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
    {
      title: "Files Analyzed",
      value: totalFiles.toLocaleString(),
      description: "Total files scanned",
      icon: Zap,
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome banner */}
      <div className="rounded-xl border border-border bg-card p-6 relative overflow-hidden">
        <div className="absolute inset-0 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]' from-primary/5 via-transparent to-transparent" />
        <div className="relative">
          <h2 className="text-2xl font-bold text-foreground text-balance">
            Welcome back, John
          </h2>
          <p className="text-muted-foreground mt-1 max-w-lg">
            Generate intelligent code analysis reports from your GitHub repositories or uploaded files. Get actionable insights powered by AI.
          </p>
          <Button
            className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => onNavigate("generate")}
          >
            <Zap className="size-4 mr-2" />
            Generate New Report
          </Button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className={`${stat.bgColor} rounded-lg p-2.5`}>
                  <stat.icon className={`size-4 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent reports */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-foreground text-base font-semibold">Recent Reports</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80"
            onClick={() => onNavigate("reports")}
          >
            View All
            <ArrowRight className="size-3.5 ml-1" />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pt-0">
          {reports.slice(0, 3).map((report) => (
            <button
              key={report.id}
              onClick={() => onViewReport(report)}
              className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/60 transition-colors text-left w-full"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <FileText className="size-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-foreground truncate">{report.title}</h3>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] shrink-0 ${
                      report.status === "completed"
                        ? "bg-chart-2/10 text-chart-2 border-0"
                        : report.status === "generating"
                        ? "bg-chart-4/10 text-chart-4 border-0"
                        : "bg-destructive/10 text-destructive border-0"
                    }`}
                  >
                    {report.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground">{report.topic}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" />
                    {new Date(report.createdAt).toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-sm font-semibold text-foreground">{report.metrics.score}%</span>
                <Progress value={report.metrics.score} className="w-16 h-1.5" />
              </div>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
