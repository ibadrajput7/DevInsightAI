// "use client"

// import { useState, useRef } from "react"
// import { Upload, Github, FileText, Loader2, X, Sparkles } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { toast } from "sonner"
// import type { Report } from "@/lib/types"

// interface GenerateReportProps {
//   onGenerate: (report: Report) => void
// }

// const TOPICS = [
//   "Performance Optimization",
//   "Security Analysis",
//   "Code Quality",
//   "Architecture Review",
//   "Dependency Audit",
//   "Accessibility Review",
//   "Best Practices",
//   "Custom Topic",
// ]

// export function GenerateReport({ onGenerate }: GenerateReportProps) {
//   const [activeTab, setActiveTab] = useState("github")
//   const [githubUrl, setGithubUrl] = useState("")
//   const [topic, setTopic] = useState("")
//   const [customTopic, setCustomTopic] = useState("")
//   const [description, setDescription] = useState("")
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null)
//   const [isGenerating, setIsGenerating] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setUploadedFile(file)
//     }
//   }

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault()
//     const file = e.dataTransfer.files[0]
//     if (file) {
//       setUploadedFile(file)
//     }
//   }

//   const handleGenerate = async () => {
//     const finalTopic = topic === "Custom Topic" ? customTopic : topic

//     if (activeTab === "github" && !githubUrl) {
//       toast.error("Please enter a GitHub repository URL")
//       return
//     }
//     if (activeTab === "upload" && !uploadedFile) {
//       toast.error("Please upload a file")
//       return
//     }
//     if (!finalTopic) {
//       toast.error("Please select or enter a topic")
//       return
//     }

//     setIsGenerating(true)

//     // Simulate generation
//     await new Promise((resolve) => setTimeout(resolve, 3000))

//     const newReport: Report = {
//       id: Date.now().toString(),
//       title: activeTab === "github"
//         ? `${githubUrl.split("/").slice(-1)[0]} - ${finalTopic}`
//         : `${uploadedFile?.name} - ${finalTopic}`,
//       topic: finalTopic,
//       source: activeTab as "github" | "upload",
//       sourceUrl: activeTab === "github" ? githubUrl : undefined,
//       status: "completed",
//       createdAt: new Date().toISOString(),
//       summary: `Comprehensive ${finalTopic.toLowerCase()} analysis completed. ${description ? `Focus areas: ${description}. ` : ""}Found multiple areas for improvement with detailed recommendations and actionable insights for your development team.`,
//       metrics: {
//         files: Math.floor(Math.random() * 500) + 50,
//         issues: Math.floor(Math.random() * 30) + 2,
//         score: Math.floor(Math.random() * 30) + 70,
//       },
//     }

//     setIsGenerating(false)
//     setGithubUrl("")
//     setTopic("")
//     setCustomTopic("")
//     setDescription("")
//     setUploadedFile(null)

//     toast.success("Report generated successfully!")
//     onGenerate(newReport)
//   }

//   return (
//     <div className="max-w-3xl mx-auto flex flex-col gap-6">
//       {/* Header */}
//       <div>
//         <h2 className="text-xl font-semibold text-foreground">Create New Report</h2>
//         <p className="text-muted-foreground mt-1">
//           Provide a GitHub repository URL or upload files to generate an AI-powered analysis report.
//         </p>
//       </div>

