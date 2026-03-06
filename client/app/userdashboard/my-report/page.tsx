// "use client"

// import {
//   ArrowLeft,
//   FileText,
//   Github,
//   Upload,
//   Clock,
//   AlertTriangle,
//   CheckCircle2,
//   TrendingUp,
//   Code,
//   Shield,
//   Zap,
//   Download,
//   Share2,
//   ExternalLink,
// } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Separator } from "@/components/ui/separator"
// import type { Report } from "@/lib/types"

// interface ReportViewerProps {
//   report: Report
//   onBack: () => void
// }

// const MOCK_FINDINGS = [
//   {
//     severity: "high",
//     title: "Unoptimized re-renders detected",
//     description: "Several components re-render unnecessarily due to missing memoization. Consider using React.memo or useMemo for expensive computations.",
//     file: "src/components/Dashboard.tsx",
//     line: 42,
//   },
//   {
//     severity: "medium",
//     title: "Missing error boundaries",
//     description: "Critical sections of the application lack error boundaries, which could lead to complete UI crashes on unhandled errors.",
//     file: "src/App.tsx",
//     line: 15,
//   },
//   {
//     severity: "low",
//     title: "Unused dependencies in package.json",
//     description: "Found 3 unused packages that increase bundle size: lodash, moment, and classnames.",
//     file: "package.json",
//     line: 1,
//   },
//   {
//     severity: "medium",
//     title: "API calls without proper caching",
//     description: "Multiple API endpoints are called without any caching strategy, leading to redundant network requests.",
//     file: "src/hooks/useData.ts",
//     line: 23,
//   },
//   {
//     severity: "high",
//     title: "Large bundle size detected",
//     description: "The main bundle exceeds 500KB. Consider code splitting and dynamic imports for better initial load performance.",
//     file: "webpack.config.js",
//     line: 1,
//   },
// ]

// const MOCK_CATEGORIES = [
//   { name: "Performance", score: 82, icon: Zap, color: "text-primary" },
//   { name: "Code Quality", score: 91, icon: Code, color: "text-chart-2" },
//   { name: "Security", score: 88, icon: Shield, color: "text-chart-4" },
//   { name: "Best Practices", score: 76, icon: CheckCircle2, color: "text-chart-5" },
// ]

// export default function ReportViewer({ report, onBack }: ReportViewerProps) {
//   const highCount = MOCK_FINDINGS.filter((f) => f.severity === "high").length
//   const mediumCount = MOCK_FINDINGS.filter((f) => f.severity === "medium").length
//   const lowCount = MOCK_FINDINGS.filter((f) => f.severity === "low").length

//   return (
//     <div className="flex flex-col gap-6">
//       {/* Top bar */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div className="flex items-center gap-3">
//           <Button
//             variant="ghost"
//             size="icon"
//             className="size-8 text-muted-foreground hover:text-foreground shrink-0"
//             onClick={onBack}
//           >
//             <ArrowLeft className="size-4" />
//             <span className="sr-only">Back to reports</span>
//           </Button>
//           <div>
//             <div className="flex items-center gap-2">
//               <h2 className="text-xl font-semibold text-foreground">{report.title}</h2>
//               <Badge
//                 variant="secondary"
//                 className={`text-[10px] ${
//                   report.status === "completed"
//                     ? "bg-chart-2/10 text-chart-2 border-0"
//                     : "bg-chart-4/10 text-chart-4 border-0"
//                 }`}
//               >
//                 {report.status}
//               </Badge>
//             </div>
//             <div className="flex items-center gap-3 mt-1">
//               <span className="text-xs text-muted-foreground flex items-center gap-1">
//                 {report.source === "github" ? <Github className="size-3" /> : <Upload className="size-3" />}
//                 {report.source === "github" ? "GitHub" : "Uploaded"}
//               </span>
//               <span className="text-xs text-muted-foreground flex items-center gap-1">
//                 <Clock className="size-3" />
//                 {new Date(report.createdAt).toLocaleDateString("en-US", {
//                   month: "long",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           {report.sourceUrl && (
//             <Button
//               variant="outline"
//               size="sm"
//               className="border-border text-foreground hover:bg-secondary"
//               onClick={() => window.open(report.sourceUrl, "_blank")}
//             >
//               <ExternalLink className="size-3.5 mr-1.5" />
//               View Source
//             </Button>
//           )}
//           <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-secondary">
//             <Share2 className="size-3.5 mr-1.5" />
//             Share
//           </Button>
//           <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-secondary">
//             <Download className="size-3.5 mr-1.5" />
//             Export
//           </Button>
//         </div>
//       </div>

