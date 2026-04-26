"use client"

import { useState, useEffect } from "react"
import {
  User, Bell, Shield, Palette, Key, Globe, Save, Moon, Sun, Loader2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import { useUser } from "@/hooks/useUser"
import { apiForgotPassword, apiResetPassword, apiVerifyResetCode } from "@/lib/api"

export default function Settings() {
  const { user, loading: userLoading } = useUser()
  const { resolvedTheme, setTheme } = useTheme()

  const [profile, setProfile] = useState({ name: "", email: "", role: "" })
  const [notifications, setNotifications] = useState({ email: true, reportComplete: true, weeklyDigest: false, securityAlerts: true })
  const [preferences, setPreferences] = useState({ language: "en", defaultTopic: "Performance Optimization", autoAnalyze: false })

  // Password reset states
  const [pwStep, setPwStep] = useState<"idle" | "sending" | "verify" | "reset" | "done">("idle")
  const [resetCode, setResetCode] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [pwLoading, setPwLoading] = useState(false)

  // Pre-fill profile from API
  useEffect(() => {
    if (user) {
      setProfile({ name: user.name, email: user.email, role: user.role })
    }
  }, [user])

  const handleSaveProfile = () => {
    // Profile update API not yet in backend — show info
    toast.success("Profile display updated (backend profile update coming soon)")
  }

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved")
  }

  // Step 1: send reset code to user's email
  const handleSendResetCode = async () => {
    if (!profile.email) { toast.error("No email found"); return }
    setPwLoading(true)
    try {
      await apiForgotPassword(profile.email)
      toast.success("Reset code sent to your email!")
      setPwStep("verify")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send code")
    } finally { setPwLoading(false) }
  }

  // Step 2: verify code
  const handleVerifyCode = async () => {
    if (!resetCode) { toast.error("Enter the code"); return }
    setPwLoading(true)
    try {
      const res = await apiVerifyResetCode(profile.email, resetCode)
      if (res.message === "Invalid or expired code") {
        toast.error("Invalid or expired code")
      } else {
        toast.success("Code verified!")
        setPwStep("reset")
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Verification failed")
    } finally { setPwLoading(false) }
  }

  // Step 3: set new password
  const handleResetPassword = async () => {
    if (!newPass || !confirmPass) { toast.error("Fill in both fields"); return }
    if (newPass !== confirmPass) { toast.error("Passwords do not match"); return }
    setPwLoading(true)
    try {
      await apiResetPassword(profile.email, newPass)
      toast.success("Password updated successfully!")
      setPwStep("done")
      setResetCode(""); setNewPass(""); setConfirmPass("")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update password")
    } finally { setPwLoading(false) }
  }

  const inputCls = "bg-secondary border-border text-foreground focus-visible:ring-primary/50"

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your account preferences and configuration</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-secondary w-full grid grid-cols-4">
          <TabsTrigger value="profile" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"><User className="size-3.5 mr-1.5" />Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"><Bell className="size-3.5 mr-1.5" />Alerts</TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"><Palette className="size-3.5 mr-1.5" />Preferences</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"><Shield className="size-3.5 mr-1.5" />Security</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base text-foreground">Profile Information</CardTitle>
              <CardDescription className="text-muted-foreground">Your account details from DevInsightAI</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center">
                  {userLoading ? (
                    <Loader2 className="size-5 text-primary animate-spin" />
                  ) : (
                    <span className="text-xl font-bold text-primary">
                      {profile.name ? profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "??"}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{profile.name || "Loading..."}</p>
                  <p className="text-xs text-muted-foreground">{profile.email}</p>
                  <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded text-[10px] font-medium bg-primary/10 text-primary capitalize">{profile.role}</span>
                </div>
              </div>
              <Separator className="bg-border" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-sm text-foreground">Full Name</Label>
                  <Input id="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className={inputCls} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-sm text-foreground">Email</Label>
                  <Input id="email" type="email" value={profile.email} readOnly className={`${inputCls} opacity-60 cursor-not-allowed`} />
                  <p className="text-xs text-muted-foreground">Email cannot be changed directly</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="role" className="text-sm text-foreground">Role</Label>
                  <Input id="role" value={profile.role} readOnly className={`${inputCls} opacity-60 cursor-not-allowed capitalize`} />
                </div>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit" onClick={handleSaveProfile}>
                <Save className="size-3.5 mr-1.5" />Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base text-foreground">Notification Preferences</CardTitle>
              <CardDescription className="text-muted-foreground">Choose how and when you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {[
                { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                { key: "reportComplete", label: "Report Completed", desc: "Notify when a report finishes generating" },
                { key: "weeklyDigest", label: "Weekly Digest", desc: "Get a weekly summary of your code health" },
                { key: "securityAlerts", label: "Security Alerts", desc: "Critical security vulnerability notifications" },
              ].map(({ key, label, desc }, i) => (
                <div key={key}>
                  {i > 0 && <Separator className="bg-border mb-5" />}
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm font-medium text-foreground">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
                    <Switch checked={notifications[key as keyof typeof notifications] as boolean}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, [key]: checked })} />
                  </div>
                </div>
              ))}
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit" onClick={handleSaveNotifications}>
                <Save className="size-3.5 mr-1.5" />Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base text-foreground">Application Preferences</CardTitle>
              <CardDescription className="text-muted-foreground">Customize your DevInsight experience</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {/* Theme */}
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium text-foreground">Theme</p><p className="text-xs text-muted-foreground">Switch between light and dark modes</p></div>
                <div className="flex items-center gap-2">
                  <Button variant={resolvedTheme === "dark" ? "default" : "outline"} size="sm"
                    className={resolvedTheme === "dark" ? "bg-primary text-primary-foreground" : "border-border text-foreground hover:bg-secondary"}
                    onClick={() => setTheme("dark")}><Moon className="size-3.5 mr-1.5" />Dark</Button>
                  <Button variant={resolvedTheme === "light" ? "default" : "outline"} size="sm"
                    className={resolvedTheme === "light" ? "bg-primary text-primary-foreground" : "border-border text-foreground hover:bg-secondary"}
                    onClick={() => setTheme("light")}><Sun className="size-3.5 mr-1.5" />Light</Button>
                </div>
              </div>
              <Separator className="bg-border" />
              {/* Language */}
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium text-foreground">Language</p><p className="text-xs text-muted-foreground">Choose your preferred language</p></div>
                <Select value={preferences.language} onValueChange={(v) => setPreferences({ ...preferences, language: v })}>
                  <SelectTrigger className="w-40 bg-secondary border-border text-foreground"><Globe className="size-3.5 mr-2 text-muted-foreground" /><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="en" className="text-foreground focus:bg-primary/10 focus:text-primary">English</SelectItem>
                    <SelectItem value="es" className="text-foreground focus:bg-primary/10 focus:text-primary">Spanish</SelectItem>
                    <SelectItem value="fr" className="text-foreground focus:bg-primary/10 focus:text-primary">French</SelectItem>
                    <SelectItem value="de" className="text-foreground focus:bg-primary/10 focus:text-primary">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator className="bg-border" />
              {/* Auto-analyze */}
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium text-foreground">Auto-Analyze on Push</p><p className="text-xs text-muted-foreground">Automatically run analysis on new commits</p></div>
                <Switch checked={preferences.autoAnalyze} onCheckedChange={(checked) => setPreferences({ ...preferences, autoAnalyze: checked })} />
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit" onClick={() => toast.success("Preferences saved")}>
                <Save className="size-3.5 mr-1.5" />Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-6">
          <div className="flex flex-col gap-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base text-foreground">Change Password</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {pwStep === "idle" && "We'll email a reset code to verify your identity."}
                  {pwStep === "verify" && `Enter the code sent to ${profile.email}`}
                  {pwStep === "reset" && "Choose your new password."}
                  {pwStep === "done" && "✓ Password updated successfully!"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {pwStep === "idle" && (
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit" onClick={handleSendResetCode} disabled={pwLoading}>
                    {pwLoading ? <><Loader2 className="size-3.5 mr-1.5 animate-spin" />Sending...</> : <><Key className="size-3.5 mr-1.5" />Send Reset Code</>}
                  </Button>
                )}
                {pwStep === "verify" && (
                  <>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm text-foreground">Reset Code</Label>
                      <Input placeholder="Enter code from email" value={resetCode} onChange={(e) => setResetCode(e.target.value)} className={inputCls} />
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit" onClick={handleVerifyCode} disabled={pwLoading}>
                      {pwLoading ? <><Loader2 className="size-3.5 mr-1.5 animate-spin" />Verifying...</> : "Verify Code"}
                    </Button>
                  </>
                )}
                {pwStep === "reset" && (
                  <>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm text-foreground">New Password</Label>
                      <Input type="password" placeholder="••••••••" value={newPass} onChange={(e) => setNewPass(e.target.value)} className={inputCls} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm text-foreground">Confirm Password</Label>
                      <Input type="password" placeholder="••••••••" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className={inputCls} />
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit" onClick={handleResetPassword} disabled={pwLoading}>
                      {pwLoading ? <><Loader2 className="size-3.5 mr-1.5 animate-spin" />Updating...</> : <><Key className="size-3.5 mr-1.5" />Update Password</>}
                    </Button>
                  </>
                )}
                {pwStep === "done" && (
                  <div className="flex items-center gap-2 text-chart-2">
                    <div className="size-5 rounded-full bg-chart-2/10 flex items-center justify-center"><span className="text-[10px]">✓</span></div>
                    <span className="text-sm">Password changed successfully. You remain logged in.</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card border-destructive/30">
              <CardHeader>
                <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
                <CardDescription className="text-muted-foreground">Irreversible actions for your account</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10"
                  onClick={() => toast.error("Account deletion not yet available — contact support.")}>
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