//       {/* Source selection */}
//       <Card className="bg-card border-border">
//         <CardHeader className="pb-4">
//           <CardTitle className="text-base text-foreground">Source</CardTitle>
//           <CardDescription className="text-muted-foreground">
//             Choose how you want to provide your code for analysis
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             <TabsList className="grid w-full grid-cols-2 bg-secondary">
//               <TabsTrigger
//                 value="github"
//                 className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
//               >
//                 <Github className="size-4 mr-2" />
//                 GitHub URL
//               </TabsTrigger>
//               <TabsTrigger
//                 value="upload"
//                 className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
//               >
//                 <Upload className="size-4 mr-2" />
//                 Upload Files
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="github" className="mt-4">
//               <div className="flex flex-col gap-2">
//                 <Label htmlFor="github-url" className="text-sm text-foreground">Repository URL</Label>
//                 <Input
//                   id="github-url"
//                   placeholder="https://github.com/username/repository"
//                   value={githubUrl}
//                   onChange={(e) => setGithubUrl(e.target.value)}
//                   className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   Enter the full URL of a public GitHub repository
//                 </p>
//               </div>
//             </TabsContent>

//             <TabsContent value="upload" className="mt-4">
//               <div
//                 className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={handleDrop}
//                 onClick={() => fileInputRef.current?.click()}
//                 role="button"
//                 tabIndex={0}
//                 aria-label="Upload files"
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") {
//                     fileInputRef.current?.click()
//                   }
//                 }}
//               >
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   className="hidden"
//                   onChange={handleFileUpload}
//                   accept=".zip,.tar.gz,.js,.ts,.tsx,.jsx,.py,.go,.rs,.java"
//                 />
//                 {uploadedFile ? (
//                   <div className="flex items-center justify-center gap-3">
//                     <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
//                       <FileText className="size-5 text-primary" />
//                     </div>
//                     <div className="text-left">
//                       <p className="text-sm font-medium text-foreground">{uploadedFile.name}</p>
//                       <p className="text-xs text-muted-foreground">
//                         {(uploadedFile.size / 1024).toFixed(1)} KB
//                       </p>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="size-7 text-muted-foreground hover:text-foreground"
//                       onClick={(e) => {
//                         e.stopPropagation()
//                         setUploadedFile(null)
//                       }}
//                     >
//                       <X className="size-3.5" />
//                       <span className="sr-only">Remove file</span>
//                     </Button>
//                   </div>
//                 ) : (
//                   <>
//                     <Upload className="size-8 text-muted-foreground mx-auto" />
//                     <p className="text-sm text-foreground mt-3">
//                       Drop your files here or click to browse
//                     </p>
//                     <p className="text-xs text-muted-foreground mt-1">
//                       Supports .zip, .tar.gz, .js, .ts, .py, .go, .rs, .java and more
//                     </p>
//                   </>
//                 )}
//               </div>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>

//       {/* Topic selection */}
//       <Card className="bg-card border-border">
//         <CardHeader className="pb-4">
//           <CardTitle className="text-base text-foreground">Analysis Configuration</CardTitle>
//           <CardDescription className="text-muted-foreground">
//             Select the type of analysis and provide additional context
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="flex flex-col gap-4">
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="topic" className="text-sm text-foreground">Topic</Label>
//             <Select value={topic} onValueChange={setTopic}>
//               <SelectTrigger id="topic" className="bg-secondary border-border text-foreground">
//                 <SelectValue placeholder="Select an analysis topic" />
//               </SelectTrigger>
//               <SelectContent className="bg-card border-border">
//                 {TOPICS.map((t) => (
//                   <SelectItem key={t} value={t} className="text-foreground focus:bg-primary/10 focus:text-primary">
//                     {t}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {topic === "Custom Topic" && (
//             <div className="flex flex-col gap-2">
//               <Label htmlFor="custom-topic" className="text-sm text-foreground">Custom Topic Name</Label>
//               <Input
//                 id="custom-topic"
//                 placeholder="Enter your custom analysis topic"
//                 value={customTopic}
//                 onChange={(e) => setCustomTopic(e.target.value)}
//                 className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
//               />
//             </div>
//           )}