//       {/* Summary */}
//       <Card className="bg-card border-border">
//         <CardContent className="p-6">
//           <div className="flex items-start gap-4">
//             <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
//               <FileText className="size-5 text-primary" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <h3 className="text-sm font-medium text-foreground">Executive Summary</h3>
//               <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{report.summary}</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Score + Categories */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         {/* Overall score */}
//         <Card className="bg-card border-border">
//           <CardContent className="p-6 flex flex-col items-center justify-center text-center">
//             <p className="text-sm text-muted-foreground">Overall Score</p>
//             <div className="relative mt-3 mb-3">
//               <svg className="size-28" viewBox="0 0 120 120">
//                 <circle
//                   cx="60"
//                   cy="60"
//                   r="50"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="8"
//                   className="text-secondary"
//                 />
//                 <circle
//                   cx="60"
//                   cy="60"
//                   r="50"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="8"
//                   strokeLinecap="round"
//                   strokeDasharray={`${report.metrics.score * 3.14} 314`}
//                   transform="rotate(-90 60 60)"
//                   className="text-primary"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-3xl font-bold text-foreground">{report.metrics.score}</span>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 text-xs text-muted-foreground">
//               <span>{report.metrics.files} files</span>
//               <span>{report.metrics.issues} issues</span>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Category breakdown */}
//         <Card className="bg-card border-border lg:col-span-2">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-base text-foreground">Category Breakdown</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col gap-4">
//             {MOCK_CATEGORIES.map((cat) => (
//               <div key={cat.name} className="flex items-center gap-4">
//                 <div className="flex size-8 items-center justify-center rounded-lg bg-secondary shrink-0">
//                   <cat.icon className={`size-4 ${cat.color}`} />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between mb-1">
//                     <span className="text-sm font-medium text-foreground">{cat.name}</span>
//                     <span className="text-sm font-semibold text-foreground">{cat.score}%</span>
//                   </div>
//                   <Progress value={cat.score} className="h-2" />
//                 </div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Issues Summary */}
//       <div className="grid grid-cols-3 gap-4">
//         <Card className="bg-card border-border">
//           <CardContent className="p-4 flex items-center gap-3">
//             <div className="flex size-10 items-center justify-center rounded-lg bg-destructive/10 shrink-0">
//               <AlertTriangle className="size-4 text-destructive" />
//             </div>
//             <div>
//               <p className="text-xl font-bold text-foreground">{highCount}</p>
//               <p className="text-xs text-muted-foreground">High Severity</p>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="bg-card border-border">
//           <CardContent className="p-4 flex items-center gap-3">
//             <div className="flex size-10 items-center justify-center rounded-lg bg-chart-4/10 shrink-0">
//               <AlertTriangle className="size-4 text-chart-4" />
//             </div>
//             <div>
//               <p className="text-xl font-bold text-foreground">{mediumCount}</p>
//               <p className="text-xs text-muted-foreground">Medium Severity</p>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="bg-card border-border">
//           <CardContent className="p-4 flex items-center gap-3">
//             <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
//               <TrendingUp className="size-4 text-primary" />
//             </div>
//             <div>
//               <p className="text-xl font-bold text-foreground">{lowCount}</p>
//               <p className="text-xs text-muted-foreground">Low Severity</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Findings */}
//       <Card className="bg-card border-border">
//         <CardHeader className="pb-3">
//           <CardTitle className="text-base text-foreground">Detailed Findings</CardTitle>
//         </CardHeader>
//         <CardContent className="flex flex-col gap-3">
//           {MOCK_FINDINGS.map((finding, i) => (
//             <div key={i}>
//               <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
//                 <Badge
//                   variant="secondary"
//                   className={`text-[10px] mt-0.5 shrink-0 ${
//                     finding.severity === "high"
//                       ? "bg-destructive/10 text-destructive border-0"
//                       : finding.severity === "medium"
//                       ? "bg-chart-4/10 text-chart-4 border-0"
//                       : "bg-primary/10 text-primary border-0"
//                   }`}
//                 >
//                   {finding.severity}
//                 </Badge>
//                 <div className="flex-1 min-w-0">
//                   <h4 className="text-sm font-medium text-foreground">{finding.title}</h4>
//                   <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{finding.description}</p>
//                   <div className="flex items-center gap-2 mt-2">
//                     <code className="text-[11px] font-mono bg-secondary px-2 py-0.5 rounded text-primary">
//                       {finding.file}:{finding.line}
//                     </code>
//                   </div>
//                 </div>
//               </div>
//               {i < MOCK_FINDINGS.length - 1 && <Separator className="my-1 bg-transparent" />}
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

export default function ReportViewer() {
  return (
    <div>
      <h1>ReportViewer</h1>
      <p>Welcome ReportViewer.</p>
    </div>
  )
}