"use client"

import { useState, useRef } from "react"
import { Upload, Github, FileText, Loader2, X, Sparkles, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { apiReviewGithub, apiReviewArchive } from "@/lib/api"
import { useRouter } from "next/navigation"

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
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("github")
  const [githubUrl, setGithubUrl] = useState("")
  const [topic, setTopic] = useState("")
  const [customTopic, setCustomTopic] = useState("")
  const [description, setDescription] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [done, setDone] = useState(false)
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
    const fullDescription = finalTopic ? `${finalTopic}${description ? ": " + description : ""}` : description

    if (activeTab === "github" && !githubUrl.trim()) {
      toast.error("Please enter a GitHub repository URL")
      return
    }
    if (activeTab === "upload" && !uploadedFile) {
      toast.error("Please upload a file")
      return
    }
    if (!fullDescription.trim()) {
      toast.error("Please select a topic or add a description")
      return
    }

    setIsGenerating(true)
    try {
      if (activeTab === "github") {
        await apiReviewGithub(githubUrl.trim(), fullDescription)
      } else {
        await apiReviewArchive(uploadedFile!, fullDescription)
      }
      setDone(true)
      toast.success("Report generated successfully!")
      setTimeout(() => router.push("/userdashboard/my-report"), 1500)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to generate report")
    } finally {
      setIsGenerating(false)
    }
  }

  if (done) {
    return (
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center gap-6 py-24">
        <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="size-10 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Report Generated!</h2>
        <p className="text-muted-foreground text-center">Redirecting to your reports...</p>
        <div className="size-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Create New Report</h2>
        <p className="text-muted-foreground mt-1">
          Provide a GitHub repository URL or upload an archive to generate an AI-powered analysis report.
        </p>
      </div>

      {/* Source */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-foreground">Source</CardTitle>
          <CardDescription className="text-muted-foreground">Choose how you want to provide your code for analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-secondary">
              <TabsTrigger value="github" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                <Github className="size-4 mr-2" />GitHub URL
              </TabsTrigger>
              <TabsTrigger value="upload" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                <Upload className="size-4 mr-2" />Upload Archive
              </TabsTrigger>
            </TabsList>

            <TabsContent value="github" className="mt-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="github-url" className="text-sm text-foreground">Repository URL</Label>
                <Input
                  id="github-url"
                  placeholder="https://github.com/username/repository"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
                />
                <p className="text-xs text-muted-foreground">Enter the full URL of a public GitHub repository</p>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="mt-4">
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click() }}
              >
                <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileUpload} accept=".zip,.tar.gz,.tar" />
                {uploadedFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="size-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">{uploadedFile.name}</p>
                      <p className="text-xs text-muted-foreground">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-foreground"
                      onClick={(e) => { e.stopPropagation(); setUploadedFile(null) }}>
                      <X className="size-3.5" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="size-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-foreground mt-3">Drop your archive here or click to browse</p>
                    <p className="text-xs text-muted-foreground mt-1">Supports .zip, .tar.gz</p>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-foreground">Analysis Configuration</CardTitle>
          <CardDescription className="text-muted-foreground">Select the type of analysis and provide additional context</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="topic" className="text-sm text-foreground">Topic</Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger id="topic" className="bg-secondary border-border text-foreground">
                <SelectValue placeholder="Select an analysis topic" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {TOPICS.map((t) => (
                  <SelectItem key={t} value={t} className="text-foreground focus:bg-primary/10 focus:text-primary">{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {topic === "Custom Topic" && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="custom-topic" className="text-sm text-foreground">Custom Topic Name</Label>
              <Input id="custom-topic" placeholder="Enter your custom analysis topic" value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50" />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-sm text-foreground">
              Additional Context
              <Badge variant="secondary" className="ml-2 text-[10px] bg-secondary text-muted-foreground border-0">Optional</Badge>
            </Label>
            <Textarea id="description" placeholder="Describe specific areas of focus, concerns, or what you're looking for..."
              value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 resize-none" />
          </div>
        </CardContent>
      </Card>

      {/* Warning for long generation */}
      {isGenerating && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 font-mono text-[0.72rem] text-primary">
          ⏳ AI analysis is running — this can take 15–60 seconds depending on the repo size. Please keep this tab open.
        </div>
      )}

      <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
        onClick={handleGenerate} disabled={isGenerating}>
        {isGenerating ? (
          <><Loader2 className="size-4 mr-2 animate-spin" />Analyzing Code...</>
        ) : (
          <><Sparkles className="size-4 mr-2" />Generate Report</>
        )}
      </Button>
    </div>
  )
}