//           <div className="flex flex-col gap-2">
//             <Label htmlFor="description" className="text-sm text-foreground">
//               Additional Context
//               <Badge variant="secondary" className="ml-2 text-[10px] bg-secondary text-muted-foreground border-0">
//                 Optional
//               </Badge>
//             </Label>
//             <Textarea
//               id="description"
//               placeholder="Describe specific areas of focus, concerns, or what you're looking for in the analysis..."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows={3}
//               className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 resize-none"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Generate button */}
//       <Button
//         size="lg"
//         className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
//         onClick={handleGenerate}
//         disabled={isGenerating}
//       >
//         {isGenerating ? (
//           <>
//             <Loader2 className="size-4 mr-2 animate-spin" />
//             Analyzing Code...
//           </>
//         ) : (
//           <>
//             <Sparkles className="size-4 mr-2" />
//             Generate Report
//           </>
//         )}
//       </Button>
//     </div>
//   )
// }

"use client"

import { useState, useRef } from "react"
import { Upload, Github, FileText, Loader2, X, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const TOPICS = [
  "Performance Optimization",
  "Security Analysis",
  "Code Quality",
  "Architecture Review",
  "Dependency Audit",
  "Accessibility Review",
  "Best Practices",
  "Custom Topic",
]

export default function GenerateReportPage() {

  const [activeTab, setActiveTab] = useState("github")
  const [githubUrl, setGithubUrl] = useState("")
  const [topic, setTopic] = useState("")
  const [customTopic, setCustomTopic] = useState("")
  const [description, setDescription] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setUploadedFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) setUploadedFile(file)
  }

  const handleGenerate = async () => {

    const finalTopic = topic === "Custom Topic" ? customTopic : topic

    if (activeTab === "github" && !githubUrl) {
      toast.error("Please enter a GitHub repository URL")
      return
    }

    if (activeTab === "upload" && !uploadedFile) {
      toast.error("Please upload a file")
      return
    }

    if (!finalTopic) {
      toast.error("Please select a topic")
      return
    }

    setIsGenerating(true)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsGenerating(false)

    toast.success("Report generated successfully!")

    setGithubUrl("")
    setTopic("")
    setCustomTopic("")
    setDescription("")
    setUploadedFile(null)
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">

      <div>
        <h2 className="text-xl font-semibold">Create New Report</h2>
        <p className="text-muted-foreground mt-1">
          Provide a GitHub repository URL or upload files to generate an AI-powered analysis report.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Source</CardTitle>
          <CardDescription>
            Choose how you want to provide your code
          </CardDescription>
        </CardHeader>

        <CardContent>

          <Tabs value={activeTab} onValueChange={setActiveTab}>

            <TabsList className="grid grid-cols-2 w-full">

              <TabsTrigger value="github">
                <Github className="size-4 mr-2" />
                GitHub URL
              </TabsTrigger>

              <TabsTrigger value="upload">
                <Upload className="size-4 mr-2" />
                Upload Files
              </TabsTrigger>

            </TabsList>

            <TabsContent value="github" className="mt-4">

              <Label>Repository URL</Label>

              <Input
                placeholder="https://github.com/username/repository"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />

            </TabsContent>

            <TabsContent value="upload" className="mt-4">

              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />

                {uploadedFile ? (
                  <p className="text-sm">{uploadedFile.name}</p>
                ) : (
                  <>
                    <Upload className="size-8 mx-auto" />
                    <p className="text-sm mt-2">Drop files or click to upload</p>
                  </>
                )}

              </div>

            </TabsContent>

          </Tabs>

        </CardContent>
      </Card>

      <Card>

        <CardHeader>
          <CardTitle>Analysis Configuration</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">

          <Select value={topic} onValueChange={setTopic}>
            <SelectTrigger>
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>

            <SelectContent>
              {TOPICS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>

          </Select>

          {topic === "Custom Topic" && (
            <Input
              placeholder="Custom topic"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
            />
          )}

          <Textarea
            placeholder="Additional context..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        </CardContent>

      </Card>

      <Button
        size="lg"
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="size-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="size-4 mr-2" />
            Generate Report
          </>
        )}
      </Button>

    </div>
  )
}