// "use client"

// import { useState } from "react"
// import { DashboardOverview } from "@/components/dashbaord/overview"
// import { GenerateReport } from "@/components/dashbaord/generate-report"
// import { ReportsLibrary } from "@/components/dashbaord/report-library"
// import { ReportViewer } from "@/components/dashbaord/report-viewer"
// import { ChatBot } from "@/components/dashbaord/chatbot"
// import { Settings } from "@/components/dashbaord/settings"
// import type { Report } from "@/lib/types"

// const SAMPLE_REPORTS: Report[] = [
//   {
//     id: "1",
//     title: "React Performance Audit",
//     topic: "Performance Optimization",
//     source: "github",
//     sourceUrl: "https://github.com/facebook/react",
//     status: "completed",
//     createdAt: "2026-03-01T10:30:00Z",
//     summary:
//       "Comprehensive analysis of React's rendering pipeline identifying optimization opportunities.",
//     metrics: { files: 234, issues: 12, score: 87 },
//   },
// ]

// export default function DashboardPage() {

//   const [activeSection, setActiveSection] = useState("overview")
//   const [reports, setReports] = useState<Report[]>(SAMPLE_REPORTS)
//   const [selectedReport, setSelectedReport] = useState<Report | null>(null)

//   const handleGenerateReport = (report: Report) => {
//     setReports((prev) => [report, ...prev])
//     setSelectedReport(report)
//     setActiveSection("view-report")
//   }

//   const handleViewReport = (report: Report) => {
//     setSelectedReport(report)
//     setActiveSection("view-report")
//   }

//   const handleDeleteReport = (id: string) => {
//     setReports((prev) => prev.filter((r) => r.id !== id))
//   }

//   const renderContent = () => {
//     switch (activeSection) {
//       case "overview":
//         return (
//           <DashboardOverview
//             reports={reports}
//             onViewReport={handleViewReport}
//             onNavigate={setActiveSection}
//           />
//         )

//       case "generate":
//         return <GenerateReport onGenerate={handleGenerateReport} />

//       case "reports":
//         return (
//           <ReportsLibrary
//             reports={reports}
//             onViewReport={handleViewReport}
//             onDeleteReport={handleDeleteReport}
//           />
//         )

//       case "view-report":
//         return selectedReport ? (
//           <ReportViewer
//             report={selectedReport}
//             onBack={() => setActiveSection("reports")}
//           />
//         ) : (
//           <ReportsLibrary
//             reports={reports}
//             onViewReport={handleViewReport}
//             onDeleteReport={handleDeleteReport}
//           />
//         )

//       case "chatbot":
//         return <ChatBot />

//       case "settings":
//         return <Settings />

//       default:
//         return (
//           <DashboardOverview
//             reports={reports}
//             onViewReport={handleViewReport}
//             onNavigate={setActiveSection}
//           />
//         )
//     }
//   }

//   return <div className="w-full">{renderContent()}</div>
// }

"use client"

import { DashboardOverview } from "@/components/dashbaord/overview"
import type { Report } from "@/lib/types"

const SAMPLE_REPORTS: Report[] = [
  {
    id: "1",
    title: "React Performance Audit",
    topic: "Performance Optimization",
    source: "github",
    sourceUrl: "https://github.com/facebook/react",
    status: "completed",
    createdAt: "2026-03-01T10:30:00Z",
    summary:
      "Comprehensive analysis of React's rendering pipeline identifying optimization opportunities.",
    metrics: { files: 234, issues: 12, score: 87 },
  },
  {
    id: "2",
    title: "Next.js SEO Audit",
    topic: "SEO Optimization",
    source: "github",
    sourceUrl: "https://github.com/vercel/next.js",
    status: "completed",
    createdAt: "2026-03-02T12:45:00Z",
    summary: "SEO best practices and meta tags analysis for your Next.js site.",
    metrics: { files: 45, issues: 3, score: 92 },
  },
]

export default function DashboardPage() {
  const handleNavigate = (section: string) => {
    // Sidebar link ke equivalent pages par navigate karne ke liye
    switch (section) {
      case "generate":
        window.location.href = "/userdashboard/generate-report"
        break
      case "reports":
        window.location.href = "/userdashboard/my-report"
        break
      case "chatbot":
        window.location.href = "/userdashboard/chatbot"
        break
      case "settings":
        window.location.href = "/userdashboard/settings"
        break
      default:
        window.location.href = "/userdashboard"
        break
    }
  }

  const handleViewReport = (report: Report) => {
    // Report details page ya modal handle karne ke liye
    console.log("View report:", report)
    // Agar alag page banaye to yahan redirect kar sakte ho
    // window.location.href = `/userdashboard/my-report/${report.id}`
  }

  return (
    <div className="w-full">
      <DashboardOverview
        reports={SAMPLE_REPORTS}
        onViewReport={handleViewReport}
        onNavigate={handleNavigate}
      />
    </div>
  )
